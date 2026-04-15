"use client";

import Link from "next/link";
import { PropertyImageCarousel } from "@/components/PropertyImageCarousel";
import { PropertyShareButton } from "@/components/PropertyShareButton";
import { getDemoImageSlides, getEstimatedYieldPercent, type DemoPropertyDetail } from "@/lib/demo-properties";
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
  const goalUsd = demo?.illustrativePropertyValueUsd ?? 10_000_000;
  const funding = getFundingStats(propertyId, goalUsd);
  const fundingCurrency = demo?.creditLines?.length ? "EUR" : "USD";
  const yieldPct = demo ? getEstimatedYieldPercent(demo) : null;
  const priceShare = demo?.illustrativeShareUsd ?? 1000;
  const displayValue = demo?.illustrativePropertyValueUsd ?? goalUsd;
  const idStr = propertyId.toString();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-eco/20 bg-surface-elevated/90 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-eco/40 hover:shadow-xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
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
              <p className="text-xs text-eco-light">{demo.location ?? "Registered property"}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">{demo.propertyType}</p>
            </div>
          </>
        ) : (
          <div className="relative flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-forest to-black p-6 text-center">
            <p className="text-sm text-muted">On-chain property — add demo metadata for imagery.</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-6 rounded-b-2xl p-6">
        {/* Yield + price — investment headline */}
        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-eco/15 bg-forest/40 p-4 text-[13px] sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">Projected yield</dt>
            <dd className="mt-1 font-mono text-lg font-semibold tabular-nums text-eco-light">
              {yieldPct != null ? `${yieldPct.toFixed(1)}%` : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">Price / share</dt>
            <dd className="mt-1 font-mono text-lg font-semibold tabular-nums text-canvas">
              ~${priceShare.toLocaleString("en-US")}
            </dd>
          </div>
        </dl>

        <FundingMeter stats={funding} variant="compact" label="Funding progress" currency={fundingCurrency} />

        <div className="rounded-xl border border-white/[0.06] bg-black/25 px-4 py-3">
          <p className="text-[11px] text-muted">Value (illustr.)</p>
          <p className="font-mono text-sm font-semibold text-canvas">
            {fundingCurrency === "EUR" ? "€" : "$"}
            {(displayValue / 1e6).toFixed(1)}M
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
          <span className="rounded-md border border-eco/20 bg-eco/10 px-2 py-0.5 font-mono text-canvas/90">
            #{idStr}
          </span>
          <span className="font-mono text-muted">
            {symbol} · {name}
          </span>
        </div>

        {demo && <p className="line-clamp-2 text-sm leading-relaxed text-muted">{demo.thesis}</p>}

        <div className="mt-auto flex flex-col gap-3 border-t border-eco/10 pt-6 sm:flex-row sm:flex-wrap">
          <Link
            href={`/trade?property=${idStr}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-action px-6 py-2.5 text-center text-sm font-semibold text-[#0A0A0A] shadow-lg shadow-action/25 transition hover:bg-action-light sm:order-first sm:flex-none"
          >
            Invest
          </Link>
          <Link
            href={`/properties/${idStr}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-eco/40 py-2.5 text-center text-sm font-semibold text-canvas transition hover:border-eco/70 hover:bg-eco/10 sm:flex-none sm:px-6"
          >
            View property
          </Link>
          {demo && <PropertyShareButton propertyId={idStr} title={demo.headline} variant="compact" />}
          <Link
            href={explorerToken}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 text-center text-xs text-muted hover:text-canvas sm:w-auto sm:px-3"
          >
            Explorer
          </Link>
        </div>
      </div>
    </article>
  );
}
