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

export const RecruitmentModal: React.FC<RecruitmentModalProps> = ({ isOpen, onClose }) => {
  const [selectedYear, setSelectedYear] = useState<RecruitmentYear | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key and trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
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

  const handleSelectYear = (year: RecruitmentYear) => {
    const url = recruitmentForms[year];

    // IMPORTANT: Open the tab IMMEDIATELY and SYNCHRONOUSLY here, before any
    // async code, so it happens within the direct user-gesture chain.
    // Browsers (and Vercel's production environment) block window.open() calls
    // that occur inside setTimeout because they no longer count as user-initiated.
    if (typeof window !== "undefined" && url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }

    // Now run the visual feedback (confetti + loading state) asynchronously.
    setSelectedYear(year);
    setIsRedirecting(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#73bfc4", "#ff810a", "#8da0ce", "#ffffff"]
      });
    } catch {
      // safe fallback
    }

    // Close the modal after a short animation delay
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        >
          {/* Backdrop with dark blur and subtle gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#030712]/85 backdrop-blur-2xl"
          />

          {/* Ambient lighting inside modal container */}
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[600px] h-[600px] bg-gradient-to-tr from-[#73bfc4]/20 via-[#ff810a]/15 to-transparent rounded-full blur-3xl opacity-80" />
          </div>

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl z-10"
          >
            <LiquidGlassCard
              glowIntensity="lg"
              shadowIntensity="lg"
              borderRadius="32px"
              blurIntensity="xl"
              className="w-full border border-white/20 shadow-2xl shadow-black/90"
            >
              {/* Top decorative scanline with shader gradient */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#73bfc4] via-[#8da0ce] to-[#ff810a]" />

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close recruitment modal"
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Content */}
              <div className="p-6 sm:p-8 pb-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-mono font-medium tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  IEEE CS GITAM • RECRUITMENT 2026
                </div>
                <h2
                  id="recruitment-modal-title"
                  className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight"
                >
                  SELECT YOUR YEAR
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-md mx-auto">
                  Choose the academic year you are currently studying in to continue with the appropriate recruitment form.
                </p>
              </div>

              {/* Selection Cards Grid */}
              <div className="p-6 sm:p-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Card 1: 02 - SECOND YEAR */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer h-full"
                >
                  <LiquidGlassCard
                    onClick={() => !isRedirecting && handleSelectYear("secondYear")}
                    glowIntensity={selectedYear === "secondYear" ? "md" : "xs"}
                    shadowIntensity="md"
                    borderRadius="20px"
                    blurIntensity="xl"
                    className={`p-6 sm:p-7 text-left h-full flex flex-col justify-between ${selectedYear === "secondYear"
                      ? "!border-cyan-400 !bg-cyan-950/40 shadow-lg shadow-cyan-500/20"
                      : "border-white/15"
                      }`}
                  >
                    {/* Subtle card corner glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl sm:text-4xl font-display font-black text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                          02
                        </span>
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10">

                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-200 transition-colors">
                        SECOND YEAR
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Recruitment form for students currently studying in their second year.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-cyan-400 text-sm font-semibold">
                      {selectedYear === "secondYear" ? (
                        <span className="inline-flex items-center gap-2 text-cyan-300">
                          <CheckCircle2 className="w-4 h-4 animate-spin" /> Opening Form...
                        </span>
                      ) : (
                        <>
                          <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                            CONTINUE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        </>
                      )}
                    </div>
                  </LiquidGlassCard>
                </motion.div>

                {/* Card 2: 03 - THIRD YEAR */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer h-full"
                >
                  <LiquidGlassCard
                    onClick={() => !isRedirecting && handleSelectYear("thirdYear")}
                    glowIntensity={selectedYear === "thirdYear" ? "md" : "xs"}
                    shadowIntensity="md"
                    borderRadius="20px"
                    blurIntensity="xl"
                    className={`p-6 sm:p-7 text-left h-full flex flex-col justify-between ${selectedYear === "thirdYear"
                      ? "!border-[#ff810a] !bg-[#ff810a]/25 shadow-lg shadow-[#ff810a]/20"
                      : "border-white/15"
                      }`}
                  >
                    {/* Subtle card corner glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff810a]/10 rounded-full blur-2xl group-hover:bg-[#ff810a]/20 transition-all pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl sm:text-4xl font-display font-black text-[#ff810a]/90 group-hover:text-[#ff9e42] transition-colors">
                          03
                        </span>
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10">

                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-white group-hover:text-amber-200 transition-colors">
                        THIRD YEAR
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        Recruitment form for students currently studying in their third year.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[#ff810a] text-sm font-semibold">
                      {selectedYear === "thirdYear" ? (
                        <span className="inline-flex items-center gap-2 text-amber-300">
                          <CheckCircle2 className="w-4 h-4 animate-spin" /> Opening Form...
                        </span>
                      ) : (
                        <>
                          <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                            CONTINUE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#ff810a] transition-colors" />
                        </>
                      )}
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              </div>

              {/* Bottom Note */}
              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 text-center text-xs text-slate-500">
                Form opens securely in a new tab via official Google Forms. Please ensure you are logged into your GITAM student account.
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
