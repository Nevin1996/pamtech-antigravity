"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  Sparkles,
  Building2,
  ShieldCheck,
} from "lucide-react";

const INQUIRY_CATEGORIES = [
  "General Corporate Inquiries",
  "Bulk Fuel Supply (Pamtech Oil & Gas)",
  "Autoland Service & Fleet Contract",
  "Genuine Spare Parts Wholesale",
  "Luxury Ride & VIP Chauffeur Booking",
  "Media & Creative Advertising",
  "Technology & Software Solutions",
  "Real Estate & Property Investment",
  "Foundation & CSR Partnership",
];

export default function ContactPage() {
  const [category, setCategory] = useState("General Corporate Inquiries");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          name,
          email,
          phone,
          organization,
          message,
          source: "contact_page",
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setReferenceId(data.referenceId);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setName("");
    setEmail("");
    setPhone("");
    setOrganization("");
    setMessage("");
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
            <Sparkles className="w-4 h-4 text-[#FF6467]" />
            <span>Centralized Smart Routing Hub</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            Get in Touch With Pamtech
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed"
          >
            Visit our regional operations hubs in Owerri and Port Harcourt, or submit a direct inquiry to any of our 8 specialized subsidiaries.
          </motion.p>
        </div>
      </section>

      {/* 2. DUAL HEADQUARTERS DIRECTORY */}
      <section className="mx-auto w-11/12 max-w-7xl space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#51A2FF]">
            Physical Presence
          </span>
          <h2 className="text-3xl font-extrabold text-white">Our Regional Offices</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Owerri Head Office */}
          <div className="glass-dark rounded-3xl p-8 sm:p-10 border border-white/15 space-y-6 relative overflow-hidden group hover:border-[#FF6467]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-red-500/20 text-[#FF6467] text-xs font-bold uppercase tracking-wider">
                Group Headquarters
              </span>
              <Building2 className="w-6 h-6 text-gray-400 group-hover:text-[#FF6467] transition-colors" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Owerri Head Office</h3>
              <p className="text-xs text-gray-400 mt-1">Imo State Commercial Operations</p>
            </div>

            <div className="space-y-3.5 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF6467] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Plot CR17 Housing Area T, Port Harcourt Rd, behind Apams, New Owerri, Owerri, Imo State, Nigeria.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#51A2FF] shrink-0" />
                <a href="tel:+2348115004000" className="text-white hover:underline font-mono">
                  +234 811 500 4000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF6900] shrink-0" />
                <a href="mailto:info@pamtech.com" className="text-white hover:underline">
                  info@pamtech.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-400 pt-2 border-t border-white/10">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Monday – Saturday: 8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Port Harcourt Regional Office */}
          <div className="glass-dark rounded-3xl p-8 sm:p-10 border border-white/15 space-y-6 relative overflow-hidden group hover:border-[#51A2FF]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-[#51A2FF] text-xs font-bold uppercase tracking-wider">
                Regional Hub
              </span>
              <Building2 className="w-6 h-6 text-gray-400 group-hover:text-[#51A2FF] transition-colors" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Port Harcourt Regional Office</h3>
              <p className="text-xs text-gray-400 mt-1">Rivers State Operations & Plazas</p>
            </div>

            <div className="space-y-3.5 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#51A2FF] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  No 3 Edward Woherem Avenue, Opposite Ruby Event Center, Beside Winners Chapel / Jackbina Station, Rumuodara / Rumuodomaya, Rivers State, Nigeria.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#51A2FF] shrink-0" />
                <a href="tel:07034450400" className="text-white hover:underline font-mono">
                  0703 445 0400
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF6900] shrink-0" />
                <a href="mailto:info@pamtech.com" className="text-white hover:underline">
                  info@pamtech.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-400 pt-2 border-t border-white/10">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Monday – Saturday: 8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CENTRALIZED SMART INGESTION FORM */}
      <section className="mx-auto w-11/12 max-w-4xl pb-16">
        <div className="glass-dark rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467]">
              Centralized Dispatch Pipeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Send a Direct Message to Pamtech
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Your inquiry will be instantly routed to the specific department head with an automated tracking reference.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 border border-green-500/40 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Inquiry Successfully Dispatched!</h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-semibold">{name}</span>. Your request has been logged into Pamtech CRM under reference:
              </p>
              <div className="inline-block px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 font-mono text-base font-bold text-[#51A2FF]">
                {referenceId}
              </div>
              <p className="text-xs text-gray-400">
                A confirmation has been recorded and an executive from our <strong className="text-gray-200">{category}</strong> team will contact you shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC]"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Select Target Division / Inquiry Nature *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6467] transition-colors"
                >
                  {INQUIRY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#101828] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Engr. Chidi Okeke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="chidi@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467]"
                  />
                </div>
              </div>

              {/* Phone & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Organization Name (Optional)"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Message / Request Scope *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide any relevant specifications, volume requirements, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467] resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-500/25"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry to Centralized CRM...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message to Pamtech</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
