"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Globe, ArrowUp } from "lucide-react";
import { socialLinks } from "@/config/social";

interface FooterProps {
  onOpenRecruitmentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRecruitmentModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#03060C] z-10 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Info & Logos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* IEEE CS Logo - Enlarged */}
              <div className="relative flex items-center">
                <Image
                  src="/ieee-cs-logo-white.svg"
                  alt="IEEE Computer Society Logo"
                  width={220}
                  height={70}
                  className="h-12 sm:h-15 w-auto object-contain"
                />
              </div>

              {/* GITAM Logo */}
              <div className="relative flex items-center">
                <Image
                  src="/gitam-logo.svg"
                  alt="GITAM Visakhapatnam Logo"
                  width={130}
                  height={44}
                  className="h-8 sm:h-9 w-auto object-contain opacity-95"
                />
              </div>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
                IEEE COMPUTER SOCIETY
              </h3>
              <p className="font-mono text-xs sm:text-sm text-cyan-400 font-semibold tracking-wider mt-0.5">
                GITAM VISAKHAPATNAM
              </p>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering student engineers, innovators and researchers at GITAM Deemed to be University through technical excellence, leadership and community impact.
            </p>

          </div>

          {/* Nav Links Column 1 */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">
                  About the Chapter
                </a>
              </li>
              <li>
                <a href="#why-join" className="hover:text-cyan-300 transition-colors">
                  Why IEEE CS
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-cyan-300 transition-colors">
                  Recruitment Timeline
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">
                  FAQ & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Recruitment Column 2 */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Recruitment 2026
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={onOpenRecruitmentModal}
                  className="text-left text-cyan-400 hover:text-cyan-200 transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Apply: Second Year</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRecruitmentModal}
                  className="text-left text-blue-400 hover:text-blue-200 transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Apply: Third Year</span>
                </button>
              </li>
              <li>
                <a href="#timeline" className="hover:text-cyan-300 transition-colors">
                  Selection Stages
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">
                  Eligibility Criteria
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Info Column 3 */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-4">
              Affiliation
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Gandhi Institute of Technology and Management (GITAM)
            </p>
            <p className="text-xs font-mono text-slate-500 mt-2">
              Gandhi Nagar, Rushikonda, Visakhapatnam, Andhra Pradesh 530045
            </p>
            <div className="mt-4">
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>gitam.edu</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 IEEE Computer Society GITAM. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
