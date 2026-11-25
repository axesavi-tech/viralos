import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { charge, refund } from "@/lib/credits";
import { safeFetch, extract } from "@/lib/safefetch";
export const maxDuration = 60;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const { url } = await req.json();
  if (!url) throw new HttpError(400, "Enter a website address.");
  const ch = await charge(c, "web_read");
  try {
    const home = await safeFetch(/^https?:\/\//.test(url) ? url : `https://${url}`);
    const main = extract(home.html, home.url);
    const pages = [{ url: home.url, title: main.title, text: main.text }];
    for (const link of main.links.slice(0, 4)) {
      try { const p = await safeFetch(link, 1_000_000); const x = extract(p.html, p.url); pages.push({ url: p.url, title: x.title, text: x.text.slice(0, 5000) }); } catch { /* skip page */ }
    }
    return json({ url: home.url, title: main.title, description: main.desc, colors: main.colors, pages, credits: ch.amount });
  } catch (e: any) { await refund(c, ch.ref); throw new HttpError(422, e.message || "Could not read that website."); }
});
