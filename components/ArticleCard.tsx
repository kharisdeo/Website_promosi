import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/types";
import SafeImage from "@/components/SafeImage";

export default function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={featured ? "article-card article-featured" : "article-card"}>
      <Link href={`/news/${article.slug}`} className="article-image-wrap" aria-label={`Baca ${article.title}`}>
        <SafeImage src={article.image} alt={article.imageAlt} fill sizes={featured ? "(max-width: 850px) 100vw, 55vw" : "(max-width: 680px) 100vw, 33vw"} className="article-image" />
        <span className="card-arrow"><ArrowUpRight size={19} /></span>
      </Link>
      <div className="article-card-body">
        <div className="article-meta"><span>{article.category}</span><span aria-hidden="true">·</span><time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</time></div>
        <h3><Link href={`/news/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <span className="read-time">{article.readTime}</span>
      </div>
    </article>
  );
}
