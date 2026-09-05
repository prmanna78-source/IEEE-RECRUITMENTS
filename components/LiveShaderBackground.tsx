"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export const LiveShaderBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  // Pause shader animation during scroll to prevent jank
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-0 bg-[#03060C]" />;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ willChange: "transform", contain: "strict" }}
    >
      {/* 3D WebGL Shader Gradient — paused while scrolling to eliminate jank */}
      <div
        className="absolute inset-0 w-full h-full opacity-90"
        style={{ willChange: "transform" }}
      >
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          lazyLoad={undefined}
          fov={undefined}
          pixelDensity={0.75}
          pointerEvents="none"
        >
          <ShaderGradient
            animate={isScrolling ? "off" : "on"}
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.12}
            uStrength={0.25}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={3.2}
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            color1="#73bfc4"
            color2="#ff810a"
            color3="#8da0ce"
            reflection={0.4}
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={15.1}
            lightType="env"
            brightness={0.8}
            envPreset="city"
            grain="off"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Dark scrim for readability */}
      <div className="absolute inset-0 bg-[#03060C]/65 pointer-events-none" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03060C]/50 via-transparent to-[#03060C]/80 pointer-events-none" />
      {/* Grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none" />
    </div>
  );
};
