import { getRequestId, jsonResponse } from "@/lib/server/api";
import { getPersistenceMode } from "@/lib/server/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  return jsonResponse(
    {
      status: "ok",
      service: "sts-feed-api",
      persistence: getPersistenceMode(),
      timestamp: new Date().toISOString(),
      requestId,
    },
    requestId,
  );
}
