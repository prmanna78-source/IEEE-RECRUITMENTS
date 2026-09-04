"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING PORTAL...");

  useEffect(() => {
    // Lock body scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Progress animation timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly
        const increment = prev < 40 ? Math.floor(Math.random() * 8) + 5 : Math.floor(Math.random() * 12) + 8;
        const next = Math.min(prev + increment, 100);

        if (next < 35) {
          setStatusText("INITIALIZING IEEE CS PORTAL...");
        } else if (next < 75) {
          setStatusText("LOADING TECHNICAL ECOSYSTEM...");
        } else if (next < 99) {
          setStatusText("PREPARING RECRUITMENT 2026...");
        } else {
          setStatusText("WELCOME TO IEEE CS GITAM");
        }

        return next;
      });
    }, 90);

    // Fade out preloader when reaching 100%
    const exitTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1900);

    // Fallback safety timeout
    const fallbackTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03060C] select-none pointer-events-auto"
        >
          {/* Ambient center backlights */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute w-[350px] h-[350px] bg-[#ff810a]/10 rounded-full blur-[90px]" />
          </div>

          {/* Center Logo & Halo Animation Container */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Rotating Ambient Tech Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 sm:-inset-14 rounded-full border border-cyan-500/20 border-dashed pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 sm:-inset-8 rounded-full border border-white/10 pointer-events-none"
            />

            {/* Glowing Backdrop behind Logo */}
            <div className="relative p-6 sm:p-8 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex items-center justify-center"
              >
                <Image
                  src="/ieee-cs-logo-white.svg"
                  alt="IEEE Computer Society Logo"
                  width={280}
                  height={110}
                  className="h-20 sm:h-28 md:h-32 w-auto object-contain drop-shadow-[0_0_35px_rgba(115,191,196,0.5)]"
                  priority
                />
              </motion.div>
            </div>

            {/* Chapter Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-center"
            >
              <div className="font-display font-bold text-xs sm:text-sm tracking-[0.25em] text-white/90 uppercase">
                GITAM VISAKHAPATNAM
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-cyan-400 font-semibold tracking-widest mt-1">
                RECRUITMENT 2026
              </div>
            </motion.div>

            {/* Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-3 w-64 sm:w-80"
            >
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#73bfc4] via-[#8da0ce] to-[#ff810a] rounded-full shadow-[0_0_12px_rgba(115,191,196,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Status and Percentage Display */}
              <div className="w-full flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 truncate max-w-[200px]">
                  {statusText}
                </span>
                <span className="text-cyan-300 font-bold ml-2">
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
