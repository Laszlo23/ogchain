import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";
import { FundingMeter } from "@/components/FundingMeter";
import { TrustStrip } from "@/components/TrustStrip";
import { InvestorJourney } from "@/components/InvestorJourney";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";
import { FundingCountdown } from "@/components/FundingCountdown";
import { HomeHeroActions } from "@/components/HomeHeroActions";
import { getGlobalFundingMeter, getGlobalPlatformStats } from "@/lib/funding-stats";
import { explorerBase } from "@/lib/contracts";

export default function Home() {
  const globalFunding = getGlobalFundingMeter();
  const platform = getGlobalPlatformStats();

  return (
    <div className="relative -mx-4 -mt-8 overflow-hidden px-4 pt-8">
      <HeroBackground />

      <div className="stagger-fade relative z-10 mx-auto max-w-4xl pb-12 pt-8 text-center sm:pt-14">
        <p className="mb-4 inline-flex rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
          Building Culture · 0G
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-tight">
          Own Real Estate <span className="text-brand">On-Chain</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          Buy fractional shares of premium properties using blockchain technology — clear, fast, and built like a
          modern fintech product.
        </p>
        <HomeHeroActions />
        <p className="mt-6 text-xs text-zinc-500">
          Not investment advice. Testnet demo — verify disclosures before any production raise.
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-10 pb-12">
        <InvestorJourney />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FundingMeter stats={globalFunding} label="Community funding raised" />
          </div>
          <FundingCountdown stats={platform} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <LiveActivityFeed />
          <div className="glass-card flex flex-col justify-center p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white">Trust & transparency</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li className="flex gap-2">
                <span className="text-brand">✓</span>
                Smart contracts handle property share tokens and compliance hooks.
              </li>
              <li className="flex gap-2">
                <span className="text-brand">✓</span>
                Every action can be traced on the public ledger.
              </li>
              <li className="flex gap-2">
                <span className="text-brand">✓</span>
                Structure supports regulated offerings — issuer-specific legal docs apply.
              </li>
            </ul>
            <Link
              href={explorerBase}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit text-sm font-medium text-brand hover:underline"
            >
              Open chain explorer →
            </Link>
          </div>
        </div>

        <TrustStrip />

        <section className="glass-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">How it works</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Property", d: "Assets are registered on-chain with clear record ownership." },
              { t: "Tokenization", d: "One ERC-20 share token per property — fractional exposure." },
              { t: "Liquidity", d: "Trade against OG via the built-in AMM when pools exist." },
              { t: "Proof", d: "Optional soulbound NFT certificate for qualified holders." },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-sm font-semibold text-white">{x.t}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/guide" className="text-sm font-medium text-brand hover:underline">
              Operator guide →
            </Link>
            <Link href="/legal" className="text-sm text-zinc-500 hover:text-zinc-300">
              Legal & risks →
            </Link>
          </div>
        </section>

        <div className="stagger-fade-slow grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/onboarding", title: "Get started", desc: "Wallet → verify → deposit → invest", accent: "Flow" },
            { href: "/invest", title: "Investor hub", desc: "Balances & quick links", accent: "Overview" },
            { href: "/stake", title: "Stake OG", desc: "Rewards & cooldown", accent: "Staking" },
            { href: "/trade", title: "Trade", desc: "OG in, shares out", accent: "Swap" },
            { href: "/pool", title: "Liquidity", desc: "Add LP, earn fees", accent: "AMM" },
            { href: "/portfolio", title: "Portfolio", desc: "Holdings & allocation", accent: "Dashboard" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="glass-card glass-card-interactive group block p-5 text-left"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-brand-muted">{c.accent}</p>
              <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-brand-light">{c.title}</h2>
              <p className="mt-1 text-sm text-zinc-500">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
