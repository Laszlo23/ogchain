/**
 * Curated presentation for seeded demo properties (chain metadata URIs are placeholders).
 * Not financial advice — illustrative only. Sustainability claims in copy should match verifiable ops/audit data.
 */
import type { PublicDocumentId } from "@/lib/public-documents";

export type DemoImageSlide = { src: string; alt: string };

export const DISCOVERY_CATEGORIES = [
  "Creative Villages",
  "Coworking Hubs",
  "Cultural Spaces",
  "Sustainable Housing",
  "Rural Revitalization",
] as const;
export type DiscoveryCategory = (typeof DISCOVERY_CATEGORIES)[number];

export type DemoPropertyDetail = {
  headline: string;
  location: string;
  /** Primary image — first entry of `imageGallery` when present; used by thumbnails and NFT metadata. */
  imageSrc: string;
  imageAlt: string;
  /** Up to three slides for property cards / detail hero (local `/...` or remote URLs). */
  imageGallery?: DemoImageSlide[];
  thesis: string;
  highlights: string[];
  targetRange: string;
  riskNote: string;
  /** EUR facility / loan lines for display */
  creditLines?: string[];
  /**
   * Illustrative asset reference amount (EUR for current demos; label uses € when credit lines exist).
   * Field name kept for backwards compatibility with funding math.
   */
  illustrativePropertyValueUsd?: number;
  /** Per-share reference in USD for UI (e.g. 1000) */
  illustrativeShareUsd?: number;
  /** Gross leasable / building area */
  squareMeters: number;
  /** Residential or income units (apartments, houses, commercial bays, etc.) */
  units: number;
  /** Illustrative annual gross rental income (EUR) */
  annualRentalIncomeEur: number;
  /** Optional explicit yield %; otherwise derived from income ÷ asset value */
  estimatedYieldPercent?: number;
  /** Short category label for filters / UI */
  propertyType: string;
  /** Discovery hub filter (editorial) */
  discoveryCategory: DiscoveryCategory;
  /** Cultural / community goal */
  vision?: string;
  /** Plans, renders, design intent */
  architectureNarrative?: string;
  /** Who uses the space */
  communityUsers?: string[];
  /** Tokenization path — illustrative */
  ownershipModel?: string;
  /** Extra note beside funding UI */
  fundingRoundNote?: string;
  /** PDFs from `public-documents` catalog */
  documentIds?: PublicDocumentId[];
};

/** Gross yield % from illustrative income and asset value (demo). */
export function getEstimatedYieldPercent(d: DemoPropertyDetail): number {
  if (d.estimatedYieldPercent != null) return d.estimatedYieldPercent;
  const v = d.illustrativePropertyValueUsd ?? 0;
  if (v <= 0) return 0;
  return (d.annualRentalIncomeEur / v) * 100;
}

