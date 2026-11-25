import "server-only";
import { NextResponse } from "next/server";
import { supabaseServer } from "./supabase/server";

export type Ctx = { sb: Awaited<ReturnType<typeof supabaseServer>>; user: { id: string; email?: string }; ws: string; role: string };

export class HttpError extends Error { constructor(public status: number, message: string, public code?: string) { super(message); } }

/** Signed-in user + their workspace (created on first use) + role. */
export async function ctx(req?: Request): Promise<Ctx> {
  const sb = await supabaseServer();
  const { data } = await sb.auth.getUser();
  if (!data.user) throw new HttpError(401, "Sign in to continue.", "unauthenticated");
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
      return NextResponse.json({ error: message, code }, { status });
    }
  };
}
export const json = (d: unknown, status = 200) => NextResponse.json(d, { status });
