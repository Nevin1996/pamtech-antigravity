"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight, ShieldCheck, Sparkles, KeyRound, Send, HelpCircle, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/crm";

  const [email, setEmail] = useState("chinanuokpara5@gmail.com");
  const [password, setPassword] = useState("pamtech2026");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showHelp, setShowHelp] = useState(false);

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

      if (signInError) {
        setError(signInError.message || "Invalid credentials. Please check your password or use Magic Link below.");
      } else if (signUpError) {
        setError(signUpError.message || "Authentication error occurred. Try sending a magic link or resetting password.");
      }
    } catch (err: any) {
      setError(err?.message || "Authentication error occurred.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMagicLink() {
    if (!email) {
      setError("Please enter your email address to receive a magic login link.");
      return;
    }
    setMagicLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const supabase = createClient();
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/crm`,
        },
      });
      if (otpError) {
        setError(otpError.message);
      } else {
        setSuccessMsg(`Magic login link sent to ${email}! Check your email inbox to log in with one click.`);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to send magic link.");
    } finally {
      setMagicLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!email) {
      setError("Please enter your email address to receive password reset instructions.");
      return;
    }
    setResetLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/crm/login`,
      });
      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccessMsg(`Password reset email sent to ${email}! Please check your inbox.`);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email.");
    } finally {
      setResetLoading(false);
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
            <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-left flex items-center justify-between">
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Supabase Database Connected
              </p>
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="text-[11px] text-emerald-300 hover:text-white flex items-center gap-1 underline transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Help / Reset</span>
              </button>
            </div>
          )}

          {/* Quick Troubleshooting / Help Card */}
          {showHelp && (
            <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/15 text-left text-xs space-y-3">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#C8A96E]" />
                <span>Forgot your password?</span>
              </p>
              <p className="text-white/70 leading-relaxed text-[11px]">
                You can easily reset your password or log in without one:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-white/60 text-[11px]">
                <li>Click <strong>&quot;Send Magic Link&quot;</strong> below to receive a 1-click passwordless login.</li>
                <li>Or open your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#C8A96E] underline inline-flex items-center gap-0.5">Supabase Dashboard <ExternalLink className="w-2.5 h-2.5" /></a> → <strong>Auth</strong> → <strong>Users</strong> → click <code>...</code> on your email to set a new password.</li>
              </ol>
            </div>
          )}

          {/* Quick Email Selection Chips */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-white/50 mb-1.5">Quick Email Select:</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setEmail("chinanuokpara5@gmail.com")}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  email === "chinanuokpara5@gmail.com"
                    ? "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/40 font-semibold"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                }`}
              >
                chinanuokpara5@gmail.com
              </button>
              <button
                type="button"
                onClick={() => setEmail("admin@pamtechgroup.com")}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  email === "admin@pamtechgroup.com"
                    ? "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/40 font-semibold"
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                }`}
              >
                admin@pamtechgroup.com
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@pamtechgroup.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C8A96E]/60 focus:ring-1 focus:ring-[#C8A96E]/30 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-white/60">Password</label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                  className="text-xs text-[#C8A96E] hover:underline disabled:opacity-50"
                >
                  {resetLoading ? "Sending reset..." : "Reset password?"}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#C8A96E]/60 focus:ring-1 focus:ring-[#C8A96E]/30 transition-all text-sm"
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
                "Sign In to CRM"
              )}
            </button>
          </form>

          {/* Passwordless Alternative */}
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <button
              type="button"
              onClick={handleSendMagicLink}
              disabled={magicLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-medium text-xs transition-all flex items-center justify-center gap-2"
            >
              {magicLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#C8A96E]" />
              )}
              <span>Email Me a 1-Click Magic Login Link</span>
            </button>
          </div>

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
