"use client";

import Link from "next/link";

const steps = [
  { n: 1, title: "Connect wallet", hint: "Link your Web3 wallet", href: "/onboarding#wallet" },
  { n: 2, title: "Verify identity", hint: "Compliance (demo / bypass)", href: "/onboarding" },
  { n: 3, title: "Deposit OG", hint: "Fund with testnet OG", href: "/invest" },
  { n: 4, title: "Invest", hint: "Pick a property", href: "/properties" },
];

export function InvestorJourney() {
  return (
    <section className="glass-card overflow-hidden border-eco/20 p-6 sm:p-8">
      <div className="mb-8 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-eco-muted">Your path</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">Four steps to invest</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
          Same rhythm as a modern fintech app — powered by 0G and smart contracts.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((s, i) => (
          <Link
            key={s.n}
            href={s.href}
            className="group relative rounded-2xl border border-eco/15 bg-forest/25 p-6 transition hover:border-action/35 hover:bg-forest/40"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-eco/50 bg-eco/15 text-sm font-bold text-white">
                {s.n}
              </span>
              {i < steps.length - 1 && (
                <div
                  className="hidden h-0.5 flex-1 bg-gradient-to-r from-eco/50 to-transparent lg:block"
                  aria-hidden
                />
              )}
            </div>
            <h3 className="font-semibold text-canvas">{s.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">{s.hint}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
