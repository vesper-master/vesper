"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Notification } from "../types";
import { getSession, setSession, getNotifications, markNotificationsRead } from "../store";

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  notifications: Notification[];
  unreadCount: number;
  login: (user: User) => void;
  logout: () => void;
  continueAsGuest: () => void;
  refreshNotifications: () => void;
  readAllNotifications: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
      setNotifications(getNotifications(session.id));
    }
  }, []);

  const login = (u: User) => {
    setUser(u);
    setSession(u);
    setIsGuest(false);
    setNotifications(getNotifications(u.id));
  };

  const logout = () => {
    setUser(null);
    setSession(null);
    setIsGuest(false);
    setNotifications([]);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
  };

  const refreshNotifications = () => {
    if (user) setNotifications(getNotifications(user.id));
  };

  const readAllNotifications = () => {
    if (user) {
      markNotificationsRead(user.id);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider value={{
      user, isGuest, notifications, unreadCount,
      login, logout, continueAsGuest,
      refreshNotifications, readAllNotifications,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
