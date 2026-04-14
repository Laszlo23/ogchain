import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";
import { FundingMeter } from "@/components/FundingMeter";
import { TrustStrip } from "@/components/TrustStrip";
import { getGlobalFundingMeter } from "@/lib/funding-stats";

export default function Home() {
  const globalFunding = getGlobalFundingMeter();

  return (
    <div className="relative -mx-4 -mt-8 overflow-hidden px-4 pt-8">
      <HeroBackground />

      <div className="stagger-fade relative z-10 mx-auto max-w-4xl pb-16 pt-8 text-center sm:pt-14">
        <p className="mb-4 inline-flex rounded-full border border-gold-500/20 bg-gold-500/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-400/90">
          Real estate on 0G
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Own real estate <span className="text-gradient-gold">on-chain</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Buy fractional shares of real estate with OG tokens. Transparent settlement, liquid secondary routes, and a
          path to compliance — designed like a payment flow, built for serious pilots.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/properties"
            className="btn-primary-shine w-full rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-8 py-3.5 text-sm font-semibold text-black shadow-xl shadow-gold-900/30 transition duration-300 hover:from-gold-500 hover:to-gold-400 sm:w-auto"
          >
            Browse properties
          </Link>
          <Link
            href="/guide"
            className="w-full rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-zinc-100 backdrop-blur transition duration-300 hover:border-gold-500/40 hover:text-white sm:w-auto"
          >
            How it works
          </Link>
        </div>
        <p className="mt-6 text-xs text-zinc-500">
          Not investment advice. Testnet demo — verify disclosures before any production raise.
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-8 pb-8">
        <FundingMeter stats={globalFunding} />
        <TrustStrip />

        <div className="stagger-fade-slow grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/onboarding", title: "Get started", desc: "Wallet → KYC → deposit → invest", accent: "Step-by-step" },
            { href: "/invest", title: "Investor hub", desc: "Balances, properties, stake & pool links", accent: "Overview" },
            { href: "/stake", title: "Stake OG", desc: "Native staking with cooldown & rewards", accent: "Staking" },
            { href: "/trade", title: "Buy shares", desc: "OG in, shares out — pool-priced", accent: "Primary" },
            { href: "/pool", title: "Liquidity", desc: "Earn fees as an LP", accent: "AMM" },
            { href: "/portfolio", title: "Portfolio", desc: "Holdings & diversification", accent: "Track" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="glass-card glass-card-interactive group block p-5 text-left"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-gold-500/80">{c.accent}</p>
              <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-gold-200">{c.title}</h2>
              <p className="mt-1 text-sm text-zinc-500">{c.desc}</p>
            </Link>
          ))}
        </div>

        <div className="glass-card p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Grant-ready transparency</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
            Open-source-friendly architecture: property registry, ERC-20 share tokens with optional transfer
            restrictions, Uniswap-style router + pools, optional soulbound proof NFTs, and clear legal disclaimers.
            Ship a demo that looks investor-grade while staying honest about testnet scope.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/legal" className="text-sm font-medium text-gold-400/90 hover:underline">
              Legal & risks →
            </Link>
            <Link href="/guide" className="text-sm text-zinc-500 hover:text-zinc-300">
              Operator checklist →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
