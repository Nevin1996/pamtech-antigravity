"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Fuel,
  Wrench,
  Boxes,
  Car,
  Radio,
  Cpu,
  Building,
  Heart,
  ChevronRight,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";
import { BUSINESS_LINES } from "@/data/businessLines";
import PartnerTicker from "@/components/PartnerTicker";
import StatCounter from "@/components/StatCounter";
import { useInquiry } from "@/components/ClientLayoutWrapper";

export default function HomePage() {
  const { openInquiry } = useInquiry();

  const iconMap: Record<string, React.ReactNode> = {
    "oil-and-gas": <Fuel className="w-6 h-6 text-[#E7000B]" />,
    autoland: <Wrench className="w-6 h-6 text-[#134CA2]" />,
    autoparts: <Boxes className="w-6 h-6 text-[#E7000B]" />,
    "luxury-ride": <Car className="w-6 h-6 text-[#FF6900]" />,
    media: <Radio className="w-6 h-6 text-[#155DFC]" />,
    technology: <Cpu className="w-6 h-6 text-[#51A2FF]" />,
    "real-estate": <Building className="w-6 h-6 text-[#FB2C36]" />,
    foundation: <Heart className="w-6 h-6 text-[#E7000B]" />,
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-gradient pt-8 pb-16">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto w-11/12 max-w-7xl relative z-10 text-center space-y-8">
          {/* Milestone Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-badge text-gray-200 text-xs sm:text-sm font-medium shadow-xl shadow-red-500/5 hover:border-white/40 transition-all cursor-default"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FB2C36] animate-pulse" />
            <span>Celebrating 10 Years of Excellence (2016 – 2026)</span>
            <Award className="w-4 h-4 text-[#FF6467]" />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-tight">
              Committed Service
            </h1>
            <h1 className="font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-gradient-pamtech leading-tight">
              to Humanity
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-xl text-gray-300 font-normal leading-relaxed"
          >
            From energy and automotive diagnostics to genuine parts, executive mobility, media, technology, and real estate — Pamtech is transforming industries across Nigeria with innovation and excellence.
          </motion.p>

          {/* Core Stat Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <div className="glass-dark px-6 py-3.5 rounded-2xl flex items-center gap-3 border border-white/10">
              <TrendingUp className="w-5 h-5 text-[#FF6467]" />
              <div className="text-left">
                <p className="text-xl font-bold text-white">8</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider">Business Lines</p>
              </div>
            </div>

            <div className="glass-dark px-6 py-3.5 rounded-2xl flex items-center gap-3 border border-white/10">
              <Users className="w-5 h-5 text-[#51A2FF]" />
              <div className="text-left">
                <p className="text-xl font-bold text-white">400+</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider">Team Members</p>
              </div>
            </div>

            <div className="glass-dark px-6 py-3.5 rounded-2xl flex items-center gap-3 border border-white/10">
              <Award className="w-5 h-5 text-[#FF6900]" />
              <div className="text-left">
                <p className="text-xl font-bold text-white">10+</p>
                <p className="text-[11px] text-gray-400 uppercase tracking-wider">Years of Impact</p>
              </div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/story"
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] shadow-xl shadow-red-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Explore Our 10-Year Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openInquiry("General Inquiries")}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 glass-dark hover:bg-white/15 border border-white/20 transition-all flex items-center gap-2"
            >
              <span>Partner With Pamtech</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF6467]" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. PARTNER TRUST TICKER */}
      <PartnerTicker />

      {/* 3. BUSINESS LINES ECOSYSTEM (8 PILLARS) */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#FF6467] text-xs font-bold uppercase tracking-widest">
              <span>8 Conglomerate Pillars</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Diverse Expertise. Unified Purpose.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Delivering operational excellence across vital sectors powering Nigeria's economic and human development.
            </p>
          </div>

          <Link
            href="/business-lines"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#51A2FF] hover:text-white transition-colors"
          >
            <span>View Complete Subsidiary Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Cards Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS_LINES.map((biz) => (
            <Link
              key={biz.id}
              href={`/business-lines/${biz.slug}`}
              className="group glass-dark rounded-3xl p-5 border border-white/10 hover:border-[#FF6467]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-red-500/10 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none group-hover:bg-[#FF6467]/10 transition-colors" />

              <div className="space-y-4">
                {/* Real Subsidiary Photo Preview */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={biz.heroImage}
                    alt={biz.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101828] via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                    {iconMap[biz.id]}
                  </div>
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-gray-300 uppercase tracking-wider">
                    Est. {biz.foundedYear}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#FF6467] block tracking-wide uppercase">
                    {biz.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#51A2FF] transition-colors mt-0.5">
                    {biz.name}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                  {biz.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-300 group-hover:text-white">
                <span>Explore Subsidiary</span>
                <ChevronRight className="w-4 h-4 text-[#FF6467] transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. STORY TEASER SECTION */}
      <section className="mx-auto w-11/12 max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden glass-dark border border-white/15 p-8 sm:p-14">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467]">
                A Decade of Intentional Growth
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                From a Team of Three to 7+ Thriving Business Lines
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Founded in Owerri in 2016 by <strong>Engr. Chidomere Ndubuisi</strong>, Pamtech began by addressing critical supply integrity in downstream petroleum. Over the past 10 years, our unwavering commitment to humanity has propelled our disciplined expansion into automotive engineering, technology platforms, luxury logistics, and generational real estate.
              </p>
              <div className="pt-2">
                <Link
                  href="/story"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all shadow-lg shadow-red-500/20"
                >
                  <span>Experience the Full 10-Year Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5 text-gray-900 border border-white/40 shadow-xl">
                <p className="text-3xl font-extrabold text-[#E7000B]">2016</p>
                <p className="text-xs font-bold text-gray-700 mt-1 uppercase">Founded in Owerri</p>
                <p className="text-[11px] text-gray-500 mt-1">Starting with 3 visionary pioneers.</p>
              </div>
              <div className="glass-card rounded-2xl p-5 text-gray-900 border border-white/40 shadow-xl">
                <p className="text-3xl font-extrabold text-[#134CA2]">2021</p>
                <p className="text-xs font-bold text-gray-700 mt-1 uppercase">Autoland Launched</p>
                <p className="text-[11px] text-gray-500 mt-1">2 Mega-garages & parts plazas.</p>
              </div>
              <div className="glass-card rounded-2xl p-5 text-gray-900 border border-white/40 shadow-xl">
                <p className="text-3xl font-extrabold text-[#FF6900]">2022</p>
                <p className="text-xs font-bold text-gray-700 mt-1 uppercase">Luxury Ride</p>
                <p className="text-[11px] text-gray-500 mt-1">30+ Premium executive SUVs.</p>
              </div>
              <div className="glass-card rounded-2xl p-5 text-gray-900 border border-white/40 shadow-xl">
                <p className="text-3xl font-extrabold text-[#155DFC]">2026</p>
                <p className="text-xs font-bold text-gray-700 mt-1 uppercase">10-Year Milestone</p>
                <p className="text-[11px] text-gray-500 mt-1">400+ Team & 8 Subsidiaries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMPACT NUMBERS HUD */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#51A2FF]">
            Measurable Results
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Impact By The Numbers
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Tangible benchmarks of excellence delivered across communities, industries, and individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCounter
            endValue={100000}
            suffix="+"
            label="Customers Served"
            description="Across fuel stations, auto diagnostics, parts retail, luxury travel, and digital tools."
          />
          <StatCounter
            endValue={50000}
            suffix="+"
            label="Vehicles Maintained"
            description="Computerized diagnostics and repairs with 98% first-time fix accuracy."
          />
          <StatCounter
            endValue={100}
            suffix="M+"
            label="Liters Fuel Delivered"
            description="Supplied across commercial, industrial, and telecommunication partners."
          />
          <StatCounter
            endValue={10000}
            suffix="+"
            label="Lives Impacted by Foundation"
            description="Direct scholarship recipients, women micro-grants, and youth leadership mentorship."
          />
          <StatCounter
            endValue={10}
            suffix="+"
            label="Years of Excellence"
            description="A solid decade of values-driven commercial leadership."
          />
          <StatCounter
            endValue={8}
            suffix=""
            label="Business Lines"
            description="Unifying diverse capabilities into a single standard of excellence."
          />
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="mx-auto w-11/12 max-w-7xl pb-16">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#101828] via-[#460809] to-[#162456] border border-white/20 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,103,0.15),transparent_70%)] pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight relative z-10">
            Ready to Build Something Extraordinary Together?
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 relative z-10">
            Whether you require bulk fuel delivery, fleet maintenance contracts, luxury chauffeur reservations, real estate investments, or media partnerships — our team is ready to serve.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4 relative z-10">
            <button
              onClick={() => openInquiry("General Inquiries")}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all shadow-xl shadow-red-500/25"
            >
              Start a Conversation With Pamtech
            </button>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 glass-dark hover:bg-white/15 border border-white/20 transition-all"
            >
              View Office Locations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
