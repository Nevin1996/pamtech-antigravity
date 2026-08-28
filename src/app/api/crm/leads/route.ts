import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/local-store";

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-ref.supabase.co" &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const routing_tag = searchParams.get("routing_tag");

  if (!isSupabaseConfigured) {
    let data = getAllLeads();
    if (status) data = data.filter((l) => l.status === status);
    if (routing_tag) data = data.filter((l) => l.routing_tag === routing_tag);
    return NextResponse.json({ data, count: data.length, mode: "local" });
  }

  const { createClient } = require("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  if (routing_tag) query = query.eq("routing_tag", routing_tag);
  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, count, mode: "supabase" });
}
