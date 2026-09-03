import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

export const MAX_JSON_BODY_BYTES = 64 * 1024;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly headers?: HeadersInit,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getRequestId(request: Request) {
  const supplied = request.headers.get("x-request-id")?.trim();
  return supplied && /^[a-zA-Z0-9._:-]{1,80}$/.test(supplied) ? supplied : randomUUID();
}

export function jsonResponse(
  data: unknown,
  requestId: string,
  status = 200,
  headers?: HeadersInit,
) {
  const response = NextResponse.json(data, { status, headers });
  response.headers.set("x-request-id", requestId);
  response.headers.set("cache-control", "no-store");
  return response;
}

export function errorResponse(error: unknown, requestId: string) {
  if (error instanceof ApiError) {
    return jsonResponse(
      { error: { code: error.code, message: error.message }, requestId },
      requestId,
      error.status,
      error.headers,
    );
  }

  return jsonResponse(
    { error: { code: "internal_error", message: "Terjadi kesalahan pada server." }, requestId },
    requestId,
    500,
  );
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_JSON_BODY_BYTES) {
    throw new ApiError(413, "payload_too_large", "Ukuran data terlalu besar.");
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_JSON_BODY_BYTES) {
    throw new ApiError(413, "payload_too_large", "Ukuran data terlalu besar.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new ApiError(400, "invalid_json", "Body request harus berupa JSON yang valid.");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new ApiError(400, "invalid_body", "Body request harus berupa object JSON.");
  }
  return parsed as Record<string, unknown>;
}

export function methodNotAllowed(requestId: string, allow: string) {
  return jsonResponse(
    { error: { code: "method_not_allowed", message: "Method tidak didukung." }, requestId },
    requestId,
    405,
    { Allow: allow },
  );
}
