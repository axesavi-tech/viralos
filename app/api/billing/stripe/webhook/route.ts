import { stripeVerify, completePayment } from "@/lib/payments";
export async function POST(req: Request) {
  const body = await req.text();
  if (!stripeVerify(body, req.headers.get("stripe-signature") || "")) return new Response("bad signature", { status: 400 });
  const ev = JSON.parse(body);
  if (ev.type === "checkout.session.completed" && ev.data?.object?.payment_status === "paid") {
    const s = ev.data.object;
    try { await completePayment(s.metadata?.order || s.client_reference_id, s.amount_total, { id: s.id }); } catch (e: any) { console.error("[stripe webhook]", e.message); }
  }
  return new Response("ok");
}
