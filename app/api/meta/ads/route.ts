import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { getConn } from "@/lib/conn";
import { createPausedAd, type MetaConn } from "@/lib/meta";
import { getFile } from "@/lib/storage";
export const maxDuration = 120;
const OBJ = ["OUTCOME_AWARENESS", "OUTCOME_TRAFFIC", "OUTCOME_ENGAGEMENT", "OUTCOME_SALES"];
const CTA = ["SHOP_NOW", "LEARN_MORE", "SIGN_UP", "CONTACT_US", "SEE_MORE", "ORDER_NOW", "GET_OFFER"];
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  if (!["owner", "admin", "marketing_manager"].includes(c.role)) throw new HttpError(403, "Only owners, admins and marketing managers can create ads.");
  const b = await req.json();
  if (!b.adAccount) throw new HttpError(400, "Choose an ad account.");
  if (!/^https:\/\//.test(b.link || "")) throw new HttpError(400, "Enter the https landing page for the ad.");
  const m = String(b.imageUrl || "").match(/[?&]p=([^&]+)/); if (!m) throw new HttpError(400, "Render the ad image first.");
  const img = Buffer.from(await (await getFile(c, decodeURIComponent(m[1]))).arrayBuffer());
  const { data } = await getConn<MetaConn>(c, "meta");
  const r = await createPausedAd(data, { adAccount: b.adAccount, name: String(b.name || "Kathavi ad").slice(0, 120), objective: OBJ.includes(b.objective) ? b.objective : "OUTCOME_AWARENESS",
    dailyBudgetMinor: Math.max(100, Math.round(Number(b.dailyBudget || 500) * 100)), countries: (b.countries || ["IN"]).slice(0, 10), ageMin: Math.max(18, Number(b.ageMin) || 25), ageMax: Math.min(65, Number(b.ageMax) || 45),
    imageBytes: img, primaryText: String(b.primaryText || "").slice(0, 500), headline: String(b.headline || "").slice(0, 60), link: b.link, cta: CTA.includes(b.cta) ? b.cta : "SHOP_NOW", pageId: b.pageId });
  await c.sb.from("vx_audit").insert({ workspace_id: c.ws, user_id: c.user.id, action: "meta_ad_created_paused", meta: { ...r, name: b.name } });
  return json({ ...r, status: "PAUSED" });
});
