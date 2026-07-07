import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { LogoSVG } from "./Logo";

interface PreloaderProps {
  onComplete: () => void;
}

// Critical assets to preload
const CRITICAL_ASSETS = [
  'https://res.cloudinary.com/dcdc4hj6v/video/upload/v1782373187/I_want_the_output_format_with_xvccoz.mp4',
];

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let loadedCount = 0;
    let currentProgress = 0;
    const totalAssets = CRITICAL_ASSETS.length;

    // Preload critical assets
    CRITICAL_ASSETS.forEach((url) => {
      const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(url);
      
      if (isVideo) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        video.src = url;
        
        const onReady = () => {
          loadedCount++;
        };
        
        video.addEventListener("canplaythrough", onReady, { once: true });
        video.addEventListener("error", onReady, { once: true });
        video.load();
      } else {
        const img = new Image();
        img.onload = () => loadedCount++;
        img.onerror = () => loadedCount++;
        img.src = url;
      }
    });

    // Animate progress smoothly
    const animate = () => {
      const targetProgress = Math.floor((loadedCount / totalAssets) * 100);
      
      if (currentProgress < targetProgress) {
        currentProgress = Math.min(currentProgress + 2, targetProgress);
        setProgress(currentProgress);
      }

      if (currentProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Small delay at 100% before transitioning
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFFFF] dark:bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div className="relative w-64 h-40">
        {/* Base Logo (Faded) */}
        <LogoSVG className="absolute inset-0 w-full h-full text-[#B89851] opacity-20" />

        {/* Filling Logo */}
        <LogoSVG
          className="absolute inset-0 w-full h-full text-[#B89851]"
          fillProgress={progress}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 font-mono text-sm tracking-widest text-[#B89851]"
      >
        {progress}%
      </motion.div>
    </motion.div>
  );
}
