import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { certifications, getPublishedArticles, getPublishedProducts, siteSettings, testimonials } from "@/lib/data";
import { whatsappHref } from "@/components/WhatsAppFloat";

export default function HomePage() {
  const featuredProducts = getPublishedProducts().slice(0, 3);
  const latestArticles = getPublishedArticles().slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Distributor pakan · Ayam Bangkok · Koi</p>
            <h1>Pilihan pakan yang <em>tepat</em>, untuk rawatan yang lebih tenang.</h1>
            <p>Anugerah Jaya Abadi membantu peternak dan penghobi menemukan pakan ayam Bangkok serta koi dari merek tepercaya, dengan informasi stok yang transparan.</p>
            <div className="hero-buttons">
              <Link href="/products" className="button button-dark">Temukan Produk <ArrowUpRight size={18} /></Link>
              <a href={whatsappHref()} target="_blank" rel="noreferrer" className="button button-lime">Konsultasi via WhatsApp <ArrowUpRight size={18} /></a>
            </div>
            <div className="hero-note"><strong>Jaya Abadi</strong> distributor pakan untuk kebutuhan harianmu</div>
          </div>
          <div className="hero-visual" aria-label="Peternak dan ternak yang sehat">
            <div className="hero-photo">
              <Image src="/images/products/hi-pro-vite-catalog.png" alt="Kolase produk HI-PRO-VITE untuk ayam Bangkok" fill sizes="(max-width: 760px) 90vw, 45vw" priority />
            </div>
            <div className="hero-sticker"><strong>2</strong><span>kategori utama</span></div>
            <div className="hero-quote"><p>“Pilih pakan sesuai fase, lalu cek stok sebelum berangkat.”</p><small>— Prinsip Jaya Abadi</small></div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Sertifikasi dan standar mutu">
        <div className="container trust-inner">
          <p>Merek pilihan yang tersedia melalui distributor</p>
          <div className="cert-list">{certifications.map((cert) => <span key={cert.id} className="cert-chip">{cert.name}</span>)}</div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container why-grid">
          <div className="why-intro"><p className="eyebrow">Kenapa Jaya Abadi</p><h2>Belanja pakan terasa lebih jelas.</h2><p>Kami membantu membandingkan pilihan pakan berdasarkan jenis dan fase, lalu mengarahkanmu ke tim yang bisa mengonfirmasi stok serta kebutuhan pengiriman.</p><Link href="/about" className="text-link">Kenali kami lebih dekat <ArrowUpRight size={16} /></Link></div>
          <div className="why-list">
            <div className="why-item"><span className="why-number">01</span><h3>Katalog lebih terarah</h3><p>Temukan pilihan pakan ayam Bangkok dan koi dalam satu katalog yang mudah dijelajahi.</p></div>
            <div className="why-item"><span className="why-number">02</span><h3>Stok transparan</h3><p>Detail produk diberi penanda konfirmasi stok agar ekspektasi belanja tetap realistis.</p></div>
            <div className="why-item"><span className="why-number">03</span><h3>Konsultasi dekat</h3><p>Tim Jaya Abadi siap membantu membaca kebutuhan sebelum kamu memilih produk.</p></div>
            <div className="why-item"><span className="why-number">04</span><h3>Distribusi praktis</h3><p>Bahas kebutuhan pengiriman, kemitraan, atau reseller dalam satu percakapan.</p></div>
          </div>
        </div>
      </section>

      <section className="section home-products">
        <div className="container">
          <SectionHeading eyebrow="Katalog produk" title="Pakan ayam Bangkok dan koi, lebih mudah ditemukan." description="Jelajahi pilihan HI-PRO-VITE, Hikari, Hiroyuki, Ikushu, WellRED, dan produk koi lain yang tersedia melalui Jaya Abadi. Konfirmasi stok sebelum memesan." action={{ href: "/products", label: "Lihat semua produk" }} />
          <div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="section section-forest">
        <div className="container">
          <SectionHeading eyebrow="Cerita dari kandang" title="Kepercayaan tumbuh dari layanan yang jujur." description="Setiap kandang memiliki kebutuhan yang berbeda. Kami membantu memilih dan mengonfirmasi ketersediaan pakan sebelum transaksi." />
          <div className="testimonial-grid">{testimonials.map((testimonial) => <figure className="testimonial-card" key={testimonial.id}><blockquote className="testimonial-quote">{testimonial.quote}</blockquote><figcaption className="testimonial-footer"><span className="person"><Image className="avatar" src={testimonial.image} alt={testimonial.imageAlt} width={45} height={45} /><span><strong>{testimonial.name}</strong><small>{testimonial.businessType} · {testimonial.location}</small></span></span><span className="metric"><strong>{testimonial.metricValue}</strong><small>{testimonial.metricLabel}</small></span></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionHeading eyebrow="Wawasan peternakan" title="Bekal kecil untuk keputusan yang lebih baik." description="Cerita dan tips praktis tentang pakan ayam, koi, penyimpanan, serta cara berdiskusi dengan distributor." action={{ href: "/news", label: "Baca semua berita" }} />
          <div className="news-grid"><ArticleCard article={latestArticles[0]} featured /><div className="news-list">{latestArticles.slice(1).map((article) => <ArticleCard key={article.id} article={article} />)}</div></div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container partnership-band">
          <div><p className="eyebrow pill-light">Buka peluang bersama</p><h2>Butuh stok rutin atau ingin menjadi reseller?</h2><p>Mulai percakapan dengan tim kami tentang kebutuhan produk, distribusi, atau peluang kemitraan di wilayahmu.</p></div>
          <div className="partnership-side"><p>“Mari membuat kebutuhan pakan terasa lebih pasti.”</p><Link href="/partnership" className="button button-lime">Pelajari Kemitraan <ArrowUpRight size={18} /></Link></div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Distributor pakan ayam Bangkok dan koi",
  description: `Temukan katalog pakan ${siteSettings.shortName} untuk ayam Bangkok dan koi, lalu konfirmasi stok bersama tim kami.`,
};
