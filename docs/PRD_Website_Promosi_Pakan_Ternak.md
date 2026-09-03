# Product Requirements Document (PRD)

## Website Promosi Perusahaan Pakan Ternak

| Atribut | Nilai |
|---|---|
| Versi | 0.1 - Draft untuk validasi stakeholder |
| Tanggal | 2 September 2026 |
| Status | Draft |
| Product owner | Belum ditentukan |
| Target rilis | MVP |
| Bahasa awal | Bahasa Indonesia |
| Sumber | Dokumen Kebutuhan Website Perusahaan Pakan Ternak v1.0 |

## 1. Ringkasan Eksekutif

Perusahaan membutuhkan website promosi yang berfungsi sebagai kanal digital utama untuk membangun kepercayaan, memperkenalkan produk pakan secara jelas, dan mengubah kunjungan menjadi percakapan penjualan. Website bukan e-commerce pada fase awal. Konversi utamanya adalah klik WhatsApp, pengiriman form kontak, permintaan katalog atau harga, dan minat kemitraan.

Produk akan berupa website company profile dan katalog produk yang mobile-first, cepat pada koneksi 4G, mudah ditemukan melalui mesin pencari, serta dapat diperbarui oleh tim non-teknis melalui CMS. Kredibilitas dibangun melalui foto asli, data hasil penggunaan, sertifikasi, legalitas, spesifikasi produk, dan informasi perusahaan yang dapat diverifikasi.

### Prinsip produk

1. **Bangun kepercayaan secepat mungkin.** Kredibilitas, foto asli, sertifikasi, dan bukti hasil harus terlihat tanpa pencarian panjang.
2. **Spesifikasi produk mudah dicapai.** Pengguna dapat mencapai detail produk maksimal dua klik dari beranda.
3. **Setiap halaman memiliki jalan konversi.** CTA utama dan WhatsApp tersedia secara konsisten tanpa mengganggu konten.
4. **Utamakan pengalaman mobile dan koneksi terbatas.** Konten, media, dan interaksi harus ringan.
5. **Konten dapat dikelola tanpa developer.** Tim internal dapat memperbarui produk, artikel, testimoni, dan data penting melalui CMS.

## 2. Latar Belakang dan Masalah

Calon pelanggan dan mitra memerlukan informasi yang cukup untuk menilai kualitas produk dan kredibilitas perusahaan sebelum menghubungi sales. Tanpa kanal digital yang terstruktur, mereka berpotensi mengalami masalah berikut:

- Sulit memahami lini produk dan memilih pakan berdasarkan jenis ternak atau fase pertumbuhan.
- Tidak menemukan spesifikasi nutrisi, ukuran kemasan, katalog, atau jalur untuk menanyakan harga.
- Tidak memiliki bukti memadai mengenai legalitas, sertifikasi, pengalaman, dan hasil penggunaan produk.
- Harus melalui proses kontak yang panjang atau tidak jelas.
- Mengalami halaman yang berat pada perangkat mobile atau koneksi terbatas.
- Menemukan informasi yang sudah usang karena pembaruan konten bergantung pada developer.

## 3. Visi Produk

Menjadi pusat informasi digital perusahaan pakan ternak yang paling mudah dipercaya dan digunakan oleh peternak, distributor, dan buyer korporat untuk menemukan produk yang sesuai serta memulai percakapan bisnis.

## 4. Tujuan dan Batasan

### 4.1 Tujuan bisnis

- Meningkatkan jumlah lead berkualitas dari kanal website.
- Meningkatkan klik WhatsApp dengan konteks produk atau kebutuhan yang jelas.
- Memperkuat persepsi kredibilitas perusahaan.
- Mendukung sales dengan katalog produk yang selalu tersedia dan mudah dibagikan.
- Mengurangi ketergantungan tim konten pada developer.
- Meningkatkan visibilitas organik untuk pencarian perusahaan dan produk pakan.

### 4.2 Tujuan pengguna

- Menemukan produk yang sesuai dengan jenis ternak dan tahap pertumbuhan.
- Memahami spesifikasi, manfaat, kemasan, dan bukti pendukung produk.
- Menanyakan harga atau berkonsultasi dengan sales dengan cepat.
- Memverifikasi profil, legalitas, sertifikasi, serta rekam jejak perusahaan.
- Mengajukan pertanyaan, minat kemitraan, atau lamaran melalui jalur yang jelas.

### 4.3 Di luar scope fase awal

- Checkout, pembayaran, dan transaksi e-commerce.
- Akun atau area login peternak dan mitra.
- Riwayat pemesanan atau fungsi ERP/distributor portal.
- Konten multi-bahasa penuh. Arsitektur harus siap dilokalkan, tetapi rilis awal hanya Bahasa Indonesia.
- Otomasi CRM kompleks di luar pengiriman lead dan integrasi dasar yang disepakati.

