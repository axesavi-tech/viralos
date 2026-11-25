import Link from "next/link";
import { Footer } from "@/components/Footer";
const plans = [["Free", "₹0", "150 starter credits, every studio"], ["Creator", "₹999", "1,000 credits / 30 days"], ["Growth", "₹2,499", "2,800 credits / 30 days"], ["Professional", "₹5,999", "7,000 credits / 30 days"], ["Agency", "₹14,999", "18,000 credits / 30 days"]];
const features = [["Brand DNA", "Reads your website and materials, then keeps your voice, colours and claims consistent everywhere."], ["30-day campaigns", "Strategy, live market research, three creative directions and a full calendar, checked against platform rules."], ["Reels & images", "144 premium templates, AI product imagery that keeps your product true, AI video scenes and talking avatars."], ["Your voice", "Clone your own voice with consent and voice every reel in it."], ["Publish & advertise", "Post to Instagram and build Meta ads that stay paused until you switch them on."], ["Commerce", "Sync your Shopify catalogue and push approved product copy back."]];
export default function Home() {
  return (<div className="wrap">
    <nav className="nav"><Link href="/" className="logo">VIRAL<i>OS</i></Link><div className="links" style={{ display: "flex", gap: 10 }}><a href="#pricing" className="btn">Pricing</a><Link href="/login" className="btn">Sign in</Link><Link href="/login?mode=signup" className="btn pri">Start free</Link></div></nav>
    <section className="hero"><h1>Your entire creative department.</h1><p>One brief. One brand intelligence engine. Strategy, calendars, reels, product imagery, ads and publishing, all in your brand&apos;s voice.</p><Link href="/login?mode=signup" className="btn pri">Create your brand</Link></section>
    <section className="grid">{features.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p className="muted small">{d}</p></div>)}</section>
    <h2 id="pricing" style={{ fontSize: 40, margin: "56px 0 18px" }}>Simple, credit-based pricing</h2>
    <section className="grid">{plans.map(([n, p, d]) => <div className="card price" key={n}><h3>{n}</h3><b>{p}</b><span className="muted small"> {n === "Free" ? "" : "/ 30 days"}</span><p className="muted small">{d}</p></div>)}</section>
    <p className="muted small" style={{ marginTop: 14 }}>Top-up packs from ₹499. Credits measure AI work; you always see the cost before anything is generated. Payments by Razorpay (India) or Stripe.</p>
    <Footer /></div>);
}
