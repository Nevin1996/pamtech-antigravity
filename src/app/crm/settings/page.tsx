"use client";
import CRMShell from "@/components/crm/CRMShell";
import { Database, Mail, Shield, Bell, ExternalLink } from "lucide-react";

export default function SettingsPage() {
  const isConfigured =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-ref.supabase.co";

  return (
    <CRMShell>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-sm text-white/40 mb-8">CRM configuration and integration status</p>

        <div className="space-y-4">
          {/* Supabase status */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">Database (Supabase)</h3>
                <p className="text-xs text-white/40 mt-1">
                  PostgreSQL backend for leads and career applications
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs text-amber-400">Not yet configured — Demo mode active</span>
                </div>
                <div className="mt-4 bg-white/5 border border-white/8 rounded-xl p-4 font-mono text-xs text-white/50 space-y-1">
                  <p># Add to .env.local:</p>
                  <p className="text-[#C8A96E]">NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</p>
                  <p className="text-[#C8A96E]">NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</p>
                  <p className="text-[#C8A96E]">SUPABASE_SERVICE_ROLE_KEY=your-service-role-key</p>
                </div>
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C8A96E] hover:underline mt-3"
                >
                  Create free Supabase project <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* SQL Migration */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">Database Schema</h3>
                <p className="text-xs text-white/40 mt-1">
                  Run the migration SQL in your Supabase SQL Editor to create the CRM tables
                </p>
                <p className="text-xs text-white/50 mt-3 font-mono">
                  supabase/migrations/001_crm_schema.sql
                </p>
                <p className="text-xs text-white/30 mt-2">
                  Creates: <code className="text-white/50">leads</code> table,{" "}
                  <code className="text-white/50">applications</code> table, RLS policies, resume storage bucket
                </p>
              </div>
            </div>
          </div>

          {/* Resend */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">Email Notifications (Resend)</h3>
                <p className="text-xs text-white/40 mt-1">
                  Sends auto-acknowledgement to submitters + internal team alerts on each new lead
                </p>
                <div className="mt-4 bg-white/5 border border-white/8 rounded-xl p-4 font-mono text-xs text-white/50 space-y-1">
                  <p># Add to .env.local:</p>
                  <p className="text-violet-400">RESEND_API_KEY=re_your_api_key</p>
                  <p className="text-violet-400">RESEND_FROM_EMAIL=crm@pamtechgroup.com</p>
                  <p className="text-violet-400">CRM_NOTIFY_EMAIL=admin@pamtechgroup.com</p>
                </div>
                <a
                  href="https://resend.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:underline mt-3"
                >
                  Get free Resend API key <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* CRM Auth */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">CRM Admin Access</h3>
                <p className="text-xs text-white/40 mt-1 leading-relaxed">
                  Once Supabase is configured, create CRM user accounts from your{" "}
                  <strong className="text-white/60">Supabase Dashboard → Authentication → Users</strong>.
                  Invite team members by email. They will set their own password and log in at{" "}
                  <code className="text-[#C8A96E]">/crm/login</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CRMShell>
  );
}
