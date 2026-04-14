/**
 * Curated presentation for seeded demo properties (chain metadata URIs are placeholders).
 * Not financial advice — illustrative only.
 */
export type DemoImageSlide = { src: string; alt: string };

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
  },
};
