"use client";

import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyShowcaseCard } from "@/components/home/PropertyShowcaseCard";
import { DEMO_PROPERTY_DETAILS } from "@/lib/demo-properties";
import { usePropertyShareList } from "@/lib/usePropertyShareList";
import { PropertyCardSkeleton } from "@/components/PropertyCardSkeleton";

/** Culture Land–linked flagship demos (see `exploreHref` in `culture-land-portfolio`). */
const SHOWCASE_IDS = [1, 2, 3, 5] as const;

export function HomeFeaturedProperties() {
  const { rows, loading, unset } = usePropertyShareList();

  const showChainCards = !unset && rows.length > 0;
  /** When registry is unset, `loading` stays true — still show demo cards. */
  const showLoading = !unset && loading && rows.length === 0;

  return (
    <section className="relative z-10 mx-auto max-w-[1280px] px-0">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-eco-muted">Featured</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Properties</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Listings from your deployment; Culture Land narrative layers in when metadata is configured.
          </p>
        </div>
        <Link href="/properties" className="text-sm font-semibold text-action hover:underline">
          View all →
        </Link>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {showLoading
          ? Array.from({ length: 3 }).map((_, i) => <PropertyCardSkeleton key={i} />)
          : showChainCards
            ? rows.slice(0, 3).map((row) => (
                <PropertyCard
                  key={row.id.toString()}
                  propertyId={row.id}
                  tokenAddress={row.tokenAddress}
                  name={row.name}
                  symbol={row.symbol}
                  demo={row.demo}
                />
              ))
            : SHOWCASE_IDS.map((id) => {
                const demo = DEMO_PROPERTY_DETAILS[id];
                if (!demo) return null;
                return <PropertyShowcaseCard key={id} propertyId={id} demo={demo} />;
              })}
      </div>
      <p className="mt-6 text-[10px] text-muted">
        Reference economics on cards where marked; not an offer to sell securities. Connect registry for live token
        reads.
      </p>
    </section>
  );
}
