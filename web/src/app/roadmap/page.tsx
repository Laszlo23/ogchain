import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap — Building Culture",
  description:
    "Milestones toward audits, liquidity, and ecosystem interoperability — partner- and regulator-dependent.",
};

/**
 * Ordered journey for capital and distributions — illustrative sequence, not a binding schedule.
 * Actual timing is issuer-, jurisdiction-, and offering-specific; see legal disclosures.
 */
const mainnetFundsJourney = [
  {
    step: "1",
    title: "Mainnet deployment",
    when: "After audited contracts are deployed and addresses are published",
    detail:
      "The protocol and property share contracts go live on the target mainnet. Until then, any UI on testnet is for rehearsal only — no real funds at risk on-chain in the demo environment.",
  },
  {
    step: "2",
    title: "Offering & eligibility",
    when: "When an issuer opens a round (if applicable)",
    detail:
      "Each property or programme may have subscription documents, minimums, and caps. You only become eligible to send funds after you accept disclosures and meet issuer criteria for that offering.",
  },
  {
    step: "3",
    title: "KYC / AML complete",
    when: "Before your wallet can receive restricted tokens or certain payouts",
    detail:
      "ComplianceRegistry (or the issuer’s provider) must mark your wallet as verified where regulation requires it. Fulfilling KYC does not by itself obligate any transfer — it unlocks permitted flows per issuer rules.",
  },
  {
    step: "4",
    title: "Capital deployed",
    when: "After subscription clears and settlement completes",
    detail:
      "Funds move per the offering’s instructions (e.g. swap into share tokens, escrow release). Settlement timing is issuer- and bank-rail-dependent — not instant by default.",
  },
  {
    step: "5",
    title: "Ongoing distributions",
    when: "Per issuer schedule and smart-contract rules post-closing",
    detail:
      "Rental income, fees, or other cash flows — if and when declared — are distributed according to the SPV / issuer waterfall and on-chain logic. Past testnet behaviour is not a forecast of mainnet returns.",
  },
];

const phases = [
  {
    phase: "Now",
    title: "Testnet demo on 0G Galileo",
    items: [
      "Registry + share factory + AMM swap + staking + portfolio flows",
      "Illustrative property metadata and funding UI",
    ],
  },
  {
    phase: "Next",
    title: "Hardening",
    items: [
      "External audits and bug bounties before mainnet",
      "Indexer / subgraph for property and pool analytics",
      "Production KYC and issuer console",
    ],
  },
  {
    phase: "Then",
    title: "Liquidity & access",
    items: [
      "Deeper pools and clearer routing for property share tokens",
      "Secondary market / venue listings where permitted — issuer- and venue-dependent",
      "Liquidity incentives and routing improvements (roadmap; not guaranteed timelines)",
      "Issuer-approved disclosures linked from each property",
    ],
  },
  {
    phase: "Product layers",
    title: "Yield, pricing, and distribution (roadmap)",
    items: [
      "Rental or cash-flow yield distribution — contract- and issuer-dependent; not guaranteed returns",
      "Oracle-assisted or AI-assisted pricing signals — illustrative until audited; not investment advice",
    ],
  },
  {
    phase: "Parallel",
    title: "Base deployment",
    items: [
      "Mirror core contracts on Base with documented addresses (see contracts page)",
      "Optional bridge strategy — subject to security review",
    ],
  },
  {
    phase: "Longer term",
    title: "Community alignment",
    items: [
      "Governance experiments where regulation permits",
      "Education and transparency as first-class product features",
    ],
  },
  {
    phase: "Ecosystem",
    title: "Interoperability (non-binding)",
    items: [
      "Document patterns so compatible share tokens can be supported by wallets, indexers, and venues that choose to list permitted instruments",
      "Explore collateral and credit use cases only with licensed partners — no guaranteed bank or CEX integration",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 pb-16">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-eco-muted">Plan</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Roadmap</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Honest milestones — not a promise of delivery dates. Priorities depend on audits, partners, and regulation.
        </p>
      </header>

      <section
        className="rounded-2xl border border-eco/25 bg-forest/25 p-6 sm:p-8"
        aria-labelledby="funds-journey-heading"
      >
        <h2 id="funds-journey-heading" className="text-xl font-semibold tracking-tight text-white">
          Receiving funds after mainnet &amp; KYC
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Below is the <strong className="font-medium text-zinc-300">typical order of operations</strong> for investors.
          It is <strong className="font-medium text-zinc-300">not</strong> a guaranteed calendar — dates, gates, and
          payouts depend on each issuer, the offering documents, and applicable law.
        </p>
        <ol className="mt-6 space-y-5">
          {mainnetFundsJourney.map((row) => (
            <li
              key={row.step}
              className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-4 sm:px-5 sm:py-5"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-xs font-semibold text-action">{row.step}</span>
                <h3 className="text-base font-semibold text-white">{row.title}</h3>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-eco-muted/90">{row.when}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{row.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs leading-relaxed text-zinc-500">
          Nothing here is investment, tax, or legal advice. KYC status and smart-contract permissions can change with
          issuer policy and regulation. See{" "}
          <Link href="/legal/risk" className="text-action hover:underline">
            Risks &amp; disclaimer
          </Link>
          .
        </p>
      </section>

      <ol className="relative space-y-8 border-l border-white/[0.08] pl-8">
        {phases.map((p) => (
          <li key={p.phase} className="relative">
            <span className="absolute -left-[39px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-eco/50 bg-[#030303] text-[10px] font-bold text-action">
              •
            </span>
            <p className="text-xs font-semibold uppercase tracking-wider text-eco-muted">{p.phase}</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{p.title}</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-400">
              {p.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <p className="text-center text-sm text-zinc-500">
        Verify deployments on the{" "}
        <Link href="/contracts" className="text-action hover:underline">
          contracts page
        </Link>
        .
      </p>
    </div>
  );
}
