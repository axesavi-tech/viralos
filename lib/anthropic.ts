import "server-only";

export type Msg = { role: "user" | "assistant"; content: any };
export type Img = { media_type: string; data: string };

async function call(body: any) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("Claude is not configured (ANTHROPIC_API_KEY missing).");
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = j?.error?.message || `Claude returned ${r.status}`;
    const e: any = new Error(r.status === 429 ? "Claude is busy. Try again in a minute." : msg);
    e.code = r.status === 429 ? "rate_limited" : "provider_error";
    throw e;
  }
  return j;
}

export function toMessages(input: string | Msg[], images: Img[] = []): Msg[] {
  const msgs: Msg[] = typeof input === "string" ? [{ role: "user", content: input }] : input.map((m) => ({ role: m.role, content: m.content }));
  if (images.length) {
    const last = msgs[msgs.length - 1];
    const text = typeof last.content === "string" ? last.content : "";
    last.content = [...images.slice(0, 6).map((i) => ({ type: "image", source: { type: "base64", media_type: i.media_type, data: i.data } })), { type: "text", text }];
  }
  return msgs;
}

export async function complete(model: string, messages: Msg[], opts: { maxTokens?: number; system?: string } = {}) {
  const j = await call({ model, max_tokens: opts.maxTokens || 8000, system: opts.system, messages });
  const text = (j.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
  return { text, usage: j.usage, truncated: j.stop_reason === "max_tokens" };
}

/** Claude with live web search. Returns text plus the sources it cited. */
export async function research(model: string, prompt: string, maxUses = 6) {
  const tool = { type: process.env.ANTHROPIC_WEB_SEARCH_TOOL || "web_search_20250305", name: "web_search", max_uses: maxUses };
  const j = await call({ model, max_tokens: 8000, messages: [{ role: "user", content: prompt }], tools: [tool] });
  const blocks = (j.content || []).filter((b: any) => b.type === "text");
  const sources = new Map<string, { url: string; title: string }>();
  blocks.forEach((b: any) => (b.citations || []).forEach((c: any) => { if (c.url && /^https:\/\//.test(c.url)) sources.set(c.url, { url: c.url, title: c.title || c.url }); }));
  return { text: blocks.map((b: any) => b.text).join(""), sources: [...sources.values()], searches: j.usage?.server_tool_use?.web_search_requests || 0 };
}

export function parseJSON(t: string) {
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a < 0 || b < a) throw new Error("Claude returned no JSON.");
  return JSON.parse(t.slice(a, b + 1));
}
