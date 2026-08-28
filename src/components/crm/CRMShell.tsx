"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { clsx } from "clsx";

const NAV = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/crm/leads", label: "Leads", icon: Users },
  { href: "/crm/applications", label: "Applications", icon: Briefcase },
  { href: "/crm/settings", label: "Settings", icon: Settings },
];

interface Props {
  children: React.ReactNode;
  demoMode?: boolean;
  mode?: "local" | "supabase" | "demo";
}

export default function CRMShell({ children, demoMode, mode }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item: (typeof NAV)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  async function handleLogout() {
    if (!demoMode) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/crm/login");
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8A96E] to-[#a8893e] flex items-center justify-center shadow-lg shadow-[#C8A96E]/25 flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">Pamtech CRM</p>
            <p className="text-[10px] text-white/40 mt-0.5">Lead Management</p>
          </div>
        </div>
      </div>

      {/* Storage Mode Banner */}
      {mode === "supabase" ? (
        <div className="mx-4 mt-4 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
          <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Supabase Cloud Connected
          </p>
        </div>
      ) : (
        <div className="mx-4 mt-4 px-3 py-2 bg-[#C8A96E]/10 border border-[#C8A96E]/30 rounded-xl">
          <p className="text-[10px] text-[#C8A96E] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
            Local Store Active (Persisted)
          </p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 mt-2">
        {NAV.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active
                  ? "bg-[#C8A96E]/15 text-[#C8A96E] border border-[#C8A96E]/25"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={clsx("w-4 h-4 flex-shrink-0", active ? "text-[#C8A96E]" : "text-white/40 group-hover:text-white/70")} />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-[#C8A96E]/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          {demoMode ? "Exit Demo" : "Sign out"}
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-white/20 hover:text-white/40 transition-all mt-1"
        >
          ← Back to main site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#080808] text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0f0f0f] border-r border-white/8 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0f0f0f] border-r border-white/10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-4 px-4 py-3 bg-[#0f0f0f] border-b border-white/8">
          <button onClick={() => setMobileOpen(true)} className="text-white/60 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-white">Pamtech CRM</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
