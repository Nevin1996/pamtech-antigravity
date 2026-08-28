import { NextResponse } from "next/server";
import { getAllApplications } from "@/lib/local-store";

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-ref.supabase.co" &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const department = searchParams.get("department");

  if (!isSupabaseConfigured) {
    let data = getAllApplications();
    if (status) data = data.filter((a) => a.status === status);
    if (department) data = data.filter((a) => a.department === department);
    return NextResponse.json({ data, count: data.length, mode: "local" });
  }

  const { createClient } = require("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  let query = supabase
    .from("applications")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  if (department) query = query.eq("department", department);
  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, count, mode: "supabase" });
}