## 5. Pengguna Sasaran dan Jobs to Be Done

### 5.1 Peternak individu/kecil-menengah - persona utama

**Konteks:** Mayoritas mengakses dari ponsel dan mungkin menggunakan koneksi terbatas.

**Kebutuhan:**

- Saat mencari pakan untuk ternaknya, pengguna ingin membandingkan jenis dan spesifikasi produk agar dapat memilih produk yang relevan.
- Saat tertarik pada produk, pengguna ingin langsung bertanya melalui WhatsApp agar dapat mengetahui harga dan ketersediaan.
- Saat menilai klaim perusahaan, pengguna ingin melihat foto, testimoni, dan data hasil nyata agar merasa yakin.

### 5.2 Distributor, reseller, dan calon mitra

**Kebutuhan:** Memahami portofolio produk, wilayah/distribusi, manfaat kemitraan, syarat, dan cara menghubungi sales.

### 5.3 Buyer korporat/institusi

**Kebutuhan:** Menilai spesifikasi teknis, kapasitas dan kredibilitas pemasok, sertifikasi, legalitas, serta memperoleh katalog atau kontak sales.

### 5.4 Admin dan editor konten

**Kebutuhan:** Memperbarui konten dengan aman dan cepat, meninjau lead, serta menjaga informasi publik tetap akurat tanpa bantuan developer.

### 5.5 Pelamar kerja

**Kebutuhan:** Menemukan lowongan aktif, memahami posisi dan lokasi, lalu mengirim lamaran melalui jalur resmi.

### 5.6 Media dan investor - sekunder

**Kebutuhan:** Mendapatkan profil perusahaan, berita, pencapaian, sertifikasi, dan informasi korporasi yang dapat dirujuk.

## 6. Sasaran Keberhasilan

### 6.1 North-star metric

**Jumlah lead berkualitas per bulan yang berasal dari website.** Lead berkualitas adalah pengunjung dengan data kontak valid yang menyatakan minat pada produk, harga, konsultasi, distribusi, atau kemitraan.

### 6.2 KPI

| KPI | Target awal | Cara ukur |
|---|---|---|
| Lead berkualitas | Baseline 30 hari pertama, lalu target peningkatan disepakati | Form kontak, form kemitraan, dan lead yang ditandai valid oleh sales |
| Klik WhatsApp | Baseline 30 hari pertama, lalu tren meningkat | Event analytics per halaman, produk, dan posisi CTA |
| Bounce rate beranda | < 50% | GA4 |
| Keterlibatan halaman produk | Waktu aktif dan scroll depth meningkat dari baseline | GA4 event dan engagement time |
| PageSpeed Insights mobile | Skor performa >= 80 | Pengujian halaman utama dan template penting |
| Waktu muat | < 3 detik pada koneksi 4G standar sesuai skenario uji | Pengujian terkontrol dan data lapangan |
| Kemandirian konten | Admin dapat menyelesaikan tugas CRUD utama tanpa developer | UAT admin |

> Target numerik untuk pertumbuhan lead, klik WhatsApp, dan waktu aktif belum tersedia pada sumber requirement. Target final harus ditetapkan setelah baseline dan data sales tersedia.

## 7. Scope dan Prioritas Rilis

### 7.1 Normalisasi prioritas yang direkomendasikan

Dokumen sumber memiliki beberapa dependensi yang tidak sepenuhnya tercakup dalam daftar MVP. PRD ini menggunakan normalisasi berikut sampai divalidasi stakeholder:

- Berita dasar masuk MVP karena beranda wajib menampilkan tiga berita terbaru dan CMS wajib mengelola berita.
- Keamanan form dan CMS (NFR-17 sampai NFR-19) menjadi release gate, bukan fitur fase lanjutan.
- CMS yang mudah digunakan, backup, dan analytics (NFR-13 sampai NFR-15) masuk MVP karena diperlukan untuk operasi dan pengukuran produk.
- Halaman kemitraan pada MVP boleh berupa informasi ringkas dengan CTA ke WhatsApp atau form kontak. Form kemitraan lanjutan dan CRM tetap fase berikutnya.
- Struktur data lowongan boleh disiapkan di CMS, tetapi halaman karir publik dan alur lamaran dapat dirilis pada fase 1.1.
- Filter produk masuk MVP. Pencarian produk tetap P1 karena dinyatakan opsional.
- Struktur i18n-ready masuk MVP; penerjemahan dan pilihan bahasa masuk fase lanjutan.

### 7.2 P0 - MVP/release gate

