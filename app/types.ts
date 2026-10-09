export type PostType = "need" | "have";

export type Category =
  | "food"
  | "clothes"
  | "medicine"
  | "ride"
  | "childcare"
  | "errands"
  | "skills"
  | "emotional"
  | "other";

export interface User {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  createdAt: string;
}

export interface Response {
  id: string;
  postId: string;
  userId: string;
  name: string;
  message: string;
  contact: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  postId: string;
  postTitle: string;
  responderName: string;
  read: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  type: PostType;
  category: Category;
  title: string;
  description: string;
  location: string;
  lat?: number;
  lng?: number;
  author: string;
  authorId: string;
  whatsapp?: string;
  walletAddress?: string;
  chain?: "stellar" | "ethereum" | "none";
  txHash?: string;
  createdAt: string;
  fulfilled: boolean;
  upvotes: number;
  upvotedBy?: string[];
  responses?: Response[];
}

export const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "food", label: "Food", emoji: "🍚" },
  { value: "clothes", label: "Clothes", emoji: "👕" },
  { value: "medicine", label: "Medicine", emoji: "💊" },
  { value: "ride", label: "Ride", emoji: "🚗" },
  { value: "childcare", label: "Childcare", emoji: "👶" },
  { value: "errands", label: "Errands", emoji: "🛒" },
  { value: "skills", label: "Skills", emoji: "🔧" },
  { value: "emotional", label: "Support", emoji: "🤝" },
  { value: "other", label: "Other", emoji: "💬" },
];
