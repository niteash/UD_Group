import { motion } from "motion/react";
import type { ReactNode } from "react";
/**
 * Award-winning micro-interactions collection
 * Subtle animations that enhance user experience
 */

interface MicroInteractionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Hover lift effect - common in premium sites
 */
export function HoverLift({ children, className = "" }: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Magnetic button effect - Awwwards favorite
 */
export function MagneticHover({
  children,
  className = "",
}: MicroInteractionProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale on hover - simple but effective
 */
export function ScaleHover({
  children,
  className = "",
}: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Rotate on hover - adds playfulness
 */
export function RotateHover({
  children,
  className = "",
}: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        rotate: 2,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Glow effect on hover
 */
export function GlowHover({ children, className = "" }: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        boxShadow: "0 0 25px rgba(184, 152, 81, 0.5)",
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}
