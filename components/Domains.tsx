"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Globe2,
  Smartphone,
  Shield,
  Cloud,
  Terminal,
  Bot,
  GraduationCap,
  Sparkles,
  CalendarCheck,
  ArrowRight,
  Layers
} from "lucide-react";
import { siteConfig, DomainItem } from "@/config/site";

interface DomainsProps {
  onOpenRecruitmentModal: () => void;
}

const domainIcons: Record<string, React.ReactNode> = {
  "ai-ml": <Brain className="w-6 h-6 text-cyan-400" />,
  "web-dev": <Globe2 className="w-6 h-6 text-blue-400" />,
  "app-dev": <Smartphone className="w-6 h-6 text-teal-400" />,
  "cybersecurity": <Shield className="w-6 h-6 text-emerald-400" />,
  "data-cloud": <Cloud className="w-6 h-6 text-indigo-400" />,
  "competitive-programming": <Terminal className="w-6 h-6 text-amber-400" />,
  "robotics": <Bot className="w-6 h-6 text-violet-400" />,
  "research": <GraduationCap className="w-6 h-6 text-sky-400" />,
  "design-media": <Sparkles className="w-6 h-6 text-rose-400" />,
  "events-management": <CalendarCheck className="w-6 h-6 text-teal-300" />,
};

export const Domains: React.FC<DomainsProps> = ({ onOpenRecruitmentModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeDomainId, setActiveDomainId] = useState<string>(siteConfig.domains[0].id);

  const categories = ["All", "Intelligence", "Engineering", "Security", "Infrastructure", "Hardware", "Academic", "Creative", "Operations"];

  const filteredDomains = selectedCategory === "All"
    ? siteConfig.domains
    : siteConfig.domains.filter((d) => d.category === selectedCategory);

  const activeDomain = siteConfig.domains.find((d) => d.id === activeDomainId) || siteConfig.domains[0];

  return (
    <section id="domains" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
              03 // SPECIALIZED TRACKS
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
              FIND YOUR DOMAIN
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Whether your passion lies in low-level embedded hardware, bleeding-edge generative models, or high-scale cloud infrastructure, there is an active domain ready for your contribution.
            </p>
          </div>

          {/* Quick Apply Button */}
          <div>
            <button
              onClick={onOpenRecruitmentModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-md shadow-cyan-500/10"
            >
              <span>APPLY FOR A DOMAIN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30"
                  : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Interactive Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDomains.map((domain, index) => {
            const isSelected = activeDomainId === domain.id;
            return (
              <motion.div
                key={domain.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onClick={() => setActiveDomainId(domain.id)}
                className={`cursor-pointer group relative p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#0c1424] border-cyan-400/80 shadow-xl shadow-cyan-500/15"
                    : "bg-white/[0.02] hover:bg-white/[0.05] border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                      {domainIcons[domain.id] || <Layers className="w-6 h-6 text-cyan-400" />}
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                      {domain.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {domain.title}
                  </h3>

                  <p className="mt-2 text-sm text-cyan-400/90 font-medium">
                    {domain.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.08]">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRecruitmentModal();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold font-display text-slate-300 hover:text-white bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-500/40 border border-white/10 transition-colors"
                  >
                    <span>JOIN THIS TRACK</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
