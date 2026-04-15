"use client";

import type { FundingStats } from "@/lib/funding-stats";

function fmtMoney(n: number, currency: "USD" | "EUR") {
  return new Intl.NumberFormat(currency === "EUR" ? "de-AT" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

type Props = {
  stats: FundingStats;
  /** Compact row for cards */
  variant?: "hero" | "compact";
  label?: string;
  /** Display currency for funded/goal amounts (stats are still nominal numbers) */
  currency?: "USD" | "EUR";
};

export function FundingMeter({ stats, variant = "hero", label = "Community funding", currency = "USD" }: Props) {
  const fmt = (n: number) => fmtMoney(n, currency);
  const pct = Math.round(stats.progress * 1000) / 10;

  if (variant === "compact") {
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] text-zinc-500">
          <span>{label}</span>
          <span className="font-mono text-gold-400/90">{pct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
        <p className="text-[10px] text-zinc-500">
          {fmt(stats.fundedUsd)} / {fmt(stats.goalUsd)} · {stats.investors.toLocaleString()} investors ·{" "}
          {stats.countries} countries
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card-strong relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-500/10 blur-2xl" />
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500/80">{label}</p>
      <p className="mt-2 font-mono text-2xl text-white sm:text-3xl">
        <span className="text-gradient-gold">{fmt(stats.fundedUsd)}</span>
        <span className="text-zinc-500"> / {fmt(stats.goalUsd)}</span>
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-700 via-gold-500 to-gold-300 shadow-lg shadow-gold-500/30 transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-6 text-sm">
        <div>
          <p className="text-xs text-zinc-500">Investors</p>
          <p className="font-semibold text-zinc-100">{stats.investors.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Countries</p>
          <p className="font-semibold text-zinc-100">{stats.countries}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Funded</p>
          <p className="font-semibold text-gold-400/90">{pct}%</p>
        </div>
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">
        Illustrative momentum metrics for demos and grants — not live offering data. Replace with oracle-backed
        metrics for production.
      </p>
    </div>
  );
}
