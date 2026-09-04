import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles, siteSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Berita & edukasi", description: `Tips praktis, cerita peternak, dan wawasan pakan dari ${siteSettings.shortName}.` };

export default function NewsPage() {
  const items = getPublishedArticles();
  return <><section className="page-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Beranda</Link><span>/</span><span>Berita</span></nav><p className="eyebrow">Wawasan untuk kandangmu</p><h1>Belajar sedikit, berdampak banyak.</h1><p>Pengetahuan praktis dan cerita nyata dari dunia peternakan untuk menemani keputusanmu setiap hari.</p></div></section><section className="section"><div className="container"><div className="news-listing">{items.map((article) => <ArticleCard key={article.id} article={article} featured={article === items[0]} />)}</div></div></section></>;
}