- Navigasi global, footer, CTA utama, dan floating WhatsApp.
- Beranda lengkap dengan value proposition, keunggulan, kategori produk, testimoni, sertifikasi, tiga berita terbaru, dan CTA kemitraan.
- Tentang Kami: profil, sejarah, visi-misi, milestone, manajemen/struktur bila konten tersedia, serta sertifikasi dan penghargaan.
- Katalog produk dengan filter dan halaman detail produk.
- Download brosur/katalog PDF.
- Berita dasar: listing, detail, kategori, tanggal, dan pengelolaan melalui CMS.
- Kontak: form singkat, informasi kontak, jam operasional, media sosial, dan peta.
- Dashboard CMS untuk produk, berita, testimoni, sertifikasi, leads, dan pengaturan situs.
- Role super admin dan editor konten.
- Notifikasi lead dan ekspor data.
- SEO teknis, analytics, backup, performa, aksesibilitas, responsivitas, kompatibilitas browser, dan keamanan dasar.

### 7.3 P1 - Fase 1.1

- Halaman kemitraan lengkap, syarat/benefit/proses, dan form khusus.
- Integrasi CRM sales yang lebih dalam.
- Halaman karir, lowongan aktif, dan alur pengiriman lamaran.
- Pencarian produk.
- Share button dan related articles yang lebih lengkap.
- Penyajian struktur korporasi/manajemen yang lebih kaya bila data tersedia.

### 7.4 P2 - Fase lanjutan

- Multi-bahasa penuh.
- Member area untuk mitra.
- Riwayat pemesanan dan fitur e-commerce ringan bila strategi bisnis berubah.

## 8. Arsitektur Informasi

```text
Beranda
|- Tentang Kami
|  |- Profil Perusahaan
|  |- Visi & Misi
|  |- Manajemen
|  `- Sertifikasi & Penghargaan
|- Produk
|  |- Kategori Jenis Ternak
|  |- Kategori Fase Pakan
|  `- Detail Produk
|- Bermitra
|- Berita
|  `- Detail Artikel
|- Karir
`- Kontak
```

Aturan navigasi:

- Maksimal dua level dropdown.
- Detail produk dapat dicapai maksimal dua klik dari beranda.
- CTA utama konsisten, tetapi teks dapat mengikuti konteks halaman.
- Mobile menu harus dapat digunakan dengan satu tangan, memiliki target sentuh memadai, dan tidak menutupi CTA penting.

## 9. Alur Pengguna Utama

### 9.1 Menemukan produk dan menanyakan harga

1. Pengguna membuka beranda dari pencarian, tautan sosial, atau pesan sales.
2. Pengguna memilih kategori produk.
3. Pengguna memfilter produk berdasarkan jenis ternak atau fase pakan.
4. Pengguna membuka detail produk dan memeriksa spesifikasi, kemasan, serta brosur.
5. Pengguna memilih **Tanya Harga via WhatsApp**.
6. WhatsApp terbuka dengan pesan awal yang memuat nama produk dan URL halaman.
7. Event analytics tercatat tanpa menyimpan isi percakapan.

### 9.2 Mengirim pertanyaan umum

1. Pengguna membuka halaman Kontak atau CTA konsultasi.
2. Pengguna mengisi nama, nomor HP, dan pesan.
3. Sistem memvalidasi data, menjalankan proteksi spam, dan menerima persetujuan privasi.
4. Pengguna melihat status berhasil atau instruksi pemulihan jika gagal.
5. Sales menerima notifikasi dan lead tersimpan di CMS.

### 9.3 Mengajukan minat kemitraan

1. Pengguna melihat CTA kemitraan dari beranda atau menu.
2. Pada MVP, pengguna diarahkan ke informasi ringkas dan WhatsApp/form kontak dengan konteks kemitraan.
3. Pada P1, pengguna mengisi form khusus berisi nama, lokasi, jenis usaha ternak, dan kontak.
4. Lead masuk ke email/CRM sales dengan sumber dan waktu pengiriman.

### 9.4 Admin memublikasikan produk

1. Admin masuk ke CMS sesuai role.
2. Admin membuat atau mengedit produk, mengisi spesifikasi terstruktur, gambar, kemasan, kategori, dan PDF.
3. Sistem memvalidasi field wajib dan menampilkan preview.
4. Admin menyimpan draft atau memublikasikan.
5. Produk tampil pada filter, detail, sitemap, dan metadata SEO yang sesuai.

## 10. Functional Requirements dan Acceptance Criteria

### EP-01 - Pengalaman global dan navigasi

**Mencakup:** FR-08, NFR-04, NFR-05, NFR-09.

Acceptance criteria:

- Header, footer, navigasi, dan CTA tampil konsisten pada semua halaman publik.
- Floating WhatsApp tersedia pada semua halaman tanpa menutupi kontrol, teks, banner cookie, atau input form.
- Nomor WhatsApp dan template pesan dapat diubah melalui pengaturan CMS.
- Navigasi tidak lebih dari dua level dan dapat digunakan dengan keyboard.
- Tersedia state aktif, hover, focus, loading, empty, error, dan success yang jelas.

