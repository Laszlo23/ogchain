"use client";

import Image from "next/image";
import Link from "next/link";
import { formatIllustrativeEconomics, type DemoPropertyDetail } from "@/lib/demo-properties";
import { getFundingStats } from "@/lib/funding-stats";
import { explorerBase } from "@/lib/contracts";
import { FundingMeter } from "@/components/FundingMeter";

type PropertyCardProps = {
  propertyId: bigint;
  tokenAddress: `0x${string}`;
  name: string;
  symbol: string;
  demo?: DemoPropertyDetail;
};

/** Short yield line from demo narrative (illustrative). */
function yieldHint(demo: DemoPropertyDetail): string | null {
  const m = demo.targetRange.match(/(\d+[–-]\d+\s*%)/);
  if (m) return `Est. yield ${m[1]} (demo)`;
  return null;
}

export function PropertyCard({ propertyId, tokenAddress, name, symbol, demo }: PropertyCardProps) {
  const explorerToken = `${explorerBase}/address/${tokenAddress}`;
  const economicsLine = demo ? formatIllustrativeEconomics(demo) : null;
  const goalUsd = demo?.illustrativePropertyValueUsd ?? 10_000_000;
  const funding = getFundingStats(propertyId, goalUsd);
  const y = demo ? yieldHint(demo) : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/50 backdrop-blur-xl transition hover:border-gold-500/20">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        {demo ? (
          <Image
            src={demo.imageSrc}
            alt={demo.imageAlt}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={propertyId <= 2n}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-900 to-black p-6 text-center">
            <p className="text-sm text-zinc-500">On-chain property — add demo metadata for imagery.</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-lg font-semibold tracking-tight text-white">{demo?.headline ?? name}</h2>
          <p className="text-xs text-gold-400/90">{demo?.location ?? "Registered property"}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <FundingMeter stats={funding} variant="compact" label="Funding" />

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-zinc-300">
            #{propertyId.toString()}
          </span>
          <span className="font-mono text-zinc-400">
            {symbol} · {name}
          </span>
        </div>

        {demo && (
          <>
            {economicsLine && <p className="text-xs font-medium text-zinc-200/95">{economicsLine}</p>}
            {y && <p className="text-xs text-gold-500/90">{y}</p>}
            <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">{demo.thesis}</p>
            <p className="text-[11px] text-zinc-500">
              Min. investment: <span className="text-zinc-300">0.01 OG</span> (testnet, illustrative)
            </p>
            <p className="rounded-lg border border-gold-900/30 bg-gold-950/20 px-3 py-2 text-[11px] leading-snug text-gold-200/90">
              {demo.targetRange}
            </p>
          </>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <Link
            href={`/properties/${propertyId.toString()}`}
            className="rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-4 py-2 text-xs font-semibold text-black hover:from-gold-500 hover:to-gold-400"
          >
            View details
          </Link>
          <Link
            href={`/trade?property=${propertyId.toString()}`}
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-zinc-200 hover:border-gold-500/40"
          >
            Buy shares
          </Link>
          <Link
            href={explorerToken}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-transparent px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300"
          >
            Explorer
          </Link>
        </div>
      </div>
    </article>
  );
}
