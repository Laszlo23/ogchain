import Link from "next/link";
import { explorerBase } from "@/lib/contracts";

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 pb-16">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-500/80">Trust & transparency</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Legal, risks & grant readiness</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          OGChain is designed so teams can present a credible demo to grants and investors while staying honest about
          testnet scope. Replace placeholder copy with counsel-approved documents before any regulated offering.
        </p>
      </header>

      <section className="glass-card p-6">
        <h2 className="text-lg font-medium text-white">Grant narrative (what to emphasize)</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-zinc-400">
          <li>Open architecture: registry, factory-issued ERC-20 shares, AMM router, optional compliance registry.</li>
          <li>User flow that mirrors real investing: onboarding → KYC hook → swap → portfolio → explorer links.</li>
          <li>Extensible: subgraph + KYC webhooks + issuer console — clear path from demo to production.</li>
        </ul>
      </section>

      <section className="prose prose-invert prose-sm max-w-none">
        <h2 className="text-lg font-medium text-zinc-200">Terms & risks</h2>
        <p className="text-zinc-400">
          This software is provided for experimentation. Nothing here constitutes legal, tax, investment, or
          securities advice. Real estate tokenization may be regulated in your jurisdiction; you are solely
          responsible for compliance, licensing, disclosures, and suitability for your users.
        </p>
        <h2 className="text-lg font-medium text-zinc-200">Tokenization model</h2>
        <p className="text-zinc-400">
          Share tokens represent fractional economic interest as defined by the issuer&apos;s legal structure (e.g.,
          SPV, series LLC, or trust). The smart contract enforces transfers and compliance; it does not convey title
          to real property unless paired with off-chain legal agreements.
        </p>
        <h2 className="text-lg font-medium text-zinc-200">Custody & property</h2>
        <p className="text-zinc-400">
          Physical assets remain in traditional custody. On-chain tokens track entitlement to cash flows or
          governance as described in the offering documents. Map custody, insurance, and appraisal workflows in your
          issuer ops — not in this UI.
        </p>
        <h2 className="text-lg font-medium text-zinc-200">Proof NFTs</h2>
        <p className="text-zinc-400">
          Optional “certificate” NFTs are soulbound (non-transferable) demo receipts. They are not legal title or
          proof of accredited ownership beyond what the underlying ERC-20 represents.
        </p>
        <h2 className="text-lg font-medium text-zinc-200">Smart contract risk</h2>
        <p className="text-zinc-400">
          On-chain contracts may contain bugs or be exploited. Use audits, bug bounties, and staged rollouts before
          mainnet. Restricted tokens and compliance registries reduce transfer freedom by design; misconfigured
          allowlists can brick liquidity routes.
        </p>
        <h2 className="text-lg font-medium text-zinc-200">KYC & privacy</h2>
        <p className="text-zinc-400">
          Off-chain identity checks are handled by your chosen provider. Wallet binding and on-chain verification
          status are public on-chain. Do not place PII on-chain; store sensitive issuer metadata encrypted off-chain
          as described in the issuer intake flow.
        </p>
        <h2 className="text-lg font-medium text-zinc-200">Lending</h2>
        <p className="text-zinc-400">
          The demo lending pool is not a licensed lending product. Borrow limits depend on oracle prices; liquidations
          can occur. Oracle manipulation is a critical risk—use production price feeds and monitoring.
        </p>
        <h2 className="text-lg font-medium text-zinc-200">Audits & verification</h2>
        <p className="text-zinc-400">
          Before mainnet, publish audit reports and link them here. For now, use the{" "}
          <a href={explorerBase} target="_blank" rel="noreferrer" className="text-gold-400 hover:underline">
            block explorer
          </a>{" "}
          to verify deployed bytecode and transactions on testnet.
        </p>
      </section>

      <p className="text-center text-xs text-zinc-600">
        <Link href="/" className="text-zinc-500 hover:text-gold-400">
          ← Home
        </Link>
      </p>
    </div>
  );
}
