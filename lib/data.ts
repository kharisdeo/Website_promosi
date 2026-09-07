import type {
  Article,
  Certification,
  Milestone,
  Product,
  Testimonial,
} from "@/lib/types";

const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const catalogImage = "/images/products/hi-pro-vite-catalog.png";
const koiCatalogImage = "/images/products/koi-feed-catalog.png";

export const siteSettings = {
  companyName: "CV. ANUGERAH JAYA ABADI",
  shortName: "ANUGERAH JAYA ABADI",
  tagline: "Pilihan pakan ternak, stok lebih pasti.",
  whatsappNumber: "6281234567890",
  whatsappDisplay: "+62 812-3456-7890",
  email: "halo@anugerahjayaabadi.id",
  phone: "(0274) 555-0198",
  address: "Jl. Pattimura, Kel. Pasir Kidul RT 04 RW 06, Kec. Purwokerto Barat, Kab. Banyumas",
  operatingHours: "Senin–Jumat, 08.00–17.00 WIB",
  instagram: "https://instagram.com/anugerahjayaabadi",
  facebook: "https://facebook.com/anugerahjayaabadi",
  mapUrl:
    "https://maps.google.com/?q=Kulon+Progo+Yogyakarta",
};

const legacyProducts: Product[] = [
  {
    id: "p-001",
    slug: "sts-broiler-starter-10",
    name: "STS Broiler Starter 10",
    tagline: "Awal tumbuh yang kuat untuk broiler.",
    shortDescription:
      "Pakan starter lengkap untuk mendukung pertumbuhan awal ayam pedaging yang seragam dan sehat.",
    description:
      "STS Broiler Starter 10 dirancang untuk fase awal broiler dengan kombinasi protein, energi, vitamin, dan mineral yang seimbang. Tekstur crumble membantu konsumsi pakan lebih merata, sementara bahan baku teruji mendukung performa kandang yang konsisten.",
    animalType: "Ayam pedaging",
    feedStage: "Starter",
    packageSizes: ["50 kg"],
    benefits: [
      "Mendukung pembentukan tulang dan otot sejak awal",
      "Membantu keseragaman bobot dan konsumsi pakan",
      "Dipilih dari merek tepercaya melalui jaringan distributor",
    ],
    specifications: [
      { label: "Protein kasar", value: "min. 21", unit: "%" },
      { label: "Lemak kasar", value: "min. 4", unit: "%" },
      { label: "Serat kasar", value: "maks. 5", unit: "%" },
      { label: "Kadar air", value: "maks. 13", unit: "%" },
      { label: "Bentuk", value: "Crumble" },
    ],
    image: unsplash("photo-1548550023-2bdb3c5beed7"),
    imageAlt: "Ayam broiler sehat di dalam kandang",
    accent: "lime",
    brochure: { href: "/brochures/sts-broiler-starter-10.pdf", label: "Brosur produk", size: "PDF · 1,2 MB" },
    status: "published",
    updatedAt: "2026-08-20",
  },
  {
    id: "p-002",
    slug: "sts-broiler-finisher-20",
    name: "STS Broiler Finisher 20",
    tagline: "Efisien di fase akhir, maksimal di panen.",
    shortDescription:
      "Formula finisher yang membantu menjaga performa dan efisiensi broiler hingga masa panen.",
    description:
      "STS Broiler Finisher 20 menjadi pilihan untuk fase akhir pemeliharaan ayam pedaging. Formulanya menyeimbangkan kebutuhan energi dan protein agar ayam tetap aktif, bobot tumbuh optimal, dan penggunaan pakan lebih terukur.",
    animalType: "Ayam pedaging",
    feedStage: "Finisher",
    packageSizes: ["50 kg"],
    benefits: [
      "Energi terukur untuk mendukung bobot panen",
      "Membantu menjaga efisiensi pakan",
      "Cocok untuk manajemen kandang intensif",
    ],
    specifications: [
      { label: "Protein kasar", value: "min. 19", unit: "%" },
      { label: "Lemak kasar", value: "min. 4", unit: "%" },
      { label: "Serat kasar", value: "maks. 6", unit: "%" },
      { label: "Kadar air", value: "maks. 13", unit: "%" },
      { label: "Bentuk", value: "Pellet" },
    ],
    image: unsplash("photo-1569288063643-5d29ad64dfb3"),
    imageAlt: "Kawanan ayam pedaging di peternakan",
    accent: "amber",
    brochure: { href: "/brochures/sts-broiler-finisher-20.pdf", label: "Brosur produk", size: "PDF · 1,1 MB" },
    status: "published",
    updatedAt: "2026-08-20",
  },
  {
    id: "p-003",
    slug: "sts-layer-grower-30",
    name: "STS Layer Grower 30",
    tagline: "Tumbuh siap berproduksi.",
    shortDescription:
      "Nutrisi seimbang untuk mempersiapkan ayam petelur menuju fase produksi yang stabil.",
    description:
      "STS Layer Grower 30 diformulasikan untuk ayam petelur fase grower. Kandungan nutrisi dan mineralnya membantu membangun kerangka tubuh yang kuat sehingga ayam lebih siap memasuki masa produksi.",
    animalType: "Ayam petelur",
    feedStage: "Grower",
    packageSizes: ["50 kg"],
    benefits: [
      "Mendukung perkembangan kerangka tubuh",
      "Menjaga kondisi tubuh tetap seragam",
      "Palatabilitas baik untuk konsumsi stabil",
    ],
    specifications: [
      { label: "Protein kasar", value: "min. 16", unit: "%" },
      { label: "Kalsium", value: "0,9–1,1", unit: "%" },
      { label: "Fosfor", value: "min. 0,5", unit: "%" },
      { label: "Serat kasar", value: "maks. 7", unit: "%" },
      { label: "Bentuk", value: "Pellet" },
    ],
    image: unsplash("photo-1517849845537-4d257902454a"),
    imageAlt: "Ayam petelur di area peternakan",
    accent: "sky",
    brochure: { href: "/brochures/sts-layer-grower-30.pdf", label: "Brosur produk", size: "PDF · 980 KB" },
    status: "published",
    updatedAt: "2026-08-18",
  },
  {
    id: "p-004",
    slug: "sts-sapi-pro-grower",
    name: "STS Sapi Pro Grower",
    tagline: "Pakan bernutrisi untuk pertambahan bobot yang konsisten.",
    shortDescription:
      "Pakan komplit untuk membantu pertumbuhan sapi potong pada fase pembesaran.",
    description:
      "STS Sapi Pro Grower membantu peternak menyederhanakan manajemen pakan sapi potong. Formula komplitnya dilengkapi sumber serat dan nutrisi yang mendukung performa harian saat fase pembesaran.",
    animalType: "Sapi",
    feedStage: "Grower",
    packageSizes: ["40 kg"],
    benefits: [
      "Membantu mendukung pertambahan bobot harian",
      "Praktis untuk manajemen pakan harian",
      "Bahan baku dipilih dan diuji secara berkala",
    ],
    specifications: [
      { label: "Protein kasar", value: "min. 14", unit: "%" },
      { label: "Serat kasar", value: "maks. 18", unit: "%" },
      { label: "Lemak kasar", value: "min. 3", unit: "%" },
      { label: "Kadar air", value: "maks. 13", unit: "%" },
      { label: "Bentuk", value: "Pellet" },
    ],
    image: unsplash("photo-1545468258-7e67d43a7b2e"),
    imageAlt: "Sapi potong sehat di padang rumput",
    accent: "orange",
    brochure: { href: "/brochures/sts-sapi-pro-grower.pdf", label: "Brosur produk", size: "PDF · 1,0 MB" },
    status: "published",
    updatedAt: "2026-08-12",
  },
];

