import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className={`product-card accent-${product.accent}`}>
      <Link href={`/products/${product.slug}`} className="product-image-wrap" aria-label={`Lihat detail ${product.name}`}>
        <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" className="product-image" />
        <span className="product-badge">{product.animalType}</span>
        <span className="card-arrow"><ArrowUpRight size={19} /></span>
      </Link>
      <div className="product-card-body">
        <div className="product-meta"><span>{product.feedStage}</span><span aria-hidden="true">·</span><span>{product.packageSizes.join(" / ")}</span></div>
        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.shortDescription}</p>
        <ul className="mini-benefits">
          {product.benefits.slice(0, 2).map((benefit) => <li key={benefit}><Check size={14} />{benefit}</li>)}
        </ul>
      </div>
    </article>
  );
}