export function formatAnnualRentEur(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export function formatSquareMeters(m: number): string {
  return `${m.toLocaleString("en-US")} m²`;
}

/** Formats credit lines or legacy USD illustrative line */
export function formatIllustrativeEconomics(d: DemoPropertyDetail): string | null {
  if (d.creditLines?.length) {
    return d.creditLines.join(" · ");
  }
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

/** Slides for carousel UIs; falls back to a single `imageSrc` / `imageAlt`. */
export function getDemoImageSlides(d: DemoPropertyDetail): DemoImageSlide[] {
  if (d.imageGallery?.length) return d.imageGallery;
  return [{ src: d.imageSrc, alt: d.imageAlt }];
}

export const DEMO_PROPERTY_DETAILS: Partial<Record<number, DemoPropertyDetail>> = {
  1: {
    headline: "Residential portfolio — Berggasse & four houses",
    location: "Vienna · Multi-asset bundle (incl. one house abroad)",
    imageSrc: "/Foto-©-AnnABlaU-_DSC0788.jpg",
    imageAlt: "Berggasse project — exterior (demo)",
    imageGallery: [
      { src: "/Foto-©-AnnABlaU-_DSC0788.jpg", alt: "Berggasse project — view 1 (demo)" },
      { src: "/Foto-©-AnnABlaU-_DSC0863.jpg", alt: "Berggasse project — view 2 (demo)" },
      { src: "/Foto-©-AnnABlaU-_DSC0971.jpg", alt: "Berggasse project — view 3 (demo)" },
    ],
    thesis:
      "Two linked workstreams: the Berggasse project has three apartments completed with a €13.675M facility; one unit is slated for sale and two remain rented. In parallel, a four-house package has a €3.9M facility — two houses are finished (one in Canada), two are renovation plays; all are rental-oriented.",
    highlights: [
      "Berggasse: three units delivered — one sale, two income-producing",
      "Four houses: two standing (one in Canada), two value-add renovations",
      "Facilities: €13.675M (Berggasse) and €3.9M (four-house package)",
    ],
    creditLines: ["Berggasse (3 units): €13.675M facility", "Four houses: €3.9M facility"],
    targetRange: "Illustrative rent and disposition proceeds by sub-portfolio (demo — not a forecast).",
    riskNote: "Currency, rate, and occupancy risk; Canada exposure. Not investment advice — testnet demo.",
    illustrativePropertyValueUsd: 13_675_000 + 3_900_000,
    illustrativeShareUsd: 1000,
    squareMeters: 3200,
    units: 7,
    annualRentalIncomeEur: 422_000,
    estimatedYieldPercent: 2.4,
    propertyType: "Mixed residential",
    discoveryCategory: "Sustainable Housing",
    vision:
      "Keep quality rental housing in Vienna and abroad within a transparent, community-aligned capital stack — not a single trophy asset, but a portfolio investors can read.",
    architectureNarrative:
      "Berggasse and satellite houses: varied façades and unit mixes. Linked plans are for context only.",
    communityUsers: ["Tenants", "Local operators", "Investors tracking portfolio yield"],
    ownershipModel:
      "Assets held in issuer structures off-chain; economic exposure via on-chain share tokens — revenue rules are issuer-specific.",
    fundingRoundNote: "Demo metrics only — not a live securities offering.",
    documentIds: ["droes-plans-221219"],
  },
  2: {
    headline: "Vienna 1130 — ten-unit apartment building",
    location: "Hietzing · Vienna, Austria",
    imageSrc: "/Kamera01_Variante.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Kamera01_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Kamera02_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innen01.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Multi-family building with ten apartments — nearing completion (about three months to handover). Units are intended for lease-up after delivery.",
    highlights: [
      "10 apartments, completion in ~3 months",
      "Lease-up after handover",
      "Facility: €7.0M",
    ],
    creditLines: ["€7.0M facility"],
    targetRange: "Illustrative rental income after completion and letting (demo).",
    riskNote: "Construction and lease-up risk until stabilized. Demo context only.",
    illustrativePropertyValueUsd: 7_000_000,
    illustrativeShareUsd: 1000,
    squareMeters: 1850,
    units: 10,
    annualRentalIncomeEur: 210_000,
    estimatedYieldPercent: 3.0,
    propertyType: "Multi-family residential",
    discoveryCategory: "Sustainable Housing",
    vision:
      "Deliver modern, efficient apartments near Hietzing for residents who want stable, well-managed homes — funded with clear on-chain rails for community participation.",
    architectureNarrative:
      "Ten-unit building nearing completion; interiors shown are illustrative renders.",
    communityUsers: ["Families", "Commuters", "Local landlords transitioning to institutional hold"],
    ownershipModel:
      "Property → SPV → share token → investors; lease-up risk until stabilized — see risk factors.",
    fundingRoundNote: "Illustrative funding progress — testnet demo.",
  },
  3: {
    headline: "Keutschach — completed housing development",
    location: "Carinthia · Keutschach, Austria",
    imageSrc: "/STIX Wohnanlage Keutschacher See 2024-04-04_0212.jpg",
    imageAlt: "Keutschach am See — exterior (demo)",
    imageGallery: [
      { src: "/STIX Wohnanlage Keutschacher See 2024-04-04_0212.jpg", alt: "Keutschach — view 1 (demo)" },
      { src: "/STIX Wohnanlage Keutschacher See 2024-04-04_0239.jpg", alt: "Keutschach — view 2 (demo)" },
      { src: "/STIX Wohnanlage Keutschacher See 2024-04-04_0257.jpg", alt: "Keutschach — view 3 (demo)" },
    ],
    thesis:
      "Completed residential scheme: eight finished apartments acquired for long-term hold and lease.",
    highlights: [
      "8 completed units",
      "Long-term rental income",
      "Facility: €9.5M",
    ],
    creditLines: ["€9.5M facility"],
    targetRange: "Illustrative in-place rents after acquisition (demo).",
    riskNote: "Market and tenant default risk. Not an offering — testnet.",
    illustrativePropertyValueUsd: 9_500_000,
    illustrativeShareUsd: 1000,
    squareMeters: 1920,
    units: 8,
    annualRentalIncomeEur: 285_000,
    estimatedYieldPercent: 3.0,
    propertyType: "Multi-family residential",
    discoveryCategory: "Creative Villages",
    vision:
      "A lakeside creative cluster: living, working, and gathering in one place — the flagship narrative for community-owned cultural real estate in Carinthia.",
    architectureNarrative:
      "Completed residential scheme with Stix-area documentation; supplemental plans show study lines for future adaptive reuse.",
    communityUsers: ["Remote workers", "Artists", "Founders", "Locals", "Seasonal visitors"],
    ownershipModel:
      "Property → SPV → on-chain share token → community investors → rental revenue (issuer-dependent) and governance per charter.",
    fundingRoundNote: "Campaign figures on the homepage are illustrative; chain data remains testnet demo.",
    documentIds: ["stix-a3-klein", "droes-plans-221219"],
  },
  4: {
    headline: "Reifnitz — completed housing development",
    location: "Carinthia · Reifnitz, Austria",
    imageSrc: "/Innenraum_Jagdschlossgasse_81.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Innenraum_Jagdschlossgasse_81.jpg", alt: "Illustrative interior — demo" },
      { src: "/Kamera01_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innen02.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis: "Completed scheme: six apartments acquired for long-term hold and lease.",
    highlights: ["6 completed units", "Hold & lease strategy", "Facility: €6.0M"],
    creditLines: ["€6.0M facility"],
    targetRange: "Illustrative rental income after takeover (demo).",
    riskNote: "Liquidity and interest-rate risk. Demo purposes only.",
    illustrativePropertyValueUsd: 6_000_000,
    illustrativeShareUsd: 1000,
    squareMeters: 1380,
    units: 6,
    annualRentalIncomeEur: 180_000,
    estimatedYieldPercent: 3.0,
    propertyType: "Multi-family residential",
    discoveryCategory: "Rural Revitalization",
    vision:
      "Stabilize housing stock near the lake while supporting local services — small-scale, long-term community ownership.",
    architectureNarrative:
      "Six-unit completed scheme; rural study PDFs reference comparable retrofit patterns in the region.",
    communityUsers: ["Residents", "Local employers", "Weekend homeowners"],
    ownershipModel:
      "SPV + tokenized shares for fractional exposure; distributions per issuer waterfall.",
    fundingRoundNote: "Illustrative — not an offer.",
    documentIds: ["katzelsdorf-studie-auswechslung", "bernhardsthal-plans"],
  },
  5: {
    headline: "LandMark — high-rise & mixed use (Weinviertel)",
    location: "Weinviertel · Austria",
    imageSrc: "/Kamera02_Variante.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Kamera02_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innen01.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innenraum_Jagdschlossgasse_81.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Former silo high-rise, row houses, and small commercial bays — long-term hold with mixed residential and commercial income.",
    highlights: [
      "Diverse product mix (tower, row, retail)",
      "Income from housing and commercial",
      "Facility: €9.5M",
    ],
    creditLines: ["€9.5M facility"],
    targetRange: "Illustrative blended residential and commercial rent (demo).",
    riskNote: "More complex operations — demo, not advice.",
    illustrativePropertyValueUsd: 9_500_000,
    illustrativeShareUsd: 1000,
    squareMeters: 2250,
    units: 12,
    annualRentalIncomeEur: 332_500,
    estimatedYieldPercent: 3.5,
    propertyType: "Mixed-use",
    discoveryCategory: "Coworking Hubs",
    vision:
      "Reuse industrial scale for mixed living and work — towers, row housing, and bay retail in one investable bundle.",
    architectureNarrative:
      "High-rise silo adaptive reuse with commercial bays; renders illustrative.",
    communityUsers: ["Residents", "Retail tenants", "Coworking operators", "Commuters"],
    ownershipModel:
      "Tokenized fractional ownership with issuer-managed SPV; revenue split by lease type.",
    fundingRoundNote: "Demo economics only.",
  },
  6: {
    headline: "Vienna 1210 — value-add rental building",
    location: "Floridsdorf · Vienna, Austria",
    imageSrc: "/Innen02.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Innen02.jpg", alt: "Illustrative interior — demo" },
      { src: "/Kamera01_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Kamera02_Variante.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Older income property with ~1,700 m² existing and ~1,000 m² development potential. Business plan: renovate and sell down units (illustrative exit).",
    highlights: [
      "~1,700 m² existing, ~1,000 m² expansion potential",
      "Renovation then unit sales",
      "Facility: €5.5M",
    ],
    creditLines: ["€5.5M facility"],
    targetRange: "Illustrative exit via sales post-renovation (demo).",
    riskNote: "Construction cost and sales risk. Testnet demo.",
    illustrativePropertyValueUsd: 5_500_000,
    illustrativeShareUsd: 1000,
    squareMeters: 2700,
    units: 14,
    annualRentalIncomeEur: 137_500,
    estimatedYieldPercent: 2.5,
    propertyType: "Value-add residential",
    discoveryCategory: "Sustainable Housing",
    vision:
      "Unlock value in Floridsdorf through renovation and staged sales — transparent milestones for community backers.",
    architectureNarrative:
      "Existing ~1,700 m² plus expansion potential; study PDFs show comparable retrofit envelopes.",
    communityUsers: ["Future buyers", "Renters during construction", "Neighborhood stakeholders"],
    ownershipModel:
      "SPV holds title; tokens represent economic interests; exit via sales — high execution risk.",
    fundingRoundNote: "Illustrative raise — verify legal docs.",
    documentIds: ["katzelsdorf-studie-encoded"],
  },
  7: {
    headline: "Vienna 1010 — vacant townhouse (seven apartments)",
    location: "Innere Stadt · Vienna, Austria",
    imageSrc: "/Innen01.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Innen01.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innen02.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innenraum_Jagdschlossgasse_81.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Currently vacant seven-unit building; plan is renovation toward short-stay / furnished rental (illustrative).",
    highlights: [
      "7 units, vacant today",
      "Renovation for short-stay or furnished lease",
      "Facility: €14.5M",
    ],
    creditLines: ["€14.5M facility"],
    targetRange: "Illustrative income from short-stay after renovation (demo).",
    riskNote: "Short-stay regulation and renovation risk. Not investment advice.",
    illustrativePropertyValueUsd: 14_500_000,
    illustrativeShareUsd: 1000,
    squareMeters: 920,
    units: 7,
    annualRentalIncomeEur: 580_000,
    estimatedYieldPercent: 4.0,
    propertyType: "Urban residential",
    discoveryCategory: "Cultural Spaces",
    vision:
      "Bring a vacant inner-city building back as short-stay and cultural hospitality — community capital seeds the renovation story.",
    architectureNarrative:
      "Townhouse fabric; historic retail context; plans reference Prater-area adaptive reuse studies.",
    communityUsers: ["Tourists", "Digital nomads", "Event hosts", "Neighbours"],
    ownershipModel:
      "Tokenized fractional ownership; revenue from short-stay and events — regulation-heavy; issuer-dependent.",
    fundingRoundNote: "Illustrative campaign — not live TVL.",
    documentIds: ["altes-kaufhaus-prater"],
  },
};
