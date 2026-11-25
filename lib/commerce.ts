import "server-only";
import { normShop, shopInfo, listProducts as shopifyList, updateSeo as shopifyUpdate } from "./shopify";
import { safeFetch } from "./safefetch";
import { HttpError } from "./ctx";

/** One product, the same shape whatever store it came from. `ref` is the store's own id. */
export type Product = { ref: string; sku: string; name: string; price: string; status: string; collection: string; facts: string; image: string; seo?: { title?: string; description?: string }; tags?: string[] };
export type Page = { next: string | null; products: Product[] };
export type SeoUpdate = { seoTitle?: string; seoDescription?: string; descriptionHtml?: string };
export type Connected = { label: string; secret: any; meta: Record<string, any> };

export type Adapter = {
  id: Provider; name: string; canWrite: boolean;
  connect(input: Record<string, string>): Promise<Connected>;
  list(secret: any, cursor: string | null): Promise<Page>;
  update?(secret: any, ref: string, u: SeoUpdate): Promise<void>;
};
export const PROVIDERS = ["shopify", "woocommerce", "bigcommerce", "wix", "feed"] as const;
export type Provider = (typeof PROVIDERS)[number];

const clip = (s: any, n: number) => String(s ?? "").slice(0, n);
export const stripHtml = (h: string) => String(h || "").replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#0?39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const stock = (inStock: boolean | null | undefined, discontinued = false) => (discontinued ? "Discontinued" : inStock === false ? "Out of stock" : "In stock");
const fail = (m: string): never => { throw new HttpError(400, m); };

/** JSON call to a store's API through the SSRF guard (stores live at user-supplied addresses). */
async function api(url: string, init: { method?: string; headers?: Record<string, string>; body?: any; httpsOnly?: boolean } = {}) {
  const r = await safeFetch(url, 8_000_000, { method: init.method || "GET", headers: { "content-type": "application/json", ...(init.headers || {}) }, body: init.body ? JSON.stringify(init.body) : undefined, accept: "application/json", httpsOnly: init.httpsOnly ?? true, sameOriginRedirects: true });
  let j: any = null; try { j = JSON.parse(r.html); } catch { /* not JSON */ }
  if (r.status === 401 || r.status === 403) fail("The store rejected the keys. Check they're correct and have read and write access to products.");
  if (r.status === 404) fail("The store's API wasn't found at that address.");
  if (r.status >= 400) fail(`The store answered ${r.status}${j?.message ? ": " + clip(stripHtml(j.message), 200) : ""}.`);
  if (j === null) fail("The store didn't return valid data. Check the address.");
  return { json: j, headers: r.headers };
}

/* ---------- Shopify: myshopify.com address + Admin API token ---------- */
const shopify: Adapter = {
  id: "shopify", name: "Shopify", canWrite: true,
  async connect(i) {
    const shop = normShop(i.shop); const token = String(i.token || "").trim();
    if (!/^shpat_[a-f0-9]{20,}$/i.test(token)) fail("Paste the Admin API access token (starts with shpat_).");
    const info = await shopInfo(shop, token);
    return { label: info.name, secret: { shop, token }, meta: { shop, currency: info.currencyCode } };
  },
  async list(s, cursor) { const r = await shopifyList(s.shop, s.token, cursor || undefined); return { next: r.next, products: r.products.map(({ gid, ...p }: any) => ({ ref: gid, ...p })) }; },
  async update(s, ref, u) {
    if (!/^gid:\/\/shopify\/Product\/\d+$/.test(ref)) fail("Unknown product");
    await shopifyUpdate(s.shop, s.token, ref, { title: clip(u.seoTitle, 70), description: clip(u.seoDescription, 320) }, u.descriptionHtml ? clip(u.descriptionHtml, 20000) : undefined);
  },
};

