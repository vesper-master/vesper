import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Vesper — Someone nearby can help",
  description: "Vesper connects neighbors who need help with those who can give it — food, rides, skills, and more. Free to post, no signup required. Every act of help recorded permanently on Stellar & Ethereum. Real impact, no middlemen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
