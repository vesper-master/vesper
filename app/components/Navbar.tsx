"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isGuest, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    setOpen(false);
  };

  const goPost = (type: string) => {
    setOpen(false);
    if (!user) { router.push("/login"); return; }
    router.push(`/post?type=${type}`);
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, borderBottom: "1px solid var(--border)", background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)" }}>
      <div className="container-wide" style={{ height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "var(--amber)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
            <Heart size={15} style={{ fill: "#fff", color: "#fff" }} />
          </div>
          <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)" }}>vesper</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/feed"
            className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
            style={{ color: "var(--text-muted)" }}>
            Browse
          </Link>
          <Link href="/about"
            className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
            style={{ color: "var(--text-muted)" }}>
            About
          </Link>

          <div className="w-px h-5 mx-2" style={{ background: "var(--border)" }} />

          {user ? (
            <>
              <NotificationBell />
              <button onClick={() => goPost("need")}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition hover:-translate-y-px"
                style={{ background: "var(--coral)" }}>
                I Need Help
              </button>
              <button onClick={() => goPost("have")}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition hover:-translate-y-px"
                style={{ background: "var(--emerald)" }}>
                I Can Help
              </button>
              {/* User pill */}
              <div className="flex items-center gap-2 pl-2 ml-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: "var(--amber)" }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{user.name}</span>
                <button onClick={handleLogout} className="p-1 rounded-lg hover:bg-red-50 transition"
                  style={{ color: "var(--text-light)" }} title="Log out">
                  <LogOut size={15} />
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => goPost("need")}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition hover:-translate-y-px"
                style={{ background: "var(--coral)" }}>
                I Need Help
              </button>
              <button onClick={() => goPost("have")}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition hover:-translate-y-px"
                style={{ background: "var(--emerald)" }}>
                I Can Help
              </button>
              <Link href="/login"
                className="px-4 py-2 rounded-xl text-sm font-bold border hover:bg-gray-50 transition"
                style={{ color: "var(--amber)", borderColor: "#FED7AA" }}>
                Log in
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {user && <NotificationBell />}
          <button className="p-2 rounded-xl hover:bg-gray-100 transition" onClick={() => setOpen(!open)}>
            {open ? <X size={22} style={{ color: "var(--text)" }} /> : <Menu size={22} style={{ color: "var(--text)" }} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-2"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <Link href="/feed" className="py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-gray-50"
            style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>
            Browse posts
          </Link>
          <Link href="/about" className="py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-gray-50"
            style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>
            About
          </Link>
          <div className="h-px my-1" style={{ background: "var(--border)" }} />
          <button onClick={() => goPost("need")}
            className="py-3 rounded-xl text-center font-bold text-white text-sm"
            style={{ background: "var(--coral)" }}>
            🙏 I Need Help
          </button>
          <button onClick={() => goPost("have")}
            className="py-3 rounded-xl text-center font-bold text-white text-sm"
            style={{ background: "var(--emerald)" }}>
            🤲 I Can Help
          </button>
          {user ? (
            <button onClick={handleLogout}
              className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">
              <LogOut size={15} /> Log out ({user.name})
            </button>
          ) : (
            <Link href="/login" className="py-2.5 px-3 rounded-xl text-sm font-bold text-center border"
              style={{ color: "var(--amber)", borderColor: "#FED7AA" }} onClick={() => setOpen(false)}>
              Log in / Sign up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
