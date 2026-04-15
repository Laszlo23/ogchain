import type { Metadata } from "next";
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

/** Talent app domain verification — must appear on the homepage <head>. */
export const metadata: Metadata = {
  other: {
    "talentapp:project_verification":
      "e960f18a1356b6f99de376cde74522d2a12215e74741b1cfd909876bfdf5c22e69a0ec4049043ef69795e249624cf583c5589aa671635e00fffcd6bd1fb266ee",
  },
};

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

      <div className="stagger-fade relative z-10 mx-auto max-w-4xl space-y-6 pb-8 pt-8 text-center sm:space-y-8 sm:pt-14">
        <p className="inline-flex rounded-full border border-eco/30 bg-eco/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-eco-light">
          Building Culture · 0G
        </p>
        <p className="text-sm font-semibold tracking-wide text-canvas sm:text-base">
          Community owned real estate
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-tight">
          Real Estate <span className="text-gradient-eco">on-chain.</span>
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Own, trade and earn from tokenized property.
        </p>

        <div className="mx-auto w-full max-w-2xl px-0 text-left">
          <FundingMeter stats={globalFunding} label="Community funding raised" />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <ButtonLink href="/properties">Explore Properties</ButtonLink>
          <ButtonLink href="/invest" variant="secondary">
            Start Investing
          </ButtonLink>
        </div>

        <HeroTokenizationDiagram />

        <p className="text-xs text-muted">
          Not investment advice. Testnet / illustrative where marked — verify disclosures before any production raise.
        </p>

        <div className="mx-auto w-full max-w-[1280px]">
          <LiveActivityFeed variant="ticker" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] gap-6 px-0 pb-12 sm:grid-cols-3 sm:gap-8">
        <Card padding="md" className="text-center sm:text-left">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Total value locked (illustr.)</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-canvas">{tvlFmt}</p>
          <p className="mt-2 text-[11px] text-muted">Narrative demo — not on-chain TVL.</p>
        </Card>
        <Card padding="md" className="text-center sm:text-left">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Properties tokenized</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-canvas">{platform.propertiesFunded}</p>
          <p className="mt-2 text-[11px] text-muted">From platform stats model.</p>
        </Card>
        <Card padding="md" className="text-center sm:text-left">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Active investors</p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-canvas">
            {globalFunding.investors.toLocaleString()}
          </p>
          <p className="mt-2 text-[11px] text-muted">Illustrative count.</p>
        </Card>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] space-y-12 pb-16">
        <section className="glass-card border-eco/25 bg-forest/30 p-6 sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-eco-muted">Why tokenize</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Real estate back in the hands of people
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Real estate benefits from a transparent liquidity layer — secondary trading and programmable settlement can
            sit alongside traditional bank-led leverage. This stack is a testnet-first step; read the full story (and
            disclaimers) on our mission page.
          </p>
          <Link
            href="/mission"
            className="mt-6 inline-flex rounded-full border border-action/50 bg-action/10 px-5 py-2 text-sm font-semibold text-action-light hover:bg-action/20"
          >
            Read mission →
          </Link>
        </section>

        <section className="glass-card border-eco/20 p-6 sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-eco-muted">North star</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Built as open infrastructure — not a closed garden
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            The contracts and app flows are designed so <strong className="text-canvas">issuers</strong> can adopt a
            consistent pattern for property-linked share tokens, <strong className="text-canvas">venues</strong> can
            list compatible instruments where rules allow, and <strong className="text-canvas">lenders</strong> can
            explore collateral workflows off-chain — each step depends on jurisdiction, issuer docs, and counterparties.
            Nothing here guarantees an exchange listing, bank acceptance, or loan terms.
          </p>
          <ul className="mt-6 max-w-2xl list-inside list-disc space-y-2 text-sm text-muted">
            <li>Secondary market &amp; venue listings — roadmap; issuer- and regulator-dependent</li>
            <li>Yield distribution — contract- and issuer-dependent; not guaranteed returns</li>
            <li>Oracle / AI-assisted pricing signals — illustrative until audited; not investment advice</li>
            <li>Liquidity depth &amp; routing — see Trade / Pool; timelines not guaranteed</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-6">
            <Link href="/roadmap" className="text-sm font-medium text-action hover:underline">
              Roadmap →
            </Link>
            <Link href="/legal/risk" className="text-sm text-muted hover:text-canvas">
              Risks &amp; disclaimer →
            </Link>
          </div>
        </section>

        <InvestorJourney />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FundingMeter stats={globalFunding} label="Community funding (detail)" />
          </div>
          <FundingCountdown stats={platform} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <LiveActivityFeed variant="list" />
          <div className="glass-card flex flex-col justify-center border-eco/20 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-canvas">Trust &amp; transparency</h2>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li className="flex gap-3">
                <span className="text-eco">✓</span>
                Smart contracts handle property share tokens and compliance hooks.
              </li>
              <li className="flex gap-3">
                <span className="text-eco">✓</span>
                Every action can be traced on the public ledger.
              </li>
              <li className="flex gap-3">
                <span className="text-eco">✓</span>
                Structure supports regulated offerings — issuer-specific legal docs apply.
              </li>
            </ul>
            <Link
              href={explorerBase}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit text-sm font-medium text-action hover:underline"
            >
              Open chain explorer →
            </Link>
          </div>
        </div>

        <TrustSection />

        <section className="glass-card border-eco/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-canvas">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {[
              { t: "Property", d: "Assets are registered on-chain with clear record ownership." },
              { t: "Tokenization", d: "One ERC-20 share token per property — fractional exposure." },
              { t: "Liquidity", d: "Trade against OG via the built-in AMM when pools exist." },
              { t: "Proof", d: "Optional soulbound NFT certificate for qualified holders." },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-eco/15 bg-forest/40 p-4">
                <p className="text-sm font-semibold text-canvas">{x.t}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/how-it-works" className="text-sm font-medium text-action hover:underline">
              Investor walkthrough →
            </Link>
            <Link href="/guide" className="text-sm font-medium text-muted hover:text-canvas">
              Operator guide →
            </Link>
            <Link href="/legal" className="text-sm text-muted hover:text-canvas">
              Legal & risks →
            </Link>
          </div>
        </section>

        <div className="stagger-fade-slow grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              className="glass-card glass-card-interactive group block p-6 text-left"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-eco-muted">{c.accent}</p>
              <h2 className="mt-2 text-lg font-semibold text-canvas group-hover:text-action-light">{c.title}</h2>
              <p className="mt-2 text-sm text-muted">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
