"use client";

import React from "react";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import {
  Code,
  Trophy,
  Flame,
  BrainCircuit,
  Globe,
  Lock,
  Bot,
  FileCode,
  GitBranch,
  Users,
  Palette,
  Briefcase
} from "lucide-react";

const ecosystemItems = [
  {
    title: "Technical Workshops",
    category: "Hands-on Training",
    icon: <Code className="w-5 h-5 text-cyan-400" />,
    desc: "Rigorous bootcamps breaking down complex frameworks, system programming, and modern tech stacks."
  },
  {
    title: "Hackathons",
    category: "Rapid Prototyping",
    icon: <Trophy className="w-5 h-5 text-amber-400" />,
    desc: "Intensive 24-48 hour builds challenging teams to ship functional products addressing real needs."
  },
  {
    title: "Coding Events",
    category: "Algorithmic Speed",
    icon: <Flame className="w-5 h-5 text-rose-400" />,
    desc: "Fast-paced algorithmic contests, competitive programming leagues, and bug hunts."
  },
  {
    title: "AI/ML Laboratories",
    category: "Deep Learning",
    icon: <BrainCircuit className="w-5 h-5 text-blue-400" />,
    desc: "Applied machine learning projects, neural networks training, and generative model fine-tuning."
  },
  {
    title: "Web Development",
    category: "Full Stack",
    icon: <Globe className="w-5 h-5 text-teal-400" />,
    desc: "Production web applications leveraging Next.js, scalable APIs, and distributed cloud backends."
  },
  {
    title: "Cybersecurity & CTF",
    category: "Digital Defense",
    icon: <Lock className="w-5 h-5 text-emerald-400" />,
    desc: "Hands-on penetration testing, reverse engineering, cryptography, and defense against real exploits."
  },
  {
    title: "Robotics & Embedded",
    category: "Hardware Integration",
    icon: <Bot className="w-5 h-5 text-indigo-400" />,
    desc: "Microcontroller architecture, ROS 2 integration, drone automation, and IoT hardware prototypes."
  },
  {
    title: "Research Initiatives",
    category: "Scholarly Innovation",
    icon: <FileCode className="w-5 h-5 text-sky-400" />,
    desc: "Mentored scientific investigations targeted at peer-reviewed publication in IEEE Xplore."
  },
  {
    title: "Open Source Programs",
    category: "Public Repositories",
    icon: <GitBranch className="w-5 h-5 text-cyan-300" />,
    desc: "Collaborative Git projects, code reviews, and contributions to major developer toolchains."
  },
  {
    title: "Technical Communities",
    category: "Peer Ecosystem",
    icon: <Users className="w-5 h-5 text-purple-400" />,
    desc: "Focus cohorts where developers collaborate, share code snippets, and solve bugs together."
  },
  {
    title: "Design & Media",
    category: "Creative Direction",
    icon: <Palette className="w-5 h-5 text-pink-400" />,
    desc: "High-standard visual systems, brand design, UI/UX interaction models, and motion media."
  },
  {
    title: "Leadership & Ops",
    category: "Chapter Governance",
    icon: <Briefcase className="w-5 h-5 text-yellow-300" />,
    desc: "Orchestrating university-wide tech symposiums, industry partnerships, and chapter growth."
  }
];

export const WhatWeDo: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            02 // ECOSYSTEM & ACTIVITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            What We Do.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            A diverse, multidimensional community operating across high-impact engineering disciplines,
            creative media, and technical research.
          </p>
        </div>

        {/* Grid of Ecosystem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {ecosystemItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="h-full"
            >
              <LiquidGlassCard
                glowIntensity="xs"
                shadowIntensity="sm"
                borderRadius="20px"
                blurIntensity="xl"
                className="p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>ACTIVE TRACK</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover:scale-125 transition-transform" />
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
