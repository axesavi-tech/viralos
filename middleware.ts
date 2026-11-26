import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* Pages anyone can open; everything under /studio and the app APIs needs a session (APIs answer 401 themselves). */
const PUBLIC = ["/", "/login", "/auth", "/legal", "/pricing", "/media"];

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req });
  const sb = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => { list.forEach(({ name, value }) => req.cookies.set(name, value)); res = NextResponse.next({ request: req }); list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)); },
    },
  });
  const { data, error } = await sb.auth.getUser();
  // a network hiccup reaching the sign-in server is not a sign-out: let the page load, the APIs check again
  const st = (error as any)?.status;
  if (!data.user && error && (!st || st >= 500)) return res;
  const path = req.nextUrl.pathname;
  const isPublic = path === "/" || PUBLIC.slice(1).some((p) => path.startsWith(p)) || path.startsWith("/api");
  if (!data.user && !isPublic) { const url = req.nextUrl.clone(); url.pathname = "/login"; url.search = "?next=" + encodeURIComponent(path); return NextResponse.redirect(url); }
  return res;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|woff2|mp4|webm)$).*)"] };
