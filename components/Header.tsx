"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { siteSettings } from "@/lib/data";

const navItems = [
  { href: "/about", label: "Tentang Kami" },
  { href: "/products", label: "Produk" },
  { href: "/news", label: "Berita" },
  { href: "/partnership", label: "Kemitraan" },
  { href: "/careers", label: "Karir" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${siteSettings.companyName}, beranda`} onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><Image src="/images/anugerah-jaya-abadi-logo.png" alt="" fill sizes="44px" /></span>
          <span className="brand-copy"><strong>JAYA ABADI</strong><small>DISTRIBUTOR PAKAN</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? "nav-link active" : "nav-link"}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/contact" className="button button-small button-dark header-contact">
            Konsultasi <ArrowUpRight size={16} strokeWidth={2.2} />
          </Link>
          <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Tutup menu" : "Buka menu"} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={open ? "mobile-menu is-open" : "mobile-menu"}>
        <nav aria-label="Navigasi mobile">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(pathname, item.href) ? "mobile-link active" : "mobile-link"} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
          <Link href="/contact" className="button button-dark mobile-cta" onClick={() => setOpen(false)}>
            Konsultasi Produk <ArrowUpRight size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
