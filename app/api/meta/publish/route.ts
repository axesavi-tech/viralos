import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { getConn } from "@/lib/conn";
import { igPublish, type MetaConn } from "@/lib/meta";
import { toPublicUrl } from "@/lib/storage";
export const maxDuration = 120;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  if (!["owner", "admin", "brand_manager", "marketing_manager", "approver"].includes(c.role)) throw new HttpError(403, "Your role cannot publish.");
  const b = await req.json();
  if (!["image", "carousel", "reel", "story"].includes(b.kind)) throw new HttpError(400, "Unknown post type");
  if (!b.approved) throw new HttpError(400, "Only approved content can be published.");
  const { data } = await getConn<MetaConn>(c, "meta");
  const urls: string[] = []; if (!b.container) for (const u of (b.urls || []).slice(0, 10)) urls.push(await toPublicUrl(c, u, 7200));
  if (!b.container && !urls.length) throw new HttpError(400, "Render the post's image or video first.");
  const r = await igPublish(data, { kind: b.kind, urls, caption: String(b.caption || "").slice(0, 2200), container: b.container, pageId: b.pageId });
  await c.sb.from("vx_audit").insert({ workspace_id: c.ws, user_id: c.user.id, action: "instagram_publish", meta: { itemId: b.itemId, kind: b.kind, result: r } });
  return json(r);
});
