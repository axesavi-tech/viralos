import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "VIRALOS — Your entire creative department", description: "One brief. One brand intelligence engine. An entire creative department." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link href="https://fonts.googleapis.com/css2?family=Anton&family=Bodoni+Moda:opsz,wght@6..96,500..800&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" /></head><body>{children}</body></html>);
}
