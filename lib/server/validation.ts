import { randomUUID } from "node:crypto";

import { ApiError } from "@/lib/server/api";
import type { Article, Product, ProductSpecification, Testimonial, Vacancy } from "@/lib/types";

const animals = ["Ayam pedaging", "Ayam petelur", "Sapi", "Kambing"] as const;
const stages = ["Starter", "Grower", "Finisher", "Layer"] as const;
const accents = ["lime", "amber", "sky", "orange"] as const;
const statuses = ["draft", "published", "archived"] as const;

type AnyObject = Record<string, unknown>;

function object(value: unknown, field: string): AnyObject {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ApiError(422, "validation_error", `${field} harus berupa object.`);
  }
  return value as AnyObject;
}

function text(value: unknown, field: string, options: { min?: number; max: number; optional?: false }): string;
function text(value: unknown, field: string, options: { min?: number; max: number; optional: true }): string | undefined;
function text(value: unknown, field: string, options: { min?: number; max: number; optional?: boolean }): string | undefined {
  if (value === undefined && options.optional) return undefined;
  if (typeof value !== "string") throw new ApiError(422, "validation_error", `${field} harus berupa teks.`);
  const clean = value.trim();
  if (clean.length < (options.min || 1) || clean.length > options.max || clean.includes("\u0000")) {
    throw new ApiError(422, "validation_error", `${field} tidak valid.`);
  }
  return clean;
}

function slug(value: unknown, field = "slug") {
  const clean = text(value, field, { min: 2, max: 120 });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(clean)) {
    throw new ApiError(422, "validation_error", `${field} hanya boleh berisi huruf kecil, angka, dan tanda hubung.`);
  }
  return clean;
}

function list(value: unknown, field: string, maxItems: number, maxItemLength: number) {
  if (!Array.isArray(value) || value.length > maxItems) {
    throw new ApiError(422, "validation_error", `${field} harus berupa daftar yang valid.`);
  }
  return value.map((item, index) => text(item, `${field}[${index}]`, { max: maxItemLength }));
}

function enumValue<T extends readonly string[]>(value: unknown, field: string, values: T): T[number] {
  if (typeof value !== "string" || !values.includes(value)) {
    throw new ApiError(422, "validation_error", `${field} memiliki nilai yang tidak didukung.`);
  }
  return value as T[number];
}

function validHttpOrPath(value: unknown, field: string, optional = false) {
  const clean = optional
    ? text(value, field, { max: 1000, optional: true })
    : text(value, field, { max: 1000 });
  if (!clean) return undefined;
  if (clean.startsWith("/")) return clean;
  try {
    const parsed = new URL(clean);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error();
    return clean;
  } catch {
    throw new ApiError(422, "validation_error", `${field} harus berupa URL yang valid.`);
  }
}

export interface LeadPayload {
  name: string;
  phone: string;
  message: string;
  type: "contact" | "product" | "partnership";
  topic?: string;
  productSlug?: string;
  sourcePage?: string;
  utm?: Record<string, string>;
  privacyConsentAt: string;
}

export function validateLeadPayload(body: AnyObject, forcedType?: LeadPayload["type"]): LeadPayload {
  const type = forcedType || enumValue(body.type || "contact", "type", ["contact", "product", "partnership"] as const);
  const phone = text(body.phone, "phone", { min: 8, max: 24 });
  const normalizedPhone = phone.replace(/[\s()-]/g, "");
  if (!/^(?:\+62|62|0)8\d{7,13}$/.test(normalizedPhone)) {
    throw new ApiError(422, "validation_error", "Nomor HP/WhatsApp tidak valid.");
  }
  const consent = body.consent === true || body.privacyConsent === true;
  if (!consent) throw new ApiError(422, "privacy_consent_required", "Persetujuan privasi wajib diberikan.");

  let utm: Record<string, string> | undefined;
  if (body.utm !== undefined) {
    const raw = object(body.utm, "utm");
    const entries = Object.entries(raw).slice(0, 8);
    utm = Object.fromEntries(entries.map(([key, value]) => [
      key.slice(0, 40),
      text(value, `utm.${key}`, { max: 200 }) || "",
    ]));
  }
  return {
    type,
    name: text(body.name, "name", { min: 2, max: 80 })!,
    phone: normalizedPhone,
    message: text(body.message, "message", { min: 2, max: 2000 })!,
    topic: text(body.topic, "topic", { max: 120, optional: true }),
    productSlug: body.productSlug === undefined ? undefined : slug(body.productSlug, "productSlug"),
    sourcePage: validHttpOrPath(body.sourcePage, "sourcePage", true),
    utm,
    privacyConsentAt: new Date().toISOString(),
  };
}

function specifications(value: unknown): ProductSpecification[] {
  if (!Array.isArray(value) || value.length > 30) throw new ApiError(422, "validation_error", "specifications tidak valid.");
  return value.map((item, index) => {
    const row = object(item, `specifications[${index}]`);
    return {
      label: text(row.label, `specifications[${index}].label`, { max: 80 })!,
      value: text(row.value, `specifications[${index}].value`, { max: 80 })!,
      unit: text(row.unit, `specifications[${index}].unit`, { max: 20, optional: true }),
    };
  });
}

