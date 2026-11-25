import "server-only";
import type { Ctx } from "./ctx";

const BUCKET = "viralos";
const extOf = (type: string, name = "") => (name.match(/\.([a-z0-9]{2,5})$/i)?.[1] || type.split("/")[1] || "bin").toLowerCase().replace("mpeg", "mp3").replace("quicktime", "mov");

export async function putFile(c: Ctx, data: Blob | Uint8Array | ArrayBuffer, type: string, folder: string, name = "") {
  const path = `${c.ws}/${folder}/${crypto.randomUUID()}.${extOf(type, name)}`;
  const body = data instanceof Blob ? data : new Blob([data as any], { type });
  const r = await c.sb.storage.from(BUCKET).upload(path, body, { contentType: type, upsert: false });
  if (r.error) throw new Error("Storage: " + r.error.message);
  return { path, url: `/api/assets/file?p=${encodeURIComponent(path)}` };
}
export async function signedUrl(c: Ctx, path: string, seconds = 3600) {
  if (!path.startsWith(c.ws + "/")) throw new Error("forbidden");
  const r = await c.sb.storage.from(BUCKET).createSignedUrl(path, seconds);
  if (r.error || !r.data) throw new Error("Storage: " + (r.error?.message || "no url"));
  return r.data.signedUrl;
}
export async function getFile(c: Ctx, path: string) {
  if (!path.startsWith(c.ws + "/")) throw new Error("forbidden");
  const r = await c.sb.storage.from(BUCKET).download(path);
  if (r.error || !r.data) throw new Error("Not found");
  return r.data;
}
/** Copy a provider's (temporary) result URL into our storage so it lasts. */
export async function importUrl(c: Ctx, url: string, folder: string, fallbackType: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not fetch result (${res.status})`);
  const type = res.headers.get("content-type")?.split(";")[0] || fallbackType;
  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf.byteLength > 50 * 1024 * 1024) return { path: "", url };
  return putFile(c, buf, type, folder, url.split("?")[0]);
}
/** Turns an app URL (/api/assets/file?p=...) into a short-lived public URL a provider can download. */
export async function toPublicUrl(c: Ctx, appUrl: string, seconds = 3600) {
  const m = String(appUrl).match(/[?&]p=([^&]+)/);
  if (m) return signedUrl(c, decodeURIComponent(m[1]), seconds);
  if (/^https:\/\//.test(appUrl)) return appUrl;
  throw new Error("Unsupported media URL");
}
