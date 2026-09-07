"use client";

import dynamic from "next/dynamic";
import { RotateCcw } from "lucide-react";
import { useId, useRef, useState } from "react";
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
  const [rotation, setRotation] = useState({ pitch: -0.04, yaw: -0.28 });
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const instructionId = useId();

  return (
    <div className={`detail-image product-360-viewer accent-${accent}`}>
      <p id={instructionId} className="viewer-360-instructions">
        Seret model ke kiri, kanan, atas, atau bawah untuk memutar kemasan 360 derajat.
      </p>
      <ProductPouchScene
        alt={alt}
        frontTexture={frames?.front ?? src}
        backTexture={frames?.back ?? src}
        rotation={rotation}
      />
      <div
        className="viewer-3d-interaction"
        aria-hidden="true"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          lastPointer.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerMove={(event) => {
          if (!lastPointer.current) return;
          const deltaX = event.clientX - lastPointer.current.x;
          const deltaY = event.clientY - lastPointer.current.y;
          lastPointer.current = { x: event.clientX, y: event.clientY };
          setRotation((current) => ({
            yaw: current.yaw + deltaX * 0.012,
            pitch: Math.min(0.62, Math.max(-0.62, current.pitch + deltaY * 0.007)),
          }));
        }}
        onPointerUp={() => { lastPointer.current = null; }}
        onPointerCancel={() => { lastPointer.current = null; }}
      />
      <span className="product-badge">{badgeLabel}</span>
      <div className="viewer-360-caption" aria-hidden="true"><span>3D</span> Seret untuk memutar</div>
      <div className="viewer-360-controls" aria-label="Kontrol pratinjau 3D">
        <button type="button" onClick={() => setRotation({ pitch: -0.04, yaw: -0.28 })} aria-label="Kembalikan kemasan ke tampilan depan">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
