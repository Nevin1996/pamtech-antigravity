"use client";

import { useState } from "react";
import { X, CheckCircle, UploadCloud, Loader2, Sparkles, Briefcase } from "lucide-react";
import { JobOpening } from "@/data/jobsData";

interface QuickApplyModalProps {
  job: JobOpening | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickApplyModal({ job, isOpen, onClose }: QuickApplyModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [pitch, setPitch] = useState("");
  const [fileName, setFileName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  if (!isOpen || !job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFileName(file.name);
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("jobId", job.id);
      fd.append("jobTitle", job.title);
      fd.append("department", job.department);
      fd.append("location", job.location);
      fd.append("name", fullName);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("linkedinUrl", linkedin);
      fd.append("pitch", pitch);
      if (resumeFile) fd.append("resume", resumeFile);
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStep(1);
    setStatus("idle");
    setFullName("");
    setEmail("");
    setPhone("");
    setLinkedin("");
    setPitch("");
    setFileName("");
    setResumeFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#101828] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 border border-green-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
            <p className="text-sm text-gray-300">
              Thank you, <span className="text-white font-semibold">{fullName}</span>. Your application for{" "}
              <strong className="text-[#FF6467]">{job.title}</strong> ({job.location}) has been routed directly to the Pamtech Talent Acquisition team.
            </p>
            <p className="text-xs text-gray-400">
              We review every candidate thoroughly. If your experience aligns with our needs, you will receive an invitation for an initial conversation.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC]"
              >
                Back to Careers
              </button>
            </div>
          </div>
        ) : status === "error" ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 border border-red-500/40 rounded-full flex items-center justify-center mx-auto">
              <X className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Submission Failed</h3>
            <p className="text-sm text-gray-400">Something went wrong. Please try again or email us directly at <a href="mailto:careers@pamtechgroup.com" className="text-[#C8A96E] underline">careers@pamtechgroup.com</a>.</p>
            <button onClick={() => setStatus("idle")} className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 transition-all">
              Try Again
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-1 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF6467] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Step {step} of 2 • Quick Apply
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white line-clamp-1">
                {job.title}
              </h3>
              <p className="text-xs text-gray-400">
                {job.department} • {job.location} • {job.type}
              </p>
            </div>

            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Nnamdi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6467]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="samuel@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6467]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6467]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      LinkedIn / Portfolio URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6467]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all"
                    >
                      Continue to Resume & Statement →
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* File Upload Box */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Upload Resume / CV (.pdf, .docx) *
                    </label>
                    <label className="border-2 border-dashed border-white/20 hover:border-[#FF6467]/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-white/5 transition-all text-center">
                      <UploadCloud className="w-8 h-8 text-[#51A2FF] mb-2" />
                      <span className="text-sm font-semibold text-white">
                        {fileName ? fileName : "Click to select or drag resume file"}
                      </span>
                      <span className="text-[11px] text-gray-400 mt-1">
                        Maximum file size: 10MB
                      </span>
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Why are you excited to join Pamtech? (Brief statement)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Highlight what drives you and how your expertise will add value..."
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6467] resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 bg-white/10 hover:bg-white/20 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-2/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E7000B] to-[#155DFC] hover:from-[#FB2C36] hover:to-[#51A2FF] transition-all flex items-center justify-center gap-2"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Complete Application</span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
