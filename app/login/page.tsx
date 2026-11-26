"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/client";
function Form() {
  const q = useSearchParams(); const [mode, setMode] = useState(q.get("mode") === "signup" ? "signup" : "signin");
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [ok, setOk] = useState(""); const [busy, setBusy] = useState(false); const [show, setShow] = useState(false);
  const next = q.get("next") || "/studio/index.html";
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setOk(""); setBusy(true); const sb = supabaseBrowser();
    try {
      if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password: pw, options: { emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}` } });
        if (error) throw error; if (!data.session) { setOk("Check your inbox to confirm your email, then sign in."); return; }
      } else if (mode === "magic") {
        const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}` } }); if (error) throw error; setOk("We emailed you a sign-in link."); return;
      } else { const { error } = await sb.auth.signInWithPassword({ email, password: pw }); if (error) throw error; }
      location.href = next;
    } catch (e: any) { setErr(e.message || "Something went wrong."); } finally { setBusy(false); }
  }
  return (<div className="auth"><Link href="/" className="logo">Katha<i>vi</i></Link>
    <h1>{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
    <p className="muted small">{mode === "signup" ? "150 free credits to start. No card needed." : "Sign in to your creative department."}</p>
    <form onSubmit={submit}><label htmlFor="em">Email</label><input id="em" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      {mode !== "magic" && <><label htmlFor="pw">Password</label><div className="pw"><input id="pw" type={show ? "text" : "password"} required minLength={8} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} aria-describedby={mode === "signup" ? "pw-rule" : undefined} /><button type="button" className="pw-toggle" onClick={() => setShow(!show)} aria-pressed={show} aria-controls="pw">{show ? "Hide" : "Show"}</button></div>{mode === "signup" && <p id="pw-rule" className="small muted" style={{ margin: "6px 0 0" }}>At least 8 characters.</p>}</>}
      <div className="err" role="alert">{err}</div><div className="ok" role="status">{ok}</div>
      <button className="btn pri arrow" style={{ width: "100%" }} disabled={busy}>{busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "magic" ? "Email me a link" : "Sign in"}</button></form>
    <p className="small" style={{ marginTop: 16 }}>{mode === "signup" ? <>Have an account? <a href="#" onClick={() => setMode("signin")}>Sign in</a></> : <>New here? <a href="#" onClick={() => setMode("signup")}>Create an account</a> · <a href="#" onClick={() => setMode("magic")}>Email me a link</a></>}</p>
    <p className="muted small">By continuing you agree to the <Link href="/legal/terms">Terms</Link> and <Link href="/legal/privacy">Privacy policy</Link>.</p></div>);
}
export default function Login() { return <Suspense><Form /></Suspense>; }