/**
 * Seed catalog for Anugerah Jaya Abadi. Product imagery is kept local using
 * the supplied package references and generated studio renders, so the
 * storefront remains usable in offline previews without third-party CDNs.
 */
export const products: Product[] = [
  {
    id: "p-101",
    slug: "hi-pro-vite-a591k",
    name: "HI-PRO-VITE A591K",
    tagline: "Pakan starter ayam Bangkok.",
    shortDescription: "Pakan starter untuk ayam Bangkok usia 0–2 bulan.",
    description: "A591K tercantum sebagai pilihan starter ayam Bangkok usia 0–2 bulan. Ketersediaan, kemasan, dan kecocokan program pakan dapat berubah; silakan konfirmasi kepada tim Jaya Abadi sebelum memesan.",
    animalType: "Ayam Bangkok",
    feedStage: "Starter",
    packageSizes: ["Sesuai stok"],
    benefits: ["Fase starter 0–2 bulan", "Katalog distributor Jaya Abadi", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ternak", value: "Ayam Bangkok" },
      { label: "Fase", value: "Starter 0–2 bulan" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/hi-pro-vite-a591k-3d.png",
    imageAlt: "Kemasan HI-PRO-VITE A591K",
    viewerFrames: {
      front: "/images/products/viewer-360/hi-pro-vite-a591k/front-viewer.png",
      back: "/images/products/viewer-360/hi-pro-vite-a591k/back-synthesized.png",
      left: "/images/products/viewer-360/hi-pro-vite-a591k/left.png",
      right: "/images/products/viewer-360/hi-pro-vite-a591k/right.png",
      top: "/images/products/viewer-360/hi-pro-vite-a591k/top.png",
      bottom: "/images/products/viewer-360/hi-pro-vite-a591k/bottom.png",
    },
    accent: "lime",
    status: "published",
    updatedAt: "2026-09-04",
  },
  {
    id: "p-102",
    slug: "hi-pro-vite-a592k",
    name: "HI-PRO-VITE A592K",
    tagline: "Pakan grower ayam Bangkok muda.",
    shortDescription: "Pakan grower untuk ayam Bangkok usia 2–6 bulan.",
    description: "A592K tercantum sebagai pilihan grower ayam Bangkok usia 2–6 bulan. Ketersediaan, kemasan, dan kecocokan program pakan dapat berubah; silakan konfirmasi kepada tim Jaya Abadi sebelum memesan.",
    animalType: "Ayam Bangkok",
    feedStage: "Grower",
    packageSizes: ["Sesuai stok"],
    benefits: ["Fase grower 2–6 bulan", "Katalog distributor Jaya Abadi", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ternak", value: "Ayam Bangkok" },
      { label: "Fase", value: "Grower 2–6 bulan" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/hi-pro-vite-a592k-3d.png",
    imageAlt: "Kemasan HI-PRO-VITE A592K",
    viewerFrames: {
      front: "/images/products/viewer-360/hi-pro-vite-a592k/front-viewer.png",
      back: "/images/products/viewer-360/hi-pro-vite-a592k/back-synthesized.png",
      left: "/images/products/viewer-360/hi-pro-vite-a592k/left.png",
      right: "/images/products/viewer-360/hi-pro-vite-a592k/right.png",
      top: "/images/products/viewer-360/hi-pro-vite-a592k/top.png",
      bottom: "/images/products/viewer-360/hi-pro-vite-a592k/bottom.png",
    },
    accent: "amber",
    status: "published",
    updatedAt: "2026-09-04",
  },
  {
    id: "p-103",
    slug: "hi-pro-vite-a594k",
    name: "HI-PRO-VITE A594K",
    tagline: "Pakan grower ayam Bangkok dewasa.",
    shortDescription: "Pakan grower untuk ayam Bangkok usia 6 bulan ke atas.",
    description: "A594K tercantum sebagai pilihan grower ayam Bangkok usia 6 bulan ke atas. Ketersediaan, kemasan, dan kecocokan program pakan dapat berubah; silakan konfirmasi kepada tim Jaya Abadi sebelum memesan.",
    animalType: "Ayam Bangkok",
    feedStage: "Grower",
    packageSizes: ["Sesuai stok"],
    benefits: ["Fase grower 6+ bulan", "Katalog distributor Jaya Abadi", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ternak", value: "Ayam Bangkok" },
      { label: "Fase", value: "Grower 6+ bulan" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/hi-pro-vite-a594k-3d.png",
    imageAlt: "Kemasan HI-PRO-VITE A594K",
    viewerFrames: {
      front: "/images/products/viewer-360/hi-pro-vite-a594k/front-viewer.png",
      back: "/images/products/viewer-360/hi-pro-vite-a594k/back-synthesized.png",
      left: "/images/products/viewer-360/hi-pro-vite-a594k/left.png",
      right: "/images/products/viewer-360/hi-pro-vite-a594k/right.png",
      top: "/images/products/viewer-360/hi-pro-vite-a594k/top.png",
      bottom: "/images/products/viewer-360/hi-pro-vite-a594k/bottom.png",
    },
    accent: "sky",
    status: "published",
    updatedAt: "2026-09-04",
  },
  {
    id: "p-104",
    slug: "hi-pro-vite-a593k",
    name: "HI-PRO-VITE A593K",
    tagline: "Pakan layer untuk ayam Bangkok betina.",
    shortDescription: "Pakan layer untuk ayam Bangkok betina usia 6 bulan ke atas.",
    description: "A593K tercantum sebagai pilihan layer/betina ayam Bangkok usia 6 bulan ke atas. Ketersediaan, kemasan, dan kecocokan program pakan dapat berubah; silakan konfirmasi kepada tim Jaya Abadi sebelum memesan.",
    animalType: "Ayam Bangkok",
    feedStage: "Layer",
    packageSizes: ["Sesuai stok"],
    benefits: ["Fase layer/betina 6+ bulan", "Katalog distributor Jaya Abadi", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ternak", value: "Ayam Bangkok betina" },
      { label: "Fase", value: "Layer 6+ bulan" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/hi-pro-vite-a593k-3d.png",
    imageAlt: "Kemasan HI-PRO-VITE A593K",
    viewerFrames: {
      front: "/images/products/viewer-360/hi-pro-vite-a593k/front-viewer.png",
      back: "/images/products/viewer-360/hi-pro-vite-a593k/back-synthesized.png",
      left: "/images/products/viewer-360/hi-pro-vite-a593k/left.png",
      right: "/images/products/viewer-360/hi-pro-vite-a593k/right.png",
      top: "/images/products/viewer-360/hi-pro-vite-a593k/top.png",
      bottom: "/images/products/viewer-360/hi-pro-vite-a593k/bottom.png",
    },
    accent: "orange",
    status: "published",
    updatedAt: "2026-09-04",
  },
  {
    id: "p-105",
    slug: "hikari-friend",
    name: "Hikari Friend",
    tagline: "Pakan terapung harian untuk koi dan kolam.",
    shortDescription: "Pilihan pakan terapung harian untuk koi dan ikan kolam.",
    description: "Hikari Friend adalah pilihan pakan terapung harian untuk koi dan ikan kolam. Detail ukuran, kemasan, dan stok mengikuti barang yang tersedia di Jaya Abadi; silakan konfirmasi sebelum memesan.",
    animalType: "Ikan koi",
    feedStage: "Harian",
    packageSizes: ["Sesuai stok"],
    benefits: ["Pakan terapung harian", "Untuk koi dan ikan kolam", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ikan", value: "Koi / ikan kolam" },
      { label: "Penggunaan", value: "Harian" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/hikari-friend-3d.png",
    imageAlt: "Kemasan Hikari Friend",
    viewerFrames: {
      back: "/images/products/viewer-360/hikari-friend/back.png",
      left: "/images/products/viewer-360/hikari-friend/left.png",
      right: "/images/products/viewer-360/hikari-friend/right.png",
      top: "/images/products/viewer-360/hikari-friend/top.png",
      bottom: "/images/products/viewer-360/hikari-friend/bottom.png",
    },
    accent: "lime",
    status: "published",
    updatedAt: "2026-09-04",
  },
  {
    id: "p-106",
    slug: "hikari-jumbo",
    name: "Hikari Jumbo",
    tagline: "Pakan pertumbuhan untuk koi.",
    shortDescription: "Pilihan pakan pertumbuhan untuk koi dengan ukuran sesuai katalog.",
    description: "Hikari Jumbo adalah pilihan pakan pertumbuhan untuk koi. Detail ukuran, kemasan, dan stok mengikuti barang yang tersedia di Jaya Abadi; silakan konfirmasi sebelum memesan.",
    animalType: "Ikan koi",
    feedStage: "Grower",
    packageSizes: ["Sesuai stok"],
    benefits: ["Pakan pertumbuhan koi", "Pilihan dari katalog koi", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ikan", value: "Koi" },
      { label: "Penggunaan", value: "Pertumbuhan" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/hikari-jumbo-3d.png",
    imageAlt: "Kemasan Hikari Jumbo",
    viewerFrames: {
      back: "/images/products/viewer-360/hikari-jumbo/back.png",
      left: "/images/products/viewer-360/hikari-jumbo/left.png",
      right: "/images/products/viewer-360/hikari-jumbo/right.png",
      top: "/images/products/viewer-360/hikari-jumbo/top.png",
      bottom: "/images/products/viewer-360/hikari-jumbo/bottom.png",
    },
    accent: "amber",
    status: "published",
    updatedAt: "2026-09-04",
  },
  {
    id: "p-107",
    slug: "hiroyuki-koi",
    name: "Hiroyuki Koi",
    tagline: "Pilihan pakan koi dari katalog Jaya Abadi.",
    shortDescription: "Pakan koi yang tersedia melalui katalog distributor Jaya Abadi.",
    description: "Hiroyuki Koi tercantum dalam katalog pilihan pakan koi Jaya Abadi. Detail penggunaan, ukuran, kemasan, dan stok perlu dikonfirmasi kepada tim sebelum memesan.",
    animalType: "Ikan koi",
    feedStage: "Katalog",
    packageSizes: ["Sesuai stok"],
    benefits: ["Pilihan katalog pakan koi", "Detail mengikuti label kemasan", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ikan", value: "Koi" },
      { label: "Kategori", value: "Katalog" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/hiroyuki-koi-3d.png",
    imageAlt: "Kemasan Hiroyuki Koi",
    viewerFrames: {
      back: "/images/products/viewer-360/hiroyuki-koi/back.png",
      left: "/images/products/viewer-360/hiroyuki-koi/left.png",
      right: "/images/products/viewer-360/hiroyuki-koi/right.png",
      top: "/images/products/viewer-360/hiroyuki-koi/top.png",
      bottom: "/images/products/viewer-360/hiroyuki-koi/bottom.png",
    },
    accent: "sky",
    status: "published",
    updatedAt: "2026-09-04",
  },
  {
    id: "p-108",
    slug: "ikushu-breeder-plus",
    name: "Ikushu Breeder Plus",
    tagline: "Pilihan pakan breeder koi.",
    shortDescription: "Pakan breeder koi dari katalog distributor Jaya Abadi.",
    description: "Ikushu Breeder Plus tercantum sebagai pilihan pakan breeder koi. Detail penggunaan, ukuran, kemasan, dan stok perlu dikonfirmasi kepada tim sebelum memesan.",
    animalType: "Ikan koi",
    feedStage: "Breeder",
    packageSizes: ["Sesuai stok"],
    benefits: ["Kategori breeder koi", "Detail mengikuti label kemasan", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ikan", value: "Koi" },
      { label: "Penggunaan", value: "Breeder" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/ikushu-breeder-plus-3d.png",
    imageAlt: "Kemasan Ikushu Breeder Plus",
    viewerFrames: {
      back: "/images/products/viewer-360/ikushu-breeder-plus/back.png",
      left: "/images/products/viewer-360/ikushu-breeder-plus/left.png",
      right: "/images/products/viewer-360/ikushu-breeder-plus/right.png",
      top: "/images/products/viewer-360/ikushu-breeder-plus/top.png",
      bottom: "/images/products/viewer-360/ikushu-breeder-plus/bottom.png",
    },
    accent: "orange",
    status: "published",
    updatedAt: "2026-09-04",
  },
  {
    id: "p-109",
    slug: "wellred-koi",
    name: "WellRED",
    tagline: "Pilihan katalog pakan koi.",
    shortDescription: "Produk pakan koi yang tersedia sesuai stok distributor.",
    description: "WellRED tercantum dalam katalog pilihan pakan koi Jaya Abadi. Detail penggunaan, ukuran, kemasan, dan stok perlu dikonfirmasi kepada tim sebelum memesan.",
    animalType: "Ikan koi",
    feedStage: "Katalog",
    packageSizes: ["Sesuai stok"],
    benefits: ["Pilihan katalog pakan koi", "Detail mengikuti label kemasan", "Konfirmasi stok sebelum pemesanan"],
    specifications: [
      { label: "Jenis ikan", value: "Koi" },
      { label: "Kategori", value: "Katalog" },
      { label: "Ketersediaan", value: "Konfirmasi stok" },
    ],
    image: "/images/products/render-3d/wellred-3d.png",
    imageAlt: "Kemasan WellRED",
    viewerFrames: {
      back: "/images/products/viewer-360/wellred-koi/back.png",
      left: "/images/products/viewer-360/wellred-koi/left.png",
      right: "/images/products/viewer-360/wellred-koi/right.png",
      top: "/images/products/viewer-360/wellred-koi/top.png",
      bottom: "/images/products/viewer-360/wellred-koi/bottom.png",
    },
    accent: "lime",
    status: "published",
    updatedAt: "2026-09-04",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-001",
    name: "Budi Santoso",
    location: "Sleman, DIY",
    businessType: "Peternak broiler",
    quote:
      "Sejak memakai STS, konsumsi pakan lebih mudah dipantau. Ayam juga tumbuh lebih seragam dan tim sales cepat membantu saat kami konsultasi.",
    metricLabel: "FCR rata-rata",
    metricValue: "1,58",
    image: unsplash("photo-1560250097-0b93528c311a", 160),
    imageAlt: "Budi Santoso, peternak broiler",
  },
  {
    id: "t-002",
    name: "Siti Rahma",
    location: "Magelang, Jawa Tengah",
    businessType: "Peternak ayam petelur",
    quote:
      "Yang paling saya rasakan adalah pendampingannya. Saat ada perubahan kondisi kandang, kami bisa langsung berdiskusi dan mendapat arahan yang praktis.",
    metricLabel: "Produksi harian",
    metricValue: "92%",
    image: unsplash("photo-1494790108377-be9c29b29330", 160),
    imageAlt: "Siti Rahma, peternak ayam petelur",
  },
];

export const certifications: Certification[] = [
  { id: "c-001", name: "NKV", issuer: "Kementerian Pertanian RI", detail: "Nomor kontrol veteriner", year: "2025" },
  { id: "c-002", name: "CPPIB", issuer: "Badan Standardisasi Nasional", detail: "Praktik pembuatan pakan yang baik", year: "2024" },
  { id: "c-003", name: "ISO 9001", issuer: "Lembaga sertifikasi independen", detail: "Sistem manajemen mutu", year: "2024" },
  { id: "c-004", name: "Halal", issuer: "BPJPH", detail: "Sertifikasi produk dan proses", year: "2025" },
];

export const milestones: Milestone[] = [
  { year: "01", title: "Kenali kebutuhan", description: "Ceritakan jenis ayam atau koi, fase pemeliharaan, serta ukuran pakan yang dicari." },
  { year: "02", title: "Pilih dari katalog", description: "Bandingkan pilihan HI-PRO-VITE, Hikari, Hiroyuki, Ikushu, WellRED, dan produk lain yang tersedia." },
  { year: "03", title: "Konfirmasi stok", description: "Tim Jaya Abadi memeriksa ketersediaan, kemasan, dan opsi pengiriman sebelum transaksi." },
  { year: "04", title: "Pesanan dikirim", description: "Setelah detail disepakati, kami bantu menyiapkan proses distribusi ke lokasi tujuan." },
];

export const articles: Article[] = [
  {
    id: "a-001",
    slug: "mengatur-pakan-broiler-agar-efisien",
    title: "5 langkah mengatur pakan broiler agar lebih efisien",
    excerpt: "Manajemen pakan yang rapi membantu peternak membaca performa kandang sejak dini. Berikut langkah praktis yang bisa dimulai hari ini.",
    category: "Tips Peternakan",
    publishedAt: "2026-08-24",
    readTime: "5 menit baca",
    image: unsplash("photo-1569288063643-5d29ad64dfb3"),
    imageAlt: "Peternak memeriksa ayam broiler",
    author: "Tim Nutrisi STS",
    content: [
      "Efisiensi pakan bukan hanya soal memilih produk dengan harga paling rendah. Peternak perlu melihat hubungan antara konsumsi, pertambahan bobot, kesehatan ayam, dan kondisi kandang secara bersamaan.",
      "Mulailah dengan menetapkan jadwal pemberian pakan yang konsisten. Catat jumlah pakan masuk dan sisa pakan setiap hari, lalu bandingkan dengan jumlah populasi dan bobot sampling.",
      "Kualitas air minum dan ventilasi juga berpengaruh besar. Pakan yang baik tidak akan bekerja optimal ketika ayam mengalami stres panas atau akses airnya terganggu.",
      "Terakhir, diskusikan perubahan formula atau program pakan dengan tenaga teknis. Penyesuaian kecil yang tepat konteks biasanya lebih aman daripada perubahan mendadak.",
    ],
    status: "published",
  },
  {
    id: "a-002",
    slug: "membaca-label-nutrisi-pakan-ternak",
    title: "Cara membaca label nutrisi pakan ternak",
    excerpt: "Protein bukan satu-satunya angka penting. Kenali arti informasi pada label agar pilihan pakan sesuai fase dan tujuan pemeliharaan.",
    category: "Edukasi",
    publishedAt: "2026-08-11",
    readTime: "4 menit baca",
    image: unsplash("photo-1589924691995-400dc9ecc119"),
    imageAlt: "Pakan ternak dalam wadah",
    author: "Tim Nutrisi STS",
    content: [
      "Label pakan merupakan ringkasan informasi yang membantu peternak memastikan produk sesuai dengan kebutuhan ternak. Bacalah label bersama informasi fase pakan dan rekomendasi teknis.",
      "Protein kasar menunjukkan kandungan protein total, sementara serat kasar memberi gambaran karakteristik bahan berserat. Keduanya perlu dibaca dalam konteks jenis ternak dan fase pertumbuhan.",
      "Perhatikan pula bentuk pakan, ukuran kemasan, tanggal produksi, dan petunjuk penyimpanan. Pakan yang disimpan kering dan tertutup akan membantu menjaga kualitasnya.",
    ],
    status: "published",
  },
  {
    id: "a-003",
    slug: "cerita-peternak-dari-sleman",
    title: "Dari kandang keluarga menjadi usaha yang lebih terukur",
    excerpt: "Budi Santoso berbagi cara sederhana membangun pencatatan kandang dan menjaga konsistensi performa bersama tim STS.",
    category: "Cerita Mitra",
    publishedAt: "2026-07-29",
    readTime: "6 menit baca",
    image: unsplash("photo-1596733430284-f7437764b1a9"),
    imageAlt: "Peternak berdiri di area kandang",
    author: "Redaksi Jaya Abadi",
    content: [
      "Budi memulai usaha broiler dari kandang berkapasitas kecil di belakang rumah. Tantangan terbesarnya bukan hanya menjaga ayam tetap sehat, melainkan membaca data agar keputusan harian tidak lagi berdasarkan perkiraan.",
      "Bersama pendamping lapangan STS, ia mulai mencatat konsumsi pakan, bobot sampling, mortalitas, dan kondisi cuaca. Catatan sederhana itu menjadi dasar diskusi setiap kali ada perubahan di kandang.",
      "Kini Budi mengelola beberapa kandang dengan rutinitas pencatatan yang sama. Ia merasa lebih siap mengambil keputusan dan dapat menjelaskan kebutuhan usahanya kepada mitra dengan lebih percaya diri.",
    ],
    status: "published",
  },
];

export function getPublishedProducts() {
  return products.filter((product) => product.status === "published");
}

export function getProductBySlug(slug: string) {
  return getPublishedProducts().find((product) => product.slug === slug);
}

export function getPublishedArticles() {
  return articles
    .filter((article) => article.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticleBySlug(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}
