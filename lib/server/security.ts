import { timingSafeEqual } from "node:crypto";

import { ApiError } from "@/lib/server/api";

type AdminRole = "super_admin" | "editor";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function safeTokenEqual(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

function requestToken(request: Request) {
  const authorization = request.headers.get("authorization") || "";
  if (authorization.toLowerCase().startsWith("bearer ")) return authorization.slice(7).trim();
  return request.headers.get("x-admin-token")?.trim() || "";
}

export function requireAdmin(request: Request, requiredRole: AdminRole) {
  const expectedToken = process.env.ADMIN_API_TOKEN?.trim();
  if (!expectedToken) {
    throw new ApiError(503, "admin_not_configured", "API admin belum dikonfigurasi.");
  }

  if (!safeTokenEqual(requestToken(request), expectedToken)) {
    throw new ApiError(401, "admin_unauthorized", "Token admin tidak valid.", { "www-authenticate": "Bearer" });
  }

  const configuredRole = process.env.ADMIN_API_ROLE === "editor" ? "editor" : "super_admin";
  const requestedRole = request.headers.get("x-admin-role")?.trim();
  if (requestedRole && requestedRole !== configuredRole) {
    throw new ApiError(403, "admin_forbidden", "Role admin tidak diizinkan.");
  }
  if (requiredRole === "super_admin" && configuredRole !== "super_admin") {
    throw new ApiError(403, "admin_forbidden", "Endpoint ini memerlukan role super admin.");
  }
  return configuredRole;
}

function clientKey(request: Request, bucket: string) {
  // The address is kept only in process memory for throttling and is never logged.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || request.headers.get("x-real-ip")?.trim() || "local";
  return `${bucket}:${address}`;
}

export function enforceRateLimit(
  request: Request,
  bucket: string,
  options: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const key = clientKey(request, bucket);
  const previous = rateLimitStore.get(key);
  const entry = !previous || previous.resetAt <= now
    ? { count: 0, resetAt: now + options.windowMs }
    : previous;

  entry.count += 1;
  rateLimitStore.set(key, entry);

  // Bound memory for the long-running local demo process.
  if (rateLimitStore.size > 2000) {
    for (const [entryKey, value] of rateLimitStore) {
      if (value.resetAt <= now) rateLimitStore.delete(entryKey);
    }
  }

  if (entry.count > options.limit) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    throw new ApiError(429, "rate_limited", "Terlalu banyak request. Coba lagi beberapa saat.", {
      "retry-after": String(retryAfter),
    });
  }
}

export function isHoneypotTriggered(body: Record<string, unknown>) {
  const value = body.website;
  return typeof value === "string" && value.trim().length > 0;
}

export async function verifyCaptcha(body: Record<string, unknown>) {
  if (process.env.CAPTCHA_REQUIRED !== "true") return;

  const token = typeof body.captchaToken === "string" ? body.captchaToken.trim() : "";
  if (!token) throw new ApiError(400, "captcha_required", "Verifikasi keamanan diperlukan.");

  const verifyUrl = process.env.CAPTCHA_VERIFY_URL?.trim();
  const secret = process.env.CAPTCHA_SECRET?.trim();
  if (!verifyUrl || !secret) {
    throw new ApiError(503, "captcha_not_configured", "Proteksi keamanan belum dikonfigurasi.");
  }

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("captcha verification failed");
    const result: unknown = await response.json();
    if (!isRecord(result) || result.success !== true) {
      throw new ApiError(400, "captcha_failed", "Verifikasi keamanan gagal.");
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(503, "captcha_unavailable", "Verifikasi keamanan sedang tidak tersedia.");
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
