"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { loginUser, registerUser } from "../store";
import Link from "next/link";

export default function LoginPage() {
  const { login, continueAsGuest } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    if (mode === "login") {
      const user = loginUser(email);
      if (!user) {
        setError("No account found with that email. Sign up instead?");
        setLoading(false);
        return;
      }
      login(user);
      router.push("/feed");
    } else {
      if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
      const user = registerUser(name.trim(), email, whatsapp || undefined);
      if (!user) {
        setError("An account with this email already exists. Try logging in.");
        setLoading(false);
        return;
      }
      login(user);
      router.push("/feed");
    }
    setLoading(false);
  };

  const handleGuest = () => {
    continueAsGuest();
    router.push("/feed");
  };

  const inputClass = "w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "var(--bg)" }}>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-10">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          style={{ background: "var(--amber)" }}>
          <Heart size={20} className="text-white fill-white" />
        </div>
        <span className="text-2xl font-extrabold" style={{ color: "var(--text)" }}>vesper</span>
      </Link>

      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-xl border"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}>

        {/* Tabs */}
        <div className="grid grid-cols-2 border-b" style={{ borderColor: "var(--border)" }}>
          {(["signup", "login"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(""); }}
              className="py-4 text-sm font-bold transition relative"
              style={{ color: mode === m ? "var(--amber)" : "var(--text-light)" }}>
              {m === "signup" ? "Sign up" : "Log in"}
              {mode === m && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "var(--amber)" }} />
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-7 flex flex-col gap-4">
          <div className="text-center mb-1">
            <h1 className="text-xl font-extrabold" style={{ color: "var(--text)" }}>
              {mode === "login" ? "Welcome back 👋" : "Join Vesper 🌙"}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              {mode === "login"
                ? "Log in to post, respond, and connect."
                : "Create a free account to help or get help."}
            </p>
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: "var(--text-muted)" }}>
                Your name
              </label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="First name is fine"
                className={inputClass}
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--amber)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: "var(--text-muted)" }}>
              Email address
            </label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
              onFocus={(e) => e.target.style.borderColor = "var(--amber)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: "var(--text-muted)" }}>
                WhatsApp number <span className="font-normal opacity-60">(optional)</span>
              </label>
              <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+234 801 234 5678"
                className={inputClass}
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--amber)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
              <p className="text-xs mt-1.5" style={{ color: "var(--text-light)" }}>
                Lets people contact you directly on WhatsApp
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm font-medium"
              style={{ background: "var(--coral-light)", color: "var(--coral-dark)", border: "1px solid #FECDD3" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-white text-sm hover:opacity-90 hover:-translate-y-px disabled:opacity-60"
            style={{ background: "var(--amber)" }}>
            {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create free account"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Guest option */}
        <div className="px-7 pb-7">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--text-light)" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <button onClick={handleGuest}
            className="w-full py-3 rounded-xl border-2 border-dashed text-sm font-medium transition hover:-translate-y-px"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "var(--amber)"; (e.target as HTMLElement).style.color = "var(--amber)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "var(--border)"; (e.target as HTMLElement).style.color = "var(--text-muted)"; }}>
            Skip — browse without an account
          </button>
          <p className="text-center text-xs mt-3" style={{ color: "var(--text-light)" }}>
            Guests can browse posts but must log in to respond or contact someone.
          </p>
        </div>
      </div>
    </div>
  );
}
