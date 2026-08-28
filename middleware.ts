import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /crm routes (allow /crm/login through)
  if (!pathname.startsWith("/crm") || pathname === "/crm/login") {
    return NextResponse.next();
  }

  // If Supabase not configured, allow access with a demo banner
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isConfigured =
    !!supabaseUrl &&
    supabaseUrl !== "https://your-project-ref.supabase.co" &&
    !!supabaseKey &&
    supabaseKey !== "your-anon-key-here";

  if (!isConfigured) {
    // Demo mode — allow through without auth
    return NextResponse.next();
  }

  // Check Supabase session
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/crm/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/crm/:path*"],
};
