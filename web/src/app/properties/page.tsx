"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { zeroAddress } from "viem";
import { FundingMeter } from "@/components/FundingMeter";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyCardSkeleton } from "@/components/PropertyCardSkeleton";
import { TrustSection } from "@/components/TrustSection";
import { useProtocolAddresses } from "@/lib/use-protocol-addresses";
import { DISCOVERY_CATEGORIES, type DiscoveryCategory } from "@/lib/demo-properties";
import { getGlobalFundingMeter } from "@/lib/funding-stats";
import { useHydrated } from "@/lib/use-hydrated";
import { usePropertyShareList } from "@/lib/usePropertyShareList";

function PropertiesPageContent() {
  const { registry, shareFactory } = useProtocolAddresses();
  const unset = registry === zeroAddress || shareFactory === zeroAddress;

  const { rows: enriched, loading, nextPropertyId } = usePropertyShareList();
  const globalFunding = getGlobalFundingMeter();
  const [category, setCategory] = useState<DiscoveryCategory | "all">("all");

  const filtered = useMemo(() => {
    if (category === "all") return enriched;
    return enriched.filter((r) => r.demo?.discoveryCategory === category);
  }, [enriched, category]);

  return (
    <div className="mx-auto max-w-[1280px] space-y-8">
      <header className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">Discovery hub</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Community-owned places</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
          Browse tokenized cultural and residential projects on 0G. Each listing has an on-chain share token; cards add a{" "}
          <span className="text-zinc-300">Culture Land narrative</span> (imagery, funding progress, yield) when metadata is present — not investment advice.{" "}
          <Link href="/how-it-works" className="text-brand hover:underline">
            How shares work →
          </Link>
        </p>
        {!unset && (
          <p className="text-xs text-zinc-500">
            Registry cursor <span className="font-mono text-zinc-400">nextPropertyId</span>:{" "}
            <span className="font-mono text-emerald-400/90">{nextPropertyId?.toString() ?? "…"}</span>
          </p>
        )}
      </header>

      {unset ? null : (
        <div className="grid gap-6 lg:grid-cols-2">
          <FundingMeter stats={globalFunding} />
          <TrustSection />
        </div>
      )}

      {unset ? (
        <p className="text-zinc-400">
          Set <code className="text-emerald-400">NEXT_PUBLIC_REGISTRY</code> and{" "}
          <code className="text-emerald-400">NEXT_PUBLIC_SHARE_FACTORY</code> in{" "}
          <code className="text-emerald-400">.env.local</code> (run{" "}
          <code className="text-zinc-300">scripts/sync_web_env.py</code>).
        </p>
      ) : loading && enriched.length === 0 ? (
        <section aria-label="Loading listings" className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </section>
      ) : enriched.length === 0 ? (
        <p className="text-zinc-400">
          No properties yet. Run <code className="text-emerald-400">SeedSevenProperties</code> (fresh registry) or{" "}
          <code className="text-emerald-400">SeedThreeProperties</code> /{" "}
          <code className="text-emerald-400">SeedFourMoreProperties</code> per{" "}
          <code className="text-zinc-400">deployments/README.md</code>, then refresh.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                category === "all"
                  ? "border-brand bg-brand/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              All
            </button>
            {DISCOVERY_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  category === c
                    ? "border-brand bg-brand/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="text-zinc-400">No projects in this category. Try another filter.</p>
          ) : (
            <section aria-label="Property listings" className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((row) => (
                <PropertyCard
                  key={row.tokenAddress}
                  propertyId={row.id}
                  tokenAddress={row.tokenAddress}
                  name={row.name}
                  symbol={row.symbol}
                  demo={row.demo}
                />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  const hydrated = useHydrated();
  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1280px] space-y-8">
        <header className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">Listings</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Properties</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
            Live listings from your deployment on 0G. Each property has an on-chain share token; the grid below
            layers in a <span className="text-zinc-300">listing narrative</span> (imagery + standardized metrics: rent, m², units, yield) for up to
            seven seeded properties when tokens exist on-chain — not investment advice.{" "}
            <Link href="/how-it-works" className="text-brand hover:underline">
              How tokenization and buying shares work →
            </Link>
          </p>
        </header>
        <section aria-label="Loading listings" className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </section>
      </div>
    );
  }
  return <PropertiesPageContent />;
}
