"use client";

import Link from "next/link";
import { useAccount, useConnect } from "wagmi";

const steps = [
  {
    n: 1,
    title: "Connect wallet",
    body: "Use a Web3 wallet on 0G testnet. Your address is your account — no separate signup.",
    cta: { href: "#wallet", label: "Connect below" },
  },
  {
    n: 2,
    title: "Complete KYC (if required)",
    body: "Restricted share tokens may require verification. Issuers configure ComplianceRegistry — complete checks when prompted.",
    cta: { href: "/issuer", label: "Issuer console" },
  },
  {
    n: 3,
    title: "Deposit OG tokens",
    body: "Fund your wallet with testnet OG. Wrap to WETH when adding liquidity or follow the Buy flow with native OG.",
    cta: { href: "/guide", label: "Read the guide" },
  },
  {
    n: 4,
    title: "Start investing",
    body: "Pick a property, review the quote, and buy shares — or provide liquidity on the Pool page.",
    cta: { href: "/properties", label: "Browse properties" },
  },
];

export default function OnboardingPage() {
  const { isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const done = isConnected ? 1 : 0;

  return (
    <div className="mx-auto max-w-2xl space-y-10 pb-16">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Get started</h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          Four steps from zero to your first on-chain real estate position. Built for clarity — like onboarding a
          premium fintech app.
        </p>
      </header>

      {/* Progress */}
      <div className="glass-card-strong px-5 py-4">
        <div className="mb-2 flex justify-between text-xs text-zinc-500">
          <span>Progress</span>
          <span className="font-mono text-gold-400">{done} / 4</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500"
            style={{ width: `${(done / 4) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-zinc-500">
          Step 1 completes when your wallet is connected. Remaining steps depend on deployment settings.
        </p>
      </div>

      <div id="wallet" className="space-y-4">
        {steps.map((s) => (
          <div key={s.n} className="glass-card flex gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-sm font-semibold text-gold-400">
              {s.n}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-white">{s.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{s.body}</p>
              <Link
                href={s.cta.href}
                className="mt-3 inline-block text-sm font-medium text-gold-400/90 hover:underline"
              >
                {s.cta.label} →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {!isConnected ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() => connect({ connector: connectors[0] })}
            className="rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-8 py-3 text-sm font-semibold text-black shadow-lg disabled:opacity-50"
          >
            {isPending ? "Connecting…" : "Connect wallet"}
          </button>
        ) : (
          <p className="text-sm text-emerald-400/90">Wallet connected — proceed to KYC if your issuer requires it.</p>
        )}
        <Link href="/trade" className="text-sm text-zinc-400 hover:text-white">
          Skip to Buy →
        </Link>
      </div>
    </div>
  );
}
