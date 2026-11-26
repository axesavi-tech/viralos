import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://kathavi.com"),
  title: "Kathavi — Your entire creative department",
  description: "Brand DNA, campaigns, reels and posts for your brand. Planned, designed and checked by AI, ready to publish.",
  openGraph: { title: "Kathavi — Content that looks like you paid an agency", description: "Brand DNA, campaigns, reels and posts for your brand. Planned, designed and checked by AI.", url: "https://kathavi.com", siteName: "Kathavi", images: [{ url: "/media/og.jpg", width: 1200, height: 630, alt: "Kathavi: content that looks like you paid an agency, with sample reels" }], type: "website" },
  twitter: { card: "summary_large_image", images: ["/media/og.jpg"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" /></head><body>{children}</body></html>);
}
