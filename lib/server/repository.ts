import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  articles as seedArticles,
  certifications as seedCertifications,
  products as seedProducts,
  testimonials as seedTestimonials,
} from "@/lib/data";
import type {
  Article,
  Certification,
  Lead,
  Product,
  Testimonial,
  Vacancy,
} from "@/lib/types";

export type AdminResource = "products" | "articles" | "testimonials" | "vacancies" | "leads";
export type AdminRecord = Product | Article | Testimonial | Vacancy | Lead;

export interface ContentSnapshot {
  products: Product[];
  articles: Article[];
  testimonials: Testimonial[];
  certifications: Certification[];
  vacancies: Vacancy[];
  leads: Lead[];
}

export class RepositoryError extends Error {
  readonly code = "repository_error";

  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "RepositoryError";
  }
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const seedSnapshot = (): ContentSnapshot => ({
  products: clone(seedProducts),
  articles: clone(seedArticles),
  testimonials: clone(seedTestimonials),
  certifications: clone(seedCertifications),
  vacancies: [],
  leads: [],
});

const storageFile = path.resolve(
  process.env.CONTENT_STORE_PATH || path.join(process.cwd(), ".data", "content.json"),
);

let loadedSnapshot: ContentSnapshot | undefined;
let persistenceMode: "file" | "memory-fallback" = "file";
let mutationQueue: Promise<void> = Promise.resolve();

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function arrayOrSeed<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : clone(fallback);
}

function parseSnapshot(value: unknown): ContentSnapshot {
  if (!isObject(value)) throw new RepositoryError("Penyimpanan konten tidak valid.");
  const seed = seedSnapshot();
  return {
    products: arrayOrSeed(value.products, seed.products),
    articles: arrayOrSeed(value.articles, seed.articles),
    testimonials: arrayOrSeed(value.testimonials, seed.testimonials),
    certifications: arrayOrSeed(value.certifications, seed.certifications),
    vacancies: arrayOrSeed(value.vacancies, seed.vacancies),
    leads: arrayOrSeed(value.leads, seed.leads),
  };
}

async function persist(snapshot: ContentSnapshot): Promise<void> {
  const directory = path.dirname(storageFile);
  const temporaryFile = `${storageFile}.${process.pid}.tmp`;
  await mkdir(directory, { recursive: true });
  await writeFile(temporaryFile, JSON.stringify(snapshot, null, 2), "utf8");
  await rename(temporaryFile, storageFile);
}

async function readSnapshot(): Promise<ContentSnapshot> {
  if (loadedSnapshot) return loadedSnapshot;

  try {
    const raw = await readFile(storageFile, "utf8");
    loadedSnapshot = parseSnapshot(JSON.parse(raw));
  } catch (error) {
    const isMissing = isObject(error) && "code" in error && error.code === "ENOENT";
    if (!isMissing) {
      throw error instanceof RepositoryError
        ? error
        : new RepositoryError("Penyimpanan konten tidak dapat dibaca.", error);
    }

    loadedSnapshot = seedSnapshot();
    try {
      await persist(loadedSnapshot);
    } catch {
      // Read-only hosts can still serve seed data. Health reports this state so
      // an operator knows that mutations are not durable on this instance.
      persistenceMode = "memory-fallback";
    }
  }

  return loadedSnapshot;
}

async function mutate(mutator: (snapshot: ContentSnapshot) => ContentSnapshot | Promise<ContentSnapshot>) {
  const operation = mutationQueue.then(async () => {
    const current = clone(await readSnapshot());
    const next = await mutator(current);
    if (persistenceMode === "file") {
      try {
        await persist(next);
      } catch {
        persistenceMode = "memory-fallback";
      }
    }
    loadedSnapshot = next;
    return clone(next);
  });
  mutationQueue = operation.then(() => undefined, () => undefined);
  return operation;
}

export function getPersistenceMode() {
  return persistenceMode;
}

