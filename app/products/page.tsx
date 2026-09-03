import type { Metadata } from "next";
import ProductExplorer from "@/components/ProductExplorer";
import { getPublishedProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Produk pakan ternak",
  description: "Jelajahi produk pakan STS Feed berdasarkan jenis ternak dan fase pertumbuhan.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero"><div className="container"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Beranda</a><span>/</span><span>Produk</span></nav><p className="eyebrow">Portofolio nutrisi STS Feed</p><h1>Pakan yang mengerti kebutuhan setiap fase.</h1><p>Temukan formula yang sesuai untuk ternakmu. Pilih jenis ternak atau fase pakan untuk mulai menjelajah.</p></div></section>
      <section className="section"><div className="container"><ProductExplorer products={getPublishedProducts()} /></div></section>
    </>
  );
}
