import Link from "next/link";
import Navbar from "./components/Navbar";
import { Heart, ArrowRight, Shield, Zap, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="page">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{ paddingTop: "8rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "5rem", left: "20%", width: "18rem", height: "18rem", borderRadius: "50%", background: "var(--amber)", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "2rem", right: "15%", width: "14rem", height: "14rem", borderRadius: "50%", background: "var(--emerald)", opacity: 0.07, filter: "blur(60px)", pointerEvents: "none" }} />

        <div className="container" style={{ textAlign: "center" }}>
          {/* Pill badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--amber-light)", border: "1px solid #FED7AA", borderRadius: "9999px", padding: "0.4rem 1rem", fontSize: "0.8rem", fontWeight: 600, color: "var(--amber-dark)", marginBottom: "2rem" }}>
            <Heart size={13} style={{ fill: "var(--amber)", color: "var(--amber)" }} />
            Community mutual aid · Stellar &amp; Ethereum
          </div>

          <h1 className="heading-xl" style={{ marginBottom: "1.5rem" }}>
            Someone nearby<br />
            <span style={{ color: "var(--amber)" }}>can help.</span>
          </h1>

          <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
            Post what you need or what you can give. Connect with real people in your community. Every act of help recorded on-chain.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
            <Link href="/login" className="btn btn-coral btn-lg">
              <span style={{ fontSize: "1.4rem" }}>🙏</span>
              I Need Help
              <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="btn btn-emerald btn-lg">
              <span style={{ fontSize: "1.4rem" }}>🤲</span>
              I Can Help
              <ArrowRight size={18} />
            </Link>
          </div>

          <Link href="/feed" style={{ fontSize: "0.875rem", color: "var(--text-light)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
            or browse as guest →
          </Link>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div className="grid-3">
            {[
              { value: "2B+", label: "informal workers globally", color: "var(--text)" },
              { value: "1 in 3", label: "people lack basic needs daily", color: "var(--amber)" },
              { value: "$0", label: "cost to post or get help", color: "var(--emerald)" },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: s.color, marginBottom: "0.25rem" }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 className="heading-lg" style={{ marginBottom: "0.5rem" }}>How Vesper works</h2>
            <p className="text-muted">Simple. Human. Trustless.</p>
          </div>
          <div className="grid-3">
            {[
              { step: "01", emoji: "📝", title: "Post in 30 seconds", desc: "Tell people what you need or what you can give. Food, clothes, a ride, skills — anything." },
              { step: "02", emoji: "🗺️", title: "Nearby people see it", desc: "Your post appears on the live community feed. Neighbors and volunteers respond instantly." },
              { step: "03", emoji: "🔗", title: "Help is recorded on-chain", desc: "When help happens, it's logged permanently on Stellar or Ethereum. Real impact, no faking it." },
            ].map((item) => (
              <div key={item.step} className="card" style={{ padding: "1.75rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.emoji}</div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-light)", marginBottom: "0.5rem" }}>STEP {item.step}</div>
                <h3 className="heading-md" style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ─────────────────────────────────── */}
      <section className="section-sm" style={{ background: "var(--amber-light)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="heading-lg" style={{ marginBottom: "2rem" }}>What people share on Vesper</h2>
          <div className="flex-wrap" style={{ justifyContent: "center" }}>
            {[
              { emoji: "🍚", label: "Food" }, { emoji: "👕", label: "Clothes" },
              { emoji: "💊", label: "Medicine" }, { emoji: "🚗", label: "Rides" },
              { emoji: "👶", label: "Childcare" }, { emoji: "🛒", label: "Errands" },
              { emoji: "🔧", label: "Skills" }, { emoji: "🤝", label: "Support" },
            ].map((c) => (
              <div key={c.label} className="card" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--text)" }}>
                <span style={{ fontSize: "1.25rem" }}>{c.emoji}</span> {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why on-chain ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 className="heading-lg" style={{ marginBottom: "0.5rem" }}>Why on-chain?</h2>
            <p className="text-muted">Because help deserves to be real, not just promised.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: <Shield size={20} />, color: "var(--teal)", bg: "var(--teal-light)", title: "Tamper-proof records", desc: "Every fulfilled request is permanently on Stellar or Ethereum. No one can delete or fake impact." },
              { icon: <Zap size={20} />, color: "#D97706", bg: "#FFFBEB", title: "Instant, near-free", desc: "Stellar settles in 3–5 seconds at fractions of a cent. NGOs can fund communities directly." },
              { icon: <Globe size={20} />, color: "var(--emerald)", bg: "var(--emerald-light)", title: "No single owner", desc: "No company controls this data. The community owns their history forever." },
            ].map((item) => (
              <div key={item.title} className="card" style={{ padding: "1.75rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: item.bg, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  {item.icon}
                </div>
                <h3 className="heading-md" style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────── */}
      <section style={{ padding: "1rem" }}>
        <div style={{ background: "linear-gradient(135deg,#1A1A1A 0%,#2D1F0F 100%)", borderRadius: "1.5rem", padding: "5rem 2rem", textAlign: "center", color: "#fff", maxWidth: "100%" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🌍</div>
          <h2 style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Someone near you needs help right now.
          </h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.6, marginBottom: "2.5rem" }}>
            Takes 30 seconds to post. Could change someone's day.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link href="/login" className="btn btn-coral btn-lg">🙏 I Need Help</Link>
            <Link href="/login" className="btn btn-emerald btn-lg">🤲 I Can Help</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer style={{ padding: "2.5rem 1rem", textAlign: "center", borderTop: "1px solid var(--border)", marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "50%", background: "var(--amber)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={12} style={{ fill: "#fff", color: "#fff" }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>vesper</span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
          Built on Stellar &amp; Ethereum · Open source · Public good
        </p>
      </footer>
    </div>
  );
}
