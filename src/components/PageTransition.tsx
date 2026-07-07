import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Award-winning page transition effect
 * Smooth, elegant transitions between content states
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for premium feel
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger children animation for lists and grids
 */
export function StaggerChildren({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual stagger item
 */
export function StaggerItem({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
