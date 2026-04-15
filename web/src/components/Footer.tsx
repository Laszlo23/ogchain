import Image from "next/image";
import Link from "next/link";
import { explorerBase } from "@/lib/contracts";

const product = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/trade", label: "Trade" },
  { href: "/invest", label: "Invest" },
  { href: "/stake", label: "Stake" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pool", label: "Pool" },
];

const learn = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/guide", label: "Operator guide" },
  { href: "/blog", label: "Blog" },
  { href: "/feedback", label: "Feedback" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/mission", label: "Mission" },
  { href: "/team", label: "Team" },
];

const legal = [
  { href: "/legal", label: "Legal overview" },
  { href: "/legal/terms", label: "Terms of use" },
  { href: "/legal/privacy", label: "Privacy policy" },
  { href: "/legal/risk", label: "Risks & disclaimer" },
];

function LinkCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-block min-h-[44px] py-2 text-sm text-zinc-400 transition hover:text-brand md:min-h-0 md:py-0"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.06] bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="text-lg font-semibold tracking-tight text-white">Building Culture</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
              On-chain liquidity and settlement for fractional real estate exposure — illustrative where marked; not
              investment advice.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a
                href="https://0g.ai"
                target="_blank"
                rel="noreferrer"
                className="opacity-90 transition hover:opacity-100"
                aria-label="0G Network"
              >
                <Image src="/partners/0g-logo.svg" alt="" width={120} height={36} className="h-8 w-auto" />
              </a>
              <a
                href="https://www.base.org"
                target="_blank"
                rel="noreferrer"
                className="opacity-90 transition hover:opacity-100"
                aria-label="Base"
              >
                <Image src="/partners/base-logo.svg" alt="" width={130} height={36} className="h-8 w-auto" />
              </a>
            </div>
            <p className="mt-4 text-xs text-zinc-600">
              Primary deployment:{" "}
              <a href={explorerBase} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-brand">
                0G explorer
              </a>
              . Base contracts listed on{" "}
              <Link href="/contracts" className="text-zinc-500 hover:text-brand">
                Contracts
              </Link>{" "}
              when configured.
            </p>
          </div>
          <LinkCol title="Product" items={product} />
          <LinkCol title="Learn" items={learn} />
          <LinkCol title="Legal" items={legal} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-center text-[11px] text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} Building Culture · Testnet · Grants &amp; hackathon demonstration only
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-end">
            <Link href="/contracts" className="hover:text-zinc-400">
              Verify contracts
            </Link>
            <a href={explorerBase} target="_blank" rel="noreferrer" className="hover:text-zinc-400">
              Chain explorer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