### EP-02 - Beranda

**Mencakup:** FR-01 sampai FR-07.

Acceptance criteria:

- Hero menampilkan value proposition, gambar relevan, dan satu CTA utama yang terlihat tanpa scroll pada viewport utama.
- Bagian **Kenapa Pilih Kami** menggunakan poin singkat dan ikon, bukan paragraf panjang.
- Kategori produk menggunakan foto yang relevan dan setiap kartu dapat diklik.
- Pengguna dapat mencapai spesifikasi produk maksimal dua klik dari beranda.
- Testimoni menampilkan foto asli, nama, lokasi, dan minimal satu indikator hasil ketika datanya tersedia.
- Sertifikasi/legalitas ditampilkan sebagai strip ringan dan tetap dapat digunakan tanpa JavaScript carousel otomatis.
- Tiga artikel terbaru ditarik otomatis dari CMS dan memiliki fallback bila artikel kurang dari tiga.
- CTA kemitraan tidak menjadi dead end; pada MVP mengarah ke jalur kontak yang berfungsi.

### EP-03 - Tentang Kami

**Mencakup:** FR-09 sampai FR-12.

Acceptance criteria:

- Halaman menampilkan profil, sejarah, visi-misi, dan milestone yang dapat diperbarui.
- Data manajemen dan struktur korporasi hanya ditampilkan jika disetujui dan tersedia.
- Sertifikasi/penghargaan memiliki nama, lembaga penerbit, tahun, status, dan gambar/dokumen bila diperbolehkan.
- Konten yang belum tersedia tidak menghasilkan section kosong.

### EP-04 - Katalog dan detail produk

**Mencakup:** FR-13 sampai FR-16.

Acceptance criteria:

- Katalog menampilkan produk dalam grid responsif.
- Pengguna dapat memfilter berdasarkan jenis ternak dan/atau fase pakan tanpa kehilangan konteks.
- Filter dapat di-reset dan menghasilkan empty state yang membantu.
- URL kategori/filter yang penting dapat dibagikan atau dipulihkan saat halaman dimuat ulang, bila pendekatan teknis mendukung.
- Detail produk menampilkan foto, deskripsi, kandungan nutrisi terstruktur, ukuran kemasan, kategori, dan CTA WhatsApp.
- Pesan WhatsApp otomatis memuat nama produk dan URL untuk membantu sales memahami konteks.
- PDF produk atau katalog dapat diunduh, memiliki label ukuran/format, dan tidak menghasilkan tautan rusak.
- Produk draft atau nonaktif tidak tampil ke publik.
- Pencarian produk diperlakukan sebagai P1 kecuali stakeholder menetapkannya sebagai MVP.

### EP-05 - Berita

**Mencakup:** FR-06, FR-19 sampai FR-21.

Acceptance criteria:

- Listing menampilkan thumbnail, judul, ringkasan, kategori, dan tanggal publish.
- Pagination memiliki URL yang dapat diakses dan tidak menduplikasi metadata tanpa canonical yang tepat.
- Detail artikel menampilkan konten, tanggal, kategori, metadata SEO, dan artikel terkait bila tersedia.
- Share link tidak bergantung pada API sosial yang meminta data pengguna.
- Admin dapat membuat, mengedit, menjadwalkan bila didukung, memublikasikan, dan menghapus/mengarsipkan artikel.
- Artikel draft tidak dapat diakses publik.

### EP-06 - Kemitraan

**Mencakup:** FR-07, FR-17, FR-18.

Acceptance criteria MVP:

- CTA kemitraan mengarah ke halaman atau section ringkas yang menjelaskan manfaat utama dan jalur kontak.
- Lead dapat menghubungi sales melalui WhatsApp atau form kontak dengan konteks **Kemitraan**.

Acceptance criteria P1:

- Halaman menjelaskan syarat, benefit, dan tahapan proses secara jelas.
- Form khusus memuat nama, lokasi, jenis usaha ternak, dan kontak.
- Pengiriman berhasil tersimpan, mengirim notifikasi, dan diteruskan ke CRM bila integrasi telah disetujui.

### EP-07 - Karir

**Mencakup:** FR-22, FR-23.

Acceptance criteria P1:

- Hanya lowongan aktif yang tampil, masing-masing memiliki posisi, lokasi, deskripsi, persyaratan, dan tanggal penutupan bila ada.
- Bila tidak ada lowongan, halaman menampilkan empty state yang sopan dan tidak mengundang pengiriman data tanpa tujuan.
- Jalur lamaran menggunakan upload CV yang aman atau redirect ke email/Google Form resmi sesuai keputusan bisnis.
- Jika upload CV digunakan, tipe file, ukuran, masa retensi, akses, dan kebijakan privasinya harus ditentukan sebelum rilis.

### EP-08 - Kontak dan lead management

