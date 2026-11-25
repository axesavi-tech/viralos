import { ctx, route, json, HttpError } from "@/lib/ctx";
export const dynamic = "force-dynamic";
async function admin(req: Request) { const c = await ctx(req); const a = await c.sb.from("vx_admins").select("user_id").eq("user_id", c.user.id).maybeSingle(); if (!a.data) throw new HttpError(403, "Administrators only."); return c; }
export const GET = route(async (req: Request) => {
  const c = await admin(req);
  const o = await c.sb.rpc("vx_admin_overview"); if (o.error) throw new Error(o.error.message);
  const set = await c.sb.from("vx_settings").select("key,value");
  return json({ ...(o.data as any), settings: Object.fromEntries((set.data || []).map((r: any) => [r.key, r.value])), env: { claude: !!process.env.ANTHROPIC_API_KEY, fal: !!process.env.FAL_KEY, elevenlabs: !!process.env.ELEVENLABS_API_KEY, razorpay: !!process.env.RAZORPAY_KEY_ID, stripe: !!process.env.STRIPE_SECRET_KEY, meta: !!process.env.META_APP_ID } });
});
export const POST = route(async (req: Request) => {
  const c = await admin(req); const b = await req.json();
  if (b.action === "adjust") { const r = await c.sb.rpc("vx_admin_adjust", { ws: b.workspace, amount: Math.round(Number(b.amount)), reason: String(b.reason || "").slice(0, 120) }); if (r.error) throw new Error(r.error.message); return json({ balance: r.data }); }
  if (b.action === "settings") {
    if (!["rates", "plans", "products", "providers"].includes(b.key) || typeof b.value !== "object") throw new HttpError(400, "Unknown setting");
    const r = await c.sb.from("vx_settings").upsert({ key: b.key, value: b.value, updated_at: new Date().toISOString() }); if (r.error) throw new Error(r.error.message);
    await c.sb.from("vx_audit").insert({ workspace_id: null, user_id: c.user.id, action: "settings_" + b.key, meta: {} });
    return json({ ok: true });
  }
  throw new HttpError(400, "Unknown action");
});
