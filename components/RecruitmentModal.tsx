"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { recruitmentForms, RecruitmentYear } from "@/config/recruitment";
import confetti from "canvas-confetti";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GlassYearCardProps {
  href: string;
  year: RecruitmentYear;
  label: string;
  number: string;
  description: string;
  accentColor: string;
  accentRgb: string;
  isSelected: boolean;
  isRedirecting: boolean;
  onClick: () => void;
}

const GlassYearCard: React.FC<GlassYearCardProps> = ({
  href,
  label,
  number,
  description,
  accentColor,
  accentRgb,
  isSelected,
  isRedirecting,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.035, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      aria-label={`Open ${label} recruitment form`}
      style={{ textDecoration: "none", display: "block" }}
      className="relative h-full"
    >
      {/* Outer glow halo */}
      <motion.div
        animate={{
          opacity: isSelected ? 0.9 : hovered ? 0.7 : 0.35,
          scale: isSelected ? 1.08 : hovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: "-12px",
          borderRadius: "32px",
          background: `radial-gradient(ellipse at 50% 60%, rgba(${accentRgb}, 0.28) 0%, rgba(${accentRgb}, 0.08) 55%, transparent 75%)`,
          filter: "blur(18px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glass card body */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "24px",
          overflow: "hidden",
          height: "100%",
          backdropFilter: "blur(40px) saturate(200%) brightness(1.12)",
          WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(1.12)",
          backgroundColor: isSelected
            ? `rgba(${accentRgb}, 0.18)`
            : "rgba(255, 255, 255, 0.07)",
          border: isSelected
            ? `1.5px solid rgba(${accentRgb}, 0.6)`
            : "1.5px solid rgba(255, 255, 255, 0.22)",
          boxShadow: isSelected
            ? `inset 0 1.5px 0 rgba(255,255,255,0.55), inset 1.5px 0 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.06), 0 24px 48px -8px rgba(0,0,0,0.55), 0 0 0 1px rgba(${accentRgb}, 0.25), 0 0 40px -4px rgba(${accentRgb}, 0.35)`
            : `inset 0 1.5px 0 rgba(255,255,255,0.45), inset 1.5px 0 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04), 0 16px 36px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`,
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Layer 1: Top specular sheen arc */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "48%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 55%, transparent 100%)",
            borderRadius: "24px 24px 60% 60% / 24px 24px 40px 40px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Layer 2: Prismatic left-edge refraction */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: 0,
            width: "3px",
            height: "60%",
            background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 30%, rgba(${accentRgb},0.6) 55%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0) 100%)`,
            borderRadius: "0 2px 2px 0",
            pointerEvents: "none",
            zIndex: 2,
            opacity: hovered || isSelected ? 0.9 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Layer 3: Animated shimmer sweep */}
        <motion.div
          animate={{ x: hovered || isSelected ? "200%" : "-60%" }}
          transition={{ duration: hovered ? 0.75 : 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: "-60%",
            width: "55%",
            height: "100%",
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.09) 50%, transparent 80%)",
            transform: "skewX(-12deg)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Layer 4: Bottom reflection tint */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "35%",
            background: `linear-gradient(0deg, rgba(${accentRgb}, 0.07) 0%, transparent 100%)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "28px 24px 24px",
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  color: accentColor,
                  textShadow: `0 0 24px rgba(${accentRgb}, 0.6), 0 2px 8px rgba(0,0,0,0.4)`,
                  letterSpacing: "-0.04em",
                  filter: isSelected ? "brightness(1.2)" : "brightness(1)",
                  transition: "filter 0.3s ease",
                }}
              >
                {number}
              </div>
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: "100px",
                  background: `rgba(${accentRgb}, 0.12)`,
                  border: `1px solid rgba(${accentRgb}, 0.3)`,
                  backdropFilter: "blur(8px)",
                  fontSize: "10px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                  color: accentColor,
                  textTransform: "uppercase" as const,
                }}
              >
                OPEN
              </div>
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                fontFamily: "var(--font-space-grotesk), sans-serif",
                color: "#ffffff",
                letterSpacing: "-0.01em",
                margin: 0,
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              {label.toUpperCase()}
            </h3>
            <p style={{ marginTop: "8px", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              {description}
            </p>
          </div>

          <div
            style={{
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isSelected ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", fontWeight: 700, color: accentColor, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                <CheckCircle2 style={{ width: 15, height: 15, animation: "spin 1s linear infinite" }} />
                OPENING FORM...
              </span>
            ) : (
              <>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 700, color: accentColor, fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                  CONTINUE
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </span>
                <ExternalLink style={{ width: 14, height: 14, color: `rgba(${accentRgb}, 0.5)` }} />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export const RecruitmentModal: React.FC<RecruitmentModalProps> = ({ isOpen, onClose }) => {
  const [selectedYear, setSelectedYear] = useState<RecruitmentYear | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setSelectedYear(null);
      setIsRedirecting(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleYearClick = (year: RecruitmentYear) => {
    if (isRedirecting) return;
    setSelectedYear(year);
    setIsRedirecting(true);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#73bfc4", "#ff810a", "#8da0ce", "#ffffff", "#a5f3fc"],
      });
    } catch {
      // safe fallback
    }
    setTimeout(() => {
      setIsRedirecting(false);
      setSelectedYear(null);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="recruitment-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Frosted backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0"
            style={{
              background: "rgba(2, 6, 18, 0.82)",
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
            }}
          />

          {/* Ambient blobs */}
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
            <div
              style={{
                width: 560,
                height: 560,
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(115,191,196,0.18) 0%, rgba(255,129,10,0.12) 50%, transparent 75%)",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* Modal panel */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl z-10"
          >
            <LiquidGlassCard
              glowIntensity="lg"
              shadowIntensity="lg"
              borderRadius="32px"
              blurIntensity="xl"
              className="w-full"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                backgroundColor: "rgba(8, 12, 24, 0.55)",
              }}
            >
              {/* Accent stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-[#73bfc4] via-[#8da0ce] to-[#ff810a]" />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full text-white/50 hover:text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="px-7 pt-7 pb-4 text-center">
                <div
                  className="inline-flex items-center gap-2 mb-3"
                  style={{
                    padding: "5px 14px",
                    borderRadius: "100px",
                    background: "rgba(115,191,196,0.1)",
                    border: "1px solid rgba(115,191,196,0.25)",
                    backdropFilter: "blur(10px)",
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                    color: "#73bfc4",
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  IEEE CS GITAM · RECRUITMENT 2026
                </div>
                <h2
                  id="recruitment-modal-title"
                  className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight"
                >
                  SELECT YOUR YEAR
                </h2>
                <p className="mt-2 text-sm text-white/40 max-w-sm mx-auto leading-relaxed">
                  Choose your academic year to open the appropriate recruitment form.
                </p>
              </div>

              {/* Glass cards */}
              <div className="p-6 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassYearCard
                  href={recruitmentForms.secondYear}
                  year="secondYear"
                  label="Second Year"
                  number="02"
                  description="For students currently in their second year of study."
                  accentColor="#73bfc4"
                  accentRgb="115, 191, 196"
                  isSelected={selectedYear === "secondYear"}
                  isRedirecting={isRedirecting}
                  onClick={() => handleYearClick("secondYear")}
                />
                <GlassYearCard
                  href={recruitmentForms.thirdYear}
                  year="thirdYear"
                  label="Third Year"
                  number="03"
                  description="For students currently in their third year of study."
                  accentColor="#ff810a"
                  accentRgb="255, 129, 10"
                  isSelected={selectedYear === "thirdYear"}
                  isRedirecting={isRedirecting}
                  onClick={() => handleYearClick("thirdYear")}
                />
              </div>

              {/* Footer */}
              <div
                className="px-7 py-4 text-center text-xs"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "monospace",
                  letterSpacing: "0.03em",
                }}
              >
                Opens in a new tab · Google Forms · Log in with your GITAM account
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
