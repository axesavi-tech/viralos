import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund } from "@/lib/credits";
import { cloneVoice, deleteVoice } from "@/lib/eleven";
export const maxDuration = 120;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const fd = await req.formData();
  const name = String(fd.get("name") || "").trim().slice(0, 60), owner = String(fd.get("owner") || "").trim().slice(0, 80), scope = String(fd.get("scope") || "").slice(0, 200);
  // up to 25 samples, like the instant-clone flow: more clean speech gives a closer voice
  const samples = fd.getAll("sample").filter((x): x is File => x instanceof File && x.size > 0).slice(0, 25);
  if (!name || !owner) throw new HttpError(400, "Name the voice and its owner.");
  if (fd.get("verified") !== "true") throw new HttpError(400, "A voice can only be cloned with the owner's written consent.");
  const total = samples.reduce((a, f) => a + f.size, 0);
  if (!samples.length || total < 50_000) throw new HttpError(400, "Add at least 30 seconds of clear speech.");
  if (samples.some((f) => f.size > 25 * 1024 * 1024) || total > 60 * 1024 * 1024) throw new HttpError(413, "Each sample can be up to 25 MB, 60 MB in all.");
  const labels: Record<string, string> = {};
  for (const k of ["language", "accent", "gender", "age", "use_case"]) { const v = String(fd.get(k) || "").trim().slice(0, 40); if (v) labels[k] = v; }
  const description = String(fd.get("description") || "").slice(0, 300);
  const ch = await charge(c, "voice_clone");
  try {
    const r = await cloneVoice(`Kathavi · ${name}`, samples.map((f) => ({ blob: f, filename: f.name || "sample.mp3" })), `${description ? description + ". " : ""}Cloned with consent of ${owner} for ${scope}`, { denoise: fd.get("denoise") !== "false", labels });
    const consent = { owner, scope, labels, description, samples: samples.length, statement: "Owner's written consent confirmed by " + (c.user.email || c.user.id), at: new Date().toISOString(), by: c.user.id };
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
