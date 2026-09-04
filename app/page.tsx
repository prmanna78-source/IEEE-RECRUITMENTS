"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MicroInteractions } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";

const LiveShaderBackground = dynamic(
  () => import("@/components/LiveShaderBackground").then((mod) => mod.LiveShaderBackground),
  { ssr: false }
);
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
import { WhyJoin } from "@/components/WhyJoin";
import { Recruitment } from "@/components/Recruitment";
import { Timeline } from "@/components/Timeline";
import { Experience } from "@/components/Experience";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { RecruitmentModal } from "@/components/RecruitmentModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#05070B] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Starting Preloader Screen with Centered IEEE CS Logo */}
      <Preloader />

      {/* Micro-Interactions (Scroll Progress Bar & Ambient Cursor Glow) */}
      <MicroInteractions />

      {/* Live 3D Shader Gradient Background */}
      <LiveShaderBackground />

      {/* Floating Glassmorphic Navbar */}
      <Navbar onOpenRecruitmentModal={handleOpenModal} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenRecruitmentModal={handleOpenModal} />
        <About />
        <WhatWeDo />
        <WhyJoin />
        <Recruitment onOpenRecruitmentModal={handleOpenModal} />
        <Timeline onOpenRecruitmentModal={handleOpenModal} />
        <Experience />
        <Testimonials />
        <FAQ onOpenRecruitmentModal={handleOpenModal} />
        <FinalCTA onOpenRecruitmentModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <Footer onOpenRecruitmentModal={handleOpenModal} />

      {/* Centralized Year-Selection Recruitment Modal */}
      <RecruitmentModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
