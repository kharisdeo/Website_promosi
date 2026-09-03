import { ApiError, errorResponse, getRequestId, jsonResponse, methodNotAllowed, readJson } from "@/lib/server/api";
import {
  createAdminRecord,
  deleteAdminRecord,
  listAdminRecords,
  type AdminRecord,
  type AdminResource,
  updateAdminRecord,
} from "@/lib/server/repository";
import { requireAdmin } from "@/lib/server/security";
import {
  validateArticleAdmin,
  validateProductAdmin,
  validateTestimonialAdmin,
  validateVacancyAdmin,
} from "@/lib/server/validation";
import type { Article, Lead, Product, Testimonial, Vacancy } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resources = ["products", "articles", "testimonials", "vacancies", "leads"] as const;
function isResource(value: string): value is AdminResource {
  return resources.includes(value as AdminResource);
}

function errorIfNotFound<T extends AdminRecord>(records: T[], id: string) {
  const item = records.find((record) => record.id === id);
  if (!item) throw new ApiError(404, "not_found", "Konten tidak ditemukan.");
  return item;
}

function validateContent(resource: Exclude<AdminResource, "leads">, body: Record<string, unknown>, existing?: Product | Article | Testimonial | Vacancy) {
  switch (resource) {
    case "products":
      return validateProductAdmin(body, existing as Product | undefined);
    case "articles":
      return validateArticleAdmin(body, existing as Article | undefined);
    case "testimonials":
      return validateTestimonialAdmin(body, existing as Testimonial | undefined);
    case "vacancies":
      return validateVacancyAdmin(body, existing as Vacancy | undefined);
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  const requestId = getRequestId(request);
  try {
    const { resource: resourceParam } = await params;
    if (!isResource(resourceParam)) throw new ApiError(404, "not_found", "Resource admin tidak ditemukan.");
    requireAdmin(request, resourceParam === "leads" ? "super_admin" : "editor");
    const records = await listAdminRecords(resourceParam);
    return jsonResponse({ data: records, meta: { total: records.length }, requestId }, requestId);
  } catch (error) {
    return errorResponse(error, requestId);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  const requestId = getRequestId(request);
  try {
    const { resource: resourceParam } = await params;
    if (!isResource(resourceParam)) throw new ApiError(404, "not_found", "Resource admin tidak ditemukan.");
    requireAdmin(request, resourceParam === "leads" ? "super_admin" : "editor");
    if (resourceParam === "leads") {
      throw new ApiError(405, "method_not_allowed", "Lead dibuat melalui endpoint publik.", { Allow: "GET,PATCH,DELETE" });
    }
    const body = await readJson(request);
    const record = validateContent(resourceParam, body);
    const records = await listAdminRecords(resourceParam);
    if ((resourceParam === "products" || resourceParam === "articles") && records.some((item) => "slug" in item && item.slug === (record as Product | Article).slug)) {
      throw new ApiError(409, "duplicate_slug", "Slug sudah digunakan.");
    }
    const created = await createAdminRecord(resourceParam, record as AdminRecord);
    return jsonResponse({ data: created, requestId }, requestId, 201);
  } catch (error) {
    return errorResponse(error, requestId);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  return update(request, params);
}

export async function PUT(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  return update(request, params);
}

async function update(request: Request, params: Promise<{ resource: string }>) {
  const requestId = getRequestId(request);
  try {
    const { resource: resourceParam } = await params;
    if (!isResource(resourceParam)) throw new ApiError(404, "not_found", "Resource admin tidak ditemukan.");
    requireAdmin(request, resourceParam === "leads" ? "super_admin" : "editor");
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id || !/^[a-zA-Z0-9_-]{2,120}$/.test(id)) throw new ApiError(400, "invalid_id", "Parameter id wajib diisi.");
    const body = await readJson(request);
    const records = await listAdminRecords(resourceParam);
    const existing = errorIfNotFound(records, id);

    let updated: AdminRecord;
    if (resourceParam === "leads") {
      const allowed = Object.keys(body);
      if (allowed.some((key) => key !== "status")) throw new ApiError(400, "invalid_fields", "Lead hanya dapat diubah statusnya.");
      const status = body.status;
      if (!["new", "contacted", "qualified", "closed", "spam"].includes(String(status))) {
        throw new ApiError(422, "validation_error", "Status lead tidak valid.");
      }
      updated = { ...existing, status } as Lead;
    } else {
      updated = validateContent(resourceParam, body, existing as Product | Article | Testimonial | Vacancy) as AdminRecord;
    }
    const result = await updateAdminRecord(resourceParam, id, updated as unknown as Record<string, unknown>);
    return jsonResponse({ data: result, requestId }, requestId);
  } catch (error) {
    return errorResponse(error, requestId);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  const requestId = getRequestId(request);
  try {
    const { resource: resourceParam } = await params;
    if (!isResource(resourceParam)) throw new ApiError(404, "not_found", "Resource admin tidak ditemukan.");
    requireAdmin(request, resourceParam === "leads" ? "super_admin" : "editor");
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id || !/^[a-zA-Z0-9_-]{2,120}$/.test(id)) throw new ApiError(400, "invalid_id", "Parameter id wajib diisi.");
    await deleteAdminRecord(resourceParam, id);
    return jsonResponse({ data: { deleted: true, id }, requestId }, requestId);
  } catch (error) {
    return errorResponse(error, requestId);
  }
}

export async function OPTIONS(request: Request) {
  return methodNotAllowed(getRequestId(request), "GET,POST,PATCH,PUT,DELETE");
}
