"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { BUSINESS_LINES } from "@/data/businessLines";

interface NavbarProps {
  onOpenInquiry?: (category?: string) => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBizDropdownOpen, setIsBizDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsBizDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#101828]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto w-11/12 max-w-7xl flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logos/logo.svg"
              alt="Pamtech Group Logo"
              className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300 brightness-110"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-200">
          <Link
            href="/story"
            className={`transition-colors hover:text-white flex items-center gap-1 ${
              pathname === "/story" ? "text-[#FF6467] font-semibold" : ""
            }`}
          >
            Our Story
          </Link>

          {/* Business Lines Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsBizDropdownOpen(true)}
            onMouseLeave={() => setIsBizDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 transition-colors hover:text-white py-2 ${
                pathname.startsWith("/business-lines") ? "text-[#FF6467] font-semibold" : ""
              }`}
            >
              Business Lines
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isBizDropdownOpen ? "rotate-180 text-[#FF6467]" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isBizDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] rounded-2xl glass-dark p-4 shadow-2xl border border-white/15 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="col-span-2 px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-white/10 flex items-center justify-between">
                  <span>8 Conglomerate Pillars</span>
                  <Link href="/business-lines" className="text-[#FF6467] hover:underline flex items-center gap-0.5">
                    View All <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
                {BUSINESS_LINES.map((biz) => (
                  <Link
                    key={biz.id}
                    href={`/business-lines/${biz.slug}`}
                    className="p-2.5 rounded-xl hover:bg-white/10 transition-all flex flex-col group/item"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm group-hover/item:text-[#FF6467] transition-colors">
                        {biz.name}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover/item:text-[#FF6467] opacity-0 group-hover/item:opacity-100 transition-all transform group-hover/item:translate-x-0.5" />
                    </div>
                    <span className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                      {biz.category}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/impact"
            className={`transition-colors hover:text-white ${
              pathname === "/impact" ? "text-[#FF6467] font-semibold" : ""
            }`}
          >
            Impact
          </Link>

          <Link
            href="/careers"
            className={`transition-colors hover:text-white flex items-center gap-1.5 ${
              pathname === "/careers" ? "text-[#FF6467] font-semibold" : ""
            }`}
          >
            Careers
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500/20 text-red-400 border border-red-500/30">Hiring</span>
          </Link>

          <Link
            href="/contact"
            className={`transition-colors hover:text-white ${
              pathname === "/contact" ? "text-[#FF6467] font-semibold" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenInquiry && onOpenInquiry("General Inquiries")}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] shadow-lg shadow-red-500/25 hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Partner / Inquire</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#101828]/95 backdrop-blur-2xl border-b border-white/15 px-6 pt-4 pb-8 space-y-4 animate-in fade-in duration-200">
          <div className="space-y-2 text-base font-medium text-gray-200">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/story"
              className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white"
            >
              Our Story (10-Year Journey)
            </Link>

            {/* Mobile Business Lines Accordion */}
            <div className="space-y-1 pt-1 pb-2">
              <span className="block px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Business Lines
              </span>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {BUSINESS_LINES.map((biz) => (
                  <Link
                    key={biz.id}
                    href={`/business-lines/${biz.slug}`}
                    className="block px-3 py-1.5 text-sm rounded-lg hover:bg-white/10 text-gray-300 hover:text-white"
                  >
                    {biz.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/impact"
              className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white"
            >
              Impact & CSR
            </Link>
            <Link
              href="/careers"
              className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white"
            >
              Careers (Open Positions)
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white"
            >
              Contact & Locations
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenInquiry) onOpenInquiry("General Inquiries");
              }}
              className="w-full py-3 rounded-xl text-center text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC]"
            >
              Partner / Inquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
