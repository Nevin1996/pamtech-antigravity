import { NextResponse } from "next/server";
import { insertLead } from "@/lib/local-store";

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-ref.supabase.co" &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  process.env.SUPABASE_SERVICE_ROLE_KEY !== "your-service-role-key-here";

async function sendEmails(payload: {
  name: string;
  email: string;
  referenceId: string;
  category: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_your_api_key_here") return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL || "crm@pamtechgroup.com";
    resend.emails.send({
      from,
      to: payload.email,
      subject: `Your Inquiry is Received — Ref: ${payload.referenceId}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:#C8A96E;padding:24px 32px;"><h1 style="color:#fff;margin:0;">Pamtech Group</h1></div><div style="padding:32px;"><h2>Thank you, ${payload.name}</h2><p>We have received your inquiry regarding <strong>${payload.category}</strong> and will be in touch within 24 business hours.</p><div style="background:#f5f5f5;border-left:4px solid #C8A96E;padding:16px 20px;margin:24px 0;border-radius:4px;"><p style="margin:0;font-size:14px;color:#555;">Reference ID</p><p style="margin:4px 0 0;font-size:20px;font-weight:bold;color:#111;">${payload.referenceId}</p></div></div></div>`,
    });
    const notify = process.env.CRM_NOTIFY_EMAIL;
    if (notify) {
      resend.emails.send({
        from,
        to: notify,
        subject: `[New Lead] ${payload.referenceId} — ${payload.category}`,
        html: `<p>New inquiry from <strong>${payload.name}</strong> (${payload.email}) re: <strong>${payload.category}</strong>. Ref: <strong>${payload.referenceId}</strong>.</p>`,
      });
    }
  } catch (e) {
    console.error("Email error:", e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, name, email, phone, organization, message, source } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const referenceId = `PAM-${Date.now().toString().slice(-6)}`;
    const routingTag = category
      ? category.toLowerCase().replace(/[^a-z0-9]/g, "_")
      : "general_inquiry";
    const leadSource = source || "inquiry_modal";

    if (isSupabaseConfigured) {
      const { createClient } = require("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const { error } = await supabase.from("leads").insert({
        reference_id: referenceId,
        category: category || "General Inquiry",
        routing_tag: routingTag,
        status: "new",
        priority: "medium",
        name,
        email,
        phone,
        organization: organization || null,
        message,
        source: leadSource,
      });
      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
      }
    } else {
      // ─── Local file store ────────────────────────────────────────
      insertLead({
        reference_id: referenceId,
        category: category || "General Inquiry",
        routing_tag: routingTag,
        status: "new",
        priority: "medium",
        name,
        email,
        phone,
        organization: organization || null,
        message,
        notes: null,
        assigned_to: null,
        source: leadSource,
        created_at: new Date().toISOString(),
      });
      console.log(`[CRM] Lead saved locally → ${referenceId} | ${name} | ${category}`);
    }

    sendEmails({ name, email, referenceId, category: category || "General Inquiry" });

    return NextResponse.json({ success: true, referenceId });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
