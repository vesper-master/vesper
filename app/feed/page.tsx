"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { getPosts } from "../store";
import { Post, CATEGORIES, Category, PostType } from "../types";
import Link from "next/link";
import { Search, SlidersHorizontal, PlusCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [showFulfilled, setShowFulfilled] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const load = useCallback(() => { setPosts(getPosts()); }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = posts.filter((p) => {
    if (!showFulfilled && p.fulfilled) return false;
    if (filter !== "all" && p.type !== filter) return false;
    if (category !== "all" && p.category !== category) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const needCount = posts.filter((p) => !p.fulfilled && p.type === "need").length;
  const haveCount = posts.filter((p) => !p.fulfilled && p.type === "have").length;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />

      <div className="container" style={{ paddingTop: "6rem", paddingBottom: "5rem" }}>

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: "var(--text)" }}>
            Community Feed
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold px-2.5 py-1 rounded-full text-xs"
              style={{ background: "var(--coral-light)", color: "var(--coral)" }}>
              {needCount} need help
            </span>
            <span className="font-semibold px-2.5 py-1 rounded-full text-xs"
              style={{ background: "var(--emerald-light)", color: "var(--emerald-dark)" }}>
              {haveCount} can help
            </span>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-light)" }} />
          <input type="text" placeholder="Search posts, locations..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border text-sm focus:outline-none transition"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
            onFocus={(e) => e.target.style.borderColor = "var(--amber)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Filter toggle + chips */}
        <div className="mb-6">
          {/* Type chips */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {(["all", "need", "have"] as const).map((t) => {
              const active = filter === t;
              const bg = active ? (t === "need" ? "var(--coral)" : t === "have" ? "var(--emerald)" : "var(--text)") : "var(--surface)";
              const color = active ? "#fff" : "var(--text-muted)";
              return (
                <button key={t} onClick={() => setFilter(t)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border transition hover:-translate-y-px"
                  style={{ background: bg, color, borderColor: active ? "transparent" : "var(--border)" }}>
                  {t === "all" ? "All posts" : t === "need" ? "🙏 Needs" : "🤲 Offers"}
                </button>
              );
            })}

            <button onClick={() => setShowFilters(!showFilters)}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition"
              style={{ background: showFilters ? "var(--amber-light)" : "var(--surface)", color: showFilters ? "var(--amber)" : "var(--text-muted)", borderColor: showFilters ? "#FED7AA" : "var(--border)" }}>
              <SlidersHorizontal size={13} /> Filters
            </button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="rounded-2xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <p className="text-xs font-bold mb-3" style={{ color: "var(--text-muted)" }}>CATEGORY</p>
              <div className="flex gap-2 flex-wrap mb-3">
                <button onClick={() => setCategory("all")}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition"
                  style={{ background: category === "all" ? "var(--amber)" : "transparent", color: category === "all" ? "#fff" : "var(--text-muted)", borderColor: category === "all" ? "transparent" : "var(--border)" }}>
                  All
                </button>
                {CATEGORIES.map((c) => (
                  <button key={c.value} onClick={() => setCategory(c.value)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition"
                    style={{ background: category === c.value ? "var(--amber)" : "transparent", color: category === c.value ? "#fff" : "var(--text-muted)", borderColor: category === c.value ? "transparent" : "var(--border)" }}>
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showFulfilled} onChange={(e) => setShowFulfilled(e.target.checked)}
                  className="rounded" />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Show fulfilled posts</span>
              </label>
            </div>
          )}
        </div>

        {/* Posts */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>Nothing here yet</h3>
            <p className="text-sm mb-7" style={{ color: "var(--text-muted)" }}>
              Be the first to post a need or offer in your community.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => user ? router.push("/post?type=need") : router.push("/login")}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition"
                style={{ background: "var(--coral)" }}>
                Post a Need
              </button>
              <button onClick={() => user ? router.push("/post?type=have") : router.push("/login")}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition"
                style={{ background: "var(--emerald)" }}>
                Post an Offer
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={load} />
            ))}
          </div>
        )}
      </div>

      {/* FAB for mobile */}
      {user && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 md:hidden">
          <button onClick={() => router.push("/post?type=have")}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl text-xl hover:scale-110 transition"
            style={{ background: "var(--emerald)" }} title="I Can Help">
            🤲
          </button>
          <button onClick={() => router.push("/post?type=need")}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl text-xl hover:scale-110 transition"
            style={{ background: "var(--coral)" }} title="I Need Help">
            🙏
          </button>
        </div>
      )}
    </div>
  );
}
