import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mission — Building Culture",
  description:
    "An open reference stack for tokenized real estate: access, transparency, and issuer-grade patterns — not venue or bank promises.",
};

export default function MissionPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 pb-16">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">Why we build</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Mission</h1>
      </header>

      <section className="space-y-4 text-sm leading-relaxed text-zinc-400">
        <p>
          For decades, quality housing and income-producing real estate have been concentrated behind bank financing,
          opaque structures, and high minimum tickets. Ordinary people participate indirectly — if at all — while
          carrying the macro risk.
        </p>
        <p>
          <strong className="text-zinc-200">We tokenize real estate to bring economic exposure back into community
          hands:</strong> transparent rules, fractional access, and programmable settlement — so ownership and
          participation can align with people who live and work around these assets, not only with institutions that
          gate the credit line.
        </p>
        <p>
          This is not a promise of easy returns. It is a <strong className="text-zinc-200">design direction</strong>:
          open infrastructure, verifiable contracts, and a path from testnet demos to issuer-governed, compliant offerings
          where the law allows.
        </p>
        <p>
          We want teams who <strong className="text-zinc-200">tokenize real estate</strong> to converge on shared
          patterns — issuance hooks, transfer rules, and disclosure surfaces — so the ecosystem can interoperate without
          locking issuers into one app. Listings on third-party venues, bank-style collateral, and other bridges are{" "}
          <strong className="text-zinc-200">hypothetical until negotiated and permitted</strong>; they are not commitments
          from this software.
        </p>
        <p>
          For illustrative partner programmes and sustainability narratives in English (Building Culture Land), see the{" "}
          <Link href="/culture-land" className="font-medium text-brand hover:underline">
            Culture Land portfolio
          </Link>{" "}
          one-pager — not a substitute for offering documents.
        </p>
      </section>

      <section className="glass-card border border-brand/20 bg-brand/[0.04] p-6">
        <h2 className="text-lg font-semibold text-white">Disclaimer</h2>
        <p className="mt-2 text-sm text-zinc-400">
          The current deployment is a <strong className="text-zinc-300">testnet demonstration</strong>. It is not an
          offer to sell securities or real property. Replace with counsel-approved disclosures before any regulated
          raise.
        </p>
        <Link href="/legal/risk" className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
          Read risks &amp; disclaimer →
        </Link>
      </section>
    </div>
  );
}
