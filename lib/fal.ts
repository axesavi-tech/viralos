import "server-only";

const key = () => { const k = process.env.FAL_KEY; if (!k) throw new Error("fal.ai is not configured (FAL_KEY missing)."); return k; };
async function fail(r: Response, who: string): Promise<never> {
  let m = `${r.status}`; try { const j = await r.json(); m = j?.detail?.[0]?.msg || j?.detail || j?.error || JSON.stringify(j); } catch {}
  throw new Error(`${who}: ${String(m).slice(0, 300)}`);
}
/** Synchronous run, for fast models such as image generation. */
export async function falRun(model: string, input: any) {
  const r = await fetch(`https://fal.run/${model}`, { method: "POST", headers: { Authorization: `Key ${key()}`, "Content-Type": "application/json" }, body: JSON.stringify(input) });
  if (!r.ok) await fail(r, `fal ${model}`);
  return r.json();
}
export type FalJob = { model: string; id: string; statusUrl?: string; responseUrl?: string };
export async function falSubmit(model: string, input: any): Promise<FalJob> {
  const r = await fetch(`https://queue.fal.run/${model}`, { method: "POST", headers: { Authorization: `Key ${key()}`, "Content-Type": "application/json" }, body: JSON.stringify(input) });
  if (!r.ok) await fail(r, `fal ${model} submit`);
  const j = await r.json();
  return { model, id: j.request_id, statusUrl: j.status_url, responseUrl: j.response_url };
}
export async function falPoll(job: FalJob): Promise<{ state: "running" } | { state: "done"; data: any } | { state: "failed"; error: string }> {
  const base = `https://queue.fal.run/${job.model.split("/").slice(0, 2).join("/")}`;
  const s = await fetch(job.statusUrl || `${base}/requests/${job.id}/status`, { headers: { Authorization: `Key ${key()}` }, cache: "no-store" });
  if (!s.ok) await fail(s, "fal status");
  const sj = await s.json();
  if (sj.status === "IN_QUEUE" || sj.status === "IN_PROGRESS") return { state: "running" };
  const r = await fetch(job.responseUrl || `${base}/requests/${job.id}`, { headers: { Authorization: `Key ${key()}` }, cache: "no-store" });
  if (!r.ok) { let e = `fal returned ${r.status}`; try { const j = await r.json(); e = j?.detail?.[0]?.msg || j?.detail || j?.error || e; } catch {} return { state: "failed", error: String(e).slice(0, 300) }; }
  return { state: "done", data: await r.json() };
}
export const firstUrl = (d: any): string | undefined => d?.video?.url || d?.images?.[0]?.url || d?.image?.url || d?.audio?.url || d?.output?.url;
