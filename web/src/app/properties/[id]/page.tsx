"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { zeroAddress } from "viem";
import { ComplianceStatus } from "@/components/ComplianceStatus";
import { FundingMeter } from "@/components/FundingMeter";
import { TrustStrip } from "@/components/TrustStrip";
import { addresses, explorerBase } from "@/lib/contracts";
import { PropertyImageCarousel } from "@/components/PropertyImageCarousel";
import { formatIllustrativeEconomics, getDemoImageSlides } from "@/lib/demo-properties";
import { getFundingStats } from "@/lib/funding-stats";
import { usePropertyShareList } from "@/lib/usePropertyShareList";

export default function PropertyDetailPage() {
  const params = useParams();
  const idStr = typeof params.id === "string" ? params.id : params.id?.[0] ?? "";
  const propertyId = useMemo(() => {
    try {
      return BigInt(idStr || "0");
    } catch {
      return 0n;
    }
  }, [idStr]);

  const registry = addresses.registry;
  const unset = registry === zeroAddress;

  const { rows, loading } = usePropertyShareList();
  const row = rows.find((r) => r.id === propertyId);

  const demo = row?.demo;
  const goalUsd = demo?.illustrativePropertyValueUsd ?? 10_000_000;
  const fundingCurrency = demo?.creditLines?.length ? "EUR" : "USD";
  const funding = propertyId > 0n ? getFundingStats(propertyId, goalUsd) : getFundingStats(1n, goalUsd);

  if (!idStr || propertyId === 0n) {
    return (
      <div className="py-12 text-center text-zinc-500">
        <p>Invalid property id.</p>
        <Link href="/properties" className="mt-4 inline-block text-gold-400 hover:underline">
          ← Back to properties
        </Link>
      </div>
    );
  }

  if (unset) {
    return (
      <p className="text-zinc-400">
        Configure <code className="text-gold-400">NEXT_PUBLIC_REGISTRY</code> in{" "}
        <code className="text-zinc-300">.env.local</code>.
      </p>
    );
  }

  if (loading && !row) {
    return <p className="animate-pulse text-zinc-500">Loading property…</p>;
  }

  if (!row) {
    return (
      <div className="py-12 text-center">
        <p className="text-zinc-400">No share token for property #{idStr}.</p>
        <Link href="/properties" className="mt-4 inline-block text-gold-400 hover:underline">
          ← Properties
        </Link>
      </div>
    );
  }

  const economics = demo ? formatIllustrativeEconomics(demo) : null;
  const explorerToken = `${explorerBase}/address/${row.tokenAddress}`;

  return (
    <div className="space-y-10 pb-16">
      <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08]">
        <div className="relative w-full bg-zinc-900">
          {demo ? (
            <>
              <PropertyImageCarousel
                slides={getDemoImageSlides(demo)}
                priorityFirst
                aspectClassName="aspect-[21/9] min-h-[200px] w-full sm:min-h-0 sm:aspect-[2.4/1]"
                sizes="100vw"
                dotsClassName="top-4 sm:top-6"
              />
              <div className="pointer-events-none absolute inset-0 z-[14] bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 z-[15] p-6 sm:p-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400/90">Property #{idStr}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {demo.headline ?? row.name}
                </h1>
                <p className="mt-2 text-sm text-zinc-300">{demo.location ?? row.symbol}</p>
              </div>
            </>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center text-zinc-600 sm:aspect-[2.4/1]">
              No image
            </div>
          )}
        </div>
      </div>

      <ComplianceStatus />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {demo?.thesis ?? "On-chain fractional share for this registry property. Demo narrative can be extended in the app."}
            </p>
            {demo?.highlights && (
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-400">
                {demo.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </section>

          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Financials (illustrative)</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className={demo?.creditLines?.length ? "sm:col-span-2" : ""}>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  {demo?.creditLines?.length ? "Kreditbetrag / Facility (Illustrativ)" : "Asset value (demo)"}
                </dt>
                <dd className="mt-1 text-sm text-zinc-100">
                  {demo?.creditLines?.length ? (
                    <ul className="list-inside list-disc space-y-1 font-mono text-sm">
                      {demo.creditLines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : demo?.illustrativePropertyValueUsd != null ? (
                    <span className="font-mono">
                      ~${(demo.illustrativePropertyValueUsd / 1e6).toFixed(1)}M
                    </span>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">Share price ref. (demo)</dt>
                <dd className="mt-1 font-mono text-zinc-100">
                  {demo?.illustrativeShareUsd != null
                    ? `~$${demo.illustrativeShareUsd.toLocaleString()}`
                    : "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-zinc-500">Yield narrative</dt>
                <dd className="mt-1 text-sm text-zinc-400">{demo?.targetRange ?? "—"}</dd>
              </div>
            </dl>
            {economics && <p className="mt-4 text-xs text-zinc-500">{economics}</p>}
          </section>

          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Ownership structure</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Shares are ERC-20 tokens minted by the PropertyShareFactory. Transfers may be restricted by
              ComplianceRegistry for regulated offerings. Legal entity structure and SPV docs are issuer-specific —
              replace this copy with your counsel-approved disclosure.
            </p>
          </section>

          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Legal & documents</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Offering memorandum, subscription agreement, and risk factors should live off-chain with hash
              commitments on-chain if required. See{" "}
              <Link href="/legal" className="text-gold-400 hover:underline">
                Legal & risks
              </Link>{" "}
              for platform disclaimers.
            </p>
          </section>

          <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Location</h2>
            <p className="mt-2 text-sm text-zinc-400">{demo?.location ?? "See property headline for region."}</p>
            <div className="mt-4 flex aspect-[2/1] max-h-56 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80">
              <p className="text-xs text-zinc-600">Map placeholder — wire Mapbox / Google Maps for production</p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <FundingMeter stats={funding} label="Live funding (demo)" currency={fundingCurrency} />

          <div className="glass-card-strong sticky top-24 space-y-4 p-6">
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">Buy widget</h2>
            <p className="text-sm text-zinc-400">
              Enter OG on the Buy page for a live AMM quote. Slippage and pool depth apply.
            </p>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">You pay</p>
              <p className="mt-1 text-2xl font-semibold text-white">OG</p>
              <p className="mt-3 text-[10px] uppercase tracking-wide text-zinc-500">You receive (est.)</p>
              <p className="text-sm text-gold-400/90">{row.symbol} shares (from pool)</p>
            </div>
            <Link
              href={`/trade?property=${idStr}`}
              className="block w-full rounded-full bg-gradient-to-r from-gold-600 to-gold-500 py-3 text-center text-sm font-semibold text-black shadow-lg hover:from-gold-500 hover:to-gold-400"
            >
              Buy shares
            </Link>
            <Link
              href={explorerToken}
              target="_blank"
              rel="noreferrer"
              className="block text-center text-xs text-zinc-500 hover:text-gold-400"
            >
              View token on explorer →
            </Link>
          </div>

          <TrustStrip />
        </div>
      </div>
    </div>
  );
}
