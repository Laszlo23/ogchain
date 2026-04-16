"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { DemoPropertyDetail } from "@/lib/demo-properties";
import { demoAvailableShares, demoWholeTokenSupply } from "@/lib/demo-investment-math";
import { getFundingStats } from "@/lib/funding-stats";

type Props = {
  propertyId: bigint;
  demo?: DemoPropertyDetail;
  symbol: string;
  tradeHref: string;
};

export function PropertyInvestmentCalculator({ propertyId, demo, symbol, tradeHref }: Props) {
  const [ogAmount, setOgAmount] = useState("100");
  const goalUsd = demo?.illustrativePropertyValueUsd ?? 10_000_000;
  const shareUsd = demo?.illustrativeShareUsd ?? 1000;
  const funding = getFundingStats(propertyId, goalUsd);
  const cap = demoWholeTokenSupply(goalUsd);
  const available = demoAvailableShares(propertyId, goalUsd);

  const estShares = useMemo(() => {
    const n = parseFloat(ogAmount.replace(",", "."));
    if (!Number.isFinite(n) || n <= 0) return null;
    // Map OG spend to shares via reference $/share (no live DEX price in this widget)
    const usd = n * 0.15;
    const shares = usd / shareUsd;
    return shares;
  }, [ogAmount, shareUsd]);

  return (
    <section className="glass-card p-6">
      <h2 className="text-lg font-semibold text-white">Investment calculator</h2>
      <p className="mt-1 text-xs text-zinc-500">
        Reference only — enter OG to see estimated whole-share equivalents at ~${shareUsd.toLocaleString("en-US")}{" "}
        / share. Live swaps use pool prices on{" "}
        <Link href={tradeHref} className="text-brand hover:underline">
          Trade
        </Link>
        .
      </p>
      <label className="mt-4 block text-xs font-medium uppercase tracking-wide text-zinc-500">
        Amount (OG)
        <input
          type="text"
          inputMode="decimal"
          value={ogAmount}
          onChange={(e) => setOgAmount(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 font-mono text-lg text-white focus:border-brand/50 focus:outline-none"
        />
      </label>
      <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/30 p-4">
        <p className="text-[10px] uppercase tracking-wide text-zinc-500">Estimated shares (reference)</p>
        <p className="mt-1 font-mono text-2xl text-brand">
          {estShares != null ? estShares.toFixed(4) : "—"} <span className="text-sm text-zinc-400">{symbol}</span>
        </p>
        <p className="mt-2 text-[11px] text-zinc-500">
          Pool depth & slippage apply on-chain. This widget uses ~$0.15 OG/USD reference rate.
        </p>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-zinc-500">Token supply cap (model)</dt>
          <dd className="font-mono text-zinc-200">{cap.toLocaleString("en-US")} shares</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">Available (reference)</dt>
          <dd className="font-mono text-zinc-200">{available.toLocaleString("en-US")} shares</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">Round progress</dt>
          <dd className="text-brand">{Math.round(funding.progress * 100)}%</dd>
        </div>
      </dl>
    </section>
  );
}
