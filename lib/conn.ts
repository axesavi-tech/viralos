import "server-only";
import type { Ctx } from "./ctx";
import { open } from "./crypto";
import { HttpError } from "./ctx";
export async function getConn<T = any>(c: Ctx, provider: string): Promise<{ data: T; meta: any; label: string }> {
  const r = (await c.sb.from("vx_connections").select("secret,meta,label").eq("workspace_id", c.ws).eq("provider", provider).maybeSingle()).data;
  if (!r?.secret) throw new HttpError(412, provider === "meta" ? "Connect Instagram first (Automations → Connections)." : "Connect your store first (Product Catalogue → Store connection).");
  return { data: JSON.parse(open(r.secret)), meta: r.meta, label: r.label };
}
