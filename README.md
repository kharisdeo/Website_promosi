# Anugerah Jaya Abadi — Website Promosi Pakan

Website company profile dan katalog produk mobile-first untuk Anugerah Jaya Abadi sebagai distributor pakan ayam Bangkok dan koi. Proyek ini menggunakan Next.js App Router, TypeScript, dan CSS design system ringan yang siap disambungkan ke CMS/API.

## Menjalankan secara lokal

Prasyarat: Node.js 20+ dan pnpm 10+.

```bash
pnpm install
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Verifikasi

```bash
pnpm typecheck
pnpm build
```

## Struktur singkat

- `app/` — route publik App Router, metadata, sitemap, dan robots.
- `components/` — komponen UI yang dapat digunakan ulang.
- `lib/types.ts` — model domain yang siap dipetakan ke CMS/backend.
- `lib/data.ts` — seed content yang juga menjadi sumber bootstrap repository.
- `lib/server/repository.ts` — abstraction repository server-side dengan penyimpanan JSON lokal atomik (`.data/content.json`); dapat diganti dengan adapter database/CMS tanpa mengubah route handler.
- `lib/server/validation.ts` dan `lib/server/security.ts` — validasi payload, rate limit in-memory, honeypot, CAPTCHA hook, dan autentikasi admin.
- `app/api/` — API publik dan API admin.

Nomor WhatsApp, alamat, dan identitas perusahaan saat ini adalah seed content untuk prototipe. Validasi dengan pemilik bisnis sebelum produksi.

## API dan CMS lokal

Salin `.env.example` menjadi `.env.local` dan isi `ADMIN_API_TOKEN` sebelum memakai endpoint admin. Data pertama kali dijalankan akan menyalin seed content ke `.data/content.json`. File tersebut diabaikan Git dan cocok untuk demo single-instance; untuk produksi, ganti implementation repository dengan database/CMS terkelola dan gunakan storage bersama.

Endpoint publik:

- `GET /api/health` — status service dan mode persistence.
- `GET /api/products?animalType=&feedStage=&page=1&limit=50` — hanya produk `published`.
- `GET /api/products/:slug` — detail produk published.
- `GET /api/articles?category=&page=1&limit=10` — hanya artikel `published`, terbaru lebih dahulu.
- `GET /api/articles/:slug` — detail artikel published.
- `POST /api/leads` — body minimal `{ "name", "phone", "message", "consent": true }`; `type` dapat `contact`, `product`, atau `partnership`, dengan `productSlug`, `sourcePage`, dan `utm` opsional.
- `POST /api/partnerships` — body sama, `type` dipaksa menjadi `partnership`.

Endpoint admin menggunakan `Authorization: Bearer <ADMIN_API_TOKEN>` (atau `x-admin-token`) dan opsional `x-admin-role` yang harus sama dengan `ADMIN_API_ROLE`. Resource yang tersedia adalah `products`, `articles`, `testimonials`, `vacancies`, dan `leads`, misalnya `GET /api/admin/products`, `POST /api/admin/articles`, atau `PATCH /api/admin/leads?id=lead-id` (lead hanya boleh mengubah status). Editor dapat mengelola konten; hanya super admin yang dapat melihat/mengubah/menghapus lead. CRUD admin mengembalikan `requestId` dan tidak mencatat PII ke log.

Form publik memiliki rate limit in-memory, field honeypot `website`, dan CAPTCHA adapter opsional. Set `CAPTCHA_REQUIRED=true`, `CAPTCHA_VERIFY_URL`, dan `CAPTCHA_SECRET` jika provider CAPTCHA sudah tersedia. Rate limit sengaja single-instance dan perlu dipindahkan ke store terdistribusi saat deployment multi-instance.
