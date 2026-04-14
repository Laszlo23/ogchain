"use client";

import Link from "next/link";
import { PropertyImageCarousel } from "@/components/PropertyImageCarousel";
import { PropertyShareButton } from "@/components/PropertyShareButton";
import {
  formatAnnualRentEur,
  formatIllustrativeEconomics,
  formatSquareMeters,
  getDemoImageSlides,
  getEstimatedYieldPercent,
  type DemoPropertyDetail,
} from "@/lib/demo-properties";
import { demoAvailableShares } from "@/lib/demo-investment-math";
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

export function PropertyCard({ propertyId, tokenAddress, name, symbol, demo }: PropertyCardProps) {
  const explorerToken = `${explorerBase}/address/${tokenAddress}`;
  const economicsLine = demo ? formatIllustrativeEconomics(demo) : null;
  const goalUsd = demo?.illustrativePropertyValueUsd ?? 10_000_000;
  const funding = getFundingStats(propertyId, goalUsd);
  const fundingCurrency = demo?.creditLines?.length ? "EUR" : "USD";
  const yieldPct = demo ? getEstimatedYieldPercent(demo) : null;
  const available = demoAvailableShares(propertyId, goalUsd);
  const priceShare = demo?.illustrativeShareUsd ?? 1000;
  const displayValue = demo?.illustrativePropertyValueUsd ?? goalUsd;
  const idStr = propertyId.toString();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/50 backdrop-blur-xl transition hover:border-gold-500/20">
      <div className="relative w-full overflow-hidden bg-zinc-900">
        {demo ? (
          <>
            <PropertyImageCarousel
              slides={getDemoImageSlides(demo)}
              priorityFirst={propertyId <= 2n}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 400px"
            />
            <div className="pointer-events-none absolute inset-0 z-[14] bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[15] p-4">
              <h2 className="text-lg font-semibold tracking-tight text-white">{demo.headline ?? name}</h2>
              <p className="text-xs text-gold-400/90">{demo.location ?? "Registered property"}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-zinc-500">{demo.propertyType}</p>
            </div>
          </>
        ) : (
          <div className="relative flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-zinc-900 to-black p-6 text-center">
            <p className="text-sm text-zinc-500">On-chain property — add demo metadata for imagery.</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <FundingMeter stats={funding} variant="compact" label="Funding" currency={fundingCurrency} />

        <dl className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.06] bg-black/25 p-3 text-[11px] sm:grid-cols-3">
          <div>
            <dt className="text-zinc-500">Total value (demo)</dt>
            <dd className="mt-0.5 font-mono text-zinc-200">
              {fundingCurrency === "EUR" ? "€" : "$"}
              {(displayValue / 1e6).toFixed(1)}M
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Annual rent (illustr.)</dt>
            <dd className="mt-0.5 font-mono text-zinc-200">{demo ? formatAnnualRentEur(demo.annualRentalIncomeEur) : "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Floor area</dt>
            <dd className="mt-0.5 font-mono text-zinc-200">{demo ? formatSquareMeters(demo.squareMeters) : "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Units</dt>
            <dd className="mt-0.5 font-mono text-zinc-200">{demo ? demo.units.toLocaleString("en-US") : "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Est. gross yield</dt>
            <dd className="mt-0.5 text-brand">{yieldPct != null ? `${yieldPct.toFixed(1)}%` : "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Price / share</dt>
            <dd className="mt-0.5 font-mono text-brand">~${priceShare.toLocaleString("en-US")}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-zinc-500">Avail. shares</dt>
            <dd className="mt-0.5 font-mono text-zinc-200">{available.toLocaleString("en-US")}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-zinc-300">
            #{idStr}
          </span>
          <span className="font-mono text-zinc-400">
            {symbol} · {name}
          </span>
        </div>

        {demo && (
          <>
            {economicsLine && <p className="text-xs font-medium text-zinc-200/95">{economicsLine}</p>}
            <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">{demo.thesis}</p>
            <p className="text-[11px] text-zinc-500">
              Min. investment: <span className="text-zinc-300">0.01 OG</span> (testnet, illustrative)
            </p>
            <p className="rounded-lg border border-gold-900/30 bg-gold-950/20 px-3 py-2 text-[11px] leading-snug text-gold-200/90">
              {demo.targetRange}
            </p>
          </>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <Link
            href={`/properties/${idStr}`}
            className="rounded-full px-4 py-2 text-xs font-semibold text-black hover:opacity-95"
            style={{
              background: "linear-gradient(to right, #9a7d45, #C6A55C)",
            }}
          >
            View investment
          </Link>
          {demo && <PropertyShareButton propertyId={idStr} title={demo.headline} variant="compact" />}
          <Link
            href={`/trade?property=${idStr}`}
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
