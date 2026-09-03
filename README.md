# STS Feed — Website Promosi Pakan Ternak

Website company profile dan katalog produk mobile-first untuk CV Sumber Ternak Sejahtera. Proyek ini menggunakan Next.js App Router, TypeScript, dan CSS design system ringan yang siap disambungkan ke CMS/API.

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
- `lib/data.ts` — data seed sementara; ganti dengan data access layer API/CMS pada tahap integrasi.

Nomor WhatsApp, alamat, dan identitas perusahaan saat ini adalah seed content untuk prototipe. Validasi dengan pemilik bisnis sebelum produksi.
