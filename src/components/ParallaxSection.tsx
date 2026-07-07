import { useRef, useEffect, ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Award-winning parallax effect for depth and visual interest
 * Smooth parallax scrolling with performance optimization
 */
export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const updateParallax = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const yPos = (scrolled - elementTop) * speed;
        section.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    updateParallax();

    return () => window.removeEventListener('scroll', requestTick);
  }, [speed, reducedMotion]);

  return (
    <div 
      ref={sectionRef} 
      className={`will-change-transform ${className}`}
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      {children}
    </div>
  );
}