**Mencakup:** FR-24 sampai FR-26, FR-28.

Acceptance criteria:

- Form meminta nama, nomor HP, dan pesan; field tambahan hanya ditambah jika diperlukan sales.
- Validasi tersedia di client dan server dengan pesan error yang spesifik.
- Form tidak dapat terkirim berulang saat pengguna menekan tombol beberapa kali.
- Setelah sukses, pengguna menerima konfirmasi yang jelas dan data tersimpan satu kali.
- Setelah gagal, input pengguna tidak hilang kecuali data sensitif yang tidak boleh dipertahankan.
- Lead menyimpan sumber halaman, campaign/UTM bila ada, waktu, dan status tindak lanjut tanpa merekam data berlebihan.
- Notifikasi email tidak memuat rahasia sistem dan hanya dikirim ke penerima yang ditentukan.
- Admin dapat mengekspor data lead sesuai hak akses dan kebijakan privasi.
- Halaman menampilkan alamat, telepon, email, jam operasional, media sosial, dan peta lokasi.

### EP-09 - CMS dan hak akses

**Mencakup:** FR-21, FR-27 sampai FR-29, NFR-13.

Acceptance criteria:

- Super admin dapat mengelola pengguna, role, seluruh konten, lead, dan pengaturan situs.
- Editor konten dapat mengelola konten yang diizinkan tetapi tidak dapat mengelola pengguna, role, atau pengaturan sensitif.
- CMS mendukung draft dan publish untuk konten publik.
- Penghapusan konten material meminta konfirmasi dan, bila platform mendukung, dapat dipulihkan dari trash/version history.
- Field wajib, format URL, ukuran file, dan tipe media divalidasi.
- Perubahan penting memiliki timestamp dan identitas pengguna bila platform mendukung audit log.
- Admin non-teknis dapat menyelesaikan skenario UAT utama tanpa mengedit kode.

## 11. Model Konten CMS

### 11.1 Product

- Nama dan slug.
- Status draft/published/archived.
- Jenis ternak.
- Fase pakan: starter, grower, finisher, atau nilai lain yang disetujui.
- Foto utama dan galeri, alt text, serta kredit/hak penggunaan.
- Deskripsi singkat dan lengkap.
- Spesifikasi nutrisi dalam pasangan label-nilai-satuan.
- Ukuran dan jenis kemasan.
- Keunggulan/manfaat yang telah disetujui.
- Brosur/katalog PDF.
- Template pesan WhatsApp opsional.
- Meta title, meta description, dan social image.

### 11.2 Article

- Judul, slug, excerpt, isi, thumbnail, alt text.
- Kategori, penulis, tanggal publish, status.
- Artikel terkait.
- Metadata SEO dan social image.

### 11.3 Testimonial

- Nama, lokasi, jenis ternak/usaha.
- Foto asli dan persetujuan publikasi.
- Kutipan.
- Metrik hasil, satuan, periode, dan konteks pengukuran.
- Produk terkait.
- Status publikasi.

### 11.4 Certification/Award

- Nama, lembaga penerbit, nomor referensi opsional, tahun terbit, masa berlaku/status.
- Logo atau badge dan alt text.
- Dokumen pendukung bila boleh dipublikasikan.

### 11.5 Vacancy

- Posisi, lokasi, jenis pekerjaan, deskripsi, persyaratan.
- Tanggal buka/tutup, status aktif.
- Metode dan URL/email lamaran.

### 11.6 Lead

- Tipe: kontak, produk, kemitraan.
- Nama, nomor HP, pesan, produk terkait opsional.
- Sumber halaman dan UTM yang tersedia.
- Waktu, status tindak lanjut, catatan internal sesuai hak akses.
- Persetujuan privasi dan masa retensi.

### 11.7 Site settings

- Informasi perusahaan, alamat, jam operasional, peta, media sosial.
- Nomor WhatsApp, template pesan, dan penerima notifikasi.
- Default metadata SEO dan gambar sosial.
- Logo, favicon, serta identitas visual.

## 12. UI/UX dan Aksesibilitas

- Desain dimulai dari viewport mobile < 480 px, kemudian tablet 481-1024 px dan desktop > 1024 px.
- Kontras teks dan kontrol memenuhi WCAG 2.2 AA minimum.
- Semua fungsi utama dapat digunakan dengan keyboard dan memiliki focus indicator yang terlihat.
- Setiap gambar bermakna memiliki alt text; gambar dekoratif tidak dibacakan screen reader.
- Ukuran target sentuh, label form, urutan heading, dan pesan error harus aksesibel.
- Animasi ringan, menghormati `prefers-reduced-motion`, dan tidak menjadi syarat untuk memahami konten.
- Foto produk dan testimoni menggunakan aset asli. Aset stok generik tidak digunakan sebagai bukti klaim.
- Palet, tipografi, grid, spacing, radius, ikon, dan state komponen didefinisikan dalam design system ringan.
- Google Maps menggunakan lazy-load atau placeholder agar tidak membebani initial load.

