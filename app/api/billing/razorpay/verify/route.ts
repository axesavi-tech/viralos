import { ctx, route, json, HttpError } from "@/lib/ctx";
import { rzVerifyCheckout, rzPayment, completePayment } from "@/lib/payments";
export const POST = route(async (req: Request) => {
  await ctx(req);
  const b = await req.json();
  if (!rzVerifyCheckout(b.razorpay_order_id, b.razorpay_payment_id, b.razorpay_signature)) throw new HttpError(400, "Payment signature did not verify.");
  const p = await rzPayment(b.razorpay_payment_id);
  if (p.order_id !== b.razorpay_order_id || p.status !== "captured") throw new HttpError(409, `Payment is ${p.status}. Credits are added once it is captured.`);
  const r = await completePayment(p.order_id, p.amount, { id: p.id, status: p.status, method: (p as any).method });
  return json(r);
});
