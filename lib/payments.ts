import "server-only";
import { hmac, safeEqual } from "./crypto";
import { supabaseAnon } from "./supabase/server";

const rzAuth = () => {
  const id = process.env.RAZORPAY_KEY_ID, s = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !s) throw new Error("Razorpay is not configured yet (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET).");
  return "Basic " + Buffer.from(`${id}:${s}`).toString("base64");
};
export async function rzCreateOrder(amount: number, currency: string, receipt: string, notes: Record<string, string>) {
  const r = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { Authorization: rzAuth(), "Content-Type": "application/json" }, body: JSON.stringify({ amount, currency: currency.toUpperCase(), receipt: receipt.slice(0, 40), notes }) });
  const j = await r.json(); if (!r.ok) throw new Error("Razorpay: " + (j?.error?.description || r.status)); return j as { id: string; amount: number; currency: string };
}
export function rzVerifyCheckout(orderId: string, paymentId: string, signature: string) {
  return safeEqual(hmac(process.env.RAZORPAY_KEY_SECRET || "", `${orderId}|${paymentId}`), String(signature || ""));
}
export function rzVerifyWebhook(body: string, signature: string) {
  const s = process.env.RAZORPAY_WEBHOOK_SECRET; if (!s) return false;
  return safeEqual(hmac(s, body), String(signature || ""));
}
export async function rzPayment(paymentId: string) {
  const r = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, { headers: { Authorization: rzAuth() } });
  const j = await r.json(); if (!r.ok) throw new Error("Razorpay: " + (j?.error?.description || r.status));
  if (j.status === "authorized") {
    const c = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/capture`, { method: "POST", headers: { Authorization: rzAuth(), "Content-Type": "application/json" }, body: JSON.stringify({ amount: j.amount, currency: j.currency }) });
    const cj = await c.json(); if (c.ok) return cj;
  }
  return j as { id: string; order_id: string; amount: number; status: string; currency: string };
}

export async function stripeCheckout(order: string, amount: number, currency: string, name: string, origin: string, email?: string) {
  const k = process.env.STRIPE_SECRET_KEY; if (!k) throw new Error("Stripe is not configured yet (STRIPE_SECRET_KEY).");
  const f = new URLSearchParams({ mode: "payment", success_url: `${origin}/studio/index.html#account`, cancel_url: `${origin}/studio/index.html#account`, client_reference_id: order, "metadata[order]": order,
    "line_items[0][quantity]": "1", "line_items[0][price_data][currency]": currency, "line_items[0][price_data][unit_amount]": String(amount), "line_items[0][price_data][product_data][name]": `Kathavi · ${name}` });
  if (email) f.set("customer_email", email);
  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: `Bearer ${k}`, "Content-Type": "application/x-www-form-urlencoded" }, body: f });
  const j = await r.json(); if (!r.ok) throw new Error("Stripe: " + (j?.error?.message || r.status)); return j as { id: string; url: string };
}
export function stripeVerify(body: string, header: string) {
  const s = process.env.STRIPE_WEBHOOK_SECRET; if (!s) return false;
  const parts = Object.fromEntries(String(header || "").split(",").map((p) => p.split("=") as [string, string]));
  if (!parts.t || !parts.v1 || Math.abs(Date.now() / 1000 - Number(parts.t)) > 600) return false;
  return safeEqual(hmac(s, `${parts.t}.${body}`), parts.v1);
}
/** Credit the workspace for a verified payment (idempotent). */
export async function completePayment(order: string, amount: number, raw: unknown) {
  const r = await supabaseAnon().rpc("vx_complete_payment", { p_order: order, p_secret: process.env.VX_SERVER_SECRET, p_amount: amount, p_raw: raw as any });
  if (r.error) throw new Error(r.error.message);
  return r.data;
}