## 13. Non-Functional Requirements

### 13.1 Performa

- Halaman utama dan template penting ditargetkan memuat < 3 detik pada skenario 4G standar yang disepakati.
- Skor PageSpeed Insights mobile minimal 80 untuk beranda, listing produk, dan detail produk pada build produksi representatif.
- Gambar menggunakan format modern, ukuran responsif, kompresi, dimensi eksplisit, dan lazy-load di bawah fold.
- JavaScript pihak ketiga dibatasi dan tidak boleh memblokir interaksi utama.
- Font dioptimalkan dan tidak menyebabkan layout shift yang mengganggu.

### 13.2 SEO

- Setiap halaman memiliki title, description, canonical, Open Graph, dan social image yang sesuai.
- URL bersih, stabil, deskriptif, dan tidak menggunakan parameter mentah sebagai URL utama.
- Tersedia sitemap.xml dan robots.txt yang benar untuk lingkungan produksi.
- Schema markup minimal mencakup Organization, Product, BreadcrumbList, dan Article sesuai tipe halaman.
- Redirect 301 tersedia saat slug halaman yang sudah dipublikasikan berubah.
- Draft, preview, halaman admin, dan lingkungan non-produksi tidak boleh terindeks.

### 13.3 Kompatibilitas dan responsivitas

- Mendukung Chrome, Safari, Edge, dan Firefox yang dirilis dalam dua tahun terakhir sesuai sumber requirement.
- Tampilan diuji pada ukuran representatif 360 px, 768 px, 1024 px, dan >= 1280 px.
- Tidak ada overflow horizontal, konten terpotong, atau kontrol yang tidak dapat diakses pada breakpoint utama.

### 13.4 Keamanan dan privasi

- HTTPS aktif pada seluruh halaman dan HTTP dialihkan ke HTTPS.
- Input divalidasi dan disanitasi di server; output di-escape sesuai konteks.
- Form menggunakan proteksi CSRF bila relevan, honeypot atau CAPTCHA adaptif, dan rate limiting.
- Query database menggunakan API aman/parameterized query untuk mencegah SQL injection.
- Autentikasi CMS mengikuti kemampuan platform yang aman; MFA direkomendasikan untuk super admin.
- Hak akses mengikuti prinsip least privilege.
- Secret tidak disimpan di repository atau dikirim ke browser.
- Lead dan file lamaran, jika ada, memiliki kebijakan akses, retensi, penghapusan, dan backup yang disetujui.
- Halaman/form menyertakan tautan kebijakan privasi dan persetujuan yang sesuai penggunaan data.

### 13.5 Operasional

- Backup otomatis dijalankan sesuai kapabilitas platform dengan frekuensi minimal harian untuk data dinamis atau frekuensi yang disetujui pemilik bisnis.
- Prosedur restore diuji sebelum peluncuran dan secara berkala.
- Error aplikasi dicatat tanpa mengekspos PII atau secret.
- Terdapat pemantauan uptime dan proses respons untuk form/halaman yang gagal.
- Struktur kode dan konten siap i18n tanpa menerbitkan pilihan bahasa kosong.

## 14. Analytics dan Tracking Plan

| Event | Trigger | Properti minimum |
|---|---|---|
| `view_product_list` | Listing produk terlihat | kategori, filter aktif |
| `select_product` | Kartu produk dipilih | product_id, product_name, source_section |
| `view_product` | Detail produk dimuat | product_id, kategori |
| `download_catalog` | PDF dipilih | product_id atau catalog_type |
| `click_whatsapp` | CTA WhatsApp dipilih | page_type, product_id opsional, cta_location |
| `start_contact_form` | Interaksi pertama dengan form | form_type, source_page |
| `submit_contact_form` | Submit berhasil | form_type, source_page; tanpa isi pesan/nomor HP |
| `form_error` | Submit gagal | form_type, error_category; tanpa PII |
| `click_partnership_cta` | CTA kemitraan dipilih | source_page, cta_location |
| `view_article` | Detail artikel dimuat | article_id, category |
| `apply_job_click` | Jalur lamaran dipilih | vacancy_id, method |

Aturan tracking:

- Jangan mengirim nama, nomor HP, isi pesan, CV, atau PII lain ke analytics.
- UTM dipertahankan untuk atribusi lead bila diizinkan kebijakan privasi.
- Definisi event, conversion, internal traffic filter, dan data retention dikonfigurasi sebelum peluncuran.
- GA4 dan Google Search Console dipasang pada properti milik perusahaan, bukan akun pribadi vendor.

## 15. Konten dan Aset yang Diperlukan

