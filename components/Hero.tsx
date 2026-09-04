"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Terminal, Code2, Cpu } from "lucide-react";
import { ShaderButton } from "@/components/ShaderButton";

interface HeroProps {
  onOpenRecruitmentModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRecruitmentModal }) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 hover:border-cyan-400/40 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs sm:text-sm font-mono font-medium tracking-wider text-slate-300">
            IEEE COMPUTER SOCIETY × GITAM VISAKHAPATNAM
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-semibold ml-1">
            2026
          </span>
        </motion.div>

        {/* Main Massive Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] select-none"
        >
          <span className="block text-white drop-shadow-sm">BUILD.</span>
          <span className="block text-gradient-cyan drop-shadow-sm">INNOVATE.</span>
          <span className="block text-gradient-orange drop-shadow-sm">LEAD.</span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm"
        >
          A community for students who don’t just consume technology — they build it.
          At IEEE Computer Society GITAM, we explore emerging systems, publish research,
          compete in global hackathons, and forge the next generation of engineering leaders.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA with Live WebGL Shader Button matching background */}
          <ShaderButton
            onClick={onOpenRecruitmentModal}
            text="ACCESS RECRUITMENT FORM"
            size="md"
          />

          {/* Secondary CTA */}
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-display font-semibold text-sm sm:text-base text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            <span>EXPLORE IEEE CS</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </a>
        </motion.div>

        {/* Floating Ecosystem Badges / Metric Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 font-mono"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass border border-white/15 hover:border-cyan-400/40 transition-colors">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Open Source & Projects</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass border border-white/15 hover:border-cyan-400/40 transition-colors">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>AI, Systems & Hardware</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass border border-white/15 hover:border-amber-400/40 transition-colors">
            <Code2 className="w-4 h-4 text-amber-300" />
            <span>Competitive Dev & CTF</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass border border-white/15 hover:border-teal-400/40 transition-colors">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>2026 Recruitment Open</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
