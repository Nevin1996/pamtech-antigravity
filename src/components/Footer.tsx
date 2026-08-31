import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";
import { BUSINESS_LINES } from "@/data/businessLines";

export default function Footer() {
  return (
    <footer className="bg-[#0c121e] text-gray-300 pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto w-11/12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logos/logo.svg"
                alt="Pamtech Group Logo"
                className="h-10 w-auto object-contain brightness-110"
              />
            </Link>

            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Building tomorrow, serving today. A diversified conglomerate transforming energy, automotive diagnostics, genuine parts, luxury mobility, digital technology, media, real estate, and grassroots community empowerment across Nigeria.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6467]" />
              <span>Celebrating 10 Years of Excellence (2016 – 2026)</span>
            </div>
          </div>

          {/* Business Lines Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#E7000B] pl-2.5">
              Business Lines
            </h4>
            <ul className="space-y-2 text-sm">
              {BUSINESS_LINES.map((biz) => (
                <li key={biz.id}>
                  <Link
                    href={`/business-lines/${biz.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-1 group text-gray-400"
                  >
                    <span>{biz.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6467]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#155DFC] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-white transition-colors">
                  Our Story & Leadership
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition-colors">
                  Impact & CSR
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Careers at Pamtech
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-red-500/20 text-red-400">Hiring</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Locations & Hours */}
          <div className="space-y-4 text-xs text-gray-400">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#FF6900] pl-2.5">
              Headquarters
            </h4>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-white text-xs">Owerri Head Office</p>
                <p className="mt-0.5 leading-tight">Plot CR17 Housing Area T, Port Harcourt Rd, behind Apams, New Owerri, Imo State.</p>
                <p className="text-[#51A2FF] font-mono mt-1">+234 811 500 4000</p>
              </div>

              <div>
                <p className="font-semibold text-white text-xs">Port Harcourt Regional Office</p>
                <p className="mt-0.5 leading-tight">No 3 Edward Woherem Ave, Opp. Ruby Event Center, Rumuodara/Rumuodomaya, Rivers State.</p>
                <p className="text-[#51A2FF] font-mono mt-1">0703 445 0400</p>
              </div>

              <div className="flex items-center gap-1.5 pt-1 text-gray-400">
                <Clock className="w-3.5 h-3.5 text-[#FF6467]" />
                <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Pamtech Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/legal" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal" className="hover:text-gray-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
