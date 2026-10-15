import type { CSSProperties } from 'react';
import { photos, type PhotoName } from '@/lib/photos';

export type { PhotoName };

const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const fileUrl = (name: PhotoName, width: number) => `${base}images/${name}-${width}.webp`;

export function photoSrc(name: PhotoName, size: 'small' | 'large' = 'small') {
  const { widths } = photos[name];
  return fileUrl(name, size === 'large' ? widths[widths.length - 1] : widths[Math.min(1, widths.length - 1)]);
}

type PhotoProps = {
  name: PhotoName;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Responsive, optimized WebP image (multiple widths + srcset). */
export function Photo({ name, alt, sizes, priority = false, className, style }: PhotoProps) {
  const meta = photos[name];
  return (
    <img
      className={className}
      src={photoSrc(name)}
      srcSet={meta.widths.map((w) => `${fileUrl(name, w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={{ backgroundColor: meta.color, ...style }}
    />
  );
}
