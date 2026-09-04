"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LiveApplyButton } from "@/components/LiveApplyButton";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

interface FAQProps {
  onOpenRecruitmentModal: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenRecruitmentModal }) => {
  const [openId, setOpenId] = useState<string | null>(siteConfig.faqs[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            08 // CLARITY & ANSWERS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Have questions regarding eligibility, domains, or recruitment procedures? Find essential answers here.
          </p>
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-4">
          {siteConfig.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <LiquidGlassCard
                key={faq.id}
                glowIntensity={isOpen ? "sm" : "none"}
                shadowIntensity="sm"
                borderRadius="18px"
                blurIntensity="xl"
                className={`transition-all duration-300 ${
                  isOpen ? "!border-cyan-400/50 shadow-lg shadow-cyan-500/10" : "border-white/10"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl"
                >
                  <span className="text-lg sm:text-xl font-display font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 transition-transform duration-300 ${isOpen ? "rotate-180 bg-cyan-500/20 text-cyan-300" : "text-slate-400"}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-7 sm:px-7 sm:pb-8 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </LiquidGlassCard>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <LiquidGlassCard
          glowIntensity="sm"
          shadowIntensity="sm"
          borderRadius="20px"
          blurIntensity="xl"
          className="mt-12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <p className="text-sm font-display font-semibold text-white">
                Ready to take the first step?
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Submit your application through the recruitment portal.
              </p>
            </div>
          </div>
          <LiveApplyButton
            onClick={onOpenRecruitmentModal}
            size="sm"
            text="APPLY NOW"
          />
        </LiquidGlassCard>
      </div>
    </section>
  );
};
