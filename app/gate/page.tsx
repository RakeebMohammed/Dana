"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GatePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await fetch("/api/auth/request-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch { setError("Unable to send the code. Check your connection and try again."); }
    finally { setLoading(false); }
  }

  return <AuthShell eyebrow="PRIVATE EXPERIENCE" title={<>A more personal way<br />to shop online.</>} text="Enter your email and we’ll send a secure six-digit access code.">
    <form onSubmit={handleSubmit} className="auth-form"><label>Email address<input type="email" required autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} /></label>{error && <p className="auth-error">{error}</p>}<button disabled={loading} type="submit">{loading ? "Sending secure code..." : "Continue with email"}<span>→</span></button><p className="auth-note">No password needed. Your code expires in 10 minutes.</p></form>
  </AuthShell>;
}

export function AuthShell({ eyebrow, title, text, children }: { eyebrow: string; title: React.ReactNode; text: string; children: React.ReactNode }) {
  return <main className="auth-page"><div className="auth-orb orb-one" /><div className="auth-orb orb-two" /><section className="auth-brand"><a href="/" className="auth-logo">popin<span>.</span></a><div><p>{eyebrow}</p><h1>{title}</h1><span>{text}</span></div><small>Real conversations. Better conversions.</small></section><section className="auth-panel"><div className="auth-card"><div className="auth-mobile-logo">popin<span>.</span></div>{children}</div></section></main>;
}
