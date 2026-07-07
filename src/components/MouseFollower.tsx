import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function MouseFollower() {
  const followerRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const reducedMotion = useReducedMotion();
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion || !followerRef.current) return;

    let currentX = 0;
    let currentY = 0;
    const speed = 0.15;

    const animate = () => {
      // Smooth lerp animation
      currentX += (positionRef.current.x - currentX) * speed;
      currentY += (positionRef.current.y - currentY) * speed;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      ref={followerRef}
      className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-300 ${
        isHovering ? "scale-150" : "scale-100"
      }`}
      style={{
        width: "40px",
        height: "40px",
        marginLeft: "-20px",
        marginTop: "-20px",
        borderRadius: "50%",
        border: "2px solid white",
        opacity: 0.6,
      }}
    />
  );
}
