"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Fuel,
  Wrench,
  Boxes,
  Car,
  Radio,
  Cpu,
  Building,
  Heart,
  ArrowRight,
  Sparkles,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS_LINES } from "@/data/businessLines";
import { useInquiry } from "@/components/ClientLayoutWrapper";

export default function BusinessLinesIndexPage() {
  const { openInquiry } = useInquiry();

  const iconMap: Record<string, React.ReactNode> = {
    "oil-and-gas": <Fuel className="w-8 h-8 text-[#E7000B]" />,
    autoland: <Wrench className="w-8 h-8 text-[#134CA2]" />,
    autoparts: <Boxes className="w-8 h-8 text-[#E7000B]" />,
    "luxury-ride": <Car className="w-8 h-8 text-[#FF6900]" />,
    media: <Radio className="w-8 h-8 text-[#155DFC]" />,
    technology: <Cpu className="w-8 h-8 text-[#51A2FF]" />,
    "real-estate": <Building className="w-8 h-8 text-[#FB2C36]" />,
    foundation: <Heart className="w-8 h-8 text-[#E7000B]" />,
  };

  return (
    <div className="space-y-24">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="block md:hidden absolute inset-0 w-full h-full bg-pamtech-mobile opacity-75 scale-105" />
          <div className="hidden md:block absolute inset-0 w-full h-full bg-pamtech-desktop opacity-65 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#101828]/50 via-[#101828]/60 to-[#101828]" />
        </div>
        <div className="mx-auto w-11/12 max-w-7xl relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-badge text-gray-200 text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 text-[#FF6467]" />
            <span>8 Specialized Conglomerate Pillars</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            Our Business Lines
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed"
          >
            Diverse industrial capabilities unified by a single standard of excellence and an unshakeable commitment to human development.
          </motion.p>
        </div>
      </section>

      {/* Deep-Dive Grid of All 8 Business Lines */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-16">
        <div className="space-y-12">
          {BUSINESS_LINES.map((biz, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="glass-dark rounded-3xl p-8 sm:p-12 border border-white/15 hover:border-white/30 transition-all shadow-2xl relative overflow-hidden group"
              >
                {/* Ambient Highlight */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-bl-full pointer-events-none group-hover:bg-[#FF6467]/10 transition-colors" />

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left Overview */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-white/10 border border-white/15">
                        {iconMap[biz.id]}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467]">
                          {biz.category}
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                          {biz.name}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base text-gray-300 leading-relaxed">
                      {biz.description}
                    </p>

                    {/* Highlight Services Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {biz.services.map((srv, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5"
                        >
                          <CheckCircle className="w-4 h-4 text-[#51A2FF] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-white">{srv.title}</p>
                            <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                              {srv.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                      <Link
                        href={`/business-lines/${biz.slug}`}
                        className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all flex items-center gap-2 shadow-lg shadow-red-500/20"
                      >
                        <span>Explore {biz.name} Scrollytelling</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => openInquiry(biz.inquiryCategory)}
                        className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 glass-dark hover:bg-white/15 border border-white/20 transition-all"
                      >
                        Direct Inquiry
                      </button>
                    </div>
                  </div>

                  {/* Right Key Stats HUD & Real Photo */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-black/40 border border-white/15 shadow-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={biz.heroImage}
                        alt={biz.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                        <span className="font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF6467]" />
                          Official Subsidiary Asset
                        </span>
                        <span className="text-[10px] font-mono uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
                          Est. {biz.foundedYear}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {biz.highlightStats.slice(0, 2).map((st, stIdx) => (
                        <div
                          key={stIdx}
                          className="glass-card rounded-2xl p-4 text-gray-900 border border-white/50 shadow-xl"
                        >
                          <p className="text-2xl font-extrabold text-[#E7000B]">{st.value}</p>
                          <p className="text-[11px] font-bold text-gray-700 mt-0.5 uppercase tracking-wider">
                            {st.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
