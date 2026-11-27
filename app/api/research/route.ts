import { ctx, route, json, requireWrite } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { createJob } from "@/lib/jobs";
import { lead, openaiModelsFor } from "@/lib/engines";
import { startResearch } from "@/lib/openai";
export const maxDuration = 300;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const b = await req.json();
  const s = await settings(c);
  const ch = await charge(c, "research");
  try {
    const prompt = `You are a market research analyst with live web search. Research the brief below using current, reputable sources (brand sites, reputable news, industry reports, official data). Search several times.
BRIEF: ${String(b.brief || "").slice(0, 6000)}
Write a marketing intelligence brief. For every point set "label": "verified" ONLY if a source you found supports it (put that source URL in "source"), "hypothesis" for your reasoned inference, "unavailable" if real data is needed but not public. Never invent numbers.
Return ONLY JSON: {"sections":[{"title":"What customers care about|What competitors communicate|Where differentiation is possible|Content the brand should create|Audiences to prioritise|Channels to use|Campaign angles","points":[{"text":"","label":"verified|hypothesis|unavailable","source":"https://..."}]}],"trends":[{"name":"","type":"format|topic|seasonal|cultural|visual","window":"","scores":{"brand":1,"audience":1,"timeliness":1,"creative":1,"commercial":1,"complexity":1,"confidence":1},"recommendation":"participate|adapt|ignore","why":"","source":"https://..."}]}`;
    // Runs in the background on the research engine (Claude with web search as backup); the studio polls the job.
    const claudeReq = { model: s.providers.text_model || "claude-sonnet-5-5", max_tokens: 12000, messages: [{ role: "user", content: prompt }], tools: [{ type: process.env.ANTHROPIC_WEB_SEARCH_TOOL || "web_search_20250305", name: "web_search", max_uses: 8 }] };
    if (lead("research") === "openai") {
      try {
        const m = await openaiModelsFor(s.providers);
        const rid = await startResearch(prompt, m.text, 12000);
        const job = await createJob(c, "ai", "openai", { openai: { id: rid, model: m.text }, fallback: claudeReq }, ch.amount, ch.ref, "running");
        return json({ job, credits: ch.amount, balance: ch.balance });
      } catch { /* backup below */ }
    }
    const job = await createJob(c, "ai", "anthropic", claudeReq, ch.amount, ch.ref, "queued" as any);
    return json({ job, credits: ch.amount, balance: ch.balance });
  } catch (e) { await refund(c, ch.ref); throw e; }
});
