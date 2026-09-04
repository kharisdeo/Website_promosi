import type { Metadata } from "next";
import ProductExplorer from "@/components/ProductExplorer";
import { getPublishedProducts, siteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pilihan pakan untuk hewan ternak",
  description: `Jelajahi pilihan pakan untuk berbagai hewan ternak yang tersedia melalui distributor ${siteSettings.shortName}.`,
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span>/</span><span>Katalog</span></nav><p className="eyebrow">Katalog {siteSettings.shortName}</p><h1>Pilihan pakan untuk hewan ternak.</h1><p>Temukan produk dari berbagai kategori ternak yang tersedia melalui distributor kami. Pilih kategori atau kebutuhan pakan untuk mulai menjelajah.</p></div></section>
      <section className="section"><div className="container"><ProductExplorer products={getPublishedProducts()} /></div></section>
    </>
  );
}
