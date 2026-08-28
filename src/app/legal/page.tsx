"use client";

import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="mx-auto w-11/12 max-w-4xl py-16 sm:py-24 space-y-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>

      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467]">
          Corporate Governance & Compliance
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-xs text-gray-400 font-mono">
          Last Updated: January 2026 • Pamtech Group Legal Compliance
        </p>
      </div>

      <div className="glass-dark rounded-3xl p-8 sm:p-12 border border-white/15 space-y-8 text-sm text-gray-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Corporate Identity</h2>
          <p>
            Pamtech Group operates in Nigeria as a registered conglomerate with headquarters at Plot CR17 Housing Area T, Port Harcourt Road, New Owerri, Imo State, and regional operations in Rivers State.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Data Ingestion & Privacy</h2>
          <p>
            Any information submitted through our centralized CRM portals, contact forms, or careers applicant systems is strictly used for fulfilling commercial service requests, customer relationship management, or talent evaluation. We do not sell or distribute personal data to unauthorized third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Genuine Component & Purity Guarantees</h2>
          <p>
            Pamtech Autoparts and Pamtech Oil & Gas uphold strict quality assurance protocols. All petroleum volumes are calibrated according to NMDPRA standards, and all automotive components are 100% genuine OEM verified.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Inquiries & Legal Contact</h2>
          <p>
            For legal inquiries, corporate governance documentation, or compliance reviews, please reach out to our legal department at <a href="mailto:info@pamtech.com" className="text-[#51A2FF] underline">info@pamtech.com</a> or call <span className="font-mono text-white">+234 811 500 4000</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
