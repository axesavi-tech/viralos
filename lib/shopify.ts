import "server-only";

const VER = () => process.env.SHOPIFY_API_VERSION || "2025-10";
export function normShop(s: string) {
  const h = String(s || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(h)) throw new Error("Enter your store's myshopify.com address, e.g. yourstore.myshopify.com");
  return h;
}
export async function gql(shop: string, token: string, query: string, variables: any = {}) {
  const r = await fetch(`https://${shop}/admin/api/${VER()}/graphql.json`, { method: "POST", headers: { "X-Shopify-Access-Token": token, "Content-Type": "application/json" }, body: JSON.stringify({ query, variables }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.errors) throw new Error("Shopify: " + (j?.errors?.[0]?.message || j?.errors || r.status));
  return j.data;
}
export async function shopInfo(shop: string, token: string) { return (await gql(shop, token, `{ shop { name myshopifyDomain currencyCode } }`)).shop; }
export async function listProducts(shop: string, token: string, after?: string) {
  const d = await gql(shop, token, `query($after:String){ products(first:50, after:$after, sortKey:UPDATED_AT, reverse:true){ pageInfo{hasNextPage endCursor} nodes{ id title handle status productType vendor tags totalInventory description
    seo{title description} featuredMedia{ preview{ image{ url } } } variants(first:3){ nodes{ sku price } } collections(first:3){ nodes{ title } } } } }`, { after });
  return { next: d.products.pageInfo.hasNextPage ? d.products.pageInfo.endCursor : null, products: d.products.nodes.map((p: any) => ({
    gid: p.id, sku: p.variants.nodes[0]?.sku || p.handle, name: p.title, price: p.variants.nodes[0]?.price || "", status: p.status === "ARCHIVED" ? "Discontinued" : (p.totalInventory ?? 1) > 0 ? "In stock" : "Out of stock",
    collection: p.collections.nodes[0]?.title || p.productType || "", facts: String(p.description || "").slice(0, 600), image: p.featuredMedia?.preview?.image?.url || "", seo: p.seo, tags: p.tags })) };
}
export async function updateSeo(shop: string, token: string, gid: string, seo: { title?: string; description?: string }, descriptionHtml?: string) {
  const d = await gql(shop, token, `mutation($p:ProductUpdateInput!){ productUpdate(product:$p){ product{ id seo{title description} } userErrors{ field message } } }`,
    { p: { id: gid, seo, ...(descriptionHtml ? { descriptionHtml } : {}) } });
  const errs = d.productUpdate.userErrors; if (errs?.length) throw new Error("Shopify: " + errs.map((e: any) => e.message).join("; "));
  return d.productUpdate.product;
}
