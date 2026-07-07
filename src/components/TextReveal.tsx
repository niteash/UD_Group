import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

/**
 * Award-winning text reveal animation
 * Character-by-character reveal with stagger
 */
export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <div ref={textRef} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-2">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isVisible ? { y: 0 } : { y: '100%' }}
            transition={{
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: delay + wordIndex * 0.05,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/**
 * Line reveal with mask effect
 */
export function LineReveal({ children, className = '' }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={lineRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isVisible ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
