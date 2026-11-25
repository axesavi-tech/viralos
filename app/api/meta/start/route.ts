import { NextResponse } from "next/server";
import { ctx, route, requireManage, HttpError } from "@/lib/ctx";
import { oauthUrl, metaConfigured } from "@/lib/meta";
import { signState } from "@/lib/crypto";
export const GET = route(async (req: Request) => {
  const c = await ctx(req);
  if (!(["owner", "admin", "brand_manager"].includes(c.role))) requireManage(c);
  if (!metaConfigured()) throw new HttpError(503, "Instagram & Meta Ads are not set up yet: add META_APP_ID and META_APP_SECRET.");
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  return NextResponse.redirect(oauthUrl(`${origin}/api/meta/callback`, signState({ ws: c.ws, u: c.user.id })));
});
