import { NextResponse } from "next/server";
import { insertApplication } from "@/lib/local-store";

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-ref.supabase.co" &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  process.env.SUPABASE_SERVICE_ROLE_KEY !== "your-service-role-key-here";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jobId = formData.get("jobId") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const pitch = formData.get("pitch") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!jobId || !name || !email || !phone) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let resumeUrl: string | null = null;
    let resumeFilename: string | null = resumeFile?.name ?? null;

    if (isSupabaseConfigured) {
      const { createClient } = require("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      if (resumeFile && resumeFile.size > 0) {
        const fileExt = resumeFile.name.split(".").pop();
        const fileName = `${Date.now()}-${name.toLowerCase().replace(/\s+/g, "-")}.${fileExt}`;
        const buffer = await resumeFile.arrayBuffer();
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, buffer, { contentType: resumeFile.type, upsert: false });
        if (!uploadError && uploadData) {
          const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(fileName);
          resumeUrl = urlData?.publicUrl || null;
        }
      }
      const { error } = await supabase.from("applications").insert({
        job_id: jobId,
        job_title: jobTitle,
        department,
        location,
        status: "received",
        name,
        email,
        phone,
        linkedin_url: linkedinUrl || null,
        pitch: pitch || null,
        resume_url: resumeUrl,
        resume_filename: resumeFilename,
      });
      if (error) {
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
      }
    } else {
      // ─── Local file store ─────────────────────────────────────
      insertApplication({
        job_id: jobId,
        job_title: jobTitle,
        department,
        location,
        status: "received",
        name,
        email,
        phone,
        linkedin_url: linkedinUrl || null,
        pitch: pitch || null,
        resume_url: null,
        resume_filename: resumeFilename,
        notes: null,
        created_at: new Date().toISOString(),
      });
      console.log(`[CRM] Application saved locally → ${jobTitle} | ${name}`);
    }

    // Send confirmation email async
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey !== "re_your_api_key_here") {
      try {
        const { Resend } = await import("resend");
        new Resend(apiKey).emails.send({
          from: process.env.RESEND_FROM_EMAIL || "crm@pamtechgroup.com",
          to: email,
          subject: `Application Received — ${jobTitle} | Pamtech Group`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:#C8A96E;padding:24px 32px;"><h1 style="color:#fff;margin:0;">Pamtech Group</h1></div><div style="padding:32px;"><h2>Thank you, ${name}!</h2><p>We have received your application for <strong>${jobTitle}</strong> (${department} · ${location}).</p><p>Our HR team will review your profile and reach out within 5–7 business days.</p></div></div>`,
        });
      } catch {}
    }

    return NextResponse.json({ success: true, message: "Application received" });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
