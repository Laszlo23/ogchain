"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { formatEther, zeroAddress } from "viem";
import { useReadContract } from "wagmi";
import { ComplianceStatus } from "@/components/ComplianceStatus";
import { FundingMeter } from "@/components/FundingMeter";
import { TrustSection } from "@/components/TrustSection";
import { addresses, erc20Abi, explorerBase } from "@/lib/contracts";
import { demoAvailableShares } from "@/lib/demo-investment-math";
import { PropertyImageCarousel } from "@/components/PropertyImageCarousel";
import { PropertyShareButton } from "@/components/PropertyShareButton";
import {
  formatAnnualRentEur,
  formatIllustrativeEconomics,
  formatSquareMeters,
  getDemoImageSlides,
  getEstimatedYieldPercent,
} from "@/lib/demo-properties";
import { getFundingStats } from "@/lib/funding-stats";
import { PropertyInvestmentCalculator } from "@/components/PropertyInvestmentCalculator";
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

  const [tab, setTab] = useState<"overview" | "financials" | "documents" | "blockchain">("overview");

  const { data: totalSupplyWei } = useReadContract({
    address: row?.tokenAddress ?? zeroAddress,
    abi: erc20Abi,
    functionName: "totalSupply",
    query: { enabled: Boolean(row?.tokenAddress) },
  });

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
  const proofConfigured = addresses.proofNft !== zeroAddress;
  const totalSupplyStr =
    totalSupplyWei !== undefined ? Number(formatEther(totalSupplyWei)).toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—";
  const remainingShares = demo ? demoAvailableShares(propertyId, goalUsd).toLocaleString("en-US") : "—";
  const sharePrice = demo?.illustrativeShareUsd != null ? `~$${demo.illustrativeShareUsd.toLocaleString()}` : "—";
  const assetValue =
    demo?.creditLines?.length ? "See facilities" : demo?.illustrativePropertyValueUsd != null
      ? `~$${(demo.illustrativePropertyValueUsd / 1e6).toFixed(1)}M`
      : "—";

  const tabBtn = (id: typeof tab, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => setTab(id)}
      className={`whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition ${
        tab === id ? "border-brand text-white" : "border-transparent text-muted hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-[1280px] space-y-10 pb-16">
      <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08]">
        <div className="relative w-full bg-zinc-900">
          {demo ? (
            <>
              <div className="absolute right-4 top-4 z-30 sm:right-8 sm:top-8">
                <PropertyShareButton propertyId={idStr} title={demo.headline} />
              </div>
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
                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{demo.propertyType}</p>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Property value (illustr.)</p>
          <p className="mt-1 font-mono text-lg text-white">{assetValue}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Token price</p>
          <p className="mt-1 font-mono text-lg text-white">{sharePrice}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Expected yield</p>
          <p className="mt-1 text-lg font-semibold text-brand">
            {demo ? `${getEstimatedYieldPercent(demo).toFixed(1)}%` : "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Total tokens (supply)</p>
          <p className="mt-1 font-mono text-lg text-white">{totalSupplyStr}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Tokens remaining (model)</p>
          <p className="mt-1 font-mono text-lg text-white">{remainingShares}</p>
        </div>
      </div>

      <FundingMeter stats={funding} label="Funding progress (illustrative)" currency={fundingCurrency} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex flex-wrap gap-6 border-b border-white/[0.08]">
            {tabBtn("overview", "Overview")}
            {tabBtn("financials", "Financials")}
            {tabBtn("documents", "Documents")}
            {tabBtn("blockchain", "Blockchain data")}
          </div>

          {tab === "overview" && (
            <div className="space-y-6">
              <section className="glass-card p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white">Overview</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {demo?.thesis ?? "On-chain fractional share for this registry property."}
                </p>
                {demo?.highlights && (
                  <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted">
                    {demo.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </section>
              {demo && (
                <section className="glass-card p-6 sm:p-8">
                  <h2 className="text-lg font-semibold text-white">Property facts</h2>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted">Type</dt>
                      <dd className="mt-1 text-sm text-white">{demo.propertyType}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted">Floor area</dt>
                      <dd className="mt-1 font-mono text-sm text-white">{formatSquareMeters(demo.squareMeters)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted">Units</dt>
                      <dd className="mt-1 font-mono text-sm text-white">{demo.units.toLocaleString("en-US")}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted">Annual gross rent</dt>
                      <dd className="mt-1 font-mono text-sm text-white">{formatAnnualRentEur(demo.annualRentalIncomeEur)}</dd>
                    </div>
                  </dl>
                </section>
              )}
              <section className="glass-card p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white">Location</h2>
                <p className="mt-2 text-sm text-muted">{demo?.location ?? "See property headline for region."}</p>
                <div className="mt-4 flex aspect-[2/1] max-h-56 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80">
                  <p className="text-xs text-muted">Map placeholder</p>
                </div>
              </section>
            </div>
          )}

          {tab === "financials" && (
            <section className="glass-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">Financials (illustrative)</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className={demo?.creditLines?.length ? "sm:col-span-2" : ""}>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    {demo?.creditLines?.length ? "Loan / facility (illustrative)" : "Asset value (demo)"}
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    {demo?.creditLines?.length ? (
                      <ul className="list-inside list-disc space-y-1 font-mono text-sm">
                        {demo.creditLines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : demo?.illustrativePropertyValueUsd != null ? (
                      <span className="font-mono">~${(demo.illustrativePropertyValueUsd / 1e6).toFixed(1)}M</span>
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">Share price ref. (demo)</dt>
                  <dd className="mt-1 font-mono text-white">
                    {demo?.illustrativeShareUsd != null ? `~$${demo.illustrativeShareUsd.toLocaleString()}` : "—"}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-muted">Yield narrative</dt>
                  <dd className="mt-1 text-sm text-muted">{demo?.targetRange ?? "—"}</dd>
                </div>
              </dl>
              {economics && <p className="mt-4 text-xs text-muted">{economics}</p>}
            </section>
          )}

          {tab === "documents" && (
            <section className="glass-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">Documents</h2>
              <p className="mt-3 text-sm text-muted">
                Offering memorandum, subscription agreement, and risk factors should live off-chain with issuer
                control. Hash commitments on-chain if required.
              </p>
              <p className="mt-4 text-sm text-muted">
                See{" "}
                <Link href="/legal" className="text-brand hover:underline">
                  Legal &amp; risks
                </Link>{" "}
                for platform disclaimers.
              </p>
            </section>
          )}

          {tab === "blockchain" && (
            <div className="space-y-6">
              <section className="glass-card p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white">Ownership &amp; contracts</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Shares are ERC-20 tokens minted by the PropertyShareFactory. Transfers may be restricted by
                  ComplianceRegistry for regulated offerings.
                </p>
                <p className="mt-3 font-mono text-xs text-muted break-all">Token: {row.tokenAddress}</p>
                <Link
                  href={explorerToken}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
                >
                  View on explorer →
                </Link>
              </section>
              {proofConfigured && (
                <section className="glass-card border border-brand/25 bg-brand/[0.06] p-6 sm:p-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">Investor proof</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">Certificate NFT</h2>
                  <p className="mt-2 text-sm text-muted">
                    Mint a soulbound proof on the Trade page after you hold shares (testnet demo).
                  </p>
                  <Link
                    href={`/trade?property=${idStr}`}
                    className="mt-4 inline-flex rounded-full border border-brand/40 bg-brand/15 px-4 py-2 text-xs font-semibold text-brand hover:bg-brand/25"
                  >
                    Open trade →
                  </Link>
                </section>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <PropertyInvestmentCalculator
            propertyId={propertyId}
            demo={demo}
            symbol={row.symbol}
            tradeHref={`/trade?property=${idStr}`}
          />

          <div className="sticky top-24 space-y-4 rounded-2xl border border-brand/20 bg-surface-elevated/90 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted">Invest</h2>
              {demo && <PropertyShareButton propertyId={idStr} title={demo.headline} variant="compact" />}
            </div>
            <p className="text-sm text-muted">Connect your wallet and swap OG for {row.symbol} on the AMM.</p>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-[10px] uppercase tracking-wide text-muted">You pay</p>
              <p className="mt-1 text-2xl font-semibold text-white">OG</p>
              <p className="mt-3 text-[10px] uppercase tracking-wide text-muted">You receive (est.)</p>
              <p className="text-sm text-brand">{row.symbol} shares</p>
            </div>
            <Link
              href={`/trade?property=${idStr}`}
              className="block w-full rounded-full bg-brand py-3 text-center text-sm font-semibold text-[#0A0A0A] transition hover:bg-brand-light"
            >
              Connect wallet to invest
            </Link>
            <Link
              href={explorerToken}
              target="_blank"
              rel="noreferrer"
              className="block text-center text-xs text-muted hover:text-brand"
            >
              View token on explorer →
            </Link>
          </div>

          <TrustSection />
        </div>
      </div>
    </div>
  );
}
