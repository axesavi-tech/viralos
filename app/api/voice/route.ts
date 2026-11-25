import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund } from "@/lib/credits";
import { cloneVoice, deleteVoice } from "@/lib/eleven";
export const maxDuration = 120;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const fd = await req.formData();
  const name = String(fd.get("name") || "").trim().slice(0, 60), owner = String(fd.get("owner") || "").trim().slice(0, 80), scope = String(fd.get("scope") || "").slice(0, 200);
  const sample = fd.get("sample");
  if (!name || !owner) throw new HttpError(400, "Name the voice and its owner.");
  if (fd.get("verified") !== "true") throw new HttpError(400, "A voice can only be cloned with the owner's written consent.");
  if (!(sample instanceof File) || sample.size < 50_000) throw new HttpError(400, "Upload at least 30 seconds of clear speech.");
  if (sample.size > 25 * 1024 * 1024) throw new HttpError(413, "Voice samples can be up to 25 MB.");
  const ch = await charge(c, "voice_clone");
  try {
    const r = await cloneVoice(`VIRALOS · ${name}`, [{ blob: sample, filename: sample.name || "sample.mp3" }], `Cloned with consent of ${owner} for ${scope}`);
    const consent = { owner, scope, statement: "Owner's written consent confirmed by " + (c.user.email || c.user.id), at: new Date().toISOString(), by: c.user.id };
    const ins = await c.sb.from("vx_voices").insert({ workspace_id: c.ws, el_voice_id: r.voice_id, name, consent, created_by: c.user.id }).select("id,name,consent,created_at").single();
    if (ins.error) { await deleteVoice(r.voice_id); throw new Error(ins.error.message); }
    await c.sb.from("vx_audit").insert({ workspace_id: c.ws, user_id: c.user.id, action: "voice_clone", meta: { name, owner } });
    return json({ voice: ins.data, credits: ch.amount });
  } catch (e) { await refund(c, ch.ref); throw e; }
});
export const DELETE = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const id = new URL(req.url).searchParams.get("id");
  const v = (await c.sb.from("vx_voices").select("el_voice_id").eq("workspace_id", c.ws).eq("id", id).maybeSingle()).data;
  if (!v) throw new HttpError(404, "Voice not found");
  await deleteVoice(v.el_voice_id);
  await c.sb.from("vx_voices").delete().eq("id", id).eq("workspace_id", c.ws);
  return json({ ok: true });
});
