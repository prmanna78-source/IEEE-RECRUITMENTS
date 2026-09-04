"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, FileEdit, MessageSquareCode, UserCheck, Rocket } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

const stepIcons = [
  <Compass key="0" className="w-5 h-5 text-cyan-400" />,
  <FileEdit key="1" className="w-5 h-5 text-blue-400" />,
  <MessageSquareCode key="2" className="w-5 h-5 text-teal-400" />,
  <UserCheck key="3" className="w-5 h-5 text-amber-400" />,
  <Rocket key="4" className="w-5 h-5 text-rose-400" />,
];

interface TimelineProps {
  onOpenRecruitmentModal: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onOpenRecruitmentModal }) => {
  return (
    <section id="timeline" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            05 // PROCESS & ROADMAP
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
            RECRUITMENT 2026
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A clear, 5-stage selection workflow designed to evaluate your passion, curiosity, and alignment with our engineering tracks.
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative">
          {/* Vertical progress line matching Shader Gradient */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-[2.5px] bg-gradient-to-b from-[#73bfc4] via-[#8da0ce] to-[#ff810a]" />

          <div className="space-y-12 sm:space-y-16">
            {siteConfig.timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const isActive = item.status === "active";
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Box */}
                  <div className={`w-full md:w-[calc(50%-40px)] ${isEven ? "md:text-left" : "md:text-right"}`}>
                    <LiquidGlassCard
                      glowIntensity={isActive ? "md" : "sm"}
                      shadowIntensity={isActive ? "lg" : "md"}
                      borderRadius="22px"
                      blurIntensity="xl"
                      className={`p-6 sm:p-8 ${
                        isActive ? "!border-[#ff810a]/70 !bg-[#ff810a]/15 shadow-xl shadow-[#ff810a]/20" : ""
                      }`}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                          isActive
                            ? "bg-[#ff810a]/20 text-[#ff9e42] border-[#ff810a]/40"
                            : "bg-[#73bfc4]/15 text-[#73bfc4] border-[#73bfc4]/30"
                        }`}>
                          STAGE {item.step}
                        </span>
                        {isActive && (
                          <span className="flex items-center gap-1.5 text-xs font-mono text-[#ff810a] font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#ff810a] animate-pulse" />
                            CURRENT STAGE
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                        {item.title}
                      </h3>

                      <p className={`mt-1 text-sm font-medium font-mono ${isActive ? "text-amber-300" : "text-[#73bfc4]/90"}`}>
                        {item.subtitle}
                      </p>

                      <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {item.step === "02" && (
                        <div className={`mt-4 pt-4 border-t border-white/10 flex ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                          <button
                            onClick={onOpenRecruitmentModal}
                            className="inline-flex items-center gap-2 text-xs font-bold font-mono text-[#ff810a] hover:text-amber-200 transition-colors"
                          >
                            OPEN RECRUITMENT MODAL →
                          </button>
                        </div>
                      )}
                    </LiquidGlassCard>
                  </div>

                  {/* Center Node / Icon */}
                  <div className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl liquid-glass border-2 shadow-lg transition-transform ${
                    isActive
                      ? "!border-[#ff810a] shadow-[#ff810a]/40 scale-110"
                      : "!border-[#73bfc4]/60 shadow-[#73bfc4]/30"
                  }`}>
                    {stepIcons[index]}
                  </div>

                  {/* Empty Spacer on opposite side for desktop balance */}
                  <div className="hidden md:block w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
