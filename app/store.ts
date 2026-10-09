"use client";

import { Post, User, Notification, Response } from "./types";

const POSTS_KEY = "vesper_posts";
const USERS_KEY = "vesper_users";
const SESSION_KEY = "vesper_session";
const NOTIFICATIONS_KEY = "vesper_notifications";

// ── Posts ──────────────────────────────────────────────
export function getPosts(): Post[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    return raw ? JSON.parse(raw) : getSeedData();
  } catch {
    return getSeedData();
  }
}

export function savePosts(posts: Post[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function addPost(post: Post): void {
  const posts = getPosts();
  posts.unshift(post);
  savePosts(posts);
}

export function fulfillPost(id: string): void {
  const posts = getPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx !== -1) { posts[idx].fulfilled = true; savePosts(posts); }
}

export function upvotePost(id: string, userId: string): boolean {
  const posts = getPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  if (!posts[idx].upvotedBy) posts[idx].upvotedBy = [];
  if (posts[idx].upvotedBy!.includes(userId)) return false;
  posts[idx].upvotedBy!.push(userId);
  posts[idx].upvotes += 1;
  savePosts(posts);
  return true;
}

export function addResponse(
  postId: string,
  response: Omit<Response, "id" | "postId" | "createdAt">
): void {
  const posts = getPosts();
  const idx = posts.findIndex((p) => p.id === postId);
  if (idx === -1) return;
  if (!posts[idx].responses) posts[idx].responses = [];
  posts[idx].responses!.push({
    id: `resp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    postId,
    ...response,
    createdAt: new Date().toISOString(),
  });
  savePosts(posts);
  // notify the post author
  addNotification({
    userId: posts[idx].authorId,
    postId,
    postTitle: posts[idx].title,
    responderName: response.name,
  });
}

// ── Auth ───────────────────────────────────────────────
export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(name: string, email: string, whatsapp?: string): User | null {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) return null;
  const user: User = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name,
    email: email.toLowerCase(),
    whatsapp,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return user;
}

export function loginUser(email: string): User | null {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setSession(user: User | null): void {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

// ── Notifications ──────────────────────────────────────
export function getNotifications(userId: string): Notification[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    const all: Notification[] = raw ? JSON.parse(raw) : [];
    return all.filter((n) => n.userId === userId).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch { return []; }
}

export function addNotification(n: Omit<Notification, "id" | "read" | "createdAt">): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    const all: Notification[] = raw ? JSON.parse(raw) : [];
    all.push({
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...n,
      read: false,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
  } catch {}
}

export function markNotificationsRead(userId: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    const all: Notification[] = raw ? JSON.parse(raw) : [];
    all.forEach((n) => { if (n.userId === userId) n.read = true; });
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
  } catch {}
}

// ── Seed data ──────────────────────────────────────────
function getSeedData(): Post[] {
  return [
    {
      id: "seed-1", type: "need", category: "food",
      title: "Need groceries for my family",
      description: "Single mom, 3 kids. Running low on basics — rice, oil, vegetables. Any help appreciated.",
      location: "Downtown, near Central Market",
      author: "Maria", authorId: "seed-user-1", whatsapp: "+2348012345678",
      chain: "none", createdAt: new Date(Date.now() - 3600000).toISOString(),
      fulfilled: false, upvotes: 4, upvotedBy: [], responses: [],
    },
    {
      id: "seed-2", type: "have", category: "food",
      title: "50 hot meals available tonight",
      description: "Our restaurant is closing for renovation. We have 50 portions of rice and stew ready. Come pick up or we can arrange drop-off nearby.",
      location: "Lagos Island",
      author: "Amaka's Kitchen", authorId: "seed-user-2", whatsapp: "+2348023456789",
      chain: "none", createdAt: new Date(Date.now() - 7200000).toISOString(),
      fulfilled: false, upvotes: 12, upvotedBy: [], responses: [],
    },
    {
      id: "seed-3", type: "need", category: "ride",
      title: "Need a ride to hospital",
      description: "My mother needs to get to the clinic tomorrow morning at 8am. We are in Surulere. Any kind soul with a car?",
      location: "Surulere",
      author: "Tunde", authorId: "seed-user-3", whatsapp: "+2348034567890",
      chain: "none", createdAt: new Date(Date.now() - 1800000).toISOString(),
      fulfilled: false, upvotes: 7, upvotedBy: [], responses: [],
    },
    {
      id: "seed-4", type: "have", category: "clothes",
      title: "Children's clothes — sizes 2 to 8",
      description: "My kids have outgrown these. Good condition. Bags of mixed clothing. Free to anyone who needs them.",
      location: "Ikeja",
      author: "Grace", authorId: "seed-user-4",
      chain: "none", createdAt: new Date(Date.now() - 5400000).toISOString(),
      fulfilled: false, upvotes: 3, upvotedBy: [], responses: [],
    },
    {
      id: "seed-5", type: "need", category: "medicine",
      title: "Looking for paracetamol and ORS",
      description: "My child has fever and we cannot afford medicine right now. Any pharmacy or kind person nearby?",
      location: "Mushin",
      author: "Fatima", authorId: "seed-user-5", whatsapp: "+2348045678901",
      chain: "none", createdAt: new Date(Date.now() - 900000).toISOString(),
      fulfilled: false, upvotes: 9, upvotedBy: [], responses: [],
    },
    {
      id: "seed-6", type: "have", category: "skills",
      title: "Free phone repair today",
      description: "I am a phone technician. I will fix cracked screens and charging ports for free today for anyone who cannot afford it.",
      location: "Oshodi",
      author: "Emmanuel", authorId: "seed-user-6", whatsapp: "+2348056789012",
      chain: "none", createdAt: new Date(Date.now() - 10800000).toISOString(),
      fulfilled: false, upvotes: 21, upvotedBy: [], responses: [],
    },
  ];
}
