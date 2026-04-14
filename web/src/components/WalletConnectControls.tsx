"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletConnectControls() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden max-w-[140px] truncate font-mono text-[11px] text-zinc-500 sm:inline">
          {address.slice(0, 6)}…{address.slice(-4)}
        </span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition hover:border-gold-500/30 hover:text-white"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          reset();
          const injectedConnector = connectors.find((c) => c.id === "injected");
          if (injectedConnector) connect({ connector: injectedConnector });
        }}
        className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-200 hover:border-gold-500/40 disabled:opacity-50"
      >
        {isPending ? "…" : "Browser"}
      </button>
      {connectors.some((c) => c.id === "walletConnect") && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            reset();
            const wc = connectors.find((c) => c.id === "walletConnect");
            if (wc) connect({ connector: wc });
          }}
          className="rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-3 py-1.5 text-xs font-semibold text-black shadow-lg shadow-gold-900/20 hover:from-gold-500 hover:to-gold-400 disabled:opacity-50"
        >
          {isPending ? "…" : "WalletConnect"}
        </button>
      )}
      <button
        type="button"
        className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-zinc-500 hover:text-zinc-300"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
      >
        All wallets
      </button>
      {menuOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-white/10 bg-zinc-900 p-2 shadow-xl">
          <p className="px-2 pb-1 text-[10px] uppercase tracking-wide text-zinc-500">Connect with</p>
          {connectors.map((c) => (
            <button
              key={c.uid}
              type="button"
              disabled={isPending}
              onClick={() => {
                reset();
                connect({ connector: c });
                setMenuOpen(false);
              }}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/5"
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
      {error && (
        <span className="max-w-[200px] truncate text-[10px] text-red-400" title={error.message}>
          {error.message}
        </span>
      )}
    </div>
  );
}
