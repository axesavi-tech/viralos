import "server-only";
import { createCipheriv, createDecipheriv, createHmac, randomBytes, timingSafeEqual } from "crypto";

const key = () => {
  const k = process.env.VX_ENCRYPTION_KEY || "";
  if (!/^[0-9a-f]{64}$/i.test(k)) throw new Error("VX_ENCRYPTION_KEY must be 64 hex characters.");
  return Buffer.from(k, "hex");
};
export function seal(plain: string) {
  const iv = randomBytes(12), c = createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  return `v1.${iv.toString("base64")}.${c.getAuthTag().toString("base64")}.${enc.toString("base64")}`;
}
export function open(sealed: string) {
  const [v, iv, tag, data] = sealed.split(".");
  if (v !== "v1") throw new Error("Unknown token format");
  const d = createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64"));
  d.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([d.update(Buffer.from(data, "base64")), d.final()]).toString("utf8");
}
export const hmac = (secret: string, data: string, enc: "hex" | "base64url" = "hex") => createHmac("sha256", secret).update(data).digest(enc);
export function safeEqual(a: string, b: string) { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); }
/** Signed, expiring state for OAuth round trips. */
export function signState(obj: Record<string, unknown>) {
  const body = Buffer.from(JSON.stringify({ ...obj, exp: Date.now() + 15 * 60_000 })).toString("base64url");
  return `${body}.${hmac(process.env.VX_SERVER_SECRET || "", body, "base64url")}`;
}
export function readState(s: string) {
  const [body, sig] = String(s || "").split(".");
  if (!body || !sig || !safeEqual(sig, hmac(process.env.VX_SERVER_SECRET || "", body, "base64url"))) throw new Error("Invalid state");
  const o = JSON.parse(Buffer.from(body, "base64url").toString());
  if (o.exp < Date.now()) throw new Error("This link expired. Start again.");
  return o;
}
