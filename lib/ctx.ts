import "server-only";
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { supabaseServer } from "./supabase/server";

export type Ctx = { sb: Awaited<ReturnType<typeof supabaseServer>>; user: { id: string; email?: string }; ws: string; role: string };

export class HttpError extends Error { constructor(public status: number, message: string, public code?: string) { super(message); } }

/** Signed-in user + their workspace (created on first use) + role. */
export async function ctx(req?: Request): Promise<Ctx> {
  const sb = await supabaseServer();
  const user = await currentUser(sb);
  if (!user) throw new HttpError(401, "Sign in to continue.", "unauthenticated");
  const data = { user };
  let ws = req?.headers.get("x-workspace") || "";
  if (!/^[0-9a-f-]{36}$/i.test(ws)) {
    const r = await sb.rpc("vx_bootstrap");
    if (r.error) throw new HttpError(500, r.error.message);
    ws = r.data as string;
  }
  const m = await sb.from("vx_members").select("role").eq("workspace_id", ws).eq("user_id", data.user.id).maybeSingle();
  if (!m.data) throw new HttpError(403, "You are not a member of this workspace.", "forbidden");
  return { sb, user: { id: data.user.id, email: data.user.email ?? undefined }, ws, role: m.data.role as string };
}

/**
 * The signed-in user. A network hiccup between the app and the sign-in server is not a sign-out:
 * retry once, then answer 503 so the studio keeps the person signed in instead of sending them to the login page.
 */
export async function currentUser(sb: Awaited<ReturnType<typeof supabaseServer>>) {
  // With the project's JWT secret configured, check the session token here (signature, expiry, audience):
  // no round trip to the sign-in server, so its brief outages no longer reach the studio.
  const secret = process.env.SUPABASE_JWT_SECRET;
  if (secret) {
    try {
      const { data } = await sb.auth.getSession();
      const u = data.session?.access_token ? verifyHS256(data.session.access_token, secret) : null;
      if (u) return u;
    } catch { /* fall through to the sign-in server */ }
  }
  let last: any = null;
  for (let i = 0; i < 2; i++) {
    const { data, error } = await sb.auth.getUser();
    if (data.user) return data.user;
    const st = (error as any)?.status;
    const transient = !!error && (!st || st >= 500 || /fetch|network|timeout|ECONN|socket/i.test(error.message || ""));
    if (!transient) return null;
    last = error;
    if (i === 0) await new Promise((r) => setTimeout(r, 400));
  }
  // say what failed (no tokens or secrets), so the next outage can be traced from the logs or the browser
  const cause = last?.cause?.code || last?.cause?.message || "";
  console.error("[auth_unavailable]", last?.name || "", last?.status ?? "", String(last?.message || "").slice(0, 200), cause);
  const e = new HttpError(503, "The sign-in service did not answer. Try again in a moment; you are still signed in.", "auth_unavailable");
  (e as any).detail = [last?.name, last?.status, String(last?.message || "").slice(0, 120), cause].filter(Boolean).join(" · ");
  throw e;
}

/** HS256 session token check (the self-hosted Supabase default). Returns the user, or null when anything is off. */
function verifyHS256(token: string, secret: string): { id: string; email?: string } | null {
  const [h, p, sig] = token.split(".");
  if (!h || !p || !sig) return null;
  const head = JSON.parse(Buffer.from(h, "base64url").toString());
  if (head.alg !== "HS256") return null;
  const want = createHmac("sha256", secret).update(h + "." + p).digest();
  const got = Buffer.from(sig, "base64url");
  if (got.length !== want.length || !timingSafeEqual(got, want)) return null;
  const c = JSON.parse(Buffer.from(p, "base64url").toString());
  if (!c.sub || c.role !== "authenticated" || (c.aud && c.aud !== "authenticated" && !(Array.isArray(c.aud) && c.aud.includes("authenticated")))) return null;
  if (!c.exp || c.exp * 1000 < Date.now() - 5000) return null;
  return { id: c.sub, email: c.email };
}

export const canWrite = (c: Ctx) => !["viewer", "analyst"].includes(c.role);
export const canManage = (c: Ctx) => ["owner", "admin"].includes(c.role);
export function requireWrite(c: Ctx) { if (!canWrite(c)) throw new HttpError(403, "Your role can view but not change this workspace.", "forbidden"); }
export function requireManage(c: Ctx) { if (!canManage(c)) throw new HttpError(403, "Only workspace owners and admins can do this.", "forbidden"); }

/** Wrap a route handler with consistent JSON errors. */
export function route<T extends any[]>(fn: (...a: T) => Promise<Response>) {
  return async (...a: T) => {
    try { return await fn(...a); }
    catch (e: any) {
      const msg = String(e?.message || e);
      const status = e instanceof HttpError ? e.status : /insufficient_credits/.test(msg) ? 402 : /forbidden/.test(msg) ? 403 : 500;
      const code = e?.code || (/insufficient_credits/.test(msg) ? "insufficient_credits" : status === 403 ? "forbidden" : "error");
      const message = code === "insufficient_credits" ? "Not enough credits. Top up in Settings → Billing." : msg.slice(0, 400);
      if (status >= 500) console.error("[viralos]", msg);
      return NextResponse.json({ error: message, code, ...(e?.detail ? { detail: e.detail } : {}) }, { status });
    }
  };
}
export const json = (d: unknown, status = 200) => NextResponse.json(d, { status });
