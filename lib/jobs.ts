import "server-only";
import type { Ctx } from "./ctx";
import { falPoll, firstUrl, type FalJob } from "./fal";
import { importUrl } from "./storage";
import { refund } from "./credits";
import { putFile } from "./storage";
import { poll as oaPoll } from "./openai";

export async function createJob(c: Ctx, kind: string, provider: string, request: any, credits: number, chargeRef: string, status: "queued" | "running" | "done" = "running", result: any = null) {
  const r = await c.sb.from("vx_jobs").insert({ workspace_id: c.ws, kind, provider, request, credits, charge_ref: chargeRef, status, result, created_by: c.user.id }).select("id").single();
  if (r.error) throw new Error(r.error.message);
  return r.data.id as string;
}
/** Advances a provider job; on success copies the result into our storage, on failure refunds the credits. */
export async function advance(c: Ctx, id: string) {
  const j = (await c.sb.from("vx_jobs").select("*").eq("id", id).eq("workspace_id", c.ws).single()).data;
  if (!j) throw new Error("Job not found");
  if (j.provider === "anthropic") return advanceAi(c, j);
  if (j.provider === "openai") return advanceOpenAI(c, j);
  if (j.status !== "running") return j;
  let st: { state: "running" } | { state: "done"; data: any } | { state: "failed"; error: string };
  try {
    if (j.provider === "runway" && j.request?.runway?.id) {
      const { runwayPoll } = await import("./video");
      const r = await runwayPoll(j.request.runway.id);
      st = r.state === "done" ? { state: "done", data: { video: { url: r.url } } } : r;
    } else st = await falPoll(j.request.fal as FalJob);
  } catch (e: any) { return { ...j, note: e.message }; }
  if (st.state === "running") return j;
  if (st.state === "failed") {
    await c.sb.from("vx_jobs").update({ status: "failed", error: st.error, updated_at: new Date().toISOString() }).eq("id", id);
    if (j.charge_ref) await refund(c, j.charge_ref);
    return { ...j, status: "failed", error: st.error, refunded: true };
  }
  const url = firstUrl(st.data);
  if (!url) { await c.sb.from("vx_jobs").update({ status: "failed", error: "Finished without a file" }).eq("id", id); if (j.charge_ref) await refund(c, j.charge_ref); return { ...j, status: "failed", error: "Finished without a file", refunded: true }; }
  const saved = await importUrl(c, url, j.kind, j.kind === "image" ? "image/png" : "video/mp4");
  const result = { url: saved.url, path: saved.path };
  await c.sb.from("vx_jobs").update({ status: "done", result, updated_at: new Date().toISOString() }).eq("id", id);
  return { ...j, status: "done", result };
}

/** AI jobs are answered by the worker on our server; here we only refund failures and give up on stalled jobs. */
async function advanceAi(c: Ctx, j: any) {
  const age = Date.now() - Date.parse(j.updated_at || j.created_at);
  if ((j.status === "queued" && age > 90_000) || (j.status === "running" && age > 300_000)) {
    const error = "The AI service did not answer. You were not charged; try again.";
    await c.sb.from("vx_jobs").update({ status: "failed", error, updated_at: new Date().toISOString() }).eq("id", j.id);
    j = { ...j, status: "failed", error };
  }
  if (j.status === "failed" && !(j.result && j.result.refunded)) {
    if (j.charge_ref) await refund(c, j.charge_ref);
    await c.sb.from("vx_jobs").update({ result: { refunded: true } }).eq("id", j.id);
    return { ...j, refunded: true };
  }
  return { ...j, refunded: !!(j.result && j.result.refunded) };
}

/** Research and post images run in OpenAI's background mode. Done: store the result. Failed: hand the same work to the
 *  backup engine (Claude with web search through our worker, or Flux for images) so the customer still gets an answer. */
async function advanceOpenAI(c: Ctx, j: any) {
  if (j.status !== "running") return j;
  const now = () => new Date().toISOString();
  let st;
  try { st = await oaPoll(j.request.openai.id); }
  catch (e: any) { return Date.now() - Date.parse(j.created_at) > 600_000 ? fallback(c, j, e.message) : j; }
  if (st.state === "running") return Date.now() - Date.parse(j.created_at) > 600_000 ? fallback(c, j, "took too long") : j;
  if (st.state === "failed") return fallback(c, j, st.error);
  if (j.kind === "image") {
    if (!st.image) return fallback(c, j, "no image returned");
    const saved = await putFile(c, Buffer.from(st.image, "base64"), "image/png", "image", "ai.png");
    const result = { url: saved.url, path: saved.path, engine: "openai" };
    await c.sb.from("vx_jobs").update({ status: "done", result, updated_at: now() }).eq("id", j.id);
    return { ...j, status: "done", result };
  }
  const result = { text: st.text.replace(/<\/?cite\b[^>]*>/gi, ""), sources: st.sources, searches: st.searches, truncated: st.truncated, engine: "openai:" + (j.request.openai.model || "") };
  await c.sb.from("vx_jobs").update({ status: "done", result, updated_at: now() }).eq("id", j.id);
  return { ...j, status: "done", result };
}
async function fallback(c: Ctx, j: any, why: string) {
  const now = new Date().toISOString();
  console.error("[engine fallback]", j.kind, String(why).slice(0, 200));
  if (j.kind === "ai" && j.request?.fallback) {
    await c.sb.from("vx_jobs").update({ provider: "anthropic", status: "queued", request: j.request.fallback, updated_at: now }).eq("id", j.id);
    return { ...j, provider: "anthropic", status: "queued" };
  }
  if (j.kind === "image" && j.request?.fallback) {
    try {
      const { falRun } = await import("./fal");
      const f = j.request.fallback;
      const url = firstUrl(await falRun(f.model, f.input));
      if (url) { const saved = await importUrl(c, url, "image", "image/png"); const result = { url: saved.url, path: saved.path, engine: "fal" };
        await c.sb.from("vx_jobs").update({ status: "done", result, updated_at: now }).eq("id", j.id); return { ...j, status: "done", result }; }
    } catch (e: any) { why = e.message; }
  }
  await c.sb.from("vx_jobs").update({ status: "failed", error: "The AI service did not answer. You were not charged; try again.", updated_at: now }).eq("id", j.id);
  if (j.charge_ref) await refund(c, j.charge_ref);
  return { ...j, status: "failed", error: "The AI service did not answer. You were not charged; try again.", refunded: true };
}
