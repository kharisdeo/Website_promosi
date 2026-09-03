import type { MetadataRoute } from "next";
import { getPublishedArticles, getPublishedProducts } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/products", "/news", "/partnership", "/careers", "/contact", "/privacy"].map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date("2026-08-25"), changeFrequency: "weekly" as const, priority: route === "" ? 1 : .7 }));
  return [...staticRoutes, ...getPublishedProducts().map((product) => ({ url: `${siteUrl}/products/${product.slug}`, lastModified: new Date(product.updatedAt), changeFrequency: "monthly" as const, priority: .8 })), ...getPublishedArticles().map((article) => ({ url: `${siteUrl}/news/${article.slug}`, lastModified: new Date(article.publishedAt), changeFrequency: "monthly" as const, priority: .6 }))];
}
