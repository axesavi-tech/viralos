import { ctx, route, json, requireWrite } from "@/lib/ctx";
import { charge, refund, settings } from "@/lib/credits";
import { research, parseJSON } from "@/lib/anthropic";
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
    const r = await research(s.providers.text_model || "claude-sonnet-5-5", prompt, 8);
    const v = parseJSON(r.text);
    const cited = new Set(r.sources.map((x) => x.url));
    (v.sections || []).forEach((sec: any) => (sec.points || []).forEach((p: any) => { if (p.label === "verified" && !(p.source && (cited.has(p.source) || /^https:\/\//.test(p.source)))) p.label = "hypothesis"; }));
    return json({ ...v, sources: r.sources, searches: r.searches, credits: ch.amount, balance: ch.balance, live: true });
  } catch (e) { await refund(c, ch.ref); throw e; }
});
