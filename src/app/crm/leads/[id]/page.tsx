"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Clock,
  Tag,
  ChevronDown,
  Save,
  Loader2,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import CRMShell from "@/components/crm/CRMShell";
import { LEAD_STATUS_CONFIG, PRIORITY_CONFIG, type Lead, type LeadStatus, type LeadPriority } from "@/lib/crm-types";
import { clsx } from "clsx";

const PIPELINE: LeadStatus[] = ["new", "contacted", "qualified", "converted", "closed"];

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [lead, setLead] = useState<Lead | null>(null);
  const [mode, setMode] = useState<"local" | "supabase">("local");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<LeadStatus>("new");
  const [priority, setPriority] = useState<LeadPriority>("medium");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    fetch(`/api/crm/leads/${id}`)
      .then((r) => r.json())
      .then(({ data, mode: m }) => {
        setLead(data);
        setMode(m || "local");
        setNotes(data?.notes || "");
        setStatus(data?.status || "new");
        setPriority(data?.priority || "medium");
        setAssignedTo(data?.assigned_to || "");
        setLoading(false);
      });
  }, [id]);

  async function save() {
    setSaving(true);
    await fetch(`/api/crm/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, priority, notes, assigned_to: assignedTo || null }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) {
    return (
      <CRMShell>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 text-[#C8A96E] animate-spin" />
        </div>
      </CRMShell>
    );
  }

  if (!lead) {
    return (
      <CRMShell>
        <div className="p-8 text-center text-white/40">
          <p>Lead not found.</p>
          <Link href="/crm/leads" className="text-[#C8A96E] text-sm mt-2 inline-block">
            ← Back to leads
          </Link>
        </div>
      </CRMShell>
    );
  }

  const currentStep = PIPELINE.indexOf(status);

  return (
    <CRMShell mode={mode}>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Back */}
        <Link
          href="/crm/leads"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C8A96E]/30 to-[#a8893e]/30 flex items-center justify-center text-lg font-bold text-[#C8A96E] flex-shrink-0">
              {lead.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{lead.name}</h1>
              <p className="text-sm text-white/40">{lead.organization || "Individual"}</p>
              <p className="text-xs font-mono text-[#C8A96E] mt-1">{lead.reference_id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/8 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-2 px-3 py-2 bg-[#C8A96E]/10 border border-[#C8A96E]/30 rounded-xl text-xs text-[#C8A96E] hover:bg-[#C8A96E]/20 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
          </div>
        </div>

        {/* Pipeline Progress */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-5 mb-6">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Lead Pipeline</p>
          <div className="flex items-center gap-1">
            {PIPELINE.map((s, i) => {
              const cfg = LEAD_STATUS_CONFIG[s];
              const isActive = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={s} className="flex items-center flex-1">
                  <button
                    onClick={() => setStatus(s)}
                    className={clsx(
                      "flex-1 text-center py-2 px-1 rounded-xl text-xs font-medium transition-all border",
                      isCurrent
                        ? `${cfg.bgColor} ${cfg.color}`
                        : isActive
                        ? "bg-white/8 text-white/60 border-white/10"
                        : "bg-transparent text-white/20 border-transparent hover:border-white/10 hover:text-white/40"
                    )}
                  >
                    {cfg.label}
                  </button>
                  {i < PIPELINE.length - 1 && (
                    <div className={clsx("h-px flex-shrink-0 w-2", isActive ? "bg-white/20" : "bg-white/8")} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Contact + Message */}
          <div className="lg:col-span-2 space-y-4">
            {/* Contact Info */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                Contact Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: "Email", value: lead.email, href: `mailto:${lead.email}` },
                  { icon: <Phone className="w-4 h-4" />, label: "Phone", value: lead.phone, href: `tel:${lead.phone}` },
                  { icon: <Building2 className="w-4 h-4" />, label: "Organization", value: lead.organization || "—", href: undefined },
                  { icon: <Tag className="w-4 h-4" />, label: "Division", value: lead.category, href: undefined },
                  { icon: <Clock className="w-4 h-4" />, label: "Received", value: format(new Date(lead.created_at), "dd MMM yyyy, HH:mm"), href: undefined },
                  { icon: <ExternalLink className="w-4 h-4" />, label: "Source", value: lead.source.replace(/_/g, " "), href: undefined },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="text-white/25 mt-0.5 flex-shrink-0">{icon}</div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-[#C8A96E] hover:underline">{value}</a>
                      ) : (
                        <p className="text-sm text-white/80">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                Message
              </h3>
              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
            </div>

            {/* Internal Notes */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                Internal Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this lead…"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C8A96E]/50 transition-all resize-none"
              />
            </div>
          </div>

          {/* Right: Controls */}
          <div className="space-y-4">
            {/* Status */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Status</p>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as LeadStatus)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/50 transition-all appearance-none"
                >
                  {PIPELINE.map((s) => (
                    <option key={s} value={s} className="bg-[#1a1a1a]">
                      {LEAD_STATUS_CONFIG[s].label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            {/* Priority */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Priority</p>
              <div className="flex gap-2">
                {(["low", "medium", "high"] as const).map((p) => {
                  const cfg = PRIORITY_CONFIG[p];
                  return (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={clsx(
                        "flex-1 py-2 rounded-xl text-xs font-medium border transition-all",
                        priority === p
                          ? `bg-white/10 border-white/20 ${cfg.color}`
                          : "border-white/8 text-white/30 hover:text-white/50"
                      )}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assign */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Assigned To</p>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Team member name…"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C8A96E]/50 transition-all"
              />
            </div>

            {/* Save */}
            <button
              onClick={save}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#C8A96E] to-[#a8893e] text-white hover:opacity-90 disabled:opacity-60 transition-all"
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
              ) : saved ? (
                <><CheckCircle className="w-4 h-4" /> Saved!</>
              ) : (
                <><Save className="w-4 h-4" /> Save Changes</>
              )}
            </button>
          </div>
        </div>
      </div>
    </CRMShell>
  );
}
