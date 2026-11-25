import { ctx, route, json, requireWrite, requireManage, HttpError } from "@/lib/ctx";
import { getConn } from "@/lib/conn";
import { seal } from "@/lib/crypto";
import { ADAPTERS, isProvider } from "@/lib/commerce";
export const maxDuration = 60;

/** Store plug-ins: connect any supported e-commerce platform, import products, push approved SEO copy back. */
export const POST = route(async (req: Request) => {
  const c = await ctx(req);
  const b = await req.json();
  if (!isProvider(b.provider)) throw new HttpError(400, "Pick a store platform.");
  const A = ADAPTERS[b.provider as keyof typeof ADAPTERS];
  if (b.action === "connect") {
    if (!["owner", "admin", "brand_manager"].includes(c.role)) requireManage(c);
    const r = await A.connect(Object.fromEntries(Object.entries(b.fields || {}).map(([k, v]) => [k, String(v ?? "").slice(0, 2000)])));
    const up = await c.sb.from("vx_connections").upsert({ workspace_id: c.ws, provider: A.id, label: r.label, secret: seal(JSON.stringify(r.secret)), meta: { ...r.meta, platform: A.name, canWrite: A.canWrite }, updated_by: c.user.id, updated_at: new Date().toISOString() });
    if (up.error) throw new Error(up.error.message);
    await c.sb.from("vx_audit").insert({ workspace_id: c.ws, user_id: c.user.id, action: "store_connect", meta: { provider: A.id } });
    return json({ ok: true, label: r.label, platform: A.name });
  }
  const { data } = await getConn(c, A.id);
  if (b.action === "products") return json(await A.list(data, b.cursor ? String(b.cursor) : null));
  if (b.action === "update") {
    requireWrite(c);
    if (!b.approved) throw new HttpError(400, "Store updates need your approval.");
    if (!A.update) throw new HttpError(400, `${A.name} links are read-only. Export the updated copy as CSV and import it in your store.`);
    await A.update(data, String(b.ref || ""), { seoTitle: b.seoTitle, seoDescription: b.seoDescription, descriptionHtml: b.descriptionHtml });
    await c.sb.from("vx_audit").insert({ workspace_id: c.ws, user_id: c.user.id, action: "store_update", meta: { provider: A.id, ref: String(b.ref).slice(0, 120) } });
    return json({ ok: true });
  }
  throw new HttpError(400, "Unknown action");
});
export const DELETE = route(async (req: Request) => {
  const c = await ctx(req); requireManage(c);
  const p = new URL(req.url).searchParams.get("provider");
  if (!isProvider(p)) throw new HttpError(400, "Unknown store");
  await c.sb.from("vx_connections").delete().eq("workspace_id", c.ws).eq("provider", p);
  return json({ ok: true });
});
