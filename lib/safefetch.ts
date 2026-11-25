import "server-only";
import { lookup } from "dns/promises";
import net from "net";

const privateV4 = (ip: string) => { const p = ip.split(".").map(Number); return p[0] === 10 || p[0] === 127 || p[0] === 0 || (p[0] === 169 && p[1] === 254) || (p[0] === 172 && p[1] >= 16 && p[1] <= 31) || (p[0] === 192 && p[1] === 168) || (p[0] === 100 && p[1] >= 64 && p[1] <= 127) || p[0] >= 224; };
const privateV6 = (ip: string) => /^(::1|::|fc|fd|fe80|::ffff:(10|127|192\.168|172\.(1[6-9]|2\d|3[01]))\.)/i.test(ip);

/** Fetch a public web page, refusing private/internal addresses (SSRF guard), with size and time limits. */
export type SafeOpts = { method?: string; headers?: Record<string, string>; body?: string; accept?: string; httpsOnly?: boolean; sameOriginRedirects?: boolean };
export async function safeFetch(raw: string, maxBytes = 2_000_000, o: SafeOpts = {}) {
  let url = new URL(raw); const origin = url.origin;
  for (let hop = 0; hop < 4; hop++) {
    if (!/^https?:$/.test(url.protocol)) throw new Error("Only http and https links can be read.");
    if (o.httpsOnly && url.protocol !== "https:") throw new Error("Your store must use https so your keys stay private.");
    if (o.sameOriginRedirects && url.origin !== origin) throw new Error("The store redirected to a different site; use the final address instead.");
    const addrs = await lookup(url.hostname, { all: true });
    if (!addrs.length || addrs.some((a) => (net.isIPv4(a.address) ? privateV4(a.address) : privateV6(a.address)))) throw new Error("That address is not a public website.");
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 12_000);
    const r = await fetch(url, { redirect: "manual", signal: ctl.signal, method: o.method || "GET", body: o.body, headers: { "user-agent": "Kathavi/1.0 (+https://kathavi.com)", accept: o.accept || "text/html,application/xhtml+xml", ...(o.headers || {}) } }).finally(() => clearTimeout(t));
    if (r.status >= 300 && r.status < 400 && r.headers.get("location")) { url = new URL(r.headers.get("location")!, url); continue; }
    if (!r.ok && !o.method) throw new Error(`The site answered ${r.status}.`);
    const reader = r.body!.getReader(); const chunks: Uint8Array[] = []; let n = 0;
    while (true) { const { done, value } = await reader.read(); if (done) break; n += value.length; if (n > maxBytes) break; chunks.push(value); }
    return { url: url.toString(), html: new TextDecoder().decode(Buffer.concat(chunks)), status: r.status, headers: r.headers };
  }
  throw new Error("Too many redirects.");
}

/** Plain-text extraction good enough for brand analysis. */
export function extract(html: string, base: string) {
  const pick = (re: RegExp) => (html.match(re)?.[1] || "").replace(/\s+/g, " ").trim();
  const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  const body = html.replace(/<(script|style|noscript|svg|iframe)[\s\S]*?<\/\1>/gi, " ").replace(/<\/(p|div|h[1-6]|li|section|article|br)>/gi, "\n").replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/[ \t]+/g, " ").split("\n").map((l) => l.trim()).filter((l) => l.length > 2);
  const text = [...new Set(body)].join("\n").slice(0, 14000);
  const links = [...html.matchAll(/href=["']([^"'#]+)["']/gi)].map((m) => { try { return new URL(m[1], base).toString(); } catch { return ""; } })
    .filter((u) => u.startsWith(new URL(base).origin) && /(about|story|our|collection|craft|faq|shop|products?)/i.test(u)).slice(0, 12);
  const colors = [...new Set((html.match(/#[0-9a-f]{6}\b/gi) || []).map((c) => c.toUpperCase()))].slice(0, 12);
  return { title, desc, text, links: [...new Set(links)], colors };
}
