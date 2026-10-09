"use client";

import { useState } from "react";
import { Wallet, ChevronDown } from "lucide-react";

interface Props {
  onConnect: (address: string, chain: "stellar" | "ethereum") => void;
  connected?: { address: string; chain: "stellar" | "ethereum" } | null;
}

export default function WalletConnect({ onConnect, connected }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectEthereum = async () => {
    setLoading(true);
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        onConnect(accounts[0], "ethereum");
      } else {
        alert("MetaMask not detected. Please install MetaMask to connect with Ethereum.");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setShowOptions(false);
  };

  const connectStellar = async () => {
    setLoading(true);
    try {
      if (typeof window !== "undefined" && (window as any).freighter) {
        const { publicKey } = await (window as any).freighter.getPublicKey();
        onConnect(publicKey, "stellar");
      } else {
        // Simulate connection for demo purposes
        const mockKey = "G" + Math.random().toString(36).substring(2, 10).toUpperCase() + "...DEMO";
        onConnect(mockKey, "stellar");
        alert("Freighter wallet not detected. Using demo Stellar address for now.");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    setShowOptions(false);
  };

  const shortAddress = (addr: string) =>
    addr.length > 12 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

  if (connected) {
    return (
      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-xs font-mono text-indigo-700">{shortAddress(connected.address)}</span>
        <span className="text-xs text-gray-400">({connected.chain})</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={loading}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
      >
        <Wallet size={16} />
        {loading ? "Connecting..." : "Connect Wallet"}
        <ChevronDown size={14} />
      </button>

      {showOptions && (
        <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-52 z-50">
          <button
            onClick={connectEthereum}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition"
          >
            <span className="text-xl">🦊</span>
            MetaMask (Ethereum)
          </button>
          <button
            onClick={connectStellar}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition"
          >
            <span className="text-xl">🌟</span>
            Freighter (Stellar)
          </button>
        </div>
      )}
    </div>
  );
}
