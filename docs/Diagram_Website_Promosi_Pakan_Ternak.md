# Diagram Sistem Website Promosi Pakan Ternak

Dokumen ini melengkapi [PRD Website Promosi Pakan Ternak](./PRD_Website_Promosi_Pakan_Ternak.md). Diagram mengikuti scope MVP yang telah dinormalisasi: katalog dan detail produk, CTA WhatsApp, form lead, berita dasar, CMS, notifikasi, dan analytics. Form kemitraan lanjutan serta modul karir publik ditandai sebagai fase berikutnya.

## 1. Use Case Diagram

Diagram ini memperlihatkan aktor yang berinteraksi dengan website publik, CMS, serta layanan eksternal.

```mermaid
flowchart LR
    classDef actor fill:#fff,stroke:#334155,stroke-width:1px,color:#0f172a
    classDef usecase fill:#eff6ff,stroke:#2563eb,stroke-width:1px,color:#0f172a
    classDef external fill:#f8fafc,stroke:#64748b,stroke-width:1px,color:#0f172a

    Peternak[Peternak]
    Distributor[Distributor / Reseller / Mitra]
    Buyer[Buyer Korporat]
    Pelamar[Pelamar Kerja]
    Admin[Super Admin]
    Editor[Editor Konten]
    Sales[Sales]
    WhatsApp[WhatsApp]
    Email[Email / CRM]
    GA[GA4 & Search Console]

    subgraph Sistem[Website Promosi Pakan Ternak]
        UC1((Lihat beranda & keunggulan))
        UC2((Jelajah katalog produk))
        UC3((Filter produk))
        UC4((Lihat spesifikasi produk))
        UC5((Unduh brosur / katalog))
        UC6((Tanya harga via WhatsApp))
        UC7((Baca berita))
        UC8((Lihat profil & kredibilitas))
        UC9((Lihat kemitraan))
        UC10((Kirim form kontak))
        UC11((Lihat kontak & peta))
        UC12((Lihat lowongan & melamar))
        UC13((Kelola produk & dokumen))
        UC14((Kelola artikel & kategori))
        UC15((Kelola testimoni & sertifikasi))
        UC16((Kelola lowongan))
        UC17((Tinjau, ubah status & ekspor lead))
        UC18((Kelola user & role))
        UC19((Validasi, proteksi spam & rate limit))
        UC20((Catat event konversi))
    end

    Peternak --> UC1
    Peternak --> UC2
    Peternak --> UC3
    Peternak --> UC4
    Peternak --> UC5
    Peternak --> UC6
    Peternak --> UC7
    Peternak --> UC8
    Peternak --> UC11
    Peternak --> UC10

    Distributor --> UC2
    Distributor --> UC4
    Distributor --> UC6
    Distributor --> UC7
    Distributor --> UC8
    Distributor --> UC9
    Distributor --> UC11
    Distributor --> UC10

    Buyer --> UC4
    Buyer --> UC5
    Buyer --> UC6
    Buyer --> UC7
    Buyer --> UC8
    Buyer --> UC11
    Buyer --> UC10

    Pelamar --> UC12

    Admin --> UC13
    Admin --> UC14
    Admin --> UC15
    Admin --> UC16
    Admin --> UC17
    Admin --> UC18

    Editor --> UC13
    Editor --> UC14
    Editor --> UC15
    Editor --> UC16

    Sales --> UC17

    UC6 --> WhatsApp
    UC10 --> UC19
    UC12 --> UC19
    UC19 --> Email
    UC17 --> Email
    UC1 --> UC20
    UC2 --> UC20
    UC4 --> UC20
    UC5 --> UC20
    UC6 --> UC20
    UC7 --> UC20
    UC8 --> UC20
    UC11 --> UC20
    UC10 --> UC20
    UC20 --> GA

    class Peternak,Distributor,Buyer,Pelamar,Admin,Editor,Sales actor
    class WhatsApp,Email,GA external
    class UC1,UC2,UC3,UC4,UC5,UC6,UC7,UC8,UC9,UC10,UC11,UC12,UC13,UC14,UC15,UC16,UC17,UC18,UC19,UC20 usecase
```

