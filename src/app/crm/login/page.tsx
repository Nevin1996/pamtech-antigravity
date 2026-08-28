"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight, ShieldCheck, UserPlus, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/crm";

  const [email, setEmail] = useState("admin@pamtechgroup.com");
  const [password, setPassword] = useState("pamtech2026");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    if (!isSupabaseConfigured) {
      // Local / Standalone mode — navigate straight into CRM
      window.location.href = redirect;
      return;
    }

    try {
      const supabase = createClient();
      
      // 1. Attempt standard password sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!signInError && signInData?.session) {
        window.location.href = redirect;
        return;
      }

      // 2. If user doesn't exist yet in Supabase, auto-create the admin user on the fly
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (!signUpError && signUpData?.session) {
        setSuccessMsg("Account created and authenticated! Entering CRM...");
        setTimeout(() => {
          window.location.href = redirect;
        }, 1000);
        return;
      }

      if (signUpError?.message?.includes("User already registered") || signInError) {
        setError(signInError?.message || "Invalid credentials. Please check your email and password.");
      } else {
        setError(signUpError?.message || "Unable to authenticate with Supabase. Please check credentials.");
      }
    } catch (err: any) {
      setError(err?.message || "Authentication error occurred.");
    } finally {
      setLoading(false);
    }
  }

  function handleDirectAccess() {
    window.location.href = redirect;
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
          {!isSupabaseConfigured ? (
            <div className="mb-6 p-4 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/30 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#C8A96E] font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Local Storage Active</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Click below to enter the CRM dashboard immediately.
              </p>
              <button
                type="button"
                onClick={handleDirectAccess}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#C8A96E] hover:bg-[#b59556] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Enter CRM Dashboard Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-left">
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Supabase Cloud Database Connected
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
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-400 leading-relaxed">
                {error}
              </div>
            )}

            {/* Success */}
            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
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
                  Authenticating…
                </>
              ) : (
                "Sign In / Register to CRM"
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              ← Back to Pamtech Group Website
            </Link>
          </div>
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
