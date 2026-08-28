import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const isSupabaseConfigured =
  !!supabaseUrl &&
  supabaseUrl !== "https://your-project-ref.supabase.co" &&
  !!supabaseAnonKey &&
  supabaseAnonKey !== "your-anon-key-here";

export function createClient() {
  return createBrowserClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-key"
  );
}
