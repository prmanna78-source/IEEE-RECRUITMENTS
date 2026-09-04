"use client";

import React from "react";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import {
  FolderGit2,
  Users2,
  Compass,
  Crown,
  Cpu,
  GlobeLock
} from "lucide-react";
import { siteConfig } from "@/config/site";

const whyJoinIcons = [
  <FolderGit2 key="0" className="w-6 h-6 text-cyan-400" />,
  <Users2 key="1" className="w-6 h-6 text-blue-400" />,
  <Compass key="2" className="w-6 h-6 text-teal-400" />,
  <Crown key="3" className="w-6 h-6 text-amber-300" />,
  <Cpu key="4" className="w-6 h-6 text-indigo-400" />,
  <GlobeLock key="5" className="w-6 h-6 text-emerald-400" />,
];

export const WhyJoin: React.FC = () => {
  return (
    <section id="why-join" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            04 // VALUE & ADVANTAGE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
            WHY IEEE COMPUTER SOCIETY?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            University is too short to spend just memorizing lecture slides. Discover the transformative advantages of an active engineering fellowship.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.whyJoin.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="h-full"
            >
              <LiquidGlassCard
                glowIntensity="sm"
                shadowIntensity="md"
                borderRadius="24px"
                blurIntensity="xl"
                className="p-8 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 w-fit mb-6 group-hover:scale-110 transition-transform">
                    {whyJoinIcons[index]}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm font-semibold font-mono text-cyan-400">
                    {item.tagline}
                  </p>

                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>IMPACT FACTOR</span>
                  <span className="font-semibold text-slate-400">0{index + 1}</span>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
