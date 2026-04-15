import Link from "next/link";

export function ProblemSolutionSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1280px] px-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-eco-muted">Why this matters</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Real estate is broken</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Traditional ownership can mean high minimums, slow liquidity, and gatekeepers. Tokenization opens a different
        path — subject to law and issuer rules in each jurisdiction.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-action">Traditional friction</h3>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
            <li className="flex gap-2">
              <span className="text-eco">—</span> High entry barriers
            </li>
            <li className="flex gap-2">
              <span className="text-eco">—</span> Illiquidity for many assets
            </li>
            <li className="flex gap-2">
              <span className="text-eco">—</span> Centralized ownership and access
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-eco/25 bg-forest/30 p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-eco-light">On-chain benefits</h3>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
            <li className="flex gap-2">
              <span className="text-eco">—</span> Fractional ownership
            </li>
            <li className="flex gap-2">
              <span className="text-eco">—</span> Global access where offerings permit
            </li>
            <li className="flex gap-2">
              <span className="text-eco">—</span> Liquidity via tokens when pools and compliance allow
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-[10px] text-muted">
        Not investment advice.{" "}
        <Link href="/legal/risk" className="underline underline-offset-2 hover:text-canvas">
          Read risks
        </Link>
        .
      </p>
    </section>
  );
}
