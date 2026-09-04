"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, FolderGit2, Cpu } from "lucide-react";
import { siteConfig } from "@/config/site";

const statIcons = [
  <Users key="0" className="w-5 h-5 text-cyan-400" />,
  <Calendar key="1" className="w-5 h-5 text-blue-400" />,
  <FolderGit2 key="2" className="w-5 h-5 text-teal-400" />,
  <Cpu key="3" className="w-5 h-5 text-amber-400" />,
];

export const Stats: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-white/[0.03] border border-white/10 backdrop-blur-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {siteConfig.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-4">
                  {statIcons[index]}
                </div>
                <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm sm:text-base font-display font-bold text-cyan-300">
                  {stat.label}
                </span>
                <span className="mt-1 text-xs text-slate-500 font-mono">
                  {stat.note}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs font-mono text-slate-500">
              * Official chapter metrics can be configured directly in <code className="text-cyan-400">config/site.ts</code> without modifying component source.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
