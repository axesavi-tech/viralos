import { ctx, route, json, requireManage, HttpError } from "@/lib/ctx";
const ROLES = ["admin", "brand_manager", "creative_editor", "marketing_manager", "approver", "analyst", "viewer", "owner"];
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireManage(c);
  const b = await req.json();
  if (b.action === "invite") {
    const email = String(b.email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new HttpError(400, "Enter a valid email address.");
    if (!ROLES.includes(b.role) || b.role === "owner") throw new HttpError(400, "Pick a role.");
    const r = await c.sb.from("vx_invites").insert({ workspace_id: c.ws, email, role: b.role, invited_by: c.user.id }).select("id").single();
    if (r.error) throw new Error(r.error.message);
    await c.sb.from("vx_audit").insert({ workspace_id: c.ws, user_id: c.user.id, action: "invite", meta: { email, role: b.role } });
    return json({ ok: true, note: "They join this workspace automatically the first time they sign in with this email." });
  }
  if (b.action === "role") { if (!ROLES.includes(b.role)) throw new HttpError(400, "Unknown role."); const r = await c.sb.rpc("vx_set_role", { ws: c.ws, uid: b.userId, new_role: b.role }); if (r.error) throw new Error(r.error.message); return json({ ok: true }); }
  if (b.action === "remove") { const r = await c.sb.rpc("vx_remove_member", { ws: c.ws, uid: b.userId }); if (r.error) throw new Error(r.error.message); return json({ ok: true }); }
  if (b.action === "revoke") { await c.sb.from("vx_invites").delete().eq("id", b.id).eq("workspace_id", c.ws); return json({ ok: true }); }
  if (b.action === "rename") { const r = await c.sb.rpc("vx_rename_workspace", { ws: c.ws, new_name: String(b.name || "").slice(0, 80) }); if (r.error) throw new Error(r.error.message); return json({ ok: true }); }
  throw new HttpError(400, "Unknown action");
});
