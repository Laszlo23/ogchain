import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap — Building Culture",
  description:
    "Milestones toward audits, liquidity, and ecosystem interoperability — partner- and regulator-dependent.",
};

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
