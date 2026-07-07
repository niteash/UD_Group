import { lazy, Suspense, useEffect, useState } from 'react';

// Lazy load WebGL background to defer heavy Three.js initialization
const LazyWebglBackground = lazy(() => 
  import('./WebglBackground').then(m => ({ default: m.WebglBackground }))
);

/**
 * Optimized WebGL Background Loader
 * Defers WebGL initialization until after LCP to improve initial page load
 */
export function DeferredWebglBackground() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer WebGL initialization until after critical content is painted
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(
        () => setShouldLoad(true),
        { timeout: 1000 }
      );
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldLoad) {
    // Static gradient fallback for instant paint
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#121212]" />
    );
  }

  return (
    <Suspense fallback={
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#121212]" />
    }>
      <LazyWebglBackground />
    </Suspense>
  );
}
