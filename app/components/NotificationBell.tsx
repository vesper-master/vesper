"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationBell() {
  const { notifications, unreadCount, readAllNotifications, refreshNotifications } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    if (!open) { refreshNotifications(); if (unreadCount > 0) readAllNotifications(); }
  };

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button onClick={handleOpen} aria-label="Notifications"
        style={{ position: "relative", padding: "0.5rem", borderRadius: "0.75rem", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Bell size={20} style={{ color: "var(--text-muted)" }} />
        {unreadCount > 0 && (
          <span style={{
            position: "absolute", top: "0.25rem", right: "0.25rem",
            width: "1rem", height: "1rem", background: "var(--coral)", color: "#fff",
            fontSize: "0.6rem", fontWeight: 700, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="card" style={{
          position: "absolute", right: 0, top: "3rem",
          width: "20rem", zIndex: 100, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}>
          {/* Header */}
          <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text)" }}>Notifications</span>
            {notifications.length > 0 && (
              <button onClick={readAllNotifications}
                style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--amber)", background: "none", border: "none", cursor: "pointer" }}>
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: "20rem", overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <div style={{ padding: "2.5rem 1rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔔</div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>No notifications yet</p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-light)", marginTop: "0.25rem" }}>
                  You'll be notified when someone responds to your post
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <button key={n.id}
                  onClick={() => { router.push("/feed"); setOpen(false); }}
                  style={{
                    width: "100%", textAlign: "left", padding: "0.875rem 1rem",
                    borderBottom: "1px solid var(--border)", background: n.read ? "transparent" : "var(--amber-light)",
                    border: "none", cursor: "pointer", display: "block",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = n.read ? "transparent" : "var(--amber-light)")}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: n.read ? "var(--border)" : "var(--amber)", flexShrink: 0, marginTop: "0.375rem" }} />
                    <div>
                      <p style={{ fontSize: "0.8rem", color: "var(--text)", lineHeight: 1.5 }}>
                        <strong>{n.responderName}</strong> responded to{" "}
                        <strong>&ldquo;{n.postTitle}&rdquo;</strong>
                      </p>
                      <p style={{ fontSize: "0.7rem", color: "var(--text-light)", marginTop: "0.2rem" }}>
                        {timeAgo(n.createdAt)}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
