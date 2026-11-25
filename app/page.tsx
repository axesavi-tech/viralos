import Link from "next/link";
import { Footer } from "@/components/Footer";

const plans: [string, string, string, string?][] = [
  ["Free", "₹0", "150 starter credits. Every studio unlocked."],
  ["Creator", "₹999", "1,000 credits for 30 days."],
  ["Growth", "₹2,499", "2,800 credits for 30 days.", "Most chosen"],
  ["Professional", "₹5,999", "7,000 credits for 30 days."],
  ["Agency", "₹14,999", "18,000 credits for 30 days."],
];
const studios: [string, string, string][] = [
  ["Brand DNA", "Voice · colours · claims", "Reads your site and materials once, then keeps every asset on-voice, on-palette and honest."],
  ["Campaigns", "30 days · 3 directions", "Strategy, live market research and a full calendar, checked against each platform's rules."],
  ["Reels & posts", "144 templates · your logo", "Editorial templates that carry your brand, not ours. Your photos stay exactly as shot."],
  ["Voice & video", "Cloned voice · AI scenes", "Narrate in your own voice, with consent, and turn product stills into moving scenes."],
  ["Publish & ads", "Instagram · Meta", "Post approved work and build ads that stay paused until you switch them on."],
  ["Your store", "Shopify · WooCommerce · more", "Pull in your catalogue from any platform and send approved product copy back."],
];
const faqs: [string, string][] = [
  ["Do I need a designer?", "No. Bring product photos and a sentence about your brand. VIRALOS handles direction, copy, layout and export, and you approve every piece."],
  ["Will it use my logo and colours?", "Yes. Upload your logo once and it appears on every template, recoloured to fit each design. Without a logo, templates set your brand name in their own type."],
  ["Does AI change my product?", "Your photos are composited exactly as uploaded. AI imagery is optional and always shown side by side with the original before you approve it."],
  ["Which stores can I connect?", "Shopify, WooCommerce, BigCommerce and Wix sync both ways. Any other platform connects through a product feed, CSV or JSON link."],
  ["How do credits work?", "Credits measure AI work. You see the cost before anything runs, and failed generations are refunded automatically."],
];

export default function Home() {
  return (<>
    <div className="wrap">
      <nav className="nav" aria-label="Main"><Link href="/" className="logo">VIRAL<i>OS</i></Link>
        <div className="links"><a href="#studios">Studios</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><Link href="/login">Sign in</Link><Link href="/login?mode=signup" className="btn pri pill arrow">Start free</Link></div></nav>

      <header className="hero">
        <div className="stack" aria-hidden="true"><span /><span /><span>Reel</span></div>
        <p className="eyebrow">An AI creative department for brands that sell</p>
        <h1>Content that <em>looks</em><span className="l2">like you paid</span><span className="l3">an agency.</span></h1>
        <div className="side"><span />
          <div><p>One brief becomes a month of on-brand reels, posts, stories, ads and product copy. Planned, designed, checked and ready to publish.</p>
            <div className="ctas"><Link href="/login?mode=signup" className="btn pri arrow">Create your brand</Link><a href="#studios" className="btn">See what it does</a></div></div>
        </div>
      </header>
    </div>

    <section className="band" id="studios"><div className="wrap">
      <div className="intro"><div><p className="eyebrow">The studios</p><h2>Everything a brand <em>team</em> does.</h2></div><p>Each studio knows your Brand DNA, so the strategy, the reel and the product page all sound like the same company.</p></div>
      <div className="rows">{studios.map(([t, m, d]) => <div className="row" key={t}><h3>{t}</h3><span className="metric">{m}</span><p>{d}</p><span className="go" aria-hidden="true">→</span></div>)}</div>
    </div></section>

    <section className="band soft"><div className="wrap">
      <div className="center"><p className="eyebrow">Every format, one brief</p><h2>Made for the feed.</h2></div>
      <div className="formats" style={{ marginTop: 48 }}>{[["9:16", "Reels"], ["4:5", "Posts"], ["1:1", "Carousels"], ["9:16", "Stories"], ["16:9", "Long form"]].map(([r, n]) => <div className="fmt" key={n}><span className="eyebrow">{r}</span><b>{n}</b></div>)}</div>
    </div></section>

    <section className="band"><div className="wrap pov">
      <div><p className="eyebrow">How it works</p><h2 style={{ fontSize: "clamp(40px,4.6vw,68px)", marginTop: 14 }}>From brief to feed in <em>three</em> moves.</h2></div>
      <ol><li><strong>Teach it your brand</strong> once: your site, your products, your logo.</li><li><strong>Approve a month</strong> of content in an afternoon, with every piece pre-checked.</li><li><strong>Publish and sell</strong>: post, launch ads and update your store from one place.</li></ol>
    </div></section>

    <section className="band soft" id="pricing"><div className="wrap">
      <div className="intro"><div><p className="eyebrow">Pricing</p><h2>Pay for the work, not the seats.</h2></div><p>Credits measure AI work. Invite your whole team at no extra cost. Top-up packs from ₹499. Razorpay in India, Stripe everywhere else.</p></div>
      <div className="grid">{plans.map(([n, p, d, tag]) => <div className={"card price" + (tag ? " feature" : "")} key={n}>{tag ? <span className="tag">{tag}</span> : <span className="tag" style={{ color: "var(--mute)" }}>{n === "Free" ? "Start here" : "30 days"}</span>}<h3>{n}</h3><b>{p}</b><p className="muted small" style={{ margin: 0 }}>{d}</p></div>)}</div>
    </div></section>

    <section className="band" id="faq"><div className="wrap pov">
      <div><p className="eyebrow">Questions</p><h2 style={{ fontSize: "clamp(40px,4.6vw,68px)", marginTop: 14 }}>Before you start.</h2></div>
      <div className="faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    </div></section>

    <div className="wrap">
      <section className="cta-band"><h2>Brief it once. Publish all month.</h2><Link href="/login?mode=signup" className="btn arrow">Start free</Link></section>
      <Footer />
    </div>
  </>);
}
