import "server-only";
import type { Ctx } from "./ctx";
import { falPoll, firstUrl, type FalJob } from "./fal";
import { importUrl } from "./storage";
import { refund } from "./credits";

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
  const age = Date.now() - Date.parse(j.created_at);
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