- Nama resmi perusahaan, logo, warna merek, dan panduan identitas visual.
- Value proposition dan CTA utama yang disetujui.
- Profil, sejarah, visi, misi, milestone, struktur, serta data manajemen.
- Daftar lini produk dan kategori final.
- Foto produk asli, kemasan, fasilitas, peternak, dan kandang beserta hak publikasinya.
- Deskripsi dan spesifikasi nutrisi yang telah diverifikasi pihak teknis/legal.
- Brosur/katalog PDF versi terbaru.
- Sertifikasi, legalitas, penghargaan, penerbit, tahun, dan masa berlaku.
- Testimoni dengan foto, izin publikasi, konteks, periode, dan bukti angka performa.
- Informasi kontak, alamat, koordinat peta, jam operasional, media sosial, dan nomor WhatsApp.
- Minimal tiga artikel awal agar section berita tidak kosong.
- Kebijakan privasi, kebijakan retensi lead, dan penerima notifikasi.
- Daftar lowongan dan jalur lamaran jika modul Karir diaktifkan.

## 16. Dependensi

- Konten dan aset disediakan serta disetujui perusahaan.
- Tim teknis atau nutrisionis memverifikasi klaim dan spesifikasi produk.
- Legal memverifikasi izin penggunaan testimoni, foto, sertifikasi, dan pernyataan performa.
- Domain, hosting, email pengirim, dan akun analytics disiapkan atas nama perusahaan.
- Sales menentukan nomor WhatsApp, penerima lead, SLA tindak lanjut, dan klasifikasi lead berkualitas.
- Platform CMS dan arsitektur hosting dipilih setelah menilai kemampuan tim, anggaran, keamanan, dan kebutuhan maintenance.

## 17. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten produk terlambat/tidak lengkap | Halaman kosong atau peluncuran tertunda | Content inventory, PIC, deadline, dan template field sejak awal |
| Klaim performa tanpa konteks | Risiko kepercayaan/legal | Wajibkan sumber, periode, satuan, dan approval sebelum publish |
| Foto asli belum tersedia | Kredibilitas dan kualitas visual turun | Jadwalkan produksi foto; gunakan placeholder internal yang tidak ikut rilis |
| WhatsApp menjadi satu-satunya jalur | Lead hilang ketika nomor tidak aktif | Sediakan form kontak dan proses pengecekan nomor berkala |
| Spam/abuse pada form | Beban operasional dan risiko keamanan | Honeypot/CAPTCHA adaptif, rate limit, validasi server, monitoring |
| CMS terlalu kompleks | Tim gagal memperbarui konten | Batasi field, preview, panduan singkat, dan UAT admin |
| Script pihak ketiga memperlambat situs | Target performa gagal | Audit tag, consent strategy, lazy-load, dan performance budget |
| Prioritas MVP tidak konsisten | Scope creep atau halaman buntu | Setujui normalisasi prioritas pada bagian 7 sebelum desain/build |

## 18. Tahapan Delivery dan Exit Criteria

### Tahap 1 - Discovery dan validasi

- Product owner, PIC konten, dan approver ditetapkan.
- Lini produk, kategori, CTA utama, scope MVP, serta alur lead disetujui.
- Inventaris konten selesai dan gap diberi owner/deadline.
- Platform/CMS dan pendekatan hosting diputuskan.

### Tahap 2 - UX/UI

- Sitemap, user flow, wireframe mobile/desktop, dan design system disetujui.
- Prototype jalur produk-ke-WhatsApp dan form kontak lulus usability review.
- Semua template utama memiliki empty, error, loading, dan success state.

### Tahap 3 - Build dan integrasi

- Fitur P0 selesai dan setiap acceptance criterion memiliki bukti uji.
- CMS, notifikasi lead, analytics, SEO, backup, dan keamanan dasar terkonfigurasi.
- Konten produksi diimpor dan diverifikasi pemilik konten.

### Tahap 4 - UAT dan peluncuran

- Tidak ada defect blocker/critical yang terbuka.
- Form dan WhatsApp diuji end-to-end pada perangkat nyata.
- Role CMS dan skenario CRUD lulus UAT.
- Target responsif, browser, aksesibilitas, performa, SEO, dan keamanan lulus release checklist.
- Backup dan restore telah diverifikasi.
- Redirect, sitemap, analytics, Search Console, serta halaman privasi aktif.

### Tahap 5 - Optimasi pascapeluncuran

- Pantau error, uptime, lead delivery, event analytics, dan indexing.
- Tetapkan baseline 30 hari.
- Review KPI bersama sales dan lakukan optimasi CTA/konten berdasarkan data.

## 19. Definition of Done MVP

MVP dinyatakan siap rilis ketika:

