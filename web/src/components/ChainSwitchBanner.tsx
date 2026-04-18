"use client";

import { base } from "viem/chains";
import { ogGalileo } from "@/lib/chain";
import { isBaseConfigured } from "@/lib/base-addresses";
import { useHydrated } from "@/lib/use-hydrated";
import { useChainId, useSwitchChain } from "wagmi";

export function ChainSwitchBanner() {
  const hydrated = useHydrated();
  const chainId = useChainId();
  const { switchChain, isPending, error } = useSwitchChain();
  const baseReady = isBaseConfigured();

  if (!hydrated) return null;

  const onOg = chainId === ogGalileo.id;
  const onBase = chainId === base.id;

  if (baseReady && onBase) return null;
  if (!baseReady && onOg) return null;

  return (
    <div className="border-b border-amber-500/30 bg-amber-950/40 px-4 py-2 text-center text-sm text-amber-100">
      <span className="text-amber-200/90">Wrong network.</span>{" "}
      {baseReady ? (
        <>
          <button
            type="button"
            disabled={isPending}
            onClick={() => switchChain({ chainId: base.id })}
            className="font-semibold text-gold-400 underline-offset-2 hover:underline disabled:opacity-50"
          >
            {isPending ? "Switching…" : `Switch to Base (${base.name})`}
          </button>
          <span className="text-zinc-500"> · </span>
          <button
            type="button"
            disabled={isPending}
            onClick={() => switchChain({ chainId: ogGalileo.id })}
            className="font-semibold text-gold-400/90 underline-offset-2 hover:underline disabled:opacity-50"
          >
            {isPending ? "Switching…" : `${ogGalileo.name} (test)`}
          </button>
        </>
      ) : (
        <button
          type="button"
          disabled={isPending}
          onClick={() => switchChain({ chainId: ogGalileo.id })}
          className="font-semibold text-gold-400 underline-offset-2 hover:underline disabled:opacity-50"
        >
          {isPending ? "Switching…" : `Switch to ${ogGalileo.name}`}
        </button>
      )}
      {error && <span className="ml-2 text-xs text-red-300">{error.message}</span>}
    </div>
  );
}
