import { ApiError, errorResponse, getRequestId, jsonResponse, readJson } from "@/lib/server/api";
import { createLead, getPublicProductBySlug } from "@/lib/server/repository";
import { enforceRateLimit, isHoneypotTriggered, verifyCaptcha } from "@/lib/server/security";
import { validateLeadPayload } from "@/lib/server/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    enforceRateLimit(request, "lead-submit", { limit: 8, windowMs: 10 * 60 * 1000 });
    const body = await readJson(request);

    // Honeypot submissions receive the same success shape but are never persisted.
    if (isHoneypotTriggered(body)) {
      return jsonResponse({ data: { accepted: true }, requestId }, requestId, 202);
    }
    await verifyCaptcha(body);
    const payload = validateLeadPayload(body);
    if (payload.type === "product" && payload.productSlug) {
      const product = await getPublicProductBySlug(payload.productSlug);
      if (!product) throw new ApiError(422, "product_not_found", "Produk yang dipilih tidak tersedia.");
    }
    const lead = await createLead(payload);
    return jsonResponse(
      { data: { accepted: true, leadId: lead.id, receivedAt: lead.createdAt }, requestId },
      requestId,
      201,
    );
  } catch (error) {
    return errorResponse(error, requestId);
  }
}
