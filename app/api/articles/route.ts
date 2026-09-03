import { errorResponse, getRequestId, jsonResponse } from "@/lib/server/api";
import { listPublicArticles } from "@/lib/server/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  try {
    const url = new URL(request.url);
    const articles = await listPublicArticles({ category: url.searchParams.get("category") || undefined });
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 10), 1), 50);
    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const total = articles.length;
    const items = articles.slice((page - 1) * limit, page * limit);
    return jsonResponse({ data: items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) }, requestId }, requestId);
  } catch (error) {
    return errorResponse(error, requestId);
  }
}
