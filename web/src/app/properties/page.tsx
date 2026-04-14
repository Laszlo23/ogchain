"use client";

import Link from "next/link";
import { zeroAddress } from "viem";
import { FundingMeter } from "@/components/FundingMeter";
import { PropertyCard } from "@/components/PropertyCard";
import { TrustStrip } from "@/components/TrustStrip";
import { addresses } from "@/lib/contracts";
import { getGlobalFundingMeter } from "@/lib/funding-stats";
import { useHydrated } from "@/lib/use-hydrated";
import { usePropertyShareList } from "@/lib/usePropertyShareList";

function PropertiesPageContent() {
  const registry = addresses.registry;
  const shareFactory = addresses.shareFactory;
  const unset = registry === zeroAddress || shareFactory === zeroAddress;

  const { rows: enriched, loading, nextPropertyId } = usePropertyShareList();
  const globalFunding = getGlobalFundingMeter();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-500/80">Listings</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Properties</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
          Live listings from your deployment on 0G Galileo. Each property has an on-chain share token; the grid below
          layers in a <span className="text-zinc-300">demo narrative</span> (imagery + EUR facility copy) for up to
          seven seeded properties when tokens exist on-chain — not investment advice.{" "}
          <Link href="/guide#how-it-works" className="text-gold-400 hover:underline">
            How tokenization and buying shares work →
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
          <TrustStrip />
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
        <p className="animate-pulse text-zinc-500">Loading on-chain properties…</p>
      ) : enriched.length === 0 ? (
        <p className="text-zinc-400">
          No properties yet. Run <code className="text-emerald-400">SeedSevenProperties</code> (fresh registry) or{" "}
          <code className="text-emerald-400">SeedThreeProperties</code> /{" "}
          <code className="text-emerald-400">SeedFourMoreProperties</code> per{" "}
          <code className="text-zinc-400">deployments/README.md</code>, then refresh.
        </p>
      ) : (
        <section aria-label="Property listings" className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {enriched.map((row) => (
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
    </div>
  );
}

export default function PropertiesPage() {
  const hydrated = useHydrated();
  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-500/80">Listings</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Properties</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
            Live listings from your deployment on 0G Galileo. Each property has an on-chain share token; the grid below
            layers in a <span className="text-zinc-300">demo narrative</span> (imagery + EUR facility copy) for up to
            seven seeded properties when tokens exist on-chain — not investment advice.{" "}
            <Link href="/guide#how-it-works" className="text-gold-400 hover:underline">
              How tokenization and buying shares work →
            </Link>
          </p>
        </header>
        <p className="animate-pulse text-zinc-500">Loading on-chain properties…</p>
      </div>
    );
  }
  return <PropertiesPageContent />;
}
