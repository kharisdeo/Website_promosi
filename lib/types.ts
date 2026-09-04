export type ProductStatus = "draft" | "published" | "archived";
export type ArticleStatus = "draft" | "published" | "archived";
export type LeadType = "contact" | "product" | "partnership";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "spam";
export type VacancyStatus = "draft" | "active" | "closed";

export interface ProductSpecification {
  label: string;
  value: string;
  unit?: string;
}

/** Optional image frames for the six sides of the interactive product viewer. */
export interface ProductViewerFrames {
  front?: string;
  back?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  /** Public catalog categories used by the distributor storefront. */
  animalType: "Ayam Bangkok" | "Ikan koi" | "Ayam pedaging" | "Ayam petelur" | "Sapi" | "Kambing";
  feedStage: "Starter" | "Grower" | "Finisher" | "Layer" | "Harian" | "Breeder" | "Katalog";
  packageSizes: string[];
  benefits: string[];
  specifications: ProductSpecification[];
  image: string;
  imageAlt: string;
  viewerFrames?: ProductViewerFrames;
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
  status?: "draft" | "published" | "archived";
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

export interface Vacancy {
  id: string;
  position: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  closingAt?: string;
  status: VacancyStatus;
  applyUrl?: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  message: string;
  topic?: string;
  productSlug?: string;
  sourcePage?: string;
  utm?: Record<string, string>;
  privacyConsentAt: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}
