"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Search,
  Filter,
  ArrowUpRight,
  ChevronDown,
  Download,
  RefreshCw,
} from "lucide-react";
import CRMShell from "@/components/crm/CRMShell";
import {
  LEAD_STATUS_CONFIG,
  PRIORITY_CONFIG,
  DIVISION_TAGS,
  type Lead,
  type LeadStatus,
} from "@/lib/crm-types";
import { clsx } from "clsx";

const STATUS_OPTIONS: Array<{ value: LeadStatus | ""; label: string }> = [
  { value: "", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filtered, setFiltered] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"local" | "supabase">("local");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "">("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const url = statusFilter
      ? `/api/crm/leads?status=${statusFilter}&limit=100`
      : "/api/crm/leads?limit=100";
    const res = await fetch(url).then((r) => r.json());
    setLeads(res.data || []);
    setMode(res.mode || "local");
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      leads.filter(
        (l) =>
          !q ||
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.reference_id.toLowerCase().includes(q) ||
          (l.organization || "").toLowerCase().includes(q)
      )
    );
  }, [leads, search]);

  function exportCSV() {
    const rows = [
      ["Reference", "Name", "Email", "Phone", "Category", "Status", "Priority", "Organization", "Date"],
      ...filtered.map((l) => [
        l.reference_id,
        l.name,
        l.email,
        l.phone,
        l.category,
        l.status,
        l.priority,
        l.organization || "",
        format(new Date(l.created_at), "yyyy-MM-dd HH:mm"),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pamtech-leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  }

  return (
    <CRMShell mode={mode}>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Leads</h1>
            <p className="text-sm text-white/40 mt-1">
              {filtered.length} {filtered.length === 1 ? "lead" : "leads"} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/8 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/8 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, email, company, or reference…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C8A96E]/50 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "")}
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

        {/* Table */}
        <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  {["Ref", "Contact", "Division", "Status", "Priority", "Date", ""].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold text-white/30 uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        {Array.from({ length: 7 }).map((_, j) => (
                          <td key={j} className="px-4 py-4">
                            <div className="h-3 bg-white/8 rounded w-20" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : filtered.map((lead) => {
                      const cfg = LEAD_STATUS_CONFIG[lead.status];
                      const pri = PRIORITY_CONFIG[lead.priority];
                      const divisionShort = DIVISION_TAGS[lead.routing_tag] || lead.category;
                      return (
                        <tr
                          key={lead.id}
                          className="hover:bg-white/3 transition-colors group"
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-xs font-mono text-[#C8A96E]">
                              {lead.reference_id}
                            </span>
                          </td>
                          <td className="px-4 py-4 min-w-[180px]">
                            <p className="text-sm font-medium text-white">{lead.name}</p>
                            <p className="text-xs text-white/40">{lead.email}</p>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-xs text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-lg">
                              {divisionShort}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={clsx(
                                "px-2.5 py-1 rounded-full text-[10px] font-semibold border",
                                cfg.bgColor,
                                cfg.color
                              )}
                            >
                              {cfg.label}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${pri.dot}`} />
                              <span className={`text-xs ${pri.color}`}>{pri.label}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-xs text-white/40">
                              {format(new Date(lead.created_at), "dd MMM yyyy")}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <Link
                              href={`/crm/leads/${lead.id}`}
                              className="flex items-center gap-1 text-xs text-[#C8A96E] hover:text-[#e0c07a] opacity-0 group-hover:opacity-100 transition-all"
                            >
                              View <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-white/30">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No leads match your filters</p>
            </div>
          )}
        </div>
      </div>
    </CRMShell>
  );
}
