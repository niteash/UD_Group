import { useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

/**
 * Dynamic SEO component for updating meta tags based on active section
 * Improves search engine visibility and social sharing
 */
export function SEOHead() {
  const { language } = useLanguage();

  useEffect(() => {
    // Update language attribute
    const langCode = language === 'EN' ? 'en' : language === 'MM' ? 'my' : 'zh';
    document.documentElement.lang = langCode;
    
    // Add performance monitoring
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        if (lastEntry) {
          const lcpTime = lastEntry.renderTime || lastEntry.loadTime || 0;
          console.log('LCP:', lcpTime);
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as PerformanceEntry & {
            processingStart?: number;
            startTime: number;
          };
          if (fidEntry.processingStart) {
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
        }
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
      };
    }
  }, [language]);

  // Preload critical assets
  useEffect(() => {
    // Preload hero video using fetch hint (video is not a valid 'as' value)
    const link = document.createElement('link');
    link.rel = 'prefetch'; // Use prefetch for video instead of preload
    link.href = 'https://res.cloudinary.com/dcdc4hj6v/video/upload/v1782373187/I_want_the_output_format_with_xvccoz.mp4';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return null;
}
