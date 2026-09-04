import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { siteSettings } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <Link href="/" className="brand brand-footer" aria-label={`${siteSettings.companyName}, beranda`}>
            <span className="brand-mark" aria-hidden="true"><Image src="/images/anugerah-jaya-abadi-logo.png" alt="" fill sizes="44px" /></span>
            <span className="brand-copy"><strong>JAYA ABADI</strong><small>DISTRIBUTOR PAKAN</small></span>
          </Link>
          <p>Menumbuhkan kepercayaan, satu kandang setiap hari.</p>
          <Link href="/contact" className="text-link">Bicara dengan tim kami <ArrowUpRight size={16} /></Link>
        </div>
        <div className="footer-column">
          <p className="eyebrow footer-label">Jelajahi</p>
          <Link href="/about">Tentang Kami</Link>
          <Link href="/products">Produk</Link>
          <Link href="/news">Berita & Edukasi</Link>
          <Link href="/partnership">Kemitraan</Link>
          <Link href="/careers">Karir</Link>
        </div>
        <div className="footer-column footer-contact">
          <p className="eyebrow footer-label">Hubungi</p>
          <a href={`tel:${siteSettings.phone.replace(/\D/g, "")}`}><Phone size={16} />{siteSettings.phone}</a>
          <a href={`mailto:${siteSettings.email}`}><Mail size={16} />{siteSettings.email}</a>
          <a href={siteSettings.mapUrl} target="_blank" rel="noreferrer"><MapPin size={16} />{siteSettings.address}</a>
          <a href={siteSettings.instagram} target="_blank" rel="noreferrer"><Instagram size={16} />@anugerahjayaabadi</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {siteSettings.companyName}. Hak cipta dilindungi.</p>
        <div><Link href="/privacy">Kebijakan Privasi</Link><span aria-hidden="true">·</span><Link href="/contact">Kontak</Link></div>
      </div>
    </footer>
  );
}
