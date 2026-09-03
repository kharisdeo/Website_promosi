import { errorResponse, getRequestId, jsonResponse, ApiError } from "@/lib/server/api";
import { getPublicProductBySlug } from "@/lib/server/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const requestId = getRequestId(request);
  try {
    const { slug } = await params;
    const product = await getPublicProductBySlug(slug);
    if (!product) throw new ApiError(404, "not_found", "Produk tidak ditemukan.");
    return jsonResponse({ data: product, requestId }, requestId);
  } catch (error) {
    return errorResponse(error, requestId);
  }
}
