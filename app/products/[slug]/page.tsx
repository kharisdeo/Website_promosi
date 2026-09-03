import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Download, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getProductBySlug, getPublishedProducts, siteSettings } from "@/lib/data";
import { whatsappHref } from "@/components/WhatsAppFloat";

interface ProductDetailProps { params: Promise<{ slug: string }> }

export function generateStaticParams() { return getPublishedProducts().map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produk tidak ditemukan" };
  return { title: product.name, description: product.shortDescription, openGraph: { title: product.name, description: product.shortDescription, images: [product.image] } };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const relatedProducts = getPublishedProducts().filter((item) => item.id !== product.id && item.animalType === product.animalType).slice(0, 2);
  const message = `Halo STS Feed, saya ingin bertanya tentang ${product.name}. Saya melihatnya di ${siteSettings.companyName}: https://stsfeed.id/products/${product.slug}`;

  return (
    <>
      <section className="product-detail"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Beranda</Link><span>/</span><Link href="/products">Produk</Link><span>/</span><span>{product.name}</span></nav><div className="detail-grid"><div className={`detail-image accent-${product.accent}`}><Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 760px) 100vw, 45vw" priority /><span className="product-badge">{product.animalType}</span></div><div className="detail-copy"><div className="product-meta"><span>{product.feedStage}</span><span aria-hidden="true">·</span><span>{product.packageSizes.join(" / ")}</span></div><h1>{product.name}</h1><p className="detail-tagline">{product.tagline}</p><p className="detail-description">{product.description}</p><div className="detail-actions"><a className="button button-dark" href={whatsappHref(message)} target="_blank" rel="noreferrer" data-analytics="click_whatsapp"><MessageCircle size={18} /> Tanya Harga via WhatsApp</a>{product.brochure && <a className="document-link" href={`/brochures/${product.slug}`} download><Download size={17} /> {product.brochure.label} <span>({product.brochure.size})</span></a>}</div><div className="spec-section"><h2>Spesifikasi nutrisi</h2><table className="spec-table"><tbody>{product.specifications.map((spec) => <tr key={spec.label}><td>{spec.label}</td><td>{spec.value} {spec.unit ?? ""}</td></tr>)}</tbody></table></div><div className="benefits-section"><h2>Keunggulan</h2><ul className="benefits-list">{product.benefits.map((benefit) => <li key={benefit}><Check size={18} /><span>{benefit}</span></li>)}</ul></div></div></div></div></section>
      {relatedProducts.length > 0 && <section className="section related-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Produk terkait</p><h2>Pilihan lain untuk {product.animalType.toLowerCase()}.</h2></div><Link href="/products" className="text-link"><ArrowLeft size={16} /> Kembali ke katalog</Link></div><div className="product-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div></div></section>}
    </>
  );
}
