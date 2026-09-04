"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";

export const MicroInteractions: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for direct DOM manipulation without React re-render churn
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Top scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - (isPointer ? 24 : 16));
      cursorY.set(e.clientY - (isPointer ? 24 : 16));
      if (!isVisible) setIsVisible(true);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const target = e.target as HTMLElement | null;
          if (target) {
            const isClickable = Boolean(
              target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.getAttribute("role") === "button"
            );
            setIsPointer((prev) => (prev !== isClickable ? isClickable : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, isPointer, cursorX, cursorY]);

  return (
    <>
      {/* Top Scroll Progress Bar matching Shader Gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#73bfc4] via-[#8da0ce] to-[#ff810a] z-50 origin-left pointer-events-none"
        style={{ scaleX }}
      />

      {/* Subtle Cursor Glow (Desktop only, GPU accelerated) */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-40 rounded-full"
          style={{
            x: smoothX,
            y: smoothY,
            width: isPointer ? 48 : 32,
            height: isPointer ? 48 : 32,
            opacity: isPointer ? 0.35 : 0.15,
            transform: "translateZ(0)",
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#73bfc4] to-[#ff810a] blur-md pointer-events-none" />
        </motion.div>
      )}
    </>
  );
};
