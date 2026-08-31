"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Award,
  Sparkles,
  Users,
  Building,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import StatCounter from "@/components/StatCounter";
import { IMPACT_METRICS, IMPACT_GALLERY } from "@/data/impactData";
import { useInquiry } from "@/components/ClientLayoutWrapper";

export default function ImpactPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const { openInquiry } = useInquiry();

  const categories = ["All", "Foundation", "Technology", "Real Estate", "Energy & Automotive"];

  const filteredGallery =
    selectedFilter === "All"
      ? IMPACT_GALLERY
      : IMPACT_GALLERY.filter((item) => item.category === selectedFilter);

  return (
    <div className="space-y-24">
      {/* 1. CINEMATIC VIDEO BACKGROUND HERO */}
      <VideoBackground
        posterSrc="/assets/pictures/foundation.png"
        overlayOpacity="bg-[#101828]/85"
      >
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-badge text-gray-200 text-xs font-bold uppercase tracking-widest"
          >
            <Heart className="w-4 h-4 text-[#FF6467]" />
            <span>Social Impact & Corporate Responsibility</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              Innovation That
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gradient-pamtech tracking-tight">
              Drives Human Impact
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We believe commercial growth is meaningless without social transformation. Through educational scholarships, artisanal grants, and youth empowerment, Pamtech Foundation is breaking generational poverty barriers.
          </motion.p>
        </div>
      </VideoBackground>

      {/* 2. MEASURABLE RESULTS HUD */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467]">
            Empirical Results
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Impact By The Numbers
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Verified data points reflecting our direct footprint across Nigerian communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMPACT_METRICS.map((metric, i) => (
            <StatCounter
              key={i}
              endValue={metric.numericValue}
              suffix={metric.suffix}
              label={metric.label}
              description={metric.description}
            />
          ))}
        </div>
      </section>

      {/* 3. KEY SOCIAL IMPACT PILLARS */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-12">
        <div className="glass-dark rounded-3xl p-8 sm:p-14 border border-white/15">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-[#FF6467] flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">DAD4Adolescents</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Flagship mentorship curriculum providing character formation, digital tech literacy, and career planning to thousands of Nigerian teenagers.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#FF6467] flex items-center gap-1">
                <span>5,000+ Youths Reached</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-[#51A2FF] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Future Scholars Program</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Fully funded primary, secondary, and tertiary scholarships for brilliant underprivileged students in STEM and engineering disciplines.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#51A2FF] flex items-center gap-1">
                <span>1,000+ Scholars Funded</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-[#FF6900] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Artisanal Seed Grants</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Direct, non-repayable capital equipment and working capital grants to local mechanics, female trade artisans, and tech founders.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#FF6900] flex items-center gap-1">
                <span>₦50M+ Disbursed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FILTERABLE MOMENTS OF EXCELLENCE GALLERY */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467]">
              Photo & Video Archive
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Moments That Define Excellence
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedFilter === cat
                    ? "bg-gradient-to-r from-[#E7000B] to-[#155DFC] text-white shadow-lg"
                    : "glass-dark text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-dark rounded-3xl overflow-hidden border border-white/10 group hover:border-[#FF6467]/40 transition-all flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-gray-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider">
                  {item.category}
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold">
                  {item.year}
                </div>
              </div>

              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <h4 className="font-bold text-lg text-white group-hover:text-[#51A2FF] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="mx-auto w-11/12 max-w-7xl pb-16">
        <div className="rounded-3xl p-8 sm:p-12 glass-dark border border-white/20 text-center space-y-6">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Partner with Pamtech Foundation
          </h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Join hands with our social impact team to co-sponsor student scholarships, healthcare outreaches, and youth enterprise development.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => openInquiry("Foundation & CSR Partnership")}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all shadow-xl"
            >
              Propose a CSR Partnership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
