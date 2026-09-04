import { getProductBySlug, siteSettings } from "@/lib/data";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return new Response("Dokumen tidak ditemukan", { status: 404 });
  // Lightweight placeholder document keeps the seeded experience link-safe until CMS assets are connected.
  const brochureTitle = `${product.name} - ${siteSettings.companyName}`;
  const brochureSummary = `Ringkasan katalog distributor. Detail dan stok dikonfirmasi melalui tim ${siteSettings.shortName}.`;
  const pdf = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n4 0 obj<</Length ${brochureTitle.length + brochureSummary.length + 70}>>stream\nBT /F1 20 Tf 72 760 Td (${brochureTitle}) Tj 0 -32 Td /F1 11 Tf (${brochureSummary}) Tj ET\nendstream\nendobj\n5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF`;
  return new Response(pdf, { headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${product.slug}.pdf"` } });
}
