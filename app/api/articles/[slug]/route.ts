import { errorResponse, getRequestId, jsonResponse, ApiError } from "@/lib/server/api";
import { getPublicArticleBySlug } from "@/lib/server/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const requestId = getRequestId(request);
  try {
    const { slug } = await params;
    const article = await getPublicArticleBySlug(slug);
    if (!article) throw new ApiError(404, "not_found", "Artikel tidak ditemukan.");
    return jsonResponse({ data: article, requestId }, requestId);
  } catch (error) {
    return errorResponse(error, requestId);
  }
}
