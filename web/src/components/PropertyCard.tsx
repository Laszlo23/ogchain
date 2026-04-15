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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-elevated/80 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl">
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

      <div className="flex flex-1 flex-col gap-4 rounded-b-2xl p-5">
        <FundingMeter stats={funding} variant="compact" label="Funding" currency={fundingCurrency} />

        <dl className="grid grid-cols-2 gap-3 rounded-xl border border-white/[0.06] bg-black/30 p-4 text-[12px] sm:grid-cols-3">
          <div>
            <dt className="text-muted">Est. yield</dt>
            <dd className="mt-0.5 font-semibold text-brand">{yieldPct != null ? `${yieldPct.toFixed(1)}%` : "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Token price</dt>
            <dd className="mt-0.5 font-mono font-semibold text-white">~${priceShare.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt className="text-muted">Value (illustr.)</dt>
            <dd className="mt-0.5 font-mono text-white">
              {fundingCurrency === "EUR" ? "€" : "$"}
              {(displayValue / 1e6).toFixed(1)}M
            </dd>
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
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{demo.thesis}</p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
          <Link
            href={`/properties/${idStr}`}
            className="min-h-[44px] flex-1 rounded-full bg-brand py-2.5 text-center text-sm font-semibold text-[#0A0A0A] transition hover:bg-brand-light sm:flex-none sm:px-6"
          >
            View property
          </Link>
          <Link
            href={`/trade?property=${idStr}`}
            className="min-h-[44px] flex-1 rounded-full border border-white/20 py-2.5 text-center text-sm font-semibold text-white transition hover:border-brand/40 sm:flex-none sm:px-6"
          >
            Invest
          </Link>
          {demo && <PropertyShareButton propertyId={idStr} title={demo.headline} variant="compact" />}
          <Link
            href={explorerToken}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full py-2 text-center text-xs text-muted hover:text-white sm:w-auto sm:px-3"
          >
            Explorer
          </Link>
        </div>
      </div>
    </article>
  );
}
