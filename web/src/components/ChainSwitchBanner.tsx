"use client";

import { ogGalileo } from "@/lib/chain";
import { useChainId, useSwitchChain } from "wagmi";

export function ChainSwitchBanner() {
  const chainId = useChainId();
  const { switchChain, isPending, error } = useSwitchChain();

  if (chainId === ogGalileo.id) return null;

  return (
    <div className="border-b border-amber-500/30 bg-amber-950/40 px-4 py-2 text-center text-sm text-amber-100">
      <span className="text-amber-200/90">Wrong network.</span>{" "}
      <button
        type="button"
        disabled={isPending}
        onClick={() => switchChain({ chainId: ogGalileo.id })}
        className="font-semibold text-gold-400 underline-offset-2 hover:underline disabled:opacity-50"
      >
        {isPending ? "Switching…" : `Switch to ${ogGalileo.name}`}
      </button>
      {error && <span className="ml-2 text-xs text-red-300">{error.message}</span>}
    </div>
  );
}
