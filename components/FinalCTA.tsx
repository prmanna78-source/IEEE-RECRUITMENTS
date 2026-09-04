"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ShaderButton } from "@/components/ShaderButton";

interface FinalCTAProps {
  onOpenRecruitmentModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenRecruitmentModal }) => {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[500px] bg-gradient-to-t from-blue-700/20 via-cyan-500/20 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>JOIN IEEE CS GITAM VISAKHAPATNAM</span>
        </motion.div>

        {/* Large Typography */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight leading-[0.98]"
        >
          DON&apos;T JUST LEARN TECHNOLOGY. <br />
          <span className="text-gradient-shader">BUILD WHAT COMES NEXT.</span>
        </motion.h2>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-base sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Join a community where ideas become projects, curiosity becomes skill, and students become builders.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <ShaderButton
            onClick={onOpenRecruitmentModal}
            text="ACCESS RECRUITMENT FORM"
            size="lg"
          />
        </motion.div>
      </div>
    </section>
  );
};
