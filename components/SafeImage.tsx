"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  fallbackSrc = "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200",
  priority,
  unoptimized,
  ...props 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  // If the source is Unsplash, we use unoptimized to avoid local proxy 404s
  const isUnsplash = typeof imgSrc === 'string' && imgSrc.includes('unsplash.com');

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      priority={priority}
      unoptimized={unoptimized || isUnsplash}
      onError={() => {
        // Silently switch to fallback without logging errors to console
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
