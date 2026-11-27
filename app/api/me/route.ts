import { DEFAULT_RATES } from "@/lib/credits";
import { ctx, route, json } from "@/lib/ctx";
export const dynamic = "force-dynamic";
export const GET = route(async (req: Request) => {
  const c = await ctx(req);
  await c.sb.rpc("vx_grant_monthly", { ws: c.ws });
  const [ws, bal, set, adm, mem, inv, con, voices, ledger, pays] = await Promise.all([
    c.sb.from("vx_workspaces").select("id,name,plan,plan_until,created_at").eq("id", c.ws).single(),
    c.sb.rpc("vx_balance", { ws: c.ws }),
    c.sb.from("vx_settings").select("key,value").in("key", ["rates", "plans", "products"]),
    c.sb.from("vx_admins").select("user_id").eq("user_id", c.user.id).maybeSingle(),
    c.sb.from("vx_members").select("user_id,role,email,created_at").eq("workspace_id", c.ws).order("created_at"),
    ["owner", "admin"].includes(c.role) ? c.sb.from("vx_invites").select("id,email,role,created_at,accepted_at").eq("workspace_id", c.ws).is("accepted_at", null) : Promise.resolve({ data: [] as any[] }),
    c.sb.from("vx_connections").select("provider,label,meta,updated_at").eq("workspace_id", c.ws),
    c.sb.from("vx_voices").select("id,name,consent,created_at").eq("workspace_id", c.ws).order("created_at", { ascending: false }),
    c.sb.from("vx_ledger").select("delta,reason,created_at").eq("workspace_id", c.ws).order("created_at", { ascending: false }).limit(40),
    c.sb.from("vx_payments").select("product,amount_minor,currency,credits,status,gateway,created_at,paid_at").eq("workspace_id", c.ws).order("created_at", { ascending: false }).limit(20),
  ]);
  const s = Object.fromEntries((set.data || []).map((r: any) => [r.key, r.value]));
  return json({
    user: c.user, role: c.role, workspace: ws.data, balance: bal.data ?? 0, isAdmin: !!adm.data, rates: { ...DEFAULT_RATES, ...(s.rates || {}) }, plans: s.plans || {}, products: s.products || {},
    members: mem.data || [], invites: inv.data || [], connections: (con.data || []).map((x: any) => ({ provider: x.provider, label: x.label, meta: x.meta, updated_at: x.updated_at })),
    voices: voices.data || [], ledger: ledger.data || [], payments: pays.data || [],
    gateways: { razorpay: !!process.env.RAZORPAY_KEY_ID, stripe: !!process.env.STRIPE_SECRET_KEY, razorpayKey: process.env.RAZORPAY_KEY_ID || null },
    providers: { claude: !!process.env.ANTHROPIC_API_KEY, openai: !!process.env.OPENAI_API_KEY, gemini: !!process.env.GEMINI_API_KEY, runway: !!process.env.RUNWAYML_API_SECRET, fal: !!process.env.FAL_KEY, elevenlabs: !!process.env.ELEVENLABS_API_KEY, meta: !!(process.env.META_APP_ID && process.env.META_APP_SECRET), jwt: !!process.env.SUPABASE_JWT_SECRET },
  });
});