### Catatan use case

- `UC6` adalah konversi intent tinggi dan harus tersedia di detail produk serta sebagai tombol floating global.
- `UC19` dipakai oleh semua form yang menerima data pengunjung; upload CV mengikuti keputusan keamanan dan privasi fase berikutnya.
- `UC16` dapat disiapkan di CMS pada MVP, sedangkan halaman lowongan publik ditargetkan P1 sesuai keputusan pada PRD.
- Akses Editor dibatasi pada konten; pengelolaan user, role, dan pengaturan sensitif hanya untuk Super Admin.

## 2. Flowchart Alur Pengunjung dan Lead

Alur berikut memprioritaskan dua jalur konversi MVP: permintaan harga/konsultasi melalui WhatsApp dan pengiriman form kontak. Jalur kemitraan lanjutan diberi titik perluasan.

```mermaid
flowchart TD
    A([Mulai]) --> B[Pengunjung membuka website]
    B --> C{Intent utama?}

    C -->|Cari produk| D[Lihat kategori produk]
    D --> E[Filter jenis ternak / fase pakan]
    E --> F[Pilih produk]
    F --> G[Lihat detail: foto, nutrisi, kemasan]
    G --> H{Aksi pengunjung?}
    H -->|Unduh katalog| I[Download PDF]
    I --> J[Catat event download_catalog]
    H -->|Tanya harga| K[Klik Tanya Harga via WhatsApp]
    K --> L[Isi pesan otomatis: produk + URL]
    L --> M[Buka WhatsApp dan lanjutkan percakapan]
    M --> N[Catat event click_whatsapp]

    C -->|Pertanyaan umum| O[Buka Kontak / Konsultasi]
    O --> P[Isi nama, nomor HP, dan pesan]
    P --> Q[Validasi client + server]
    Q --> R{Input valid?}
    R -->|Tidak| S[Tampilkan error spesifik]
    S --> P
    R -->|Ya| T[Honeypot / CAPTCHA + rate limit]
    T --> U{Lolos proteksi?}
    U -->|Tidak| V[Tolak dan tampilkan pesan aman]
    U -->|Ya| W[Simpan lead sekali]
    W --> X[Kirim notifikasi ke sales]
    X --> Y[Tampilkan konfirmasi sukses]
    Y --> Z[Catat event submit_contact_form]

    C -->|Pertimbangkan kemitraan| AA[Lihat informasi kemitraan]
    AA --> AB{Form khusus aktif?}
    AB -->|Tidak - MVP| AC[Klik WhatsApp / kontak dengan konteks kemitraan]
    AC --> M
    AB -->|Ya - P1| AD[Isi lokasi, jenis usaha, dan kontak]
    AD --> Q

    C -->|Cari pekerjaan| AE[Lihat lowongan aktif]
    AE --> AF{Ada lowongan?}
    AF -->|Tidak| AG[Tampilkan empty state]
    AF -->|Ya| AH[Lihat detail posisi]
    AH --> AI[Klik jalur lamaran resmi]

    B --> AJ[Catat page_view dan sumber UTM]
    F --> AJ
    G --> AJ
    AJ --> AK([Selesai / tindak lanjut oleh sales])
    N --> AK
    J --> AK
    Z --> AK
    V --> AK
    AG --> AK
    AI --> AK
```

## 3. Class Diagram Domain dan CMS

Diagram ini menggambarkan entitas inti yang perlu didukung oleh CMS dan relasi data publik/operasional. Implementasi fisik dapat menggunakan tabel relasional, collection CMS, atau model yang ekuivalen.

