import "server-only";

const V = () => process.env.META_GRAPH_VERSION || "v23.0";
const G = (p: string) => `https://graph.facebook.com/${V()}/${p.replace(/^\//, "")}`;
export const META_SCOPES = ["instagram_basic", "instagram_content_publish", "pages_show_list", "pages_read_engagement", "business_management", "ads_management", "ads_read"];

export function metaConfigured() { return !!(process.env.META_APP_ID && process.env.META_APP_SECRET); }
export function oauthUrl(redirect: string, state: string) {
  const q = new URLSearchParams({ client_id: process.env.META_APP_ID || "", redirect_uri: redirect, state, scope: META_SCOPES.join(","), response_type: "code" });
  return `https://www.facebook.com/${V()}/dialog/oauth?${q}`;
}
async function gget(path: string, params: Record<string, string>) {
  const r = await fetch(G(path) + "?" + new URLSearchParams(params), { cache: "no-store" });
  const j = await r.json(); if (!r.ok || j.error) throw new Error("Meta: " + (j?.error?.error_user_msg || j?.error?.message || r.status)); return j;
}
async function gpost(path: string, params: Record<string, any>) {
  const body = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, typeof v === "string" ? v : JSON.stringify(v)]));
  const r = await fetch(G(path), { method: "POST", body });
  const j = await r.json(); if (!r.ok || j.error) throw new Error("Meta: " + (j?.error?.error_user_msg || j?.error?.message || r.status)); return j;
}
export async function exchangeCode(code: string, redirect: string) {
  const short = await gget("oauth/access_token", { client_id: process.env.META_APP_ID!, client_secret: process.env.META_APP_SECRET!, redirect_uri: redirect, code });
  const long = await gget("oauth/access_token", { grant_type: "fb_exchange_token", client_id: process.env.META_APP_ID!, client_secret: process.env.META_APP_SECRET!, fb_exchange_token: short.access_token });
  const token = long.access_token as string;
  const pages = await gget("me/accounts", { fields: "id,name,access_token,instagram_business_account{id,username}", access_token: token });
  let ads: any[] = [];
  try { ads = (await gget("me/adaccounts", { fields: "id,name,account_status,currency", access_token: token })).data || []; } catch { /* ads permission optional */ }
  return { userToken: token, pages: (pages.data || []).map((p: any) => ({ id: p.id, name: p.name, token: p.access_token, ig: p.instagram_business_account || null })), adAccounts: ads };
}

export type MetaConn = Awaited<ReturnType<typeof exchangeCode>>;
export function pickIg(conn: MetaConn, pageId?: string) {
  const page = conn.pages.find((p) => (pageId ? p.id === pageId : !!p.ig)) || conn.pages.find((p) => !!p.ig);
  if (!page || !page.ig) throw new Error("No Instagram professional account is linked to your Facebook Pages.");
  return page;
}
async function waitReady(container: string, token: string, ms: number) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const s = await gget(container, { fields: "status_code,status", access_token: token });
    if (s.status_code === "FINISHED") return true;
    if (s.status_code === "ERROR" || s.status_code === "EXPIRED") throw new Error("Instagram could not process this media: " + (s.status || s.status_code));
    await new Promise((r) => setTimeout(r, 3000));
  }
  return false;
}
/** Publishes to Instagram. Returns {state:'published', id, permalink} or {state:'processing', container} for long videos. */
export async function igPublish(conn: MetaConn, o: { kind: "image" | "carousel" | "reel" | "story"; urls: string[]; caption: string; container?: string; pageId?: string }) {
  const page = pickIg(conn, o.pageId), ig = page.ig!.id, token = page.token;
  let container = o.container;
  if (!container) {
    if (o.kind === "carousel") {
      const kids: string[] = [];
      for (const u of o.urls.slice(0, 10)) kids.push((await gpost(`${ig}/media`, { image_url: u, is_carousel_item: "true", access_token: token })).id);
      container = (await gpost(`${ig}/media`, { media_type: "CAROUSEL", children: kids.join(","), caption: o.caption, access_token: token })).id;
    } else if (o.kind === "reel") container = (await gpost(`${ig}/media`, { media_type: "REELS", video_url: o.urls[0], caption: o.caption, share_to_feed: "true", access_token: token })).id;
    else if (o.kind === "story") container = (await gpost(`${ig}/media`, { media_type: "STORIES", [/\.(mp4|mov|webm)(\?|$)/i.test(o.urls[0]) ? "video_url" : "image_url"]: o.urls[0], access_token: token })).id;
    else container = (await gpost(`${ig}/media`, { image_url: o.urls[0], caption: o.caption, access_token: token })).id;
  }
  const ready = await waitReady(container!, token, o.kind === "reel" || o.kind === "story" ? 45_000 : 20_000);
  if (!ready) return { state: "processing" as const, container };
  const pub = await gpost(`${ig}/media_publish`, { creation_id: container!, access_token: token });
  let permalink = ""; try { permalink = (await gget(pub.id, { fields: "permalink", access_token: token })).permalink || ""; } catch {}
  return { state: "published" as const, id: pub.id as string, permalink, account: page.ig!.username };
}

/** Builds a complete Meta ad (campaign → ad set → creative → ad). Everything is created PAUSED: nothing spends until you activate it. */
export async function createPausedAd(conn: MetaConn, o: { adAccount: string; name: string; objective: string; dailyBudgetMinor: number; countries: string[]; ageMin: number; ageMax: number; imageBytes: Buffer; primaryText: string; headline: string; link: string; cta: string; pageId?: string }) {
  const act = o.adAccount.startsWith("act_") ? o.adAccount : `act_${o.adAccount}`;
  const page = conn.pages.find((p) => p.id === o.pageId) || conn.pages[0];
  if (!page) throw new Error("No Facebook Page found for this ad.");
  const token = conn.userToken;
  const camp = await gpost(`${act}/campaigns`, { name: o.name, objective: o.objective, status: "PAUSED", special_ad_categories: [], is_adset_budget_sharing_enabled: "false", access_token: token });
  const img = await gpost(`${act}/adimages`, { bytes: o.imageBytes.toString("base64"), access_token: token });
  const hash = Object.values(img.images || {})[0] as any;
  const goal = o.objective === "OUTCOME_TRAFFIC" ? "LINK_CLICKS" : o.objective === "OUTCOME_ENGAGEMENT" ? "POST_ENGAGEMENT" : "REACH";
  const adset = await gpost(`${act}/adsets`, { name: o.name + " · ad set", campaign_id: camp.id, daily_budget: String(o.dailyBudgetMinor), billing_event: "IMPRESSIONS", optimization_goal: goal, bid_strategy: "LOWEST_COST_WITHOUT_CAP", status: "PAUSED",
    targeting: { geo_locations: { countries: o.countries }, age_min: o.ageMin, age_max: o.ageMax, publisher_platforms: ["instagram", "facebook"] }, access_token: token });
  const creative = await gpost(`${act}/adcreatives`, { name: o.name + " · creative", access_token: token,
    object_story_spec: { page_id: page.id, ...(page.ig ? { instagram_user_id: page.ig.id } : {}), link_data: { image_hash: hash?.hash, link: o.link, message: o.primaryText, name: o.headline, call_to_action: { type: o.cta, value: { link: o.link } } } } });
  const ad = await gpost(`${act}/ads`, { name: o.name, adset_id: adset.id, creative: { creative_id: creative.id }, status: "PAUSED", access_token: token });
  return { campaign: camp.id, adset: adset.id, creative: creative.id, ad: ad.id, manage: `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${act.replace("act_", "")}&selected_campaign_ids=${camp.id}` };
}
