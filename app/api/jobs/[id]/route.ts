import { ctx, route, json } from "@/lib/ctx";
import { advance } from "@/lib/jobs";
export const dynamic = "force-dynamic"; export const maxDuration = 120;
export const GET = route(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const c = await ctx(req); const { id } = await params;
  const j: any = await advance(c, id);
  return json({ id: j.id, kind: j.kind, status: j.status, result: j.result, error: j.error, refunded: !!j.refunded });
});
