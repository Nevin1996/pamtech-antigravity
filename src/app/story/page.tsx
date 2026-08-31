"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  Wrench,
  Car,
  Radio,
  Cpu,
  Building,
  Heart,
  Award,
  CheckCircle,
  ArrowRight,
  Shield,
  Eye,
  Target,
  Sparkles,
  Users,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import { TIMELINE_MILESTONES } from "@/data/timelineData";
import { useInquiry } from "@/components/ClientLayoutWrapper";

export default function OurStoryPage() {
  const { openInquiry } = useInquiry();

  const iconMap: Record<string, React.ReactNode> = {
    Rocket: <Rocket className="w-5 h-5 text-white" />,
    Wrench: <Wrench className="w-5 h-5 text-white" />,
    Car: <Car className="w-5 h-5 text-white" />,
    Radio: <Radio className="w-5 h-5 text-white" />,
    Cpu: <Cpu className="w-5 h-5 text-white" />,
    Building: <Building className="w-5 h-5 text-white" />,
    Heart: <Heart className="w-5 h-5 text-white" />,
  };

  return (
    <div className="space-y-24">
      {/* 1. CINEMATIC VIDEO BACKGROUND HERO */}
      <VideoBackground
        posterSrc="/assets/pictures/oil_and_gas.png"
        overlayOpacity="bg-[#101828]/85"
      >
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-badge text-gray-200 text-xs font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-[#E7000B] animate-pulse" />
            <span>Our Journey • 2016 to 2026</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              A Decade of
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gradient-pamtech tracking-tight">
              Intentional Growth
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-gray-300 font-normal leading-relaxed"
          >
            From a team of three to 8 thriving business lines — every milestone represents our unwavering commitment to serving humanity through integrity, innovation, and disciplined execution.
          </motion.p>
        </div>
      </VideoBackground>

      {/* 2. FOUNDER & LEADERSHIP VISION */}
      <section className="mx-auto w-11/12 max-w-7xl">
        <div className="glass-dark rounded-3xl p-8 sm:p-14 border border-white/15 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founder Image / Badge Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden aspect-4/5 bg-gradient-to-br from-[#162456] to-[#460809] border border-white/20 p-8 flex flex-col justify-end text-white shadow-2xl relative">
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-red-600/80 text-white font-mono text-xs uppercase tracking-wider font-bold">
                  Leadership
                </div>
                <div className="space-y-1 relative z-10">
                  <h3 className="text-2xl font-bold">Engr. Chidomere Ndubuisi</h3>
                  <p className="text-xs text-[#51A2FF] font-semibold uppercase tracking-wider">
                    Founder & Group Managing Director
                  </p>
                  <p className="text-xs text-gray-300 pt-2 leading-relaxed">
                    "True enterprise is not merely measured in revenue; it is validated by the lives uplifted, the standards raised, and the enduring value created for our communities."
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF6467]">
                <Sparkles className="w-4 h-4" />
                <span>Our Philosophy & Guiding Ethos</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built on Integrity, Driven by Excellence
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                When Pamtech Oil & Gas was established in Owerri in 2016, the downstream landscape was plagued by uncalibrated pumps, inconsistent fuel quality, and logistical friction. Pamtech chose the path of total transparency — ensuring every liter delivered was 100% pure and accurately metered.
              </p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                That foundational discipline became the DNA of the Pamtech Group. As we expanded into vehicle diagnostics (Autoland), genuine spare parts, executive hospitality, media, software innovation, and sustainable masterplanned real estate, the standard remained unwavering: <strong>Committed Service to Humanity.</strong>
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-2xl font-extrabold text-white">400+</p>
                  <p className="text-xs text-gray-400">Trained Employees</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#FF6467]">8</p>
                  <p className="text-xs text-gray-400">Core Business Units</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#51A2FF]">10</p>
                  <p className="text-xs text-gray-400">Years of Integrity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PINNED 10-YEAR JOURNEY SCROLLYTELLING */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467]">
            Milestones of Excellence
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The 10-Year Timeline (2016 – 2026)
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Trace the disciplined journey of diversification and growth that shaped Nigeria's leading conglomerate.
          </p>
        </div>

        {/* Alternating Vertical Timeline */}
        <div className="relative">
          {/* Center Glowing Progress Spine */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#E7000B] via-[#155DFC] to-[#FF6900] opacity-40 rounded-full" />

          <div className="space-y-12 md:space-y-20">
            {TIMELINE_MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-[calc(50%-2.5rem)] glass-dark rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/30 transition-all shadow-2xl relative"
                  >
                    {/* Floating Year Tag */}
                    <div
                      className="absolute top-0 right-6 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.year}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-3 rounded-2xl shadow-lg"
                          style={{ backgroundColor: item.color }}
                        >
                          {iconMap[item.icon]}
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                            {item.badge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-white/10">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle className="w-4 h-4 text-[#FF6467] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {item.businessSlug && (
                        <div className="pt-2">
                          <Link
                            href={`/business-lines/${item.businessSlug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#51A2FF] hover:underline"
                          >
                            <span>Explore Business Division</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Center Node Indicator */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#101828] border-2 border-white/40 shadow-xl relative z-10 shrink-0">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>

                  {/* Opposite Photographic Preview Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="hidden md:block w-[calc(50%-2.5rem)]"
                  >
                    <div className="glass-dark rounded-3xl p-2 border border-white/15 overflow-hidden shadow-2xl group">
                      <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                          <span className="font-bold text-white tracking-wide">
                            {item.title}
                          </span>
                          <span
                            className="px-3 py-1 rounded-full text-[10px] font-bold text-white shadow"
                            style={{ backgroundColor: item.color }}
                          >
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES MATRIX */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#51A2FF]">
            The Pillars of Our Culture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Core Values
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            The four non-negotiable principles guiding every decision and customer interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-dark rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="p-3 rounded-2xl bg-red-500/20 text-[#FF6467] w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Integrity First</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              We deliver exact measurements, 100% genuine components, and transparent commercial dealings in every transaction.
            </p>
          </div>

          <div className="glass-dark rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-[#51A2FF] w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Relentless Excellence</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              From our computerized vehicle diagnostics to masterplanned real estate, we execute with world-class engineering standards.
            </p>
          </div>

          <div className="glass-dark rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="p-3 rounded-2xl bg-orange-500/20 text-[#FF6900] w-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Customer Centricity</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              We design every solution around the peace of mind, safety, and long-term prosperity of the people we serve.
            </p>
          </div>

          <div className="glass-dark rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 text-[#FB2C36] w-fit">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Committed Service</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              We actively reinvest in human potential through educational scholarships, youth mentorship, and community healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="mx-auto w-11/12 max-w-7xl pb-16">
        <div className="rounded-3xl p-8 sm:p-12 glass-dark border border-white/20 text-center space-y-6">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Join Us in Writing the Next Chapter
          </h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Discover opportunities to partner, invest, or build a meaningful career with the Pamtech family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openInquiry("General Inquiries")}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all"
            >
              Start a Conversation
            </button>
            <Link
              href="/careers"
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-200 glass-dark hover:bg-white/15 border border-white/20 transition-all"
            >
              Explore Open Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