export async function listPublicProducts(filters?: { animalType?: string; feedStage?: string }) {
  const snapshot = await readSnapshot();
  return clone(
    snapshot.products.filter(
      (product) =>
        product.status === "published" &&
        (!filters?.animalType || product.animalType === filters.animalType) &&
        (!filters?.feedStage || product.feedStage === filters.feedStage),
    ),
  );
}

export async function getPublicProductBySlug(slug: string) {
  const products = await listPublicProducts();
  return products.find((product) => product.slug === slug);
}

export async function listPublicArticles(filters?: { category?: string }) {
  const snapshot = await readSnapshot();
  return clone(
    snapshot.articles
      .filter(
        (article) =>
          article.status === "published" &&
          (!filters?.category || article.category === filters.category),
      )
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  );
}

export async function getPublicArticleBySlug(slug: string) {
  const articles = await listPublicArticles();
  return articles.find((article) => article.slug === slug);
}

export async function createLead(input: Omit<Lead, "id" | "createdAt" | "updatedAt" | "status">) {
  const now = new Date().toISOString();
  const lead: Lead = { ...input, id: `lead-${randomUUID()}`, status: "new", createdAt: now, updatedAt: now };
  await mutate((snapshot) => ({ ...snapshot, leads: [...snapshot.leads, lead] }));
  return clone(lead);
}

function getRecords(snapshot: ContentSnapshot, resource: AdminResource): AdminRecord[] {
  switch (resource) {
    case "products":
      return snapshot.products;
    case "articles":
      return snapshot.articles;
    case "testimonials":
      return snapshot.testimonials;
    case "vacancies":
      return snapshot.vacancies;
    case "leads":
      return snapshot.leads;
  }
}

function setRecords(snapshot: ContentSnapshot, resource: AdminResource, records: AdminRecord[]) {
  switch (resource) {
    case "products":
      snapshot.products = records as Product[];
      break;
    case "articles":
      snapshot.articles = records as Article[];
      break;
    case "testimonials":
      snapshot.testimonials = records as Testimonial[];
      break;
    case "vacancies":
      snapshot.vacancies = records as Vacancy[];
      break;
    case "leads":
      snapshot.leads = records as Lead[];
      break;
  }
}

export async function listAdminRecords(resource: AdminResource) {
  const snapshot = await readSnapshot();
  return clone(getRecords(snapshot, resource));
}

export async function createAdminRecord(resource: AdminResource, record: AdminRecord) {
  await mutate((snapshot) => {
    const records = getRecords(snapshot, resource);
    if (records.some((item) => item.id === record.id)) {
      throw new RepositoryError("ID konten sudah digunakan.");
    }
    setRecords(snapshot, resource, [...records, clone(record)]);
    return snapshot;
  });
  return clone(record);
}

export async function updateAdminRecord(
  resource: AdminResource,
  id: string,
  changes: Record<string, unknown>,
) {
  let updated: AdminRecord | undefined;
  await mutate((snapshot) => {
    const records = getRecords(snapshot, resource);
    const index = records.findIndex((item) => item.id === id);
    if (index < 0) throw new RepositoryError("Konten tidak ditemukan.");
    updated = { ...records[index], ...changes, id } as AdminRecord;
    const nextRecords = [...records];
    nextRecords[index] = updated;
    setRecords(snapshot, resource, nextRecords);
    return snapshot;
  });
  return clone(updated);
}

export async function deleteAdminRecord(resource: AdminResource, id: string) {
  let deleted = false;
  await mutate((snapshot) => {
    const records = getRecords(snapshot, resource);
    const nextRecords = records.filter((item) => item.id !== id);
    deleted = nextRecords.length !== records.length;
    if (!deleted) throw new RepositoryError("Konten tidak ditemukan.");
    setRecords(snapshot, resource, nextRecords);
    return snapshot;
  });
  return deleted;
}
