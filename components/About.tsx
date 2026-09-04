"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Hammer, Network, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

const pillarIcons = [
  <BookOpen key="01" className="w-6 h-6 text-cyan-400" />,
  <Hammer key="02" className="w-6 h-6 text-blue-400" />,
  <Network key="03" className="w-6 h-6 text-teal-400" />,
  <ShieldCheck key="04" className="w-6 h-6 text-amber-300" />,
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
              01 // CHAPTER IDENTITY
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
              More Than A Club.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              IEEE Computer Society GITAM is an elite technology chapter within GITAM Deemed to be University,
              Visakhapatnam. We cultivate an intense culture of curiosity, software craftsmanship, and collaborative
              engineering.
            </p>
          </div>

          <div className="hidden md:block text-right">
            <span className="font-mono text-xs text-slate-500 block uppercase">
              Institutional Affiliation
            </span>
            <span className="font-display font-semibold text-slate-200 text-sm">
              GITAM Visakhapatnam × IEEE Region 10
            </span>
          </div>
        </div>

        {/* Asymmetric 4 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pillar 1: LEARN (Large Left Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <LiquidGlassCard
              glowIntensity="sm"
              shadowIntensity="md"
              borderRadius="28px"
              blurIntensity="xl"
              className="p-8 sm:p-10 h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 font-display font-black text-8xl text-white select-none pointer-events-none">
                01
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  {pillarIcons[0]}
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                    Pillar 01
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {siteConfig.pillars[0].title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                {siteConfig.pillars[0].description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {siteConfig.pillars[0].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </LiquidGlassCard>
          </motion.div>

          {/* Pillar 2: BUILD (Right Top Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <LiquidGlassCard
              glowIntensity="sm"
              shadowIntensity="md"
              borderRadius="28px"
              blurIntensity="xl"
              className="p-8 sm:p-10 h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 font-display font-black text-8xl text-white select-none pointer-events-none">
                02
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[#ff810a]/15 border border-[#ff810a]/30">
                  <Hammer className="w-6 h-6 text-[#ff810a]" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#ff810a] uppercase tracking-widest block">
                    Pillar 02
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-amber-200 transition-colors">
                    {siteConfig.pillars[1].title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {siteConfig.pillars[1].description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {siteConfig.pillars[1].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff810a]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </LiquidGlassCard>
          </motion.div>

          {/* Pillar 3: CONNECT (Bottom Left Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <LiquidGlassCard
              glowIntensity="sm"
              shadowIntensity="md"
              borderRadius="28px"
              blurIntensity="xl"
              className="p-8 sm:p-10 h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 font-display font-black text-8xl text-white select-none pointer-events-none">
                03
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                  {pillarIcons[2]}
                </div>
                <div>
                  <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block">
                    Pillar 03
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-teal-200 transition-colors">
                    {siteConfig.pillars[2].title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {siteConfig.pillars[2].description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {siteConfig.pillars[2].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </LiquidGlassCard>
          </motion.div>

          {/* Pillar 4: LEAD (Large Bottom Right Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <LiquidGlassCard
              glowIntensity="sm"
              shadowIntensity="md"
              borderRadius="28px"
              blurIntensity="xl"
              className="p-8 sm:p-10 h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 font-display font-black text-8xl text-white select-none pointer-events-none">
                04
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  {pillarIcons[3]}
                </div>
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                    Pillar 04
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-amber-200 transition-colors">
                    {siteConfig.pillars[3].title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                {siteConfig.pillars[3].description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {siteConfig.pillars[3].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