export function validateProductAdmin(body: AnyObject, existing?: Product): Product {
  const data = { ...(existing || {}), ...body } as AnyObject;
  return {
    id: existing?.id || `p-${randomUUID()}`,
    slug: slug(data.slug || data.name),
    name: text(data.name, "name", { min: 2, max: 120 })!,
    tagline: text(data.tagline, "tagline", { min: 2, max: 180 })!,
    shortDescription: text(data.shortDescription, "shortDescription", { min: 2, max: 500 })!,
    description: text(data.description, "description", { min: 2, max: 5000 })!,
    animalType: enumValue(data.animalType, "animalType", animals),
    feedStage: enumValue(data.feedStage, "feedStage", stages),
    packageSizes: list(data.packageSizes, "packageSizes", 20, 50),
    benefits: list(data.benefits, "benefits", 20, 240),
    specifications: specifications(data.specifications),
    image: validHttpOrPath(data.image, "image")!,
    imageAlt: text(data.imageAlt, "imageAlt", { min: 2, max: 180 })!,
    accent: enumValue(data.accent, "accent", accents),
    brochure: data.brochure === undefined ? undefined : (() => {
      const brochure = object(data.brochure, "brochure");
      return {
        href: validHttpOrPath(brochure.href, "brochure.href")!,
        label: text(brochure.label, "brochure.label", { max: 100 })!,
        size: text(brochure.size, "brochure.size", { max: 40 })!,
      };
    })(),
    status: enumValue(data.status || "draft", "status", statuses),
    updatedAt: new Date().toISOString(),
  };
}

export function validateArticleAdmin(body: AnyObject, existing?: Article): Article {
  const data = { ...(existing || {}), ...body } as AnyObject;
  const content = list(data.content, "content", 100, 10000);
  const publishedAt = text(data.publishedAt, "publishedAt", { max: 40 })!;
  if (Number.isNaN(Date.parse(publishedAt))) throw new ApiError(422, "validation_error", "publishedAt tidak valid.");
  return {
    id: existing?.id || `a-${randomUUID()}`,
    slug: slug(data.slug || data.title),
    title: text(data.title, "title", { min: 2, max: 180 })!,
    excerpt: text(data.excerpt, "excerpt", { min: 2, max: 500 })!,
    category: text(data.category, "category", { min: 2, max: 100 })!,
    publishedAt,
    readTime: text(data.readTime, "readTime", { max: 50 })!,
    image: validHttpOrPath(data.image, "image")!,
    imageAlt: text(data.imageAlt, "imageAlt", { min: 2, max: 180 })!,
    author: text(data.author, "author", { min: 2, max: 100 })!,
    content,
    status: enumValue(data.status || "draft", "status", statuses),
  };
}

export function validateTestimonialAdmin(body: AnyObject, existing?: Testimonial): Testimonial {
  const data = { ...(existing || {}), ...body } as AnyObject;
  return {
    id: existing?.id || `t-${randomUUID()}`,
    name: text(data.name, "name", { min: 2, max: 100 })!,
    location: text(data.location, "location", { min: 2, max: 120 })!,
    businessType: text(data.businessType, "businessType", { min: 2, max: 120 })!,
    quote: text(data.quote, "quote", { min: 2, max: 1500 })!,
    metricLabel: text(data.metricLabel, "metricLabel", { max: 100 })!,
    metricValue: text(data.metricValue, "metricValue", { max: 100 })!,
    image: validHttpOrPath(data.image, "image")!,
    imageAlt: text(data.imageAlt, "imageAlt", { min: 2, max: 180 })!,
    status: enumValue(data.status || "draft", "status", statuses),
  };
}

export function validateVacancyAdmin(body: AnyObject, existing?: Vacancy): Vacancy {
  const data = { ...(existing || {}), ...body } as AnyObject;
  const closingAt = text(data.closingAt, "closingAt", { max: 40, optional: true });
  if (closingAt && Number.isNaN(Date.parse(closingAt))) throw new ApiError(422, "validation_error", "closingAt tidak valid.");
  return {
    id: existing?.id || `v-${randomUUID()}`,
    position: text(data.position, "position", { min: 2, max: 150 })!,
    location: text(data.location, "location", { min: 2, max: 120 })!,
    employmentType: text(data.employmentType, "employmentType", { min: 2, max: 80 })!,
    description: text(data.description, "description", { min: 2, max: 5000 })!,
    requirements: list(data.requirements, "requirements", 50, 500),
    closingAt,
    status: enumValue(data.status || "draft", "status", ["draft", "active", "closed"] as const),
    applyUrl: validHttpOrPath(data.applyUrl, "applyUrl", true),
    updatedAt: new Date().toISOString(),
  };
}
