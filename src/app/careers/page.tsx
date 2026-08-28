"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  Heart,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { JOB_OPENINGS, JobOpening } from "@/data/jobsData";
import QuickApplyModal from "@/components/QuickApplyModal";

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const departments = [
    "All",
    "Automotive Engineering",
    "Technology & Product",
    "Properties & Real Estate",
    "Energy & Supply Chain",
    "Pamtech Media",
  ];

  const locations = ["All", "Owerri, Imo State", "Port Harcourt, Rivers State", "Hybrid / Port Harcourt", "Owerri / Lagos"];

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchesDept = selectedDept === "All" || job.department === selectedDept;
    const matchesLoc = selectedLocation === "All" || job.location === selectedLocation;
    return matchesDept && matchesLoc;
  });

  const handleOpenApply = (job: JobOpening) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  return (
    <div className="space-y-24">
      {/* 1. HERO BANNER */}
      <section className="relative py-16 sm:py-24 hero-gradient overflow-hidden">
        <div className="mx-auto w-11/12 max-w-7xl relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-badge text-gray-200 text-xs font-bold uppercase tracking-widest"
          >
            <Briefcase className="w-4 h-4 text-[#FF6467]" />
            <span>Join 400+ Pioneers Across Nigeria</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            Build Your Career at Pamtech
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed"
          >
            Where purpose meets ambition. Work with industry-defining automotive engineers, software developers, energy logisticians, and creative storytellers.
          </motion.p>
        </div>
      </section>

      {/* 2. WHY PAMTECH CULTURE MATRIX */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#51A2FF]">
            Life at Pamtech
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Professionals Choose Pamtech
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-dark rounded-3xl p-8 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-[#FF6467] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Continuous Growth & Learning</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Every team member receives sponsored access to our <strong>Learn with Pamtech</strong> executive programs and OEM technical masterclasses.
            </p>
          </div>

          <div className="glass-dark rounded-3xl p-8 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-[#51A2FF] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Comprehensive Health & Wellness</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Full HMO medical coverage, annual wellness checks, paid leave, and structured work-life balance policies for you and your family.
            </p>
          </div>

          <div className="glass-dark rounded-3xl p-8 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-[#FF6900] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">High-Impact Innovation</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Work on solutions that directly touch millions of lives — from automotive diagnostic infrastructure to grassroots community scholarships.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FILTERABLE LIVE JOB BOARD */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Open Positions ({filteredJobs.length})
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Filter by department and primary location to find your next opportunity.
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-[#FF6467]"
            >
              {departments.map((d) => (
                <option key={d} value={d} className="bg-[#101828] text-white">
                  Department: {d}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-[#51A2FF]"
            >
              {locations.map((l) => (
                <option key={l} value={l} className="bg-[#101828] text-white">
                  Location: {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="glass-dark rounded-3xl p-12 text-center text-gray-400 space-y-2">
              <p className="text-base font-semibold">No open roles found matching this filter.</p>
              <p className="text-xs">Try selecting a different department or location.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="glass-dark rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#FF6467]/50 transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[#FF6467] text-[11px] font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-[11px] font-semibold">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#51A2FF] transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#51A2FF]" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FF6900]" />
                      {job.experience}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Quick Apply</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. SPONTANEOUS TALENT POOL */}
      <section className="mx-auto w-11/12 max-w-7xl pb-16">
        <div className="rounded-3xl p-8 sm:p-12 glass-dark border border-white/20 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Don't See Your Exact Role?
          </h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            We are constantly growing across Nigeria. Submit a spontaneous expression of interest to join the Pamtech Talent Network.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() =>
                handleOpenApply({
                  id: "general-talent",
                  title: "General Expression of Interest (Talent Pool)",
                  department: "Corporate & Subsidiary Network",
                  divisionSlug: "corporate",
                  location: "All Locations",
                  type: "Full-Time",
                  experience: "All Levels",
                  description: "Join the Pamtech talent pool for upcoming opportunities across our 8 subsidiaries.",
                  requirements: [],
                  responsibilities: [],
                })
              }
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all shadow-xl"
            >
              Submit Spontaneous Application
            </button>
          </div>
        </div>
      </section>

      {/* 2-Step Quick Apply Modal */}
      <QuickApplyModal
        job={selectedJob}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}