/* ---------- WooCommerce: site URL + REST consumer key/secret ---------- */
export function normSite(raw: string) {
  let u: URL; try { u = new URL(/^https?:\/\//i.test(raw) ? raw.trim() : "https://" + String(raw).trim()); } catch { return fail("Enter your store's web address, e.g. https://yourstore.com"); }
  if (u.protocol !== "https:") fail("Your store must use https so your keys stay private.");
  return u.origin + u.pathname.replace(/\/(wp-admin|wp-json|shop)(\/.*)?$/i, "").replace(/\/+$/, "");
}
const woo: Adapter = {
  id: "woocommerce", name: "WooCommerce", canWrite: true,
  async connect(i) {
    const site = normSite(i.site); const key = String(i.key || "").trim(), sec = String(i.secret || "").trim();
    if (!/^ck_[a-f0-9]{20,}$/i.test(key) || !/^cs_[a-f0-9]{20,}$/i.test(sec)) fail("Paste the consumer key (ck_…) and consumer secret (cs_…) from WooCommerce → Settings → Advanced → REST API.");
    const s = { site, key, secret: sec };
    await this.list(s, null);
    let label = new URL(site).hostname; try { const r = await api(site + "/wp-json/"); if (r.json?.name) label = clip(stripHtml(r.json.name), 80); } catch { /* site name is optional */ }
    return { label, secret: s, meta: { site } };
  },
  async list(s, cursor) {
    const page = Math.max(1, Number(cursor) || 1);
    const r = await api(`${s.site}/wp-json/wc/v3/products?per_page=50&page=${page}&orderby=modified&order=desc&status=any`, { headers: { authorization: "Basic " + Buffer.from(`${s.key}:${s.secret}`).toString("base64") } });
    const total = Number(r.headers.get("x-wp-totalpages") || 1);
    if (!Array.isArray(r.json)) fail("Unexpected answer from WooCommerce.");
    const meta = (p: any, k: string) => p.meta_data?.find((m: any) => m.key === k)?.value;
    return { next: page < total ? String(page + 1) : null, products: r.json.map((p: any): Product => ({
      ref: String(p.id), sku: p.sku || p.slug || String(p.id), name: stripHtml(p.name), price: String(p.price || p.regular_price || ""),
      status: stock(p.stock_status !== "outofstock", p.status === "trash"), collection: p.categories?.[0]?.name || "", facts: clip(stripHtml(p.short_description || p.description), 600),
      image: p.images?.[0]?.src || "", seo: { title: meta(p, "_yoast_wpseo_title") || meta(p, "rank_math_title") || "", description: meta(p, "_yoast_wpseo_metadesc") || meta(p, "rank_math_description") || "" }, tags: (p.tags || []).map((t: any) => t.name) })) };
  },
  async update(s, ref, u) {
    if (!/^\d+$/.test(ref)) fail("Unknown product");
    const md: any[] = [];
    if (u.seoTitle) md.push({ key: "_yoast_wpseo_title", value: clip(u.seoTitle, 70) }, { key: "rank_math_title", value: clip(u.seoTitle, 70) });
    if (u.seoDescription) md.push({ key: "_yoast_wpseo_metadesc", value: clip(u.seoDescription, 320) }, { key: "rank_math_description", value: clip(u.seoDescription, 320) });
    await api(`${s.site}/wp-json/wc/v3/products/${ref}`, { method: "PUT", headers: { authorization: "Basic " + Buffer.from(`${s.key}:${s.secret}`).toString("base64") }, body: { ...(u.descriptionHtml ? { description: clip(u.descriptionHtml, 20000) } : {}), ...(u.seoDescription ? { short_description: clip(u.seoDescription, 320) } : {}), meta_data: md } });
  },
};

/* ---------- BigCommerce: store hash + API account token ---------- */
const BC = "https://api.bigcommerce.com/stores/";
const bigcommerce: Adapter = {
  id: "bigcommerce", name: "BigCommerce", canWrite: true,
  async connect(i) {
    const hash = String(i.hash || "").trim().replace(/^.*stores\//, "").replace(/\/.*$/, "").toLowerCase(); const token = String(i.token || "").trim();
    if (!/^[a-z0-9]{6,20}$/.test(hash)) fail("Enter the store hash (the part after /stores/ in your API path).");
    if (!/^[a-z0-9]{20,}$/i.test(token)) fail("Paste the API account access token.");
    const r = await api(`${BC}${hash}/v2/store`, { headers: { "x-auth-token": token } });
    return { label: clip(r.json?.name || hash, 80), secret: { hash, token }, meta: { hash, currency: r.json?.currency || "" } };
  },
  async list(s, cursor) {
    const page = Math.max(1, Number(cursor) || 1);
    const r = await api(`${BC}${s.hash}/v3/catalog/products?limit=50&page=${page}&include=primary_image&sort=date_modified&direction=desc`, { headers: { "x-auth-token": s.token } });
    const pg = r.json?.meta?.pagination || {};
    return { next: page < (pg.total_pages || 1) ? String(page + 1) : null, products: (r.json?.data || []).map((p: any): Product => ({
      ref: String(p.id), sku: p.sku || String(p.id), name: p.name, price: String(p.price ?? ""), status: stock(p.inventory_tracking === "none" ? true : p.inventory_level > 0, p.availability === "disabled"),
      collection: p.type || "", facts: clip(stripHtml(p.description), 600), image: p.primary_image?.url_standard || "", seo: { title: p.page_title || "", description: p.meta_description || "" }, tags: String(p.search_keywords || "").split(",").map((t: string) => t.trim()).filter(Boolean) })) };
  },
  async update(s, ref, u) {
    if (!/^\d+$/.test(ref)) fail("Unknown product");
    await api(`${BC}${s.hash}/v3/catalog/products/${ref}`, { method: "PUT", headers: { "x-auth-token": s.token }, body: { ...(u.seoTitle ? { page_title: clip(u.seoTitle, 70) } : {}), ...(u.seoDescription ? { meta_description: clip(u.seoDescription, 320) } : {}), ...(u.descriptionHtml ? { description: clip(u.descriptionHtml, 20000) } : {}) } });
  },
};

/* ---------- Wix Stores: API key + site id ---------- */
const WIX = "https://www.wixapis.com";
const wix: Adapter = {
  id: "wix", name: "Wix", canWrite: true,
  async connect(i) {
    const key = String(i.key || "").trim(), site = String(i.site || "").trim();
    if (key.length < 20) fail("Paste the API key from Wix → Account settings → API keys (with Wix Stores permissions).");
    if (!/^[0-9a-f-]{36}$/i.test(site)) fail("Enter the site ID (the long id in your Wix dashboard address).");
    await this.list({ key, site }, null);
    return { label: "Wix store", secret: { key, site }, meta: { site } };
  },
  async list(s, cursor) {
    const offset = Math.max(0, Number(cursor) || 0);
    const r = await api(`${WIX}/stores-reader/v1/products/query`, { method: "POST", headers: { authorization: s.key, "wix-site-id": s.site }, body: { query: { paging: { limit: 50, offset } }, includeVariants: false } });
    const items = r.json?.products || []; const total = Number(r.json?.totalResults || 0);
    return { next: offset + items.length < total ? String(offset + items.length) : null, products: items.map((p: any): Product => {
      const tags = p.seoData?.tags || []; const t = tags.find((x: any) => x.type === "title")?.children; const d = tags.find((x: any) => x.type === "meta" && x.props?.name === "description")?.props?.content;
      return { ref: String(p.id), sku: p.sku || p.slug || String(p.id), name: p.name, price: String(p.priceData?.price ?? p.price?.price ?? ""), status: stock(p.stock?.inStock !== false, p.visible === false),
        collection: p.productType || "", facts: clip(stripHtml(p.description), 600), image: p.media?.mainMedia?.image?.url || "", seo: { title: t || "", description: d || "" } };
    }) };
  },
  async update(s, ref, u) {
    if (!/^[0-9a-f-]{20,40}$/i.test(ref)) fail("Unknown product");
    const tags: any[] = [];
    if (u.seoTitle) tags.push({ type: "title", children: clip(u.seoTitle, 70), custom: true });
    if (u.seoDescription) tags.push({ type: "meta", props: { name: "description", content: clip(u.seoDescription, 320) }, custom: true });
    await api(`${WIX}/stores/v1/products/${ref}`, { method: "PATCH", headers: { authorization: s.key, "wix-site-id": s.site }, body: { product: { ...(u.descriptionHtml ? { description: clip(u.descriptionHtml, 8000) } : {}), ...(tags.length ? { seoData: { tags } } : {}) } } });
  },
};

/* ---------- Any other platform: product feed / CSV / JSON link (read-only) ---------- */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []; let row: string[] = [], cell = "", q = false;
  const sep = (text.split("\n")[0].match(/\t/g)?.length || 0) > (text.split("\n")[0].match(/,/g)?.length || 0) ? "\t" : ",";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true; else if (ch === sep) { row.push(cell); cell = ""; } else if (ch === "\n" || ch === "\r") { if (ch === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = (rows.shift() || []).map((h) => h.trim().toLowerCase().replace(/^g:/, "").replace(/[\s-]+/g, "_"));
  return rows.filter((r) => r.some((c) => c.trim())).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()])));
}
const xmlText = (s: string) => s.replace(/^<!\[CDATA\[|\]\]>$/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&amp;/g, "&").trim();
export function parseXmlFeed(xml: string): Record<string, string>[] {
  return [...xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => {
    const o: Record<string, string> = {};
    for (const f of m[2].matchAll(/<(?:g:)?([a-z_]+)\b[^>]*>([\s\S]*?)<\/(?:g:)?\1>/gi)) { const k = f[1].toLowerCase(); if (!(k in o)) o[k] = xmlText(f[2]); }
    for (const f of m[2].matchAll(/<link\b[^>]*href=["']([^"']+)["']/gi)) o.link = o.link || f[1];
    return o;
  });
}
const pick = (r: Record<string, any>, ...k: string[]) => { for (const x of k) if (r[x] != null && String(r[x]).trim()) return String(r[x]).trim(); return ""; };
export function rowsToProducts(rows: Record<string, any>[]): Product[] {
  return rows.slice(0, 2000).map((r, i) => {
    const avail = pick(r, "availability", "stock_status", "status", "in_stock").toLowerCase();
    return { ref: pick(r, "id", "product_id", "handle", "sku", "item_group_id") || String(i + 1), sku: pick(r, "sku", "variant_sku", "mpn", "id", "handle") || String(i + 1), name: stripHtml(pick(r, "title", "name", "product_name")),
      price: pick(r, "sale_price", "price", "variant_price").replace(/\s*[A-Z]{3}$/, ""), status: /out|false|^0$|sold/.test(avail) ? "Out of stock" : /discontinu|archiv/.test(avail) ? "Discontinued" : "In stock",
      collection: pick(r, "product_type", "google_product_category", "category", "categories", "type", "collection").split(/>|,/)[0].trim(), facts: clip(stripHtml(pick(r, "description", "body_html", "body_(html)", "short_description")), 600),
      image: pick(r, "image_link", "image", "image_src", "images", "image_url").split(",")[0].trim(), seo: { title: pick(r, "seo_title"), description: pick(r, "seo_description") } };
  }).filter((p) => p.name);
}
export function parseFeed(body: string, url = ""): Product[] {
  const t = body.trim();
  if (t.startsWith("{") || t.startsWith("[")) { const j = JSON.parse(t); const arr = Array.isArray(j) ? j : j.products || j.items || j.data || []; return rowsToProducts(arr.map((x: any) => ({ ...x, price: x.price?.amount ?? x.price ?? x.variants?.[0]?.price, image: x.image?.src || x.images?.[0]?.src || x.images?.[0] || x.image }))); }
  if (t.startsWith("<")) return rowsToProducts(parseXmlFeed(t));
  if (/\.(csv|tsv|txt)(\?|$)/i.test(url) || t.split("\n")[0].includes(",") || t.includes("\t")) return rowsToProducts(parseCsv(t));
  return fail("That link isn't a product feed. Use a Google Merchant feed (XML), CSV or JSON link.");
}
const feed: Adapter = {
  id: "feed", name: "Product feed (any platform)", canWrite: false,
  async connect(i) {
    let u: URL; try { u = new URL(String(i.url || "").trim()); } catch { return fail("Paste the full link to your product feed, starting with https://"); }
    const products = await this.list({ url: u.toString() }, null);
    if (!products.products.length) fail("No products found in that feed.");
    return { label: u.hostname, secret: { url: u.toString() }, meta: { url: u.toString(), count: products.products.length } };
  },
  async list(s) {
    const r = await safeFetch(s.url, 15_000_000, { accept: "application/xml,text/csv,application/json,text/plain,*/*" });
    return { next: null, products: parseFeed(r.html, s.url) };
  },
};

export const ADAPTERS: Record<Provider, Adapter> = { shopify, woocommerce: woo, bigcommerce, wix, feed };
export const isProvider = (p: any): p is Provider => PROVIDERS.includes(p);
