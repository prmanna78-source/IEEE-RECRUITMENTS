"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { ShaderButton } from "@/components/ShaderButton";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

interface RecruitmentProps {
  onOpenRecruitmentModal: () => void;
}

export const Recruitment: React.FC<RecruitmentProps> = ({ onOpenRecruitmentModal }) => {
  return (
    <section id="recruitment" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-gradient-to-r from-blue-700/20 via-cyan-500/15 to-indigo-600/20 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <LiquidGlassCard
          glowIntensity="md"
          shadowIntensity="lg"
          borderRadius="32px"
          blurIntensity="xl"
          className="p-8 sm:p-14 lg:p-16 text-center"
        >
          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />

          {/* Top Decorative Line with shader gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#73bfc4] via-[#8da0ce] to-[#ff810a]" />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#73bfc4]" />
            <span>IEEE COMPUTER SOCIETY GITAM — RECRUITMENT 2026</span>
          </motion.div>

          {/* Dramatic Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.05]"
          >
            YOUR NEXT CHAPTER <br className="hidden sm:inline" />
            <span className="text-gradient-shader">STARTS HERE.</span>
          </motion.h2>

          {/* Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you&apos;re passionate about coding, artificial intelligence, design, cybersecurity,
            research, robotics, management or simply curious about technology, this is your
            opportunity to become part of the community.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <ShaderButton
              onClick={onOpenRecruitmentModal}
              text="ACCESS RECRUITMENT FORM"
              size="lg"
            />
          </motion.div>

          {/* Eligibility Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Open to 2nd Year
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Open to 3rd Year
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-teal-400" />
              All Engineering Disciplines Welcome
            </span>
          </motion.div>
        </LiquidGlassCard>
      </div>
    </section>
  );
};
