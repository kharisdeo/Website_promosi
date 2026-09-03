import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, getPublishedArticles } from "@/lib/data";

interface ArticleDetailProps { params: Promise<{ slug: string }> }
export function generateStaticParams() { return getPublishedArticles().map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: ArticleDetailProps): Promise<Metadata> { const { slug } = await params; const article = getArticleBySlug(slug); return article ? { title: article.title, description: article.excerpt, openGraph: { title: article.title, description: article.excerpt, images: [article.image] } } : { title: "Berita tidak ditemukan" }; }

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const related = getPublishedArticles().filter((item) => item.id !== article.id && item.category === article.category).slice(0, 2);
  return <><article className="article-detail container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Beranda</Link><span>/</span><Link href="/news">Berita</Link><span>/</span><span>{article.category}</span></nav><header className="article-detail-header"><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><div className="article-meta"><span>{article.author}</span><span aria-hidden="true">·</span><time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</time><span aria-hidden="true">·</span><span>{article.readTime}</span></div></header><div className="article-detail-cover"><Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 860px) 100vw, 860px" priority /></div><div className="article-body">{article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="article-author"><div className="brand-mark" aria-hidden="true"><span /></div><div><strong>Ditulis oleh {article.author}</strong><span>Tim yang percaya bahwa ilmu harus mudah dipraktikkan.</span></div></div></div></article>{related.length > 0 && <section className="section-tight"><div className="container"><div className="section-heading"><div><p className="eyebrow">Baca berikutnya</p><h2>Wawasan lain untukmu.</h2></div><Link href="/news" className="text-link"><ArrowLeft size={16} /> Semua berita</Link></div><div className="product-grid">{related.map((item) => <ArticleCard key={item.id} article={item} />)}</div></div></section>}</>;
}
