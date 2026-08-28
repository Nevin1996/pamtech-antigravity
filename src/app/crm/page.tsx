"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  TrendingUp,
  Users,
  Briefcase,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import CRMShell from "@/components/crm/CRMShell";
import { LEAD_STATUS_CONFIG, PRIORITY_CONFIG, type Lead, type Application } from "@/lib/crm-types";

interface KPICardProps {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ReactNode;
  accent?: string;
}

function KPICard({ label, value, sub, icon, accent = "#C8A96E" }: KPICardProps) {
  return (
    <div className="bg-white/4 border border-white/8 rounded-2xl p-5 flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div>
        <p className="text-xs text-white/40 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
        {sub && <p className="text-xs text-white/30 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function CRMDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [mode, setMode] = useState<"local" | "supabase">("local");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/crm/leads?limit=50").then((r) => r.json()),
      fetch("/api/crm/applications").then((r) => r.json()),
    ]).then(([leadsRes, appsRes]) => {
      setLeads(leadsRes.data || []);
      setApplications(appsRes.data || []);
      setMode(leadsRes.mode || "local");
      setLoading(false);
    });
  }, []);

  const newLeads = leads.filter((l) => l.status === "new").length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const newApps = applications.filter((a) => a.status === "received").length;

  const conversionRate =
    leads.length > 0 ? Math.round((converted / leads.length) * 100) : 0;

  // Top division
  const divisionCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + 1;
    return acc;
  }, {});
  const topDivision = Object.entries(divisionCounts).sort((a, b) => b[1] - a[1])[0];

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  return (
    <CRMShell mode={mode}>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-white/40 mt-1">
              {format(new Date(), "EEEE, d MMMM yyyy")} · Pamtech Group CRM
            </p>
          </div>
          <Link
            href="/crm/leads"
            className="flex items-center gap-2 text-xs font-medium text-[#C8A96E] hover:text-[#e0c07a] transition-colors"
          >
            View all leads <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            label="Total Leads"
            value={loading ? "—" : leads.length}
            sub={`${newLeads} new today`}
            icon={<Users className="w-5 h-5" />}
            accent="#C8A96E"
          />
          <KPICard
            label="New (Unread)"
            value={loading ? "—" : newLeads}
            sub="Awaiting response"
            icon={<Zap className="w-5 h-5" />}
            accent="#60a5fa"
          />
          <KPICard
            label="Converted"
            value={loading ? "—" : `${conversionRate}%`}
            sub={`${converted} of ${leads.length} leads`}
            icon={<CheckCircle className="w-5 h-5" />}
            accent="#4ade80"
          />
          <KPICard
            label="Applications"
            value={loading ? "—" : applications.length}
            sub={`${newApps} pending review`}
            icon={<Briefcase className="w-5 h-5" />}
            accent="#a78bfa"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Leads */}
          <div className="lg:col-span-2 bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/40" />
                Recent Leads
              </h2>
              <Link
                href="/crm/leads"
                className="text-xs text-[#C8A96E] hover:text-[#e0c07a] transition-colors"
              >
                See all →
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="px-5 py-4 animate-pulse flex items-center gap-4">
                      <div className="w-8 h-8 bg-white/10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-white/10 rounded w-40" />
                        <div className="h-2 bg-white/5 rounded w-64" />
                      </div>
                    </div>
                  ))
                : recentLeads.map((lead) => {
                    const cfg = LEAD_STATUS_CONFIG[lead.status];
                    const pri = PRIORITY_CONFIG[lead.priority];
                    return (
                      <Link
                        key={lead.id}
                        href={`/crm/leads/${lead.id}`}
                        className="flex items-start gap-4 px-5 py-4 hover:bg-white/3 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A96E]/30 to-[#a8893e]/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#C8A96E]">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white truncate">
                              {lead.name}
                            </p>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.bgColor} ${cfg.color} flex-shrink-0`}
                            >
                              {cfg.label}
                            </span>
                          </div>
                          <p className="text-xs text-white/40 truncate mt-0.5">{lead.category}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1.5 justify-end">
                            <div className={`w-1.5 h-1.5 rounded-full ${pri.dot}`} />
                            <span className={`text-[10px] ${pri.color}`}>{pri.label}</span>
                          </div>
                          <p className="text-[10px] text-white/25 mt-1">
                            {format(new Date(lead.created_at), "dd MMM, HH:mm")}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          </div>

          {/* Summary Panel */}
          <div className="space-y-4">
            {/* Top division */}
            {topDivision && (
              <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Top Division</p>
                <p className="text-base font-semibold text-white">{topDivision[0]}</p>
                <p className="text-sm text-[#C8A96E]">{topDivision[1]} leads</p>
              </div>
            )}

            {/* Status breakdown */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> Pipeline
              </p>
              <div className="space-y-2.5">
                {(["new", "contacted", "qualified", "converted", "closed"] as const).map(
                  (status) => {
                    const count = leads.filter((l) => l.status === status).length;
                    const pct = leads.length > 0 ? (count / leads.length) * 100 : 0;
                    const cfg = LEAD_STATUS_CONFIG[status];
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className={cfg.color}>{cfg.label}</span>
                          <span className="text-white/40">{count}</span>
                        </div>
                        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background:
                                status === "converted"
                                  ? "#4ade80"
                                  : status === "new"
                                  ? "#60a5fa"
                                  : status === "qualified"
                                  ? "#fb923c"
                                  : status === "contacted"
                                  ? "#facc15"
                                  : "#6b7280",
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Applications summary */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Briefcase className="w-3 h-3" /> Applications
              </p>
              <div className="space-y-2">
                {(["received", "shortlisted", "offered", "rejected"] as const).map((s) => {
                  const count = applications.filter((a) => a.status === s).length;
                  const colors: Record<string, string> = {
                    received: "text-blue-400",
                    shortlisted: "text-orange-400",
                    offered: "text-green-400",
                    rejected: "text-red-400",
                  };
                  return (
                    <div key={s} className="flex justify-between text-xs">
                      <span className={colors[s] || "text-white/40"} style={{ textTransform: "capitalize" }}>
                        {s}
                      </span>
                      <span className="text-white/60 font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
              <Link
                href="/crm/applications"
                className="block text-center text-xs text-[#C8A96E] hover:text-[#e0c07a] mt-4 transition-colors"
              >
                Manage Applications →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CRMShell>
  );
}
