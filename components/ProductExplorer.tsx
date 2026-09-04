"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

const animalFilters = ["Semua", "Ayam Bangkok", "Ikan koi", "Ayam pedaging", "Ayam petelur", "Sapi", "Kambing"] as const;
const stageFilters = ["Semua", "Starter", "Grower", "Layer", "Harian", "Breeder", "Katalog", "Finisher"] as const;

export default function ProductExplorer({ products }: { products: Product[] }) {
  const [animal, setAnimal] = useState<string>("Semua");
  const [stage, setStage] = useState<string>("Semua");
  const filtered = useMemo(() => products.filter((product) => (animal === "Semua" || product.animalType === animal) && (stage === "Semua" || product.feedStage === stage)), [products, animal, stage]);

  const selectAnimal = (value: string) => {
    setAnimal(value);
    window.history.replaceState(null, "", value === "Semua" && stage === "Semua" ? "/products" : `/products?animal=${encodeURIComponent(value === "Semua" ? "" : value)}&stage=${encodeURIComponent(stage === "Semua" ? "" : stage)}`.replace(/[?&](animal|stage)=$/g, "").replace("?&", "?"));
  };
  const selectStage = (value: string) => {
    setStage(value);
    window.history.replaceState(null, "", value === "Semua" && animal === "Semua" ? "/products" : `/products?animal=${encodeURIComponent(animal === "Semua" ? "" : animal)}&stage=${encodeURIComponent(value === "Semua" ? "" : value)}`.replace(/[?&](animal|stage)=$/g, "").replace("?&", "?"));
  };
  const reset = () => { setAnimal("Semua"); setStage("Semua"); window.history.replaceState(null, "", "/products"); };

  return (
    <>
      <div className="filter-bar" aria-label="Filter katalog produk">
        <div className="filter-group"><span className="filter-label">Kategori katalog</span>{animalFilters.map((value) => <button key={value} className={animal === value ? "filter-button active" : "filter-button"} type="button" aria-pressed={animal === value} onClick={() => selectAnimal(value)}>{value}</button>)}</div>
        <div className="filter-group"><span className="filter-label">Kebutuhan pakan</span>{stageFilters.map((value) => <button key={value} className={stage === value ? "filter-button active" : "filter-button"} type="button" aria-pressed={stage === value} onClick={() => selectStage(value)}>{value}</button>)}</div>
        {(animal !== "Semua" || stage !== "Semua") && <button className="reset-button" type="button" onClick={reset}>Reset filter</button>}
      </div>
      <p className="products-result" aria-live="polite">Menampilkan <strong>{filtered.length}</strong> dari {products.length} produk</p>
      <div className="product-grid">
        {filtered.length > 0 ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <div className="empty-state"><h3>Produk belum ditemukan</h3><p>Coba gunakan kombinasi filter lain atau hubungi tim kami untuk rekomendasi pakan yang sesuai.</p><button type="button" className="button button-dark" onClick={reset}>Tampilkan semua produk</button></div>}
      </div>
    </>
  );
}
