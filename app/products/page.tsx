import type { Metadata } from "next";
import ProductExplorer from "@/components/ProductExplorer";
import { getPublishedProducts, siteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Katalog pakan ayam Bangkok dan koi",
  description: `Jelajahi pilihan pakan ayam Bangkok dan koi yang tersedia melalui distributor ${siteSettings.shortName}.`,
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span>/</span><span>Katalog</span></nav><p className="eyebrow">Katalog {siteSettings.shortName}</p><h1>Pilihan pakan untuk ayam Bangkok dan koi.</h1><p>Temukan HI-PRO-VITE, Hikari, Hiroyuki, Ikushu, WellRED, dan produk lain yang tersedia melalui distributor kami. Pilih kategori atau kebutuhan pakan untuk mulai menjelajah.</p></div></section>
      <section className="section"><div className="container"><ProductExplorer products={getPublishedProducts()} /></div></section>
    </>
  );
}
