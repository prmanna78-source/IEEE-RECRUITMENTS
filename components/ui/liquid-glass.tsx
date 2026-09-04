// @ts-nocheck
"use client";

import React, { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  expandable?: boolean;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
  shadowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  borderRadius?: string;
  glowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = "",
  draggable = false,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = "xl",
  borderRadius = "24px",
  glowIntensity = "sm",
  shadowIntensity = "md",
  onClick,
  style,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!expandable) return;
    const target = e.target as HTMLElement;
    if (target.closest("a, button, input, select, textarea")) return;
    setIsExpanded(!isExpanded);
  };

  const blurClasses = {
    sm: "backdrop-blur-md",
    md: "backdrop-blur-lg",
    lg: "backdrop-blur-xl",
    xl: "backdrop-blur-2xl",
  };

  const shadowStyles: Record<string, string> = {
    none: "inset 0 0 0 0 rgba(255, 255, 255, 0)",
    xs: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.2)",
    sm: "inset 1.5px 1.5px 2px 0 rgba(255, 255, 255, 0.35), inset -1.5px -1.5px 2px 0 rgba(255, 255, 255, 0.25)",
    md: "inset 2px 2px 3px 0 rgba(255, 255, 255, 0.45), inset -2px -2px 3px 0 rgba(255, 255, 255, 0.3)",
    lg: "inset 3px 3px 4px 0 rgba(255, 255, 255, 0.5), inset -3px -3px 4px 0 rgba(255, 255, 255, 0.35)",
    xl: "inset 4px 4px 6px 0 rgba(255, 255, 255, 0.55), inset -4px -4px 6px 0 rgba(255, 255, 255, 0.4)",
    "2xl": "inset 6px 6px 8px 0 rgba(255, 255, 255, 0.6), inset -6px -6px 8px 0 rgba(255, 255, 255, 0.45)",
  };

  const glowStyles: Record<string, string> = {
    none: "0 4px 16px rgba(0, 0, 0, 0.4)",
    xs: "0 8px 24px -6px rgba(0, 0, 0, 0.5), 0 0 16px rgba(115, 191, 196, 0.08)",
    sm: "0 12px 32px -8px rgba(0, 0, 0, 0.55), 0 0 24px rgba(115, 191, 196, 0.15)",
    md: "0 16px 36px -10px rgba(0, 0, 0, 0.6), 0 0 32px rgba(115, 191, 196, 0.2)",
    lg: "0 20px 44px -12px rgba(0, 0, 0, 0.65), 0 0 40px rgba(115, 191, 196, 0.25)",
    xl: "0 24px 50px -14px rgba(0, 0, 0, 0.7), 0 0 48px rgba(115, 191, 196, 0.3)",
    "2xl": "0 28px 60px -16px rgba(0, 0, 0, 0.75), 0 0 60px rgba(115, 191, 196, 0.35)",
  };

  const containerVariants = expandable
    ? {
        collapsed: {
          width: width || "auto",
          height: height || "auto",
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        },
        expanded: {
          width: expandedWidth || "auto",
          height: expandedHeight || "auto",
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        },
      }
    : {};

  const motionProps: HTMLMotionProps<"div"> =
    draggable || expandable
      ? {
          variants: expandable ? containerVariants : undefined,
          animate: expandable ? (isExpanded ? "expanded" : "collapsed") : undefined,
          onClick: expandable ? handleToggleExpansion : onClick,
          drag: draggable,
          dragConstraints: draggable ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined,
          dragElastic: draggable ? 0.3 : undefined,
          whileDrag: draggable ? { scale: 1.02 } : undefined,
          whileHover: { scale: 1.01 },
          whileTap: { scale: 0.98 },
        }
      : {};

  const MotionComponent = draggable || expandable ? motion.div : "div";

  return (
    <MotionComponent
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        draggable && "cursor-grab active:cursor-grabbing",
        expandable && "cursor-pointer",
        !draggable && !expandable && "hover:translate-y-[-2px] hover:shadow-cyan-500/10",
        className
      )}
      style={{
        borderRadius,
        border: "1px solid rgba(255, 255, 255, 0.16)",
        backgroundColor: "rgba(10, 16, 30, 0.45)",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        contain: "paint",
        boxShadow: glowStyles[glowIntensity],
        ...(width && !expandable && { width }),
        ...(height && !expandable && { height }),
        ...style,
      }}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {/* Layer 0: High-Performance GPU Backdrop Blur with Liquid Saturation */}
      <div
        className={cn("absolute inset-0 z-0 pointer-events-none", blurClasses[blurIntensity])}
        style={{
          borderRadius,
          transform: "translateZ(0)",
        }}
      />

      {/* Layer 1: Liquid Refractive Surface Sheen (Subtle Shimmer Gradient) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          borderRadius,
          background:
            "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(115, 191, 196, 0.03) 50%, transparent 80%)",
        }}
      />

      {/* Layer 2: Dual-directional Specular Edge Highlighting (Inner Bevel) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-all duration-300"
        style={{
          borderRadius,
          boxShadow: shadowStyles[shadowIntensity],
        }}
      />

      {/* Layer 3: Top Specular Sheen Arc */}
      <div
        className="absolute top-0 left-0 right-0 h-[45%] z-20 pointer-events-none rounded-t-[inherit]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.02) 75%, transparent 100%)",
        }}
      />

      {/* Layer 4: Interactive Content */}
      <div className="relative z-30 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </MotionComponent>
  );
};
