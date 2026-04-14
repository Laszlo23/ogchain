/**
 * Curated presentation for seeded demo properties (chain metadata URIs are placeholders).
 * Not financial advice — illustrative only.
 */
export type DemoPropertyDetail = {
  headline: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  thesis: string;
  highlights: string[];
  targetRange: string;
  riskNote: string;
  /** Illustrative only — not an appraisal or offering price. */
  illustrativePropertyValueUsd?: number;
  /** Per-share reference in USD for UI (e.g. 1000). */
  illustrativeShareUsd?: number;
};

/** Formats the economics line for cards and swap (demo disclaimer included). */
export function formatIllustrativeEconomics(d: DemoPropertyDetail): string | null {
  const v = d.illustrativePropertyValueUsd;
  const s = d.illustrativeShareUsd;
  if (v == null && s == null) return null;
  const parts: string[] = [];
  if (v != null) {
    parts.push(`~$${(v / 1e6).toFixed(1)}M asset`);
  }
  if (s != null) {
    parts.push(`~$${s.toLocaleString("en-US")} / share`);
  }
  return `Illustrative: ${parts.join(" · ")} (demo, not an offer).`;
}

export const DEMO_PROPERTY_DETAILS: Partial<Record<number, DemoPropertyDetail>> = {
  1: {
    headline: "Marina Bay Residences",
    location: "Waterfront — San Diego, CA",
    imageSrc:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c0b?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Modern glass high-rise apartments at dusk near a marina",
    thesis:
      "Institutional-grade multifamily with a stabilized rent roll and upside from light-value-add upgrades. Tokenized exposure tracks pro-rata cash flow from the operating entity (demo).",
    highlights: [
      "94% occupied — renewal spreads ahead of market",
      "5-year weighted lease term; utility pass-throughs indexed",
      "Planned amenity refresh: +$85/mo achievable rent on renovated units",
    ],
    targetRange: "Illustrative target distribution band: 7–10% (demo, not a forecast)",
    riskNote: "Cap-rate, interest, and liquidity risk apply. This UI is a testnet demo.",
    illustrativePropertyValueUsd: 13_000_000,
    illustrativeShareUsd: 1000,
  },
  2: {
    headline: "Sierra Vista Estate",
    location: "Mountain retreat — Lake Tahoe basin",
    imageSrc:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Luxury timber and glass home in a mountain forest setting",
    thesis:
      "Seasonal short-term rental yield with hedged winter demand from ski-adjacent positioning. Diversified booking channels reduce single-platform risk (demo narrative).",
    highlights: [
      "ADR +18% YoY in shoulder seasons (demo figures)",
      "On-site property manager; dynamic pricing stack",
      "Conservation easement limits future supply nearby",
    ],
    targetRange: "Illustrative gross yield band: 9–14% (demo, seasonal)",
    riskNote: "Regulatory and weather risk for STR. Testnet tokens only.",
    illustrativePropertyValueUsd: 8_500_000,
    illustrativeShareUsd: 1000,
  },
  3: {
    headline: "Arts District Creative Lofts",
    location: "Urban core — Los Angeles, CA",
    imageSrc:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Bright loft interior with large industrial windows",
    thesis:
      "Micro-units optimized for creative-industry tenants near transit. Below-market land basis supports reinvestment into shared workspace and production suites (demo).",
    highlights: [
      "Walk score 92; two new transit stops within 0.4 mi",
      "Corporate leases for 40% of NLA (demo)",
      "Opportunistic retail POD on ground floor",
    ],
    targetRange: "Illustrative cash-on-cash band: 6–9% (demo)",
    riskNote: "Urban rent regulation and construction cost risk. Not investment advice.",
    illustrativePropertyValueUsd: 22_000_000,
    illustrativeShareUsd: 1000,
  },
};
