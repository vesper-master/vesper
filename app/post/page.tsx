"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import WalletConnect from "../components/WalletConnect";
import { CATEGORIES, Category, Post, PostType } from "../types";
import { addPost } from "../store";
import { useAuth } from "../context/AuthContext";
import { CheckCircle } from "lucide-react";

function PostForm() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const typeParam = params.get("type") as PostType | null;

  useEffect(() => { if (!user) router.replace("/login"); }, [user, router]);

  const [type, setType] = useState<PostType>(typeParam === "have" ? "have" : "need");
  const [category, setCategory] = useState<Category>("food");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [wallet, setWallet] = useState<{ address: string; chain: "stellar" | "ethereum" } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => { if (typeParam === "have" || typeParam === "need") setType(typeParam); }, [typeParam]);

  const simulateOnChain = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    return "0x" + Math.random().toString(16).slice(2, 42);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) return;
    setSubmitting(true);
    let hash: string | undefined;
    let chain: "stellar" | "ethereum" | "none" = "none";
    if (wallet) { hash = await simulateOnChain(); setTxHash(hash); chain = wallet.chain; }
    const post: Post = {
      id: `post-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type, category,
      title: title.trim(), description: description.trim(), location: location.trim(),
      author: user?.name ?? "Anonymous",
      authorId: user?.id ?? "guest",
      whatsapp: user?.whatsapp,
      walletAddress: wallet?.address, chain, txHash: hash,
      createdAt: new Date().toISOString(),
      fulfilled: false, upvotes: 0, upvotedBy: [], responses: [],
    };
    addPost(post);
    setSubmitting(false);
    setDone(true);
  };

  const isNeed = type === "need";
  const accent = isNeed ? "var(--coral)" : "var(--emerald)";
  const accentLight = isNeed ? "var(--coral-light)" : "var(--emerald-light)";

  if (done) {
    return (
      <div className="page flex-center" style={{ minHeight: "100vh" }}>
        <div className="card" style={{ padding: "3rem 2.5rem", maxWidth: "420px", width: "100%", margin: "1rem", textAlign: "center" }}>
          <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "var(--emerald-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <CheckCircle size={30} style={{ color: "var(--emerald)" }} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>Posted!</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Your {type === "need" ? "request" : "offer"} is now live on the community feed.
          </p>
          {txHash && (
            <div style={{ background: "var(--teal-light)", border: "1px solid #99F6E4", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.5rem", textAlign: "left" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--teal)", marginBottom: "0.25rem" }}>🔗 RECORDED ON-CHAIN</p>
              <p style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "var(--teal)", wordBreak: "break-all" }}>{txHash}</p>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button onClick={() => router.push("/feed")} className="btn" style={{ background: "var(--text)", color: "#fff", width: "100%", padding: "0.875rem" }}>
              View community feed
            </button>
            <button onClick={() => { setDone(false); setTitle(""); setDescription(""); setLocation(""); setTxHash(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", color: "var(--text-muted)", textDecoration: "underline" }}>
              Post another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "6rem 1rem 4rem" }}>
        <div className="card" style={{ overflow: "hidden" }}>

          {/* Type toggle */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <button onClick={() => setType("need")} style={{ padding: "1.25rem", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer", background: type === "need" ? "var(--coral)" : "var(--bg)", color: type === "need" ? "#fff" : "var(--text-muted)", transition: "all 0.15s" }}>
              🙏 I Need Help
            </button>
            <button onClick={() => setType("have")} style={{ padding: "1.25rem", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer", background: type === "have" ? "var(--emerald)" : "var(--bg)", color: type === "have" ? "#fff" : "var(--text-muted)", transition: "all 0.15s" }}>
              🤲 I Can Help
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Category */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.625rem" }}>CATEGORY</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                {CATEGORIES.map((c) => (
                  <button key={c.value} type="button" onClick={() => setCategory(c.value)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", padding: "0.75rem 0.5rem",
                      borderRadius: "0.75rem", border: `1.5px solid ${category === c.value ? accent : "var(--border)"}`,
                      background: category === c.value ? accentLight : "transparent",
                      color: category === c.value ? accent : "var(--text-muted)",
                      fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                    }}>
                    <span style={{ fontSize: "1.4rem", marginBottom: "0.25rem" }}>{c.emoji}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                {isNeed ? "WHAT DO YOU NEED?" : "WHAT ARE YOU OFFERING?"}
              </label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder={isNeed ? "e.g. Need food for my family tonight" : "e.g. Free hot meals available now"}
                className="input" />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.5rem" }}>MORE DETAILS</label>
              <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Give more context. The more specific, the more people can help."
                className="input" style={{ resize: "none" }} />
            </div>

            {/* Location */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "0.5rem" }}>YOUR AREA / NEIGHBORHOOD</label>
              <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Surulere, Lagos or Brooklyn, NY"
                className="input" />
            </div>

            {/* Chain */}
            <div style={{ background: "var(--bg)", borderRadius: "0.875rem", padding: "1rem", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: wallet ? "0.75rem" : 0 }}>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)" }}>Record on-chain</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>Optional — adds to Stellar or Ethereum permanently</p>
                </div>
                <WalletConnect onConnect={(addr, chain) => setWallet({ address: addr, chain })} connected={wallet} />
              </div>
              {wallet && (
                <p style={{ fontSize: "0.75rem", color: "var(--emerald)", fontWeight: 600 }}>
                  ✓ Will be recorded on {wallet.chain}
                </p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={submitting} className="btn"
              style={{ background: accent, color: "#fff", width: "100%", padding: "1rem", fontSize: "1rem", opacity: submitting ? 0.6 : 1 }}>
              {submitting ? (wallet ? "Recording on-chain..." : "Posting...") : isNeed ? "Post my request" : "Post my offer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={
      <div className="page flex-center" style={{ minHeight: "100vh" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    }>
      <PostForm />
    </Suspense>
  );
}
