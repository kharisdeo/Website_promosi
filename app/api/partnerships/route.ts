import { errorResponse, getRequestId, jsonResponse, readJson } from "@/lib/server/api";
import { createLead } from "@/lib/server/repository";
import { enforceRateLimit, isHoneypotTriggered, verifyCaptcha } from "@/lib/server/security";
import { validateLeadPayload } from "@/lib/server/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  try {
    enforceRateLimit(request, "partnership-submit", { limit: 5, windowMs: 10 * 60 * 1000 });
    const body = await readJson(request);
    if (isHoneypotTriggered(body)) return jsonResponse({ data: { accepted: true }, requestId }, requestId, 202);
    await verifyCaptcha(body);
    const payload = validateLeadPayload({ ...body, type: "partnership" }, "partnership");
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
