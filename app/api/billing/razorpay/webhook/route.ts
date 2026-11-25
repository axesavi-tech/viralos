import { rzVerifyWebhook, completePayment } from "@/lib/payments";
export async function POST(req: Request) {
  const body = await req.text();
  if (!rzVerifyWebhook(body, req.headers.get("x-razorpay-signature") || "")) return new Response("bad signature", { status: 400 });
  const ev = JSON.parse(body);
  if (ev.event === "payment.captured" || ev.event === "order.paid") {
    const p = ev.payload?.payment?.entity;
    if (p?.order_id) { try { await completePayment(p.order_id, p.amount, { id: p.id, event: ev.event }); } catch (e: any) { if (!/already/.test(e.message)) console.error("[razorpay webhook]", e.message); } }
  }
  return new Response("ok");
}
