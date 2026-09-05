"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiveApplyButton } from "@/components/LiveApplyButton";

interface NavbarProps {
  onOpenRecruitmentModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRecruitmentModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Why Join", href: "#why-join" },
    { label: "Timeline", href: "#timeline" },
    { label: "Recruitment", href: "#recruitment" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      // Section spy
      const sections = ["about", "why-join", "timeline", "recruitment", "faq"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection((prev) => (prev !== section ? section : prev));
            break;
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "py-3 border-b border-white/12 shadow-xl shadow-black/60"
            : "py-5 border-b border-white/5"
        }`}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: isScrolled
            ? "rgba(5, 7, 11, 0.82)"
            : "rgba(5, 7, 11, 0.55)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logos (Left) */}
          <Link
            href="/"
            className="flex items-center gap-4 sm:gap-6 group focus:outline-none"
          >
            {/* IEEE CS Logo - Enlarged */}
            <div className="relative flex items-center">
              <Image
                src="/ieee-cs-logo-white.svg"
                alt="IEEE Computer Society Logo"
                width={220}
                height={70}
                className="h-12 sm:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>

            {/* GITAM University Logo */}
            <div className="relative flex items-center">
              <Image
                src="/gitam-logo.svg"
                alt="GITAM Visakhapatnam Logo"
                width={130}
                height={44}
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 opacity-95"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3.5 py-1.5 rounded-full liquid-glass border-white/15">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-cyan-300 bg-white/10 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <LiveApplyButton
              onClick={onOpenRecruitmentModal}
              size="sm"
              text="APPLY NOW"
              className="hidden sm:inline-flex"
            />

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-30 p-4 lg:hidden"
          >
            <div className="liquid-glass border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/10">
                <LiveApplyButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRecruitmentModal();
                  }}
                  size="md"
                  text="APPLY NOW"
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
