import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroTokenizationDiagram } from "@/components/HeroTokenizationDiagram";
import { FundingMeter } from "@/components/FundingMeter";
import { TrustSection } from "@/components/TrustSection";
import { InvestorJourney } from "@/components/InvestorJourney";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";
import { FundingCountdown } from "@/components/FundingCountdown";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getGlobalFundingMeter, getGlobalPlatformStats } from "@/lib/funding-stats";
import { explorerBase } from "@/lib/contracts";

export default function Home() {
  const globalFunding = getGlobalFundingMeter();
  const platform = getGlobalPlatformStats();
  const tvlFmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: "compact",
  }).format(globalFunding.fundedUsd);

  return (
    <div className="relative -mx-4 -mt-8 overflow-hidden px-4 pt-8">
      <HeroBackground />

      <div className="stagger-fade relative z-10 mx-auto max-w-4xl pb-8 pt-8 text-center sm:pt-14">
        <p className="mb-4 inline-flex rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
          Building Culture · 0G
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-tight">
          Real Estate <span className="text-brand">on-chain.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Own, trade and earn from tokenized property.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="/properties">Explore Properties</ButtonLink>
          <ButtonLink href="/invest" variant="secondary">
            Start Investing
          </ButtonLink>
        </div>
        <HeroTokenizationDiagram />
        <p className="mt-6 text-xs text-muted">
          Not investment advice. Testnet / illustrative where marked — verify disclosures before any production raise.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] gap-4 px-0 pb-10 sm:grid-cols-3">
        <Card padding="md" className="text-center sm:text-left">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Total value locked (illustr.)</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-white">{tvlFmt}</p>
          <p className="mt-1 text-[11px] text-muted">Narrative demo — not on-chain TVL.</p>
        </Card>
        <Card padding="md" className="text-center sm:text-left">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Properties tokenized</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-white">{platform.propertiesFunded}</p>
          <p className="mt-1 text-[11px] text-muted">From platform stats model.</p>
        </Card>
        <Card padding="md" className="text-center sm:text-left">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Active investors</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-white">{globalFunding.investors.toLocaleString()}</p>
          <p className="mt-1 text-[11px] text-muted">Illustrative count.</p>
        </Card>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] space-y-10 pb-12">
        <section className="glass-card border border-brand/20 bg-brand/[0.04] p-6 sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">Why tokenize</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Real estate back in the hands of people
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Real estate benefits from a transparent liquidity layer — secondary trading and programmable settlement can
            sit alongside traditional bank-led leverage. This stack is a testnet-first step; read the full story (and
            disclaimers) on our mission page.
          </p>
          <Link
            href="/mission"
            className="mt-5 inline-flex rounded-full border border-brand/40 bg-brand/10 px-5 py-2 text-sm font-semibold text-brand hover:bg-brand/20"
          >
            Read mission →
          </Link>
        </section>

        <section className="glass-card border border-white/[0.08] p-6 sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">North star</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Built as open infrastructure — not a closed garden
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            The contracts and app flows are designed so <strong className="text-zinc-300">issuers</strong> can adopt a
            consistent pattern for property-linked share tokens, <strong className="text-zinc-300">venues</strong> can
            list compatible instruments where rules allow, and <strong className="text-zinc-300">lenders</strong> can
            explore collateral workflows off-chain — each step depends on jurisdiction, issuer docs, and counterparties.
            Nothing here guarantees an exchange listing, bank acceptance, or loan terms.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link href="/roadmap" className="text-sm font-medium text-brand hover:underline">
              Roadmap →
            </Link>
            <Link href="/legal/risk" className="text-sm text-zinc-500 hover:text-zinc-300">
              Risks &amp; disclaimer →
            </Link>
          </div>
        </section>

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

        <TrustSection />

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
            <Link href="/how-it-works" className="text-sm font-medium text-brand hover:underline">
              Investor walkthrough →
            </Link>
            <Link href="/guide" className="text-sm font-medium text-zinc-400 hover:text-white">
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
