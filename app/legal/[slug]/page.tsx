import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
const CONTACT = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "the support contact listed in your workspace settings";
const P: Record<string, [string, [string, string][]]> = {
  privacy: ["Privacy policy", [
    ["What we collect", "Your account email, the brand material you add (text, photos, videos, voice samples), the content VIRALOS generates for you, usage and credit records, and payment records from our payment providers. We do not receive or store your card or UPI details."],
    ["How we use it", "Only to run the service for your workspace: generating content, storing your work, billing, security and support. We do not sell personal data and do not use your content to train AI models."],
    ["AI providers", "To generate content we send the relevant material to processors acting for us: Anthropic (text and research), fal.ai (images, video, avatars) and ElevenLabs (voices). They process it to return results and under their own enterprise data terms."],
    ["Where it lives", "Data is stored with Supabase in the ap-south-1 (Mumbai) region and served through Vercel. Connected-platform tokens (Meta, Shopify) are encrypted with AES-256-GCM before storage."],
    ["Your rights", "You can export or delete your workspace data at any time from Settings, and close your account. Under India's DPDP Act and, where applicable, the GDPR, you may request access, correction or erasure by contacting " + CONTACT + "."],
    ["Retention", "Workspace data is kept while your account is active and deleted within 30 days of a deletion request, except records we must keep for tax and accounting."]]],
  terms: ["Terms of service", [
    ["The service", "VIRALOS is an AI-assisted creative and marketing studio. You are responsible for reviewing and approving anything before you publish it or spend money on it."],
    ["Your content", "You keep ownership of your brand material and of the content you create. You confirm you have the rights to everything you upload, including consent from any person whose face or voice you use."],
    ["AI output", "Generated content can contain mistakes. Performance figures, trend scores and the Viral Potential Index are estimates, not guarantees of results."],
    ["Credits and plans", "Credits are prepaid units of AI work. Plans add credits for 30 days and do not renew automatically. See the Refunds & credits policy."],
    ["Publishing and ads", "VIRALOS publishes only content you approve and creates ads only in a paused state. Activation and ad spend happen in your own ad account under your control."],
    ["Acceptable use", "You must follow the Acceptable use policy. We may suspend workspaces that break it."]]],
  data: ["Data & AI policy", [
    ["No training on your data", "We do not use your content to train models, and our providers process it only to return your results."],
    ["Consent for likeness", "Cloning a voice or animating a face requires a recorded consent statement from the person. We store who confirmed it and when."],
    ["Product fidelity", "AI images made from your product photos are instructed to keep the product unchanged, but always compare them with the original before approving."],
    ["Provenance", "Each AI job records the model used, the request and the result, so every asset can be traced and reproduced."]]],
  refunds: ["Refunds & credits", [
    ["Failed generations", "If a generation fails on our side or the provider's, its credits are returned to your balance automatically."],
    ["Unused credits", "Purchased credits do not expire while your account is active. Plan credits are added at the start of each 30-day period."],
    ["Refund requests", "You can request a refund of an unused credit pack within 7 days of purchase by contacting " + CONTACT + "."]]],
  "acceptable-use": ["Acceptable use", [
    ["Not allowed", "Impersonating real people or brands; cloning voices or faces without consent; deceptive endorsements or fake reviews; misleading claims, fake urgency or fabricated testimonials; content that is illegal, hateful, sexual involving minors, or harassing; spam."],
    ["Advertising", "Ads must follow Meta's and Google's advertising policies and local consumer law."]]],
  security: ["Security", [
    ["Isolation", "Every table is protected by row-level security so each workspace can reach only its own data. Credits can only be added by a verified payment or an administrator."],
    ["Encryption", "All traffic uses HTTPS. Platform tokens are encrypted at rest with AES-256-GCM; files are kept in private storage and shared only through short-lived signed links."],
    ["Payments", "Payment confirmations are verified with the gateway's signature and amount before credits are added, and every transaction is recorded in an auditable ledger."],
    ["Reporting", "Report a vulnerability to " + CONTACT + "."]]],
};
export function generateStaticParams() { return Object.keys(P).map((slug) => ({ slug })); }
export default async function Legal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = P[slug]; if (!p) notFound();
  return (<div className="wrap"><nav className="nav"><Link href="/" className="logo">VIRAL<i>OS</i></Link></nav><article className="legal"><h1>{p[0]}</h1><p className="muted small">Last updated {new Date().getFullYear()}</p>{p[1].map(([h, t]) => <section key={h}><h2>{h}</h2><p>{t}</p></section>)}</article><Footer /></div>);
}