```mermaid
classDiagram
    class User {
        +UUID id
        +string name
        +string email
        +UserStatus status
        +datetime lastLoginAt
        +can(action) bool
    }

    class Role {
        +UUID id
        +string name
        +string[] permissions
    }

    class Product {
        +UUID id
        +string name
        +string slug
        +ProductStatus status
        +string shortDescription
        +string description
        +string animalType
        +string feedStage
        +string[] packageSizes
        +string metaTitle
        +string metaDescription
        +publish()
        +archive()
    }

    class ProductSpecification {
        +UUID id
        +string label
        +string value
        +string unit
        +int sortOrder
    }

    class ProductDocument {
        +UUID id
        +string fileUrl
        +string fileName
        +int fileSizeKb
        +string mimeType
        +string altText
    }

    class Category {
        +UUID id
        +string name
        +CategoryType type
        +string slug
    }

    class MediaAsset {
        +UUID id
        +string fileUrl
        +string altText
        +string usageRights
        +int width
        +int height
    }

    class Testimonial {
        +UUID id
        +string name
        +string location
        +string businessType
        +string quote
        +string metricLabel
        +string metricValue
        +string measurementContext
        +bool publicationConsent
        +publish()
    }

    class Certification {
        +UUID id
        +string name
        +string issuer
        +int issueYear
        +string status
        +string referenceNumber
        +string documentUrl
    }

    class Article {
        +UUID id
        +string title
        +string slug
        +string excerpt
        +string body
        +ArticleStatus status
        +datetime publishedAt
        +publish()
        +archive()
    }

    class Vacancy {
        +UUID id
        +string position
        +string location
        +string employmentType
        +string description
        +string requirements
        +datetime closingAt
        +VacancyStatus status
    }

    class Lead {
        +UUID id
        +LeadType type
        +string name
        +string phone
        +string message
        +string sourcePage
        +string utmSource
        +LeadStatus status
        +datetime createdAt
        +markContacted()
        +export()
    }

    class SiteSetting {
        +string companyName
        +string address
        +string phone
        +string email
        +string operatingHours
        +string whatsappNumber
        +string whatsappTemplate
        +string[] socialLinks
        +string mapEmbedUrl
    }

    class UserStatus {
        <<enumeration>>
        ACTIVE
        INVITED
        SUSPENDED
    }

    class ProductStatus {
        <<enumeration>>
        DRAFT
        PUBLISHED
        ARCHIVED
    }

    class ArticleStatus {
        <<enumeration>>
        DRAFT
        PUBLISHED
        ARCHIVED
    }

    class VacancyStatus {
        <<enumeration>>
        DRAFT
        ACTIVE
        CLOSED
    }

    class LeadType {
        <<enumeration>>
        CONTACT
        PRODUCT
        PARTNERSHIP
    }

    class LeadStatus {
        <<enumeration>>
        NEW
        CONTACTED
        QUALIFIED
        CLOSED
        SPAM
    }

    Role "1" --> "many" User : assigned to
    Product "1" --> "many" ProductSpecification : has
    Product "1" --> "many" ProductDocument : provides
    Product "many" --> "many" Category : categorized by
    Product "many" --> "many" MediaAsset : uses
    Product "0..1" --> "many" Testimonial : supported by
    Testimonial "1" --> "1" MediaAsset : portrait/photo
    Certification "1" --> "0..many" MediaAsset : badge/logo
    Article "many" --> "1" User : authored by
    Article "many" --> "many" Category : classified by
    Article "many" --> "many" MediaAsset : uses
    Vacancy "many" --> "1" User : managed by
    Lead "0..many" --> "0..1" Product : concerns
    Lead "many" --> "0..1" User : assigned to
    User "1" --> "many" Article : creates/updates
    User "1" --> "many" Product : creates/updates
    User "1" --> "many" Lead : updates
```

### Aturan domain penting

- Hanya `PUBLISHED`, `ACTIVE`, dan status publik yang sesuai yang boleh tampil pada website.
- `Lead.phone`, `Lead.message`, dan dokumen lamaran tidak boleh dikirim ke analytics.
- `ProductSpecification` disimpan terstruktur agar dapat ditampilkan konsisten dan mudah dibandingkan di masa depan.
- `Category` dapat dipakai untuk jenis ternak maupun fase pakan, tetapi tipe kategorinya harus dibedakan agar filter tidak ambigu.
- `MediaAsset` menyimpan alt text dan hak penggunaan untuk mendukung aksesibilitas serta bukti legal aset.
- Relasi `Lead -> Product` bersifat opsional karena form kontak umum tidak selalu terkait produk tertentu.
