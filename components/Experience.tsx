"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Sparkles, Terminal, Activity, Layers } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

export const Experience: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            06 // SIGNATURE INITIATIVES
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            The IEEE CS Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            From overnight hackathon sprints to high-level academic symposiums, here is how our members engage with the engineering frontier.
          </p>
        </div>

        {/* Abstract Computational Graphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="h-full"
            >
              <LiquidGlassCard
                glowIntensity="xs"
                shadowIntensity="sm"
                borderRadius="20px"
                blurIntensity="xl"
                className="p-6 h-full flex flex-col justify-between"
              >
                {/* Abstract computational mesh representation */}
                <div className="h-28 w-full rounded-xl bg-white/[0.03] border border-white/10 relative overflow-hidden mb-5 flex items-center justify-center backdrop-blur-sm">
                  <div className="absolute inset-0 tech-grid-pattern opacity-30" />
                  <div className="absolute w-16 h-16 rounded-full bg-cyan-500/15 blur-xl group-hover:scale-150 transition-transform" />
                  
                  {/* Abstract geometric vector element */}
                  <div className="relative z-10 flex items-center gap-2 font-mono text-xs text-cyan-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                    <Terminal className="w-3.5 h-3.5 text-cyan-300" />
                    <span>SESSION_0{index + 1}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {activity.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>FORMAT</span>
                  <span className="text-slate-400">IN-PERSON & VIRTUAL</span>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
