"use client";

import dynamic from "next/dynamic";
import { RotateCcw } from "lucide-react";
import { useId, useState } from "react";
import type { ProductViewerFrames } from "@/lib/types";

const ProductPouchScene = dynamic(() => import("@/components/ProductPouchScene"), {
  ssr: false,
  loading: () => <div className="viewer-3d-loading">Menyiapkan model 3D…</div>,
});

interface Product360ViewerProps {
  src: string;
  alt: string;
  accent: string;
  badgeLabel: string;
  frames?: ProductViewerFrames;
}

/**
 * Viewer produk berbasis WebGL. Model kemasan dibuat sebagai mesh pouch
 * ber-volume di ProductPouchScene, bukan enam gambar pada sisi kotak.
 */
export default function Product360Viewer({ src, alt, accent, badgeLabel, frames }: Product360ViewerProps) {
  const [resetVersion, setResetVersion] = useState(0);
  const instructionId = useId();

  return (
    <div className={`detail-image product-360-viewer accent-${accent}`}>
      <p id={instructionId} className="viewer-360-instructions">
        Seret model untuk memutar kemasan 360 derajat. Gulir untuk memperbesar atau memperkecil tampilan.
      </p>
      <ProductPouchScene
        alt={alt}
        frontTexture={frames?.front ?? src}
        backTexture={frames?.back ?? src}
        resetVersion={resetVersion}
      />
      <span className="product-badge">{badgeLabel}</span>
      <div className="viewer-360-caption" aria-hidden="true"><span>3D</span> Seret untuk memutar</div>
      <div className="viewer-360-controls" aria-label="Kontrol pratinjau 3D">
        <button type="button" onClick={() => setResetVersion((version) => version + 1)} aria-label="Kembalikan kemasan ke tampilan depan">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
