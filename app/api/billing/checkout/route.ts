import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { rzCreateOrder, stripeCheckout } from "@/lib/payments";
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const { product, gateway } = await req.json();
  if (!/^(pack|plan)_[a-z0-9_]+$/.test(product || "")) throw new HttpError(400, "Unknown product");
  const price = (await c.sb.rpc("vx_price", { product, gw: gateway })).data as any;
  if (!price?.amount_minor) throw new HttpError(400, "Unknown product");
  if (gateway === "razorpay") {
    const order = await rzCreateOrder(price.amount_minor, "INR", `vx_${Date.now()}`, { workspace: c.ws, product });
    const r = await c.sb.rpc("vx_create_payment", { ws: c.ws, gw: "razorpay", order_id: order.id, product });
    if (r.error) throw new Error(r.error.message);
    return json({ gateway, keyId: process.env.RAZORPAY_KEY_ID, orderId: order.id, amount: order.amount, currency: "INR", name: price.name, email: c.user.email });
  }
  if (gateway === "stripe") {
    const order = `st_${crypto.randomUUID()}`;
    const r = await c.sb.rpc("vx_create_payment", { ws: c.ws, gw: "stripe", order_id: order, product });
    if (r.error) throw new Error(r.error.message);
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const s = await stripeCheckout(order, price.amount_minor, "usd", price.name, origin, c.user.email);
    return json({ gateway, url: s.url });
  }
  throw new HttpError(400, "Choose Razorpay or Stripe.");
});
