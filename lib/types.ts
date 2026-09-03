export type ProductStatus = "draft" | "published" | "archived";
export type ArticleStatus = "draft" | "published" | "archived";
export type LeadType = "contact" | "product" | "partnership";

export interface ProductSpecification {
  label: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  animalType: "Ayam pedaging" | "Ayam petelur" | "Sapi" | "Kambing";
  feedStage: "Starter" | "Grower" | "Finisher" | "Layer";
  packageSizes: string[];
  benefits: string[];
  specifications: ProductSpecification[];
  image: string;
  imageAlt: string;
  accent: "lime" | "amber" | "sky" | "orange";
  brochure?: { href: string; label: string; size: string };
  status: ProductStatus;
  updatedAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  author: string;
  content: string[];
  status: ArticleStatus;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  businessType: string;
  quote: string;
  metricLabel: string;
  metricValue: string;
  image: string;
  imageAlt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  detail: string;
  year: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}
