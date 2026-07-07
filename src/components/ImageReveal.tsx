import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Award-winning image reveal effect
 * Elegant curtain reveal animation on scroll
 */
export function ImageReveal({ src, alt, className = '' }: ImageRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={isVisible ? { scale: 1 } : { scale: 1.2 }}
        transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
      />
      
      {/* Reveal curtain */}
      <motion.div
        className="absolute inset-0 bg-neutral-900 origin-left"
        initial={{ scaleX: 1 }}
        animate={isVisible ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}
