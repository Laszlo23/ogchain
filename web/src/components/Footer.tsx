import Link from "next/link";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/properties", label: "Properties" },
      { href: "/trade", label: "Buy shares" },
      { href: "/market", label: "Market" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/pool", label: "Liquidity" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/guide", label: "Guide" },
      { href: "/onboarding", label: "Get started" },
      { href: "/legal", label: "Legal & risks" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.06] bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">OGChain</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
              Real estate on 0G. Fractional shares, transparent settlement, built for grants and serious pilots — not
              investment advice.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{c.title}</p>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-zinc-400 transition hover:text-gold-400/90">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-white/[0.06] pt-8 text-center text-[11px] text-zinc-600">
          © {new Date().getFullYear()} OGChain demo · Testnet · For grants & hackathon demonstration only
        </p>
      </div>
    </footer>
  );
}
