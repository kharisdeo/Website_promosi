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
            <p className="eyebrow">Pakan ternak · Pendampingan · Indonesia</p>
            <h1>Tumbuh lebih <em>kuat</em>, mulai dari nutrisi yang tepat.</h1>
            <p>Formula pakan teruji dan tim yang hadir dekat untuk membantu setiap peternak mengambil keputusan dengan lebih percaya diri.</p>
            <div className="hero-buttons">
              <Link href="/products" className="button button-dark">Temukan Produk <ArrowUpRight size={18} /></Link>
              <a href={whatsappHref()} target="_blank" rel="noreferrer" className="button button-lime">Konsultasi via WhatsApp <ArrowUpRight size={18} /></a>
            </div>
            <div className="hero-note"><strong>2.400+</strong> peternak tumbuh bersama STS Feed</div>
          </div>
          <div className="hero-visual" aria-label="Peternak dan ternak yang sehat">
            <div className="hero-photo">
              <Image src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1000&q=84" alt="Peternak memberi pakan ternak di area kandang" fill sizes="(max-width: 760px) 90vw, 45vw" priority />
            </div>
            <div className="hero-sticker"><strong>16+</strong><span>tahun menemani</span></div>
            <div className="hero-quote"><p>“Pakan yang baik adalah awal dari keputusan yang baik.”</p><small>— Prinsip STS Feed</small></div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Sertifikasi dan standar mutu">
        <div className="container trust-inner">
          <p>Diproduksi dengan standar yang dapat dipercaya</p>
          <div className="cert-list">{certifications.map((cert) => <span key={cert.id} className="cert-chip">{cert.name}</span>)}</div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container why-grid">
          <div className="why-intro"><p className="eyebrow">Kenapa STS Feed</p><h2>Lebih dari sekadar pakan.</h2><p>Karena performa ternak selalu dimulai dari hal-hal yang dikerjakan dengan konsisten. Kami menyatukan nutrisi, mutu, dan pendampingan dalam satu perjalanan.</p><Link href="/about" className="text-link">Kenali kami lebih dekat <ArrowUpRight size={16} /></Link></div>
          <div className="why-list">
            <div className="why-item"><span className="why-number">01</span><h3>Formula terukur</h3><p>Dirancang bersama tim nutrisi untuk menjawab kebutuhan setiap fase pertumbuhan.</p></div>
            <div className="why-item"><span className="why-number">02</span><h3>Mutu terjaga</h3><p>Kontrol bahan baku dan proses produksi dilakukan berlapis sebelum sampai ke kandang.</p></div>
            <div className="why-item"><span className="why-number">03</span><h3>Tim yang dekat</h3><p>Sales dan pendamping lapangan siap menjadi rekan diskusi ketika kondisi berubah.</p></div>
            <div className="why-item"><span className="why-number">04</span><h3>Untuk jangka panjang</h3><p>Kami membangun kemitraan yang sehat agar usaha peternak terus bertumbuh.</p></div>
          </div>
        </div>
      </section>

      <section className="section home-products">
        <div className="container">
          <SectionHeading eyebrow="Portofolio produk" title="Temukan nutrisi untuk setiap tahap tumbuh." description="Pilih berdasarkan jenis ternak dan fase pakan. Jika masih ragu, tim kami siap membantu menemukan yang paling sesuai." action={{ href: "/products", label: "Lihat semua produk" }} />
          <div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="section section-forest">
        <div className="container">
          <SectionHeading eyebrow="Cerita dari kandang" title="Kepercayaan tumbuh dari hasil yang nyata." description="Setiap kandang memiliki cerita dan tantangannya sendiri. Inilah beberapa peternak yang bertumbuh bersama STS Feed." />
          <div className="testimonial-grid">{testimonials.map((testimonial) => <figure className="testimonial-card" key={testimonial.id}><blockquote className="testimonial-quote">{testimonial.quote}</blockquote><figcaption className="testimonial-footer"><span className="person"><Image className="avatar" src={testimonial.image} alt={testimonial.imageAlt} width={45} height={45} /><span><strong>{testimonial.name}</strong><small>{testimonial.businessType} · {testimonial.location}</small></span></span><span className="metric"><strong>{testimonial.metricValue}</strong><small>{testimonial.metricLabel}</small></span></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionHeading eyebrow="Wawasan peternakan" title="Bekal kecil untuk keputusan yang lebih baik." description="Cerita, tips, dan pengetahuan praktis dari dunia peternakan yang bisa langsung diterapkan." action={{ href: "/news", label: "Baca semua berita" }} />
          <div className="news-grid"><ArticleCard article={latestArticles[0]} featured /><div className="news-list">{latestArticles.slice(1).map((article) => <ArticleCard key={article.id} article={article} />)}</div></div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container partnership-band">
          <div><p className="eyebrow pill-light">Buka peluang bersama</p><h2>Ingin usaha ternakmu tumbuh lebih jauh?</h2><p>Mulai percakapan dengan tim kami tentang kebutuhan produk, distribusi, atau peluang kemitraan di wilayahmu.</p></div>
          <div className="partnership-side"><p>“Mari tumbuh dengan cara yang sehat dan terukur.”</p><Link href="/partnership" className="button button-lime">Pelajari Kemitraan <ArrowUpRight size={18} /></Link></div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Pakan ternak berkualitas untuk peternak Indonesia",
  description: `Temukan produk pakan ${siteSettings.shortName} dan pendampingan yang dekat untuk membantu ternak tumbuh optimal.`,
};
