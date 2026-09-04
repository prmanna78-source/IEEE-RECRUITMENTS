"use client";

import React from "react";
import { Star } from "lucide-react";

interface LiveApplyButtonProps {
  onClick: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const LiveApplyButton: React.FC<LiveApplyButtonProps> = ({
  onClick,
  className = "",
  size = "md",
  text = "APPLY NOW",
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs rounded-xl",
    md: "px-5 py-2.5 text-sm rounded-xl sm:rounded-2xl",
    lg: "px-8 py-4 text-base rounded-2xl",
  };

  const starSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center select-none cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${className}`}
      style={{
        // Outer metallic bevel frame matching the user's screenshot
        padding: "2px",
        background: "linear-gradient(180deg, rgba(220, 235, 255, 0.85) 0%, rgba(130, 160, 240, 0.6) 40%, rgba(60, 90, 190, 0.8) 100%)",
        borderRadius: size === "sm" ? "13px" : "16px",
        boxShadow: "0 0 16px rgba(45, 95, 250, 0.45), 0 2px 6px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Inner glossy capsule */}
      <div
        className={`relative flex items-center justify-center gap-2.5 font-sans font-bold text-white overflow-hidden ${sizeClasses[size]}`}
        style={{
          background: "linear-gradient(135deg, #3264fe 0%, #1c45e8 35%, #0f2bb8 70%, #0a1f8c 100%)",
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.7), inset 0 -2px 4px rgba(0, 15, 80, 0.6)",
        }}
      >
        {/* Top curved specular glass reflection highlight */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "48%",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.06) 80%, transparent 100%)",
            borderRadius: size === "sm" ? "10px 10px 14px 14px" : "13px 13px 18px 18px",
          }}
        />

        {/* Live animated light sweep reflection across button */}
        <div
          className="absolute top-0 -left-full w-2/3 h-full pointer-events-none opacity-60 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.55) 50%, transparent 100%)",
            transform: "skewX(-25deg)",
            animation: "liveButtonShine 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        />

        {/* Five-pointed Star Icon */}
        <Star
          className={`${starSizes[size]} fill-white text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-200 shrink-0`}
        />

        {/* Text */}
        <span className="relative z-10 tracking-wide font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          {text}
        </span>
      </div>

      <style jsx>{`
        @keyframes liveButtonShine {
          0% {
            left: -80%;
          }
          30%, 100% {
            left: 170%;
          }
        }
      `}</style>
    </button>
  );
};
