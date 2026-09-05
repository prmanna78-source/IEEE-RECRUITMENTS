"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { recruitmentForms, RecruitmentYear } from "@/config/recruitment";
import confetti from "canvas-confetti";

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Self-contained iOS 26 / visionOS Liquid Glass card.
// Does NOT use LiquidGlassCard — its dark backgroundColor prevents backdrop-filter from showing.
// Instead we use fully transparent fill + strong backdrop-filter directly on the element.
interface GlassYearCardProps {
  href: string;
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
      whileHover={{ scale: 1.04, y: -5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      aria-label={`Open ${label} recruitment form`}
      className="relative block h-full"
      style={{ textDecoration: "none" }}
    >
      {/* Colour-tinted outer glow halo */}
      <motion.div
        animate={{
          opacity: isSelected ? 1 : hovered ? 0.75 : 0.4,
          scale: isSelected ? 1.1 : hovered ? 1.06 : 1,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: -14,
          borderRadius: 34,
          background: `radial-gradient(ellipse at 50% 65%, rgba(${accentRgb},0.35) 0%, rgba(${accentRgb},0.1) 50%, transparent 72%)`,
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* The glass body — key: backgroundColor must be LOW opacity white/transparent so backdrop-filter blurs the colourful page behind it */}
      <div
        className="relative h-full overflow-hidden"
        style={{
          zIndex: 1,
          borderRadius: 22,
          // Barely-there white fill so backdrop-filter has contrast to work with
          backgroundColor: isSelected
            ? `rgba(${accentRgb}, 0.13)`
            : "rgba(255, 255, 255, 0.06)",
          // The actual glass magic — heavy blur + saturation boost
          backdropFilter: "blur(36px) saturate(220%) brightness(1.15)",
          WebkitBackdropFilter: "blur(36px) saturate(220%) brightness(1.15)",
          // Bright top/left border, dim bottom/right border = real glass depth cue
          border: isSelected
            ? `1.5px solid rgba(${accentRgb}, 0.65)`
            : "1.5px solid rgba(255, 255, 255, 0.25)",
          boxShadow: isSelected
            ? [
                "inset 0 1.5px 0 rgba(255,255,255,0.6)",
                "inset 1.5px 0 0 rgba(255,255,255,0.25)",
                "inset 0 -1px 0 rgba(255,255,255,0.05)",
                "0 20px 44px -6px rgba(0,0,0,0.6)",
                `0 0 42px -4px rgba(${accentRgb},0.4)`,
              ].join(", ")
            : [
                "inset 0 1.5px 0 rgba(255,255,255,0.45)",
                "inset 1.5px 0 0 rgba(255,255,255,0.2)",
                "inset 0 -1px 0 rgba(255,255,255,0.04)",
                "0 12px 32px -8px rgba(0,0,0,0.5)",
                "0 0 0 1px rgba(255,255,255,0.04)",
              ].join(", "),
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Top specular sheen arc — the iOS "wet glass" look */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
            borderRadius: "22px 22px 55% 55% / 22px 22px 38px 38px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Prismatic left-edge refraction */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: 0,
            width: 3,
            height: "62%",
            background: `linear-gradient(180deg,
              transparent 0%,
              rgba(255,255,255,0.55) 28%,
              rgba(${accentRgb},0.65) 52%,
              rgba(255,255,255,0.35) 76%,
              transparent 100%)`,
            borderRadius: "0 2px 2px 0",
            pointerEvents: "none",
            zIndex: 3,
            opacity: hovered || isSelected ? 1 : 0.55,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Shimmer sweep on hover/select */}
        <motion.div
          animate={{ x: hovered || isSelected ? "230%" : "-70%" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: "-70%",
            width: "55%",
            height: "100%",
            background:
              "linear-gradient(108deg, transparent 15%, rgba(255,255,255,0.1) 50%, transparent 85%)",
            transform: "skewX(-14deg)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* Bottom accent tint */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "38%",
            background: `linear-gradient(0deg, rgba(${accentRgb},0.09) 0%, transparent 100%)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Card content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "26px 22px 22px",
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "space-between",
            height: "100%",
            minHeight: 200,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              {/* Giant frosted number */}
              <span
                style={{
                  fontSize: "3.8rem",
                  fontWeight: 900,
                  lineHeight: 1,
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  color: accentColor,
                  letterSpacing: "-0.04em",
                  textShadow: `0 0 28px rgba(${accentRgb},0.65), 0 2px 8px rgba(0,0,0,0.5)`,
                  filter: isSelected ? "brightness(1.25)" : "brightness(1)",
                  transition: "filter 0.3s",
                }}
              >
                {number}
              </span>

              {/* Frosted pill badge */}
              <span
                style={{
                  padding: "4px 11px",
                  borderRadius: 100,
                  background: `rgba(${accentRgb}, 0.14)`,
                  border: `1px solid rgba(${accentRgb}, 0.35)`,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                  color: accentColor,
                  textTransform: "uppercase" as const,
                }}
              >
                OPEN
              </span>
            </div>

            <h3
              style={{
                margin: 0,
                fontSize: "1.2rem",
                fontWeight: 800,
                fontFamily: "var(--font-space-grotesk), sans-serif",
                color: "#fff",
                letterSpacing: "-0.01em",
                textShadow: "0 1px 8px rgba(0,0,0,0.75), 0 0 20px rgba(0,0,0,0.4)",
              }}
            >
              {label.toUpperCase()}
            </h3>
            <p
              style={{
                marginTop: 7,
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.55,
              }}
            >
              {description}
            </p>
          </div>

          {/* CTA row */}
          <div
            style={{
              marginTop: 20,
              paddingTop: 14,
              borderTop: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isSelected ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: accentColor,
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                }}
              >
                <CheckCircle2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} />
                OPENING FORM...
              </span>
            ) : (
              <>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: accentColor,
                    fontFamily: "monospace",
                    letterSpacing: "0.09em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  CONTINUE <ArrowRight style={{ width: 13, height: 13 }} />
                </span>
                <ExternalLink style={{ width: 13, height: 13, color: `rgba(${accentRgb},0.5)` }} />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.a>
  );
};

// Modal shell uses its own glass too — transparent enough for backdrop-filter to pop
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
    } catch { /* noop */ }
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
            transition={{ duration: 0.28 }}
            onClick={onClose}
            className="fixed inset-0"
            style={{
              background: "rgba(2,6,18,0.78)",
              backdropFilter: "blur(24px) saturate(130%)",
              WebkitBackdropFilter: "blur(24px) saturate(130%)",
            }}
          />

          {/* Dual colour blobs — these are what get blurred through the glass cards */}
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
            <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(115,191,196,0.4) 0%, transparent 68%)", filter: "blur(50px)", transform: "translate(-130px, 60px)" }} />
            <div style={{ position: "absolute", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,129,10,0.35) 0%, transparent 68%)", filter: "blur(50px)", transform: "translate(120px, -50px)" }} />
            <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(141,160,206,0.25) 0%, transparent 68%)", filter: "blur(40px)", transform: "translate(20px, 80px)" }} />
          </div>

          {/* Modal panel — glass shell around the cards */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 28 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl z-10"
          >
            <div
              style={{
                borderRadius: 32,
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(40px) saturate(200%) brightness(1.08)",
                WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(1.08)",
                border: "1.5px solid rgba(255,255,255,0.18)",
                boxShadow: [
                  "inset 0 1.5px 0 rgba(255,255,255,0.4)",
                  "inset 1.5px 0 0 rgba(255,255,255,0.14)",
                  "0 32px 64px -12px rgba(0,0,0,0.7)",
                  "0 0 0 1px rgba(255,255,255,0.04)",
                ].join(", "),
              }}
            >
              {/* Accent stripe */}
              <div style={{ height: 4, background: "linear-gradient(90deg, #73bfc4, #8da0ce, #ff810a)" }} />

              {/* Top sheen inside modal shell */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)", pointerEvents: "none", zIndex: 1 }} />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full text-white/50 hover:text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="relative z-10 px-7 pt-7 pb-5 text-center">
                <div
                  className="inline-flex items-center gap-2 mb-4"
                  style={{
                    padding: "5px 14px",
                    borderRadius: 100,
                    background: "rgba(115,191,196,0.12)",
                    border: "1px solid rgba(115,191,196,0.3)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    fontSize: 11,
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
                  className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight"
                  style={{ color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.6), 0 0 40px rgba(115,191,196,0.15)" }}
                >
                  SELECT YOUR YEAR
                </h2>
                <p className="mt-2 text-sm max-w-xs mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                  Choose your academic year to open the appropriate recruitment form.
                </p>
              </div>

              {/* Glass year cards */}
              <div className="relative z-10 px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <GlassYearCard
                  href={recruitmentForms.secondYear}
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
                className="relative z-10 px-7 py-4 text-center"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: "0.03em",
                  color: "rgba(255,255,255,0.62)",
                }}
              >
                Opens in a new tab · Google Forms · Log in with your GITAM account
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
