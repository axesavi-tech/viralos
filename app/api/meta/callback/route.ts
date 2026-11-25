import { NextResponse } from "next/server";
import { ctx } from "@/lib/ctx";
import { exchangeCode } from "@/lib/meta";
import { readState, seal } from "@/lib/crypto";
export async function GET(req: Request) {
  const url = new URL(req.url), origin = process.env.NEXT_PUBLIC_SITE_URL || url.origin;
  const back = (q: string) => NextResponse.redirect(`${origin}/studio/index.html?${q}#automations`);
  try {
    if (url.searchParams.get("error")) return back("meta=cancelled");
    const st = readState(url.searchParams.get("state") || "");
    const c = await ctx(new Request(req.url, { headers: { "x-workspace": st.ws } }));
    if (c.user.id !== st.u) throw new Error("Signed-in user changed during connection.");
    const conn = await exchangeCode(url.searchParams.get("code") || "", `${origin}/api/meta/callback`);
    const ig = conn.pages.filter((p) => p.ig).map((p) => ({ page: p.name, pageId: p.id, ig: p.ig!.username, igId: p.ig!.id }));
    const r = await c.sb.from("vx_connections").upsert({ workspace_id: c.ws, provider: "meta", label: ig[0]?.ig ? "@" + ig[0].ig : "Meta", secret: seal(JSON.stringify(conn)),
      meta: { instagram: ig, adAccounts: conn.adAccounts.map((a: any) => ({ id: a.id, name: a.name, currency: a.currency, status: a.account_status })) }, updated_by: c.user.id, updated_at: new Date().toISOString() });
    if (r.error) throw new Error(r.error.message);
    return back("meta=connected");
  } catch (e: any) { return back("meta_error=" + encodeURIComponent(String(e.message || e).slice(0, 200))); }
}
