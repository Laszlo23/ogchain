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
    <section className="glass-card overflow-hidden p-6 sm:p-8">
      <div className="mb-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-brand-muted">Your path</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">Four steps to invest</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-500">
          Understand the platform in seconds — same flow as a modern fintech app, powered by 0G.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        {steps.map((s, i) => (
          <Link
            key={s.n}
            href={s.href}
            className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-brand/35 hover:bg-white/[0.05]"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-sm font-semibold text-brand">
                {s.n}
              </span>
              {i < steps.length - 1 && (
                <div className="hidden h-px flex-1 bg-gradient-to-r from-brand/50 to-transparent sm:block" aria-hidden />
              )}
            </div>
            <h3 className="font-semibold text-white">{s.title}</h3>
            <p className="mt-1 text-xs text-zinc-500">{s.hint}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
