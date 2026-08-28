"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  "World Bank",
  "Dangote Group",
  "Masters Energy",
  "Imo State Government",
  "First Bank of Nigeria",
  "Guaranty Trust Bank (GTBank)",
  "Access Bank",
  "Rivers State Government",
  "TotalEnergies Partners",
];

export default function PartnerTicker() {
  return (
    <div className="w-full py-8 border-y border-white/10 bg-[#101828]/60 overflow-hidden relative">
      <div className="mx-auto w-11/12 max-w-7xl mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Trusted by Leading Institutions & Public Sector Organizations Across Nigeria
        </span>
      </div>

      <div className="flex gap-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-gray-300 font-semibold text-base sm:text-lg tracking-wide hover:text-white transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6467]" />
              <span>{partner}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
