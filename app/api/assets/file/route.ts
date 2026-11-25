import { ctx, route, HttpError } from "@/lib/ctx";
import { getFile } from "@/lib/storage";
export const dynamic = "force-dynamic";
export const GET = route(async (req: Request) => {
  const p = new URL(req.url).searchParams.get("p") || "";
  const c = await ctx(new Request(req.url, { headers: { "x-workspace": p.split("/")[0] } }));
  if (!p) throw new HttpError(400, "Missing path");
  const blob = await getFile(c, p);
  return new Response(blob, { headers: { "Content-Type": blob.type || "application/octet-stream", "Cache-Control": "private, max-age=86400", "Content-Disposition": "inline" } });
});
