"use client";

import { Post, CATEGORIES } from "../types";
import { MapPin, Clock, ThumbsUp, CheckCircle, ExternalLink, MessageCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { upvotePost, fulfillPost, addResponse } from "../store";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  post: Post;
  onUpdate?: () => void;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function PostCard({ post, onUpdate }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  const [upvoted, setUpvoted] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const [responseSent, setResponseSent] = useState(false);
  const [respName, setRespName] = useState(user?.name ?? "");
  const [respMessage, setRespMessage] = useState("");
  const [respContact, setRespContact] = useState(user?.whatsapp ?? "");
  const [submitting, setSubmitting] = useState(false);

  const cat = CATEGORIES.find((c) => c.value === post.category);
  const isNeed = post.type === "need";
  const responseCount = post.responses?.length ?? 0;
  const isOwner = user?.id === post.authorId;

  const accentColor = isNeed ? "var(--coral)" : "var(--emerald)";
  const accentLight = isNeed ? "var(--coral-light)" : "var(--emerald-light)";
  const accentBorder = isNeed ? "#FECDD3" : "#A7F3D0";

  const handleUpvote = () => {
    if (!user) { router.push("/login"); return; }
    if (upvoted) return;
    const ok = upvotePost(post.id, user.id);
    if (ok) { setUpvoted(true); onUpdate?.(); }
  };

  const handleFulfill = () => { fulfillPost(post.id); onUpdate?.(); };

  const handleResponseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push("/login"); return; }
    if (!respName.trim() || !respMessage.trim() || !respContact.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    addResponse(post.id, { userId: user.id, name: respName.trim(), message: respMessage.trim(), contact: respContact.trim() });
    setSubmitting(false);
    setResponseSent(true);
    setShowResponseForm(false);
    onUpdate?.();
  };

  const whatsappLink = post.whatsapp
    ? `https://wa.me/${post.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${post.author}, I saw your post on Vesper: "${post.title}"`)}`
    : null;

  return (
    <div className="rounded-2xl overflow-hidden border transition hover:shadow-md"
      style={{
        background: "var(--surface)",
        borderColor: post.fulfilled ? "var(--border)" : accentBorder,
        opacity: post.fulfilled ? 0.65 : 1,
      }}>

      {/* Accent top bar */}
      {!post.fulfilled && (
        <div className="h-1 w-full" style={{ background: accentColor }} />
      )}

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: accentLight, color: accentColor }}>
              {isNeed ? "NEEDS HELP" : "CAN HELP"}
            </span>
            <span className="text-base">{cat?.emoji}</span>
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{cat?.label}</span>
          </div>
          {post.fulfilled && (
            <span className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: "var(--emerald)" }}>
              <CheckCircle size={13} /> Fulfilled
            </span>
          )}
        </div>

        {/* Title & desc */}
        <h3 className="font-bold text-base mb-1.5" style={{ color: "var(--text)" }}>{post.title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{post.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs mb-4 flex-wrap" style={{ color: "var(--text-light)" }}>
          <span className="flex items-center gap-1"><MapPin size={11} /> {post.location}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {timeAgo(post.createdAt)}</span>
          <span className="font-semibold" style={{ color: "var(--text-muted)" }}>by {post.author}</span>
        </div>

        {/* On-chain badge */}
        {post.chain && post.chain !== "none" && post.txHash && (
          <div className="mb-4 flex items-center gap-2 text-xs rounded-xl px-3 py-2"
            style={{ background: "var(--teal-light)", color: "var(--teal)" }}>
            <span>🔗 On-chain ({post.chain})</span>
            <a href={post.chain === "stellar"
              ? `https://stellar.expert/explorer/testnet/tx/${post.txHash}`
              : `https://sepolia.etherscan.io/tx/${post.txHash}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 underline">
              View <ExternalLink size={10} />
            </a>
          </div>
        )}

        {/* Response sent */}
        {responseSent && (
          <div className="mb-4 rounded-xl px-4 py-3 text-sm font-medium"
            style={{ background: "var(--emerald-light)", color: "var(--emerald-dark)", border: "1px solid #A7F3D0" }}>
            ✓ Response sent! {post.author} will see your contact info.
          </div>
        )}

        {/* Actions */}
        {!post.fulfilled && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Upvote */}
            <button onClick={handleUpvote}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl font-semibold border transition"
              style={{
                background: upvoted ? "var(--amber-light)" : "transparent",
                color: upvoted ? "var(--amber)" : "var(--text-muted)",
                borderColor: upvoted ? "#FED7AA" : "var(--border)",
              }}>
              <ThumbsUp size={13} /> {post.upvotes}
            </button>

            {/* Responses count */}
            {responseCount > 0 && (
              <button onClick={() => setShowResponses(!showResponses)}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl font-semibold border transition"
                style={{ background: "transparent", color: "var(--text-muted)", borderColor: "var(--border)" }}>
                <MessageCircle size={13} />
                {responseCount} {responseCount === 1 ? "response" : "responses"}
                {showResponses ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>
            )}

            {/* WhatsApp */}
            {whatsappLink && !isOwner && user && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl font-semibold text-white transition hover:opacity-90"
                style={{ background: "#25D366" }}>
                💬 WhatsApp
              </a>
            )}

            {/* Main CTA */}
            {!responseSent && !isOwner && (
              <button
                onClick={() => { if (!user) { router.push("/login"); return; } setShowResponseForm(!showResponseForm); }}
                className="flex-1 min-w-[120px] text-sm px-4 py-2 rounded-xl font-bold text-white transition hover:opacity-90 hover:-translate-y-px"
                style={{ background: showResponseForm ? "var(--text-muted)" : accentColor }}>
                {showResponseForm ? "Cancel" : isNeed ? "I can help →" : "I need this →"}
              </button>
            )}
          </div>
        )}

        {/* Mark fulfilled — owner only */}
        {!post.fulfilled && isOwner && responseCount > 0 && (
          <button onClick={handleFulfill}
            className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl border transition hover:opacity-80"
            style={{ color: "var(--emerald)", borderColor: "#A7F3D0", background: "var(--emerald-light)" }}>
            <CheckCircle size={13} /> Mark as fulfilled
          </button>
        )}

        {/* Guest nudge */}
        {!user && (
          <button onClick={() => router.push("/login")}
            className="mt-3 w-full text-xs font-medium py-2.5 rounded-xl border-2 border-dashed transition hover:opacity-80"
            style={{ color: "var(--amber)", borderColor: "#FED7AA", background: "var(--amber-light)" }}>
            Log in to respond, contact, or upvote →
          </button>
        )}
      </div>

      {/* Response form */}
      {showResponseForm && user && (
        <div className="border-t p-5" style={{ background: isNeed ? "var(--emerald-light)" : "#EFF6FF", borderColor: accentBorder }}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm" style={{ color: "var(--text)" }}>
              {isNeed ? "👋 Offer your help" : "🙋 Request this"}
            </h4>
            <button onClick={() => setShowResponseForm(false)}
              className="p-1 rounded-lg hover:bg-gray-100 transition"
              style={{ color: "var(--text-light)" }}>
              <X size={15} />
            </button>
          </div>
          <form onSubmit={handleResponseSubmit} className="flex flex-col gap-3">
            {["name", "message", "contact"].map((field) => field === "message" ? (
              <textarea key={field} required rows={2}
                placeholder={isNeed ? "Tell them how you can help..." : "Tell them why you need this..."}
                value={respMessage} onChange={(e) => setRespMessage(e.target.value)}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none resize-none"
                style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--emerald)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            ) : (
              <input key={field} type="text" required
                placeholder={field === "name" ? "Your name" : "WhatsApp number, phone, or email"}
                value={field === "name" ? respName : respContact}
                onChange={(e) => field === "name" ? setRespName(e.target.value) : setRespContact(e.target.value)}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
                onFocus={(e) => e.target.style.borderColor = "var(--emerald)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            ))}
            <p className="text-xs" style={{ color: "var(--text-light)" }}>
              Your contact will be visible to {post.author}.
            </p>
            <button type="submit" disabled={submitting}
              className="font-bold py-2.5 rounded-xl text-sm text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: "var(--emerald)" }}>
              {submitting ? "Sending..." : "Send response →"}
            </button>
          </form>
        </div>
      )}

      {/* Responses list */}
      {showResponses && responseCount > 0 && (
        <div className="border-t p-5" style={{ background: "#F8FAFF", borderColor: "var(--border)" }}>
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: "var(--text)" }}>
            <MessageCircle size={14} style={{ color: "var(--text-muted)" }} />
            {responseCount} {responseCount === 1 ? "response" : "responses"}
          </h4>
          <div className="flex flex-col gap-3">
            {post.responses!.map((resp) => (
              <div key={resp.id} className="rounded-xl p-4 border"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm" style={{ color: "var(--text)" }}>{resp.name}</span>
                  <span className="text-xs" style={{ color: "var(--text-light)" }}>{timeAgo(resp.createdAt)}</span>
                </div>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{resp.message}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs flex-1"
                    style={{ background: "var(--bg)", color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--text-light)" }}>Contact:</span>
                    <span className="font-semibold" style={{ color: "var(--teal)" }}>{resp.contact}</span>
                  </div>
                  {(resp.contact.startsWith("+") || /^\d/.test(resp.contact)) && (
                    <a href={`https://wa.me/${resp.contact.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${resp.name}, I saw your response on Vesper`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold text-white transition hover:opacity-90"
                      style={{ background: "#25D366" }}>
                      💬 WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
