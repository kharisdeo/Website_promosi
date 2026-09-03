"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE = "/images/image-fallback.svg";

type SafeImageProps = ImageProps & { fallbackSrc?: string };

/**
 * Uses the configured image source when available and falls back to a local
 * asset if a remote content image is unavailable. This keeps the public UI
 * usable in offline previews and during an image CDN incident.
 */
export default function SafeImage({ fallbackSrc = FALLBACK_IMAGE, src: initialSrc, ...props }: SafeImageProps) {
  const [src, setSrc] = useState<ImageProps["src"]>(initialSrc);
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <Image
      {...props}
      src={src}
      onError={() => {
        if (!hasFailed) {
          setHasFailed(true);
          setSrc(fallbackSrc);
        }
      }}
    />
  );
}
