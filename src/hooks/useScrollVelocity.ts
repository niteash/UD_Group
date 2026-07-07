import { useEffect, useState, useRef } from 'react';

/**
 * Hook to track scroll velocity for dynamic effects
 * Used in award-winning sites for scroll-based animations
 */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    let rafId: number;

    const updateVelocity = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const timeDelta = now - lastTimestamp.current;
      
      if (timeDelta > 0) {
        const scrollDelta = currentScrollY - lastScrollY.current;
        const currentVelocity = Math.abs(scrollDelta / timeDelta);
        
        setVelocity(currentVelocity);
        
        lastScrollY.current = currentScrollY;
        lastTimestamp.current = now;
      }

      rafId = requestAnimationFrame(updateVelocity);
    };

    rafId = requestAnimationFrame(updateVelocity);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return velocity;
}
