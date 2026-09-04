"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";

export const Testimonials: React.FC = () => {
  const { notice, quotes } = siteConfig.testimonialPlaceholder;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            07 // STUDENT VOICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Member Perspectives
          </h2>
          <p className="mt-2 text-xs font-mono text-slate-500">
            {notice}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
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
                  <MessageSquareQuote className="w-8 h-8 text-cyan-400/50 mb-4" />
                  <blockquote className="text-base sm:text-lg text-slate-300 italic font-mono">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">{q.role}</span>
                  <span className="text-cyan-400">{q.domain}</span>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
