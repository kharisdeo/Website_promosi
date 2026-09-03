import { errorResponse, getRequestId, jsonResponse } from "@/lib/server/api";
import { listPublicProducts } from "@/lib/server/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    const url = new URL(request.url);
    const products = await listPublicProducts({
      animalType: url.searchParams.get("animalType") || undefined,
      feedStage: url.searchParams.get("feedStage") || undefined,
    });
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 50), 1), 100);
    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const total = products.length;
    const items = products.slice((page - 1) * limit, page * limit);
    return jsonResponse({ data: items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) }, requestId }, requestId);
  } catch (error) {
    return errorResponse(error, requestId);
  }
}
