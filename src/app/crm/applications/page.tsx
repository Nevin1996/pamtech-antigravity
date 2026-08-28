"use client";
import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import {
  Search,
  Filter,
  ChevronDown,
  Download,
  FileText,
  Linkedin,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import CRMShell from "@/components/crm/CRMShell";
import {
  APPLICATION_STATUS_CONFIG,
  type Application,
  type ApplicationStatus,
} from "@/lib/crm-types";
import { clsx } from "clsx";

const STATUS_OPTIONS: Array<{ value: ApplicationStatus | ""; label: string }> = [
  { value: "", label: "All Statuses" },
  { value: "received", label: "Received" },
  { value: "reviewing", label: "Reviewing" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interviewed", label: "Interviewed" },
  { value: "offered", label: "Offered" },
  { value: "rejected", label: "Rejected" },
];

const PIPELINE: ApplicationStatus[] = [
  "received",
  "reviewing",
  "shortlisted",
  "interviewed",
  "offered",
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filtered, setFiltered] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"local" | "supabase">("local");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "">("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    const url = statusFilter
      ? `/api/crm/applications?status=${statusFilter}`
      : "/api/crm/applications";
    const res = await fetch(url).then((r) => r.json());
    setApplications(res.data || []);
    setMode(res.mode || "local");
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      applications.filter(
        (a) =>
          !q ||
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.job_title.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q)
      )
    );
  }, [applications, search]);

  async function updateStatus(app: Application, newStatus: ApplicationStatus) {
    setSavingId(app.id);
    await fetch(`/api/crm/applications/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
    );
    setSavingId(null);
  }

  return (
    <CRMShell mode={mode}>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Applications</h1>
            <p className="text-sm text-white/40 mt-1">
              {filtered.length} career {filtered.length === 1 ? "application" : "applications"}
            </p>
          </div>
          <button
            onClick={fetchApps}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/8 transition-all w-fit"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, email, role, or department…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C8A96E]/50 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "")}
              className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8A96E]/50 transition-all appearance-none"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#1a1a1a]">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/4 border border-white/8 rounded-2xl p-5 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/10 rounded w-40" />
                      <div className="h-3 bg-white/5 rounded w-60" />
                    </div>
                  </div>
                </div>
              ))
            : filtered.map((app) => {
                const cfg = APPLICATION_STATUS_CONFIG[app.status];
                const stepIndex = PIPELINE.indexOf(app.status as ApplicationStatus);
                const isRejected = app.status === "rejected";
                return (
                  <div
                    key={app.id}
                    className="bg-white/4 border border-white/8 rounded-2xl p-5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-violet-600/30 flex items-center justify-center text-sm font-bold text-purple-300 flex-shrink-0">
                        {app.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-white">{app.name}</p>
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                              cfg.bgColor,
                              cfg.color
                            )}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#C8A96E] font-medium">{app.job_title}</p>
                        <p className="text-xs text-white/40">
                          {app.department} · {app.location}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <a href={`mailto:${app.email}`} className="text-xs text-white/40 hover:text-white transition-colors">
                            {app.email}
                          </a>
                          {app.linkedin_url && (
                            <a
                              href={app.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <Linkedin className="w-3 h-3" />
                              LinkedIn
                            </a>
                          )}
                          {app.resume_filename && (
                            <span className="flex items-center gap-1 text-xs text-white/40">
                              <FileText className="w-3 h-3" />
                              {app.resume_filename}
                            </span>
                          )}
                        </div>

                        {/* Pitch */}
                        {app.pitch && (
                          <p className="text-xs text-white/50 mt-2 italic line-clamp-2 max-w-lg">
                            &ldquo;{app.pitch}&rdquo;
                          </p>
                        )}

                        {/* Pipeline bar */}
                        {!isRejected && (
                          <div className="flex items-center gap-1 mt-4">
                            {PIPELINE.map((s, i) => {
                              const stepCfg = APPLICATION_STATUS_CONFIG[s];
                              const isActive = i <= stepIndex;
                              return (
                                <div key={s} className="flex items-center gap-1 flex-1">
                                  <button
                                    onClick={() => updateStatus(app, s)}
                                    disabled={savingId === app.id}
                                    className={clsx(
                                      "flex-1 py-1 rounded text-[9px] font-semibold transition-all border",
                                      isActive && i === stepIndex
                                        ? `${stepCfg.bgColor} ${stepCfg.color}`
                                        : isActive
                                        ? "bg-white/8 text-white/40 border-white/8"
                                        : "bg-transparent text-white/15 border-transparent hover:border-white/10 hover:text-white/30"
                                    )}
                                  >
                                    {stepCfg.label}
                                  </button>
                                  {i < PIPELINE.length - 1 && (
                                    <div className={clsx("h-px w-1 flex-shrink-0", isActive ? "bg-white/15" : "bg-white/5")} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Right controls */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <p className="text-xs text-white/30">
                          {format(new Date(app.created_at), "dd MMM yyyy")}
                        </p>
                        {!isRejected ? (
                          <button
                            onClick={() => updateStatus(app, "rejected")}
                            disabled={savingId === app.id}
                            className="text-xs text-red-400/50 hover:text-red-400 transition-colors mt-1"
                          >
                            Reject
                          </button>
                        ) : (
                          <button
                            onClick={() => updateStatus(app, "received")}
                            disabled={savingId === app.id}
                            className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" /> Restore
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-white/30">
              <FileText className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No applications found</p>
            </div>
          )}
        </div>
      </div>
    </CRMShell>
  );
}
