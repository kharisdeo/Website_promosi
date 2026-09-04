"use client";

import { RotateCcw } from "lucide-react";
import { useId, useRef, useState } from "react";
import SafeImage from "@/components/SafeImage";

export interface ProductViewerFrames {
  front?: string;
  back?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

interface Product360ViewerProps {
  src: string;
  alt: string;
  accent: string;
  badgeLabel: string;
  frames?: ProductViewerFrames;
}

type ViewerFace = keyof ProductViewerFrames;

const PITCH_LIMIT = 58;
const clampPitch = (value: number) => Math.min(PITCH_LIMIT, Math.max(-PITCH_LIMIT, value));

function ProductFace({ face, src, alt }: { face: ViewerFace; src?: string; alt: string }) {
  const label = { front: "Depan", back: "Belakang", left: "Sisi kiri", right: "Sisi kanan", top: "Bagian atas", bottom: "Bagian bawah" }[face];

  return (
    <div className={`viewer-360-face viewer-360-${face}`}>
      {src ? (
        <SafeImage src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 45vw" draggable={false} />
      ) : (
        <div className="viewer-360-fallback">
          <span>{label}</span>
          <small>Frame produk belum tersedia</small>
        </div>
      )}
    </div>
  );
}

/**
 * A six-sided, CSS 3D product viewer. Add real package imagery later through
 * Product.viewerFrames (front, back, left, right, top, bottom); absent frames
 * deliberately render as labelled placeholders instead of mirroring the front.
 */
export default function Product360Viewer({ src, alt, accent, badgeLabel, frames }: Product360ViewerProps) {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(-4);
  const [isDragging, setIsDragging] = useState(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const instructionId = useId();

  const rotateBy = (degrees: number) => setYaw((current) => current + degrees);
  const resetRotation = () => {
    setYaw((current) => {
      const remainder = current % 360;
      return Math.abs(remainder) > 180 ? remainder - Math.sign(remainder) * 360 : remainder;
    });
    setPitch(-4);
  };

  const stopDragging = () => {
    setIsDragging(false);
    lastPointer.current = null;
  };

  return (
    <div className={`detail-image product-360-viewer accent-${accent}`}>
      <p id={instructionId} className="viewer-360-instructions">Geser kiri atau kanan untuk memutar 360 derajat. Geser atas atau bawah untuk melihat bagian atas dan bawah kemasan.</p>
      <div
        className="viewer-360-stage"
        role="group"
        aria-label={`Pratinjau 3D ${alt}`}
        aria-describedby={instructionId}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            rotateBy(-25);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            rotateBy(25);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setPitch((current) => clampPitch(current + 15));
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setPitch((current) => clampPitch(current - 15));
          } else if (event.key === "Home") {
            event.preventDefault();
            resetRotation();
          }
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          lastPointer.current = { x: event.clientX, y: event.clientY };
          setIsDragging(true);
        }}
        onPointerMove={(event) => {
          if (!lastPointer.current) return;
          const deltaX = event.clientX - lastPointer.current.x;
          const deltaY = event.clientY - lastPointer.current.y;
          lastPointer.current = { x: event.clientX, y: event.clientY };
          setYaw((current) => current + deltaX * 0.7);
          setPitch((current) => clampPitch(current - deltaY * 0.38));
        }}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <div className="viewer-360-shadow" aria-hidden="true" />
        <div
          className={`viewer-360-rotor ${isDragging ? "is-dragging" : ""}`}
          style={{ transform: `translateX(-50%) rotateX(${pitch}deg) rotateY(${yaw}deg)` }}
          aria-hidden="true"
        >
          <ProductFace face="front" src={frames?.front ?? src} alt="" />
          <ProductFace face="back" src={frames?.back} alt="" />
          <ProductFace face="left" src={frames?.left} alt="" />
          <ProductFace face="right" src={frames?.right} alt="" />
          <ProductFace face="top" src={frames?.top} alt="" />
          <ProductFace face="bottom" src={frames?.bottom} alt="" />
        </div>
      </div>

      <span className="product-badge">{badgeLabel}</span>
      <div className="viewer-360-caption" aria-hidden="true"><span>360°</span> Geser untuk memutar</div>
      <div className="viewer-360-controls" aria-label="Kontrol pratinjau 3D">
        <button type="button" onClick={() => rotateBy(-45)} aria-label="Putar ke kiri">↶</button>
        <button type="button" onClick={resetRotation} aria-label="Kembalikan ke tampilan depan"><RotateCcw size={16} /></button>
        <button type="button" onClick={() => rotateBy(45)} aria-label="Putar ke kanan">↷</button>
      </div>
    </div>
  );
}
