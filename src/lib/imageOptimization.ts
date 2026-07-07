/**
 * Image optimization utilities for better performance
 * Helps generate responsive images and optimize loading
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

/**
 * Generate optimized Cloudinary URL with transformations
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  const { width, height, quality = 80, format = 'webp' } = options;

  // Check if it's a Cloudinary URL
  if (!url.includes('cloudinary.com')) {
    return url;
  }

  // Build transformation string
  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);
  transformations.push('c_limit'); // Don't upscale

  const transformString = transformations.join(',');

  // Insert transformations into URL
  return url.replace('/upload/', `/upload/${transformString}/`);
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  return widths
    .map((width) => {
      const optimizedUrl = optimizeCloudinaryUrl(baseUrl, { width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Lazy load image with Intersection Observer
 */
export function lazyLoadImage(img: HTMLImageElement): void {
  const dataSrc = img.getAttribute('data-src');
  if (!dataSrc) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = dataSrc;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px',
    }
  );

  observer.observe(img);
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}
