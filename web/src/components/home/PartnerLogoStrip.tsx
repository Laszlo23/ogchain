import Image from "next/image";
import Link from "next/link";
import { explorerBase } from "@/lib/contracts";
import { baseExplorerBase } from "@/lib/base-addresses";

/**
 * Partner + infrastructure row for social proof (reuses footer assets).
 */
export function PartnerLogoStrip() {
  return (
    <div className="flex flex-col items-center gap-8 border-t border-eco/10 pt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-12">
      <div className="flex flex-wrap items-center justify-center gap-10 opacity-90">
        <a
          href="https://www.base.org"
          target="_blank"
          rel="noreferrer"
          className="transition hover:opacity-100"
          aria-label="Base"
        >
          <Image src="/partners/base-logo.svg" alt="" width={130} height={36} className="h-8 w-auto" />
        </a>
        <a
          href="https://0g.ai"
          target="_blank"
          rel="noreferrer"
          className="transition opacity-80 hover:opacity-100"
          aria-label="0G Network"
        >
          <Image src="/partners/0g-logo.svg" alt="" width={120} height={36} className="h-8 w-auto" />
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <a
          href={baseExplorerBase}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-canvas/90 underline-offset-4 transition hover:text-action"
        >
          Basescan
        </a>
        <a
          href={explorerBase}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-canvas/90 underline-offset-4 transition hover:text-action"
        >
          0G testnet explorer
        </a>
        <Link href="/contracts" className="text-sm font-medium text-canvas/90 underline-offset-4 transition hover:text-action">
          Contracts
        </Link>
        <span className="inline-flex items-center gap-2 rounded-full border border-eco/30 bg-eco/10 px-3 py-1.5 text-xs font-medium text-eco-light">
          <svg className="h-3.5 w-3.5 text-eco" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Audit-ready architecture
        </span>
      </div>
    </div>
  );
}