- Seluruh item P0 dan acceptance criteria wajib selesai.
- Tidak terdapat tautan, CTA, download, atau halaman buntu.
- Semua konten publik telah disetujui pemilik bisnis dan pihak teknis/legal yang relevan.
- Jalur beranda -> kategori -> detail produk -> WhatsApp berfungsi dan terukur.
- Form menghasilkan tepat satu lead, memberi feedback pengguna, mengirim notifikasi, serta tidak membocorkan PII ke analytics/log.
- Pengguna keyboard dan screen reader dapat menyelesaikan navigasi dan form utama.
- Pengujian keamanan dasar, rate limiting, dan role access lulus.
- Kriteria performa, responsivitas, SEO, browser, backup, dan analytics pada bagian 13-14 terpenuhi.
- Admin non-teknis lulus skenario UAT untuk produk, artikel, testimoni, sertifikasi, dan lead.
- Product owner memberi persetujuan rilis.

## 20. Keputusan yang Masih Dibutuhkan

| ID | Pertanyaan | Rekomendasi sementara | Pemilik keputusan |
|---|---|---|---|
| D-01 | Apa nama perusahaan, identitas merek, dan value proposition final? | Validasi pada workshop konten | Pemilik bisnis/Marketing |
| D-02 | Lini ternak apa saja yang benar-benar dijual? | Jangan tampilkan kategori tanpa produk aktif | Product/Sales |
| D-03 | CTA utama: konsultasi, katalog, atau tanya harga? | **Konsultasi Produk** untuk beranda; **Tanya Harga** pada detail | Marketing/Sales |
| D-04 | Apakah berita dasar masuk MVP? | Ya, karena dibutuhkan FR-06 dan CMS | Product owner |
| D-05 | Apakah Karir masuk MVP atau fase 1.1? | Fase 1.1 kecuali ada lowongan aktif saat rilis | HR/Product owner |
| D-06 | Apakah Kemitraan membutuhkan form khusus pada MVP? | Gunakan kontak/WhatsApp berkonteks pada MVP; form khusus P1 | Sales/Product owner |
| D-07 | Platform dan CMS apa yang dipilih? | Putuskan berdasarkan skill tim, biaya, keamanan, dan maintenance; jangan mengunci di PRD | Tech lead/Product owner |
| D-08 | Ke mana lead dikirim dan berapa SLA tindak lanjut? | Email grup sales + dashboard CMS; SLA bisnis ditetapkan sebelum rilis | Sales |
| D-09 | Apakah CV diunggah ke sistem atau dialihkan? | Redirect ke sistem/form resmi untuk mengurangi risiko data pada fase awal | HR/Legal |
| D-10 | Berapa lama data lead dan lamaran disimpan? | Tetapkan kebijakan retensi sebelum build form produksi | Legal/Business owner |
| D-11 | Berapa target pertumbuhan lead setelah baseline? | Tetapkan setelah 30 hari data, lalu review per kuartal | Product/Sales |
| D-12 | Apakah testimoni dan klaim performa telah memiliki izin/bukti? | Jangan publish tanpa approval dan konteks pengukuran | Legal/Technical |

## 21. Traceability Requirement Sumber

| Requirement sumber | Area PRD | Prioritas hasil normalisasi |
|---|---|---|
| FR-01 - FR-08 | EP-01, EP-02 | P0 |
| FR-09 - FR-12 | EP-03 | P0 bila konten tersedia |
| FR-13 - FR-15 | EP-04 | P0 |
| FR-16 | EP-04 | P1, menunggu konfirmasi |
| FR-17 - FR-18 | EP-06 | Informasi/CTA P0; form khusus/CRM P1 |
| FR-19 - FR-21 | EP-05 | Versi dasar P0 karena dependensi beranda/CMS |
| FR-22 - FR-23 | EP-07 | P1, menunggu konfirmasi |
| FR-24 - FR-26 | EP-08 | P0 |
| FR-27 - FR-29 | EP-09 | P0 |
| NFR-01 - NFR-08 | Bagian 12-13 | P0 |
| NFR-09 - NFR-12 | Bagian 13 | P0 |
| NFR-13 - NFR-15 | Bagian 9, 13, 14 | P0 karena kebutuhan operasional |
| NFR-16 | Bagian 13.5 | Struktur P0; konten multi-bahasa P2 |
| NFR-17 - NFR-19 | Bagian 13.4 | Release gate P0 |

## 22. Diagram Sistem

Use case diagram, flowchart alur pengunjung/lead, dan class diagram domain CMS tersedia di [Diagram Website Promosi Pakan Ternak](./Diagram_Website_Promosi_Pakan_Ternak.md).

---

**Catatan status:** PRD ini menerjemahkan dokumen requirement menjadi definisi produk yang dapat divalidasi dan dibangun. Seluruh keputusan pada bagian 20, terutama lini produk, scope Berita/Karir/Kemitraan, alur lead, retensi data, dan pilihan CMS, perlu disepakati sebelum desain visual dan development dimulai.
