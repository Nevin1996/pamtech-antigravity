"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  Fuel,
  Wrench,
  Boxes,
  Car,
  Radio,
  Cpu,
  Building,
  Heart,
  TrendingUp,
  MapPin,
  Clock,
  Layers,
  Smartphone,
  Send,
  Zap,
} from "lucide-react";
import { BUSINESS_LINES, BusinessLine } from "@/data/businessLines";
import { useInquiry } from "@/components/ClientLayoutWrapper";


export default function BusinessLineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const biz = BUSINESS_LINES.find((b) => b.slug === slug);
  const { openInquiry } = useInquiry();

  if (!biz) {
    notFound();
  }

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
      {/* 1. SUBSIDIARY HERO BANNER */}
      <section className="relative py-16 sm:py-24 hero-gradient overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto w-11/12 max-w-7xl relative z-10 space-y-6">
          {/* Breadcrumb Back */}
          <Link
            href="/business-lines"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Business Lines</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FF6467] text-xs font-bold uppercase tracking-widest">
                <span>{biz.category}</span>
                <span>•</span>
                <span>Est. {biz.foundedYear}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                {biz.name}
              </h1>

              <p className="text-lg sm:text-xl text-gradient-pamtech font-semibold">
                "{biz.tagline}"
              </p>

              <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                {biz.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => openInquiry(biz.inquiryCategory)}
                className="w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all shadow-xl shadow-red-500/25 flex items-center justify-center gap-2"
              >
                <span>{biz.ctaText}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY HIGHLIGHT STATS HUD */}
      <section className="mx-auto w-11/12 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {biz.highlightStats.map((st, i) => (
            <div
              key={i}
              className="glass-dark rounded-3xl p-6 border border-white/10 text-center hover:border-white/25 transition-colors"
            >
              <p className="text-3xl sm:text-5xl font-extrabold text-white">{st.value}</p>
              <p className="text-xs font-semibold text-gray-400 mt-2 uppercase tracking-wider">
                {st.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BESPOKE SCROLL-ANIMATED STORYTELLING STAGE */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#51A2FF]">
            Operational Workflow & Engineering
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How We Deliver Excellence
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Step through the precision processes that make {biz.name} an undisputed market leader.
          </p>
        </div>

        <div className="space-y-8">
          {biz.scrollyFeatures.map((scrolly, idx) => (
            <motion.div
              key={scrolly.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-dark rounded-3xl p-8 sm:p-12 border border-white/15 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-2 flex lg:flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E7000B] to-[#155DFC] flex items-center justify-center font-extrabold text-2xl text-white shadow-xl">
                    0{scrolly.step}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Phase {scrolly.step}
                  </span>
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {scrolly.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {scrolly.description}
                  </p>
                </div>

                <div className="lg:col-span-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 space-y-2">
                  <div className="flex items-center gap-2 text-[#FF6467] font-bold uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Technical Standard</span>
                  </div>
                  <p className="leading-relaxed">{scrolly.visualDetail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. COMPREHENSIVE SERVICE MATRIX */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467]">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Services & Solutions Suite
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {biz.services.map((srv, idx) => (
            <div
              key={idx}
              className="glass-dark rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#51A2FF]">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">{srv.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-bold text-[#FF6467] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DIRECT CONVERSION CTA FOOTER */}
      <section className="mx-auto w-11/12 max-w-7xl pb-16">
        <div className="rounded-3xl p-8 sm:p-12 glass-dark border border-white/20 text-center space-y-6">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Connect With {biz.name} Specialists
          </h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Our corporate representatives and technical teams are on standby to consult on your custom requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openInquiry(biz.inquiryCategory)}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all shadow-xl"
            >
              {biz.ctaText}
            </button>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 glass-dark hover:bg-white/15 border border-white/20 transition-all"
            >
              Contact Local Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
