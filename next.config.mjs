/** @type {import('next').NextConfig} */
const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];
export default {
  async headers() { return [{ source: "/:path*", headers: security }]; },
  async redirects() { return [{ source: "/app", destination: "/studio/index.html", permanent: false }]; },
};
