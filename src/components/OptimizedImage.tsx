import { useState, useEffect, useRef } from 'react';
import { optimizeCloudinaryUrl, generateSrcSet } from '../lib/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

/**
 * Optimized image component with lazy loading and responsive images
 * Automatically generates WebP versions and srcset for Cloudinary images
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 80,
  loading = 'lazy',
  sizes = '100vw',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized URLs
  const optimizedSrc = optimizeCloudinaryUrl(src, { width, height, quality, format: 'webp' });

  // Generate srcset for responsive images
  const srcSet = src.includes('cloudinary.com')
    ? generateSrcSet(src, [400, 800, 1200, 1600, 2000])
    : undefined;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <picture>
      {/* WebP source for modern browsers */}
      {srcSet && (
        <source
          type="image/webp"
          srcSet={srcSet}
          sizes={sizes}
        />
      )}
      
      {/* Image element */}
      <img
        ref={imgRef}
        src={loading === 'lazy' ? undefined : optimizedSrc}
        data-src={loading === 'lazy' ? optimizedSrc : undefined}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        loading={loading}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        decoding="async"
      />
    </picture>
  );
}
