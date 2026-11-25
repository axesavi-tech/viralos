import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
export const dynamic = "force-dynamic";
export const GET = route(async (req: Request) => {
  const c = await ctx(req);
  const out: any[] = []; let from = 0;
  while (true) {
    const r = await c.sb.from("vx_docs").select("id,data").eq("workspace_id", c.ws).range(from, from + 999);
    if (r.error) throw new Error(r.error.message);
    out.push(...(r.data || [])); if (!r.data || r.data.length < 1000) break; from += 1000;
  }
  return json({ docs: out });
});
export const PUT = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  if (!b.id || typeof b.data !== "object") throw new HttpError(400, "Bad document");
  if (JSON.stringify(b.data).length > 900_000) throw new HttpError(413, "This item is too large to save.");
  const r = await c.sb.from("vx_docs").upsert({ workspace_id: c.ws, id: String(b.id).slice(0, 200), type: b.data.type || null, data: b.data, updated_at: new Date().toISOString(), updated_by: c.user.id });
  if (r.error) throw new Error(r.error.message);
  return json({ ok: true });
});
export const DELETE = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const id = new URL(req.url).searchParams.get("id");
  if (!id) throw new HttpError(400, "Missing id");
  await c.sb.from("vx_docs").delete().eq("workspace_id", c.ws).eq("id", id);
  return json({ ok: true });
});
