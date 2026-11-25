import { ctx, route, json, requireWrite, HttpError } from "@/lib/ctx";
import { putFile } from "@/lib/storage";
export const maxDuration = 60;
const OK = /^(image\/(png|jpe?g|webp|gif|svg\+xml)|video\/(mp4|webm|quicktime)|audio\/(mpeg|mp3|wav|x-wav|webm|ogg|mp4|x-m4a|aac)|application\/(pdf|zip|json)|text\/(csv|plain|markdown))$/;
export const POST = route(async (req: Request) => {
  const c = await ctx(req); requireWrite(c);
  const fd = await req.formData(); const f = fd.get("file");
  if (!(f instanceof File)) throw new HttpError(400, "No file");
  if (f.size > 50 * 1024 * 1024) throw new HttpError(413, "Files can be up to 50 MB.");
  const type = f.type || "application/octet-stream";
  if (!OK.test(type)) throw new HttpError(415, "This file type is not supported.");
  const folder = String(fd.get("folder") || "uploads").replace(/[^a-z0-9_-]/gi, "").slice(0, 30) || "uploads";
  const r = await putFile(c, f, type, folder, f.name);
  return json({ id: r.path, url: r.url, sizeBytes: f.size, contentType: type });
});
