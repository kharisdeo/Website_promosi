"use client";

import { RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import SafeImage from "@/components/SafeImage";

interface Product360ViewerProps {
  src: string;
  alt: string;
  accent: string;
  badgeLabel: string;
}

const normalizeRotation = (value: number) => ((value % 360) + 360) % 360;

/**
 * An interactive 3D product preview. The supplied local package render is
 * placed on a dimensional pack so visitors can inspect it by dragging or
 * using the keyboard controls without adding an external 3D dependency.
 */
export default function Product360Viewer({ src, alt, accent, badgeLabel }: Product360ViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastPointerX = useRef<number | null>(null);

  const rotateBy = (degrees: number) => setRotation((current) => normalizeRotation(current + degrees));
  const resetRotation = () => setRotation(0);

  const stopDragging = () => {
    setIsDragging(false);
    lastPointerX.current = null;
  };

  return (
    <div className={`detail-image product-360-viewer accent-${accent}`}>
      <div
        className="viewer-360-stage"
        role="group"
        aria-label={`Pratinjau 360 derajat ${alt}`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            rotateBy(-25);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            rotateBy(25);
          }
          if (event.key === "Home") {
            event.preventDefault();
            resetRotation();
          }
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          lastPointerX.current = event.clientX;
          setIsDragging(true);
        }}
        onPointerMove={(event) => {
          if (lastPointerX.current === null) return;
          const distance = event.clientX - lastPointerX.current;
          lastPointerX.current = event.clientX;
          rotateBy(distance * 0.7);
        }}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <div className="viewer-360-shadow" aria-hidden="true" />
        <div className={`viewer-360-pack ${isDragging ? "is-dragging" : ""}`} style={{ transform: `rotateY(${rotation}deg)` }} aria-hidden="true">
          <div className="viewer-360-face viewer-360-front"><SafeImage src={src} alt="" fill sizes="(max-width: 760px) 100vw, 45vw" draggable={false} /></div>
          <div className="viewer-360-face viewer-360-back"><SafeImage src={src} alt="" fill sizes="(max-width: 760px) 100vw, 45vw" draggable={false} /></div>
          <div className="viewer-360-side viewer-360-side-right" />
          <div className="viewer-360-side viewer-360-side-left" />
        </div>
      </div>

      <span className="product-badge">{badgeLabel}</span>
      <div className="viewer-360-caption" aria-hidden="true"><span>360°</span> Geser untuk memutar</div>
      <div className="viewer-360-controls" aria-label="Kontrol pratinjau 360 derajat">
        <button type="button" onClick={() => rotateBy(-45)} aria-label="Putar ke kiri">↶</button>
        <button type="button" onClick={resetRotation} aria-label="Kembalikan ke tampilan depan"><RotateCcw size={16} /></button>
        <button type="button" onClick={() => rotateBy(45)} aria-label="Putar ke kanan">↷</button>
      </div>
    </div>
  );
}
