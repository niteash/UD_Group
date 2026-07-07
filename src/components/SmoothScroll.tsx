import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Award-winning smooth scroll indicator with progress
 * Inspired by Awwwards-winning sites
 */
export function SmoothScrollIndicator() {
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${scrollPercent / 100})`;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, [reducedMotion]);

  return (
    <>
      {/* Vertical scroll progress bar */}
      <div className="fixed right-0 top-0 w-1 h-full z-50 bg-neutral-200 dark:bg-neutral-800 pointer-events-none">
        <div
          ref={progressRef}
          className="w-full h-full bg-gradient-to-b from-gold via-gold-light to-gold origin-top"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      {/* Horizontal scroll progress (top) */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
        <div className="h-full bg-gradient-to-r from-gold via-gold-light to-gold transition-all duration-300 ease-out" 
          style={{
            width: `${typeof window !== 'undefined' 
              ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 
              : 0}%`
          }}
        />
      </div>
    </>
  );
}
