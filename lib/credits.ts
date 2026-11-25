import "server-only";
import type { Ctx } from "./ctx";

let cache: { at: number; rates: Record<string, number>; providers: Record<string, string> } | null = null;
export async function settings(c: Ctx) {
  if (cache && Date.now() - cache.at < 60_000) return cache;
  const { data } = await c.sb.from("vx_settings").select("key,value").in("key", ["rates", "providers"]);
  const get = (k: string) => (data || []).find((r: any) => r.key === k)?.value || {};
  cache = { at: Date.now(), rates: get("rates"), providers: get("providers") };
  return cache;
}
/** Per-second prices for AI footage models (≈3× provider cost). Admins can override any of them in vx_settings.rates. */
export const VIDEO_RATES: Record<string, number> = { vid_seedance: 146, vid_kling: 30, vid_wan: 31, vid_veo: 124, vid_runway: 38, vid_minimax: 19, vid_omni: 31 };
export async function rateOf(c: Ctx, action: string, units = 1) {
  const s = await settings(c);
  const r = s.rates[action] ?? VIDEO_RATES[action] ?? s.rates["studio_ai"] ?? 5;
  return Math.max(0, Math.ceil(r * units));
}
/** Reserve credits before work. Returns the charge reference for refunds. */
export async function charge(c: Ctx, action: string, units = 1, meta: Record<string, unknown> = {}) {
  const amount = await rateOf(c, action, units);
  const ref = `chg:${c.ws}:${action}:${crypto.randomUUID()}`;
  const r = await c.sb.rpc("vx_charge", { ws: c.ws, amount, reason: action, ref, meta });
  if (r.error) throw new Error(r.error.message);
  return { ref, amount, balance: r.data as number };
}
/** Release reserved credits when our side or the provider failed. */
export async function refund(c: Ctx, ref: string) { await c.sb.rpc("vx_refund", { ws: c.ws, charge_ref: ref, p_secret: process.env.VX_SERVER_SECRET }); }
