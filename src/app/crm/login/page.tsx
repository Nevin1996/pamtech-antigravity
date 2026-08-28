"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/crm";

  const [email, setEmail] = useState("admin@pamtechgroup.com");
  const [password, setPassword] = useState("pamtech2026");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isSupabaseConfigured) {
      // Local / Standalone mode — allow direct access
      setTimeout(() => {
        router.push(redirect);
        router.refresh();
      }, 500);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password. Please check your Supabase credentials.");
      setLoading(false);
    } else {
      router.push(redirect);
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8A96E] to-[#a8893e] mb-4 shadow-lg shadow-[#C8A96E]/25">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Pamtech CRM</h1>
          <p className="text-sm text-white/40 mt-1">Centralized Lead Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          {!isSupabaseConfigured && (
            <div className="mb-6 p-4 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/30 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#C8A96E] font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Local Storage Mode Active</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Supabase cloud database is optional. You can enter the CRM immediately with the prefilled credentials below or click the direct access button.
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@pamtechgroup.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C8A96E]/60 focus:ring-1 focus:ring-[#C8A96E]/30 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C8A96E]/60 focus:ring-1 focus:ring-[#C8A96E]/30 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#C8A96E] to-[#a8893e] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#C8A96E]/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In to CRM"
              )}
            </button>
          </form>

          {!isSupabaseConfigured && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/crm"
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Direct Access to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C8A96E]" />
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          Pamtech Group · Centralized CRM v1.0 · Internal Use Only
        </p>
      </div>
    </div>
  );
}

export default function CRMLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-[#C8A96E] animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
