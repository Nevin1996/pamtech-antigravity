"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, Send, Loader2, Sparkles, Building2, Phone, Mail } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

const INQUIRY_CATEGORIES = [
  "General Inquiries",
  "Bulk Fuel Supply (Oil & Gas)",
  "Autoland Service & Fleet Repairs",
  "Genuine Spare Parts Wholesale",
  "Luxury Ride & VIP Chauffeur Booking",
  "Media & Creative Advertising",
  "Technology & Software Solutions",
  "Real Estate & Property Investment",
  "Foundation & CSR Partnership",
];

export default function InquiryModal({
  isOpen,
  onClose,
  initialCategory = "General Inquiries",
}: InquiryModalProps) {
  const [category, setCategory] = useState(initialCategory);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  if (!isOpen) return null;

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
          source: "inquiry_modal",
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
      console.error("Inquiry error:", err);
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#101828] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 border border-green-500/40 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Thank you, <span className="text-white font-semibold">{name}</span>. Your request has been logged into Pamtech Group's centralized CRM system under reference:
            </p>
            <div className="inline-block px-4 py-2 rounded-xl bg-white/10 border border-white/20 font-mono text-sm font-bold text-[#51A2FF]">
              {referenceId}
            </div>
            <p className="text-xs text-gray-400">
              A dedicated representative from our <strong className="text-gray-200">{category}</strong> team will contact you within 24 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC]"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : status === "error" ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 border border-red-500/40 rounded-full flex items-center justify-center mx-auto">
              <X className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Transmission Issue</h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              We were unable to log your inquiry right now. Please check your connection or try again.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-1 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Centralized Group Ingestion
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Start a Conversation
              </h3>
              <p className="text-xs text-gray-400">
                Direct your request to any of Pamtech Group's 8 specialized subsidiaries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Business Division / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6467] transition-colors"
                >
                  {INQUIRY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#101828] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467]"
                  />
                </div>
              </div>

              {/* Phone & Organization Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Optional"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  How Can We Help You? *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Please describe your requirements, timeline, or scope..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF6467] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/25"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting to CRM...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry to Pamtech</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
