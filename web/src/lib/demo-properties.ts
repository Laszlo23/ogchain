/**
 * Curated presentation for seeded demo properties (chain metadata URIs are placeholders).
 * Not financial advice — illustrative only. Sustainability claims in copy should match verifiable ops/audit data.
 * Long-form narrative is aligned with ST-IMMO / BuildingCulture partner briefs (`st-immo-buildings.ts`).
 */
import { BERGGASSE_HERO_STILL } from "@/lib/bergasse-assets";
import type { PublicDocumentId } from "@/lib/public-documents";
import { IMMERSIVE_PROJECT_FRAMES } from "@/lib/property-geo";
import { getStImmoBuildingForDemoPropertyId, ST_IMMO_LAND_PHILOSOPHY } from "@/lib/st-immo-buildings";

/** VKP 1169 plan set — Hietzing multi-unit demo (property 2). */
const HIETZING_VKP_DOCUMENT_IDS: PublicDocumentId[] = [
  "vkp-lageplan-20220622",
  "vkp-pool-20220308",
  "vkp-haus-a-og-top3-20221102",
  "vkp-haus-b-eg-top1-20220516",
  "vkp-haus-c-eg-top2-20220308",
  "vkp-haus-e-eg-top1-20220308",
  "vkp-haus-e-eg-top3-20230316",
  "vkp-haus-e-up-tg-kg-20230621",
  "vkp-felsennest-eg-top1-20220315",
];

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
  /** Exactly three photo-first slides for cards, detail hero, and `/experience` (no plan/PDF raster art). */
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
  /** Investor card primary title (optional; defaults to `headline`) */
  investorCardTitle?: string;
  /** Investor card subtitle, e.g. district + asset class */
  investorCardSubtitle?: string;
  /** Section heading for cultural significance (optional; defaults to “Why this building matters”) */
  whyItMattersTitle?: string;
  /** Narrative under the gallery: heritage, stewardship, meaning */
  whyItMatters?: string;
  /** Human-readable unit count for cards, e.g. “7 apartments” */
  unitCountLabel?: string;
};

/** Gross yield % from illustrative income and asset value. */
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

/** Formats credit lines or legacy USD reference economics line */
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
  return `Reference economics: ${parts.join(" · ")} (not an offer — verify issuer docs).`;
}

/** Reference value in EUR for listings (field name is legacy “Usd”). */
export function formatPropertyValueEur(d: DemoPropertyDetail): string {
  const v = d.illustrativePropertyValueUsd;
  if (v == null) return "—";
  if (v >= 1_000_000) return `€${(v / 1e6).toFixed(1)}M`;
  return new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
}

/** Slides for carousel UIs; capped at `IMMERSIVE_PROJECT_FRAMES`; falls back to a single `imageSrc` / `imageAlt`. */
export function getDemoImageSlides(d: DemoPropertyDetail): DemoImageSlide[] {
  if (d.imageGallery?.length) return d.imageGallery.slice(0, IMMERSIVE_PROJECT_FRAMES);
  return [{ src: d.imageSrc, alt: d.imageAlt }];
}

const st1 = getStImmoBuildingForDemoPropertyId(1)!;
const st2 = getStImmoBuildingForDemoPropertyId(2)!;
const st3 = getStImmoBuildingForDemoPropertyId(3)!;
const st5 = getStImmoBuildingForDemoPropertyId(5)!;
const st6 = getStImmoBuildingForDemoPropertyId(6)!;
const st7 = getStImmoBuildingForDemoPropertyId(7)!;

export const DEMO_PROPERTY_DETAILS: Partial<Record<number, DemoPropertyDetail>> = {
  1: {
    headline: "Berggasse 35",
    investorCardTitle: "Berggasse Residences",
    investorCardSubtitle: "Vienna IX — Historic residential property",
    whyItMattersTitle: "Why Berggasse matters",
    whyItMatters:
      "Located in Vienna's historic 9th district (Servitenviertel), Berggasse represents the typology of late 19th-century European residential architecture — Gründerzeit scale, courtyard life, and continuity with the city's urban fabric.\n\nThrough Building Culture, the property becomes a shared cultural asset: heritage preservation aligned with long-term community investment.\n\nInvestors do not only participate in yield. They join the stewardship of architectural culture — transparent rules, fractional access, and a narrative grounded in place.",
    unitCountLabel: "7 apartments",
    location: "Vienna · Multi-asset bundle (incl. one house abroad)",
    imageSrc: "/partners/01berggasse.jpeg",
    imageAlt: "Berggasse 35 — partner project imagery (Servitenviertel)",
    imageGallery: [
      { src: "/partners/01berggasse.jpeg", alt: "Berggasse 35 — Servitenviertel (partner still)" },
      { src: BERGGASSE_HERO_STILL, alt: "Berggasse 35 — façade and tower (photography)" },
      { src: "/_T1A1366.jpg", alt: "Berggasse 35 — street view toward tower" },
    ],
    thesis:
      `This on-chain listing bundles Berggasse 35 with reference satellite holdings (see facility lines). Partner narrative — Berggasse 35: ${st1.shortDescription} ${st1.buildingStory}`,
    highlights: [
      "Berggasse: three units delivered — one sale, two income-producing",
      "Four houses: two standing (one in Canada), two value-add renovations",
      "Facilities: €13.675M (Berggasse) and €3.9M (four-house package)",
      "Reference (verify): Servitenviertel reuse — ca. 730 m² rental, ca. 340 m² terraces (partner brief)",
    ],
    creditLines: ["Berggasse (3 units): €13.675M facility", "Four houses: €3.9M facility"],
    targetRange: "Reference rent and disposition proceeds by sub-portfolio (not a forecast).",
    riskNote: "Currency, rate, and occupancy risk; Canada exposure. Not investment advice — verify issuer materials.",
    illustrativePropertyValueUsd: 13_675_000 + 3_900_000,
    illustrativeShareUsd: 1000,
    squareMeters: 3200,
    units: 7,
    annualRentalIncomeEur: 422_000,
    estimatedYieldPercent: 2.4,
    propertyType: "Mixed residential",
    discoveryCategory: "Sustainable Housing",
    vision: st1.investmentVision,
    architectureNarrative: st1.architecturalValue,
    communityUsers: ["Tenants", "Local operators", "Investors tracking portfolio yield"],
    ownershipModel:
      "Assets held in issuer structures off-chain; economic exposure via on-chain share tokens — revenue rules are issuer-specific.",
    fundingRoundNote: "Reference metrics — not a live securities offering.",
    documentIds: ["droes-plans-221219"],
  },
  2: {
    headline: "Building Culture — Jagdschlossgasse 81",
    investorCardTitle: "Building Culture — Jagdschlossgasse 81",
    investorCardSubtitle: "Vienna — Residential opposite Werkbundsiedlung",
    whyItMatters:
      "Sited opposite the Werkbundsiedlung, the architecture advances daylight, proportion, and landscape relationship — new construction in dialogue with modernist heritage.\n\nThe asset speaks to design differentiation and stable rental product beside a canonical housing context.",
    unitCountLabel: "9 apartments",
    location: "Vienna, Austria · opposite Werkbundsiedlung; near Lainzer Tiergarten",
    imageSrc: "/partners/Jagdschlossgasse-Projekte-Intro.jpg",
    imageAlt: "Jagdschlossgasse 81 — partner project imagery",
    imageGallery: [
      { src: "/partners/Jagdschlossgasse-Projekte-Intro.jpg", alt: "Jagdschlossgasse — project (partner)" },
      { src: "/partners/jagdschloss123.jpg", alt: "Jagdschlossgasse — architecture (partner)" },
      { src: "/partners/jagdschloss11.jpg", alt: "Jagdschlossgasse — context (partner)" },
    ],
    thesis: `${st2.shortDescription} ${st2.buildingStory}`,
    highlights: [
      "9 rental apartments — cubist forms, generous glazing, greenery on all sides",
      "Air-source heat pump and solar; terraces for all apartments",
      "Reference (verify): ca. €8.3M acquisition; ca. €187k p.a. gross rent (partner brief)",
    ],
    creditLines: ["Partner reference (verify): ca. €8.3M acquisition · ca. €187k p.a. rent"],
    targetRange: "Reference rental income after takeover.",
    riskNote: "Liquidity and interest-rate risk — not investment advice.",
    illustrativePropertyValueUsd: 8_300_000,
    illustrativeShareUsd: 1000,
    squareMeters: 553 + 106 + 429,
    units: 9,
    annualRentalIncomeEur: 187_000,
    estimatedYieldPercent: 2.25,
    propertyType: "Multi-family residential",
    discoveryCategory: "Sustainable Housing",
    vision: st2.investmentVision,
    architectureNarrative: st2.architecturalValue,
    communityUsers: ["Residents", "Design-conscious tenants", "Commuters near recreation"],
    ownershipModel:
      "SPV + tokenized shares for fractional exposure; distributions per issuer waterfall.",
    fundingRoundNote: "Reference figures — not an offer.",
    documentIds: ["bau-land-kultur-20201113"],
  },
  3: {
    headline: "Water Side",
    investorCardTitle: "Water Side",
    investorCardSubtitle: "Carinthia — Lakeside residential",
    whyItMatters:
      "Water Side gathers housing into a single landscape idea: timber, glass, and orientation to Lake Keutschach and the Sattnitz range — regional modernism at environmental scale.\n\nInvestors align with a finite natural setting: hospitality-grade amenity with residential durability, disclosed issuer economics, and a culture-forward rural narrative.",
    unitCountLabel: "34 apartments",
    location: "Keutschach am See · Carinthia, Austria",
    imageSrc: "/partners/Keutschach-am-See-1b-1.jpg",
    imageAlt: "Water Side Keutschach — lake and scheme (partner imagery)",
    imageGallery: [
      { src: "/partners/Keutschach-am-See-1b-1.jpg", alt: "Keutschach am See — partner project still" },
      { src: "/partners/keutschach-am-see.jpeg", alt: "Keutschach — lake and architecture (photography)" },
      { src: "/partners/keutschachamsee011.jpeg", alt: "Keutschach — lakeside (photography)" },
    ],
    thesis: `${st3.shortDescription} ${st3.buildingStory}`,
    highlights: [
      "Six buildings · 34 apartments (partner brief)",
      "Lake and Sattnitz panorama; private lake access with jetty and bathhouse (verify)",
      "Geothermal heat and cooling; terraces for all units",
      "Reference (verify): ca. €10.5M acquisition; ca. €250k p.a. gross rent (partner brief)",
    ],
    creditLines: ["Partner reference (verify): ca. €10.5M acquisition · ca. €250k p.a. rent"],
    targetRange: "Reference in-place rents after acquisition.",
    riskNote: "Market and tenant default risk. Not an offering — verify legal docs.",
    illustrativePropertyValueUsd: 10_500_000,
    illustrativeShareUsd: 1000,
    squareMeters: 802 + 230 + 429,
    units: 34,
    annualRentalIncomeEur: 250_000,
    estimatedYieldPercent: 2.4,
    propertyType: "Multi-family residential",
    discoveryCategory: "Creative Villages",
    vision: st3.investmentVision,
    architectureNarrative: st3.architecturalValue,
    communityUsers: ["Remote workers", "Artists", "Founders", "Locals", "Seasonal visitors"],
    ownershipModel:
      "Property → SPV → on-chain share token → community investors → rental revenue (issuer-dependent) and governance per charter.",
    fundingRoundNote: "Campaign figures on the homepage are reference; reconcile with on-chain reads and issuer filings.",
    documentIds: ["stix-a3-klein", "stix-baukultur-en-20221110", "water-side-keutschach-20220112"],
  },
  4: {
    headline: "Hietzing — ten apartments (interim reference)",
    investorCardTitle: "Hietzing VKP 1169 (reference)",
    investorCardSubtitle: "Vienna XIII — Interim stills; plans on property page",
    whyItMatters:
      "A ten-unit building nearing completion in a mature Vienna residential belt — precision planning, durable envelopes, and lease-up economics suited to long maintenance cycles.\n\nParticipation here supports community-aligned housing stock: institutional clarity with design-forward interiors, not peripheral sprawl.",
    location: "Hietzing · Vienna, Austria",
    /**
     * Interim: pool stills from VKP marketing PDFs. Floorplans and plan PDFs belong in documents only — replace carousel with partner photography when available.
     */
    imageSrc: "/extracted/vkp-pool-20220308/page-01.jpg",
    imageAlt: "Hietzing VKP 1169 — outdoor pool (reference still; plans in documents)",
    imageGallery: [
      { src: "/extracted/vkp-pool-20220308/page-01.jpg", alt: "Hietzing VKP 1169 — outdoor pool (reference)" },
      { src: "/extracted/vkp-pool-20220308/page-01.jpg", alt: "Hietzing VKP 1169 — outdoor pool (reference)" },
      { src: "/extracted/vkp-pool-20220308/page-01.jpg", alt: "Hietzing VKP 1169 — outdoor pool (reference)" },
    ],
    thesis:
      "Multi-family building with ten apartments — nearing completion (about three months to handover). Units are intended for lease-up after delivery. Aligned with Building Culture’s standard: precision planning, durable envelopes, and long-horizon stewardship for residents and backers.",
    highlights: [
      "10 apartments, completion in ~3 months",
      "Lease-up after handover",
      "Facility: €7.0M",
    ],
    creditLines: ["€7.0M facility"],
    targetRange: "Reference rental income after completion and letting.",
    riskNote: "Construction and lease-up risk until stabilized — verify issuer disclosures.",
    illustrativePropertyValueUsd: 7_000_000,
    illustrativeShareUsd: 1000,
    squareMeters: 1850,
    units: 10,
    annualRentalIncomeEur: 210_000,
    estimatedYieldPercent: 3.0,
    propertyType: "Multi-family residential",
    discoveryCategory: "Sustainable Housing",
    vision:
      "Deliver modern, efficient apartments near Hietzing for residents who want stable, well-managed homes — funded with clear on-chain rails for community participation. " +
      ST_IMMO_LAND_PHILOSOPHY[1],
    architectureNarrative:
      "Ten-unit building nearing completion with modernist clarity — efficient cores, generous daylight, and calm interiors; interim visuals are VKP collateral — verify on site.",
    communityUsers: ["Families", "Commuters", "Local landlords transitioning to institutional hold"],
    ownershipModel:
      "Property → SPV → share token → investors; lease-up risk until stabilized — see risk factors.",
    fundingRoundNote: "Reference funding progress — verify against on-chain and issuer data.",
    documentIds: HIETZING_VKP_DOCUMENT_IDS,
  },
  5: {
    headline: "LandMark",
    investorCardTitle: "LandMark",
    investorCardSubtitle: "Weinviertel — Mixed-use village landmark",
    whyItMatters:
      "A rural–urban landmark converting agricultural storage into housing and a reactivated village heart — compacting the settlement inward rather than expanding its edge.\n\nInvestors gain diversified income potential (residential plus commercial and cultural ground plane) with a strong reuse and energy narrative.",
    unitCountLabel: "31 units",
    location: "Bernhardsthal · Weinviertel · Austria",
    imageSrc: "/partners/01landmark.png",
    imageAlt: "Land-Mark Bernhardsthal — partner visualization",
    imageGallery: [
      { src: "/partners/01landmark.png", alt: "Land-Mark — visualization" },
      { src: "/partners/02landmark.png", alt: "Land-Mark — visualization" },
      { src: "/partners/01bernhardsthal.png", alt: "Bernhardsthal — village context" },
    ],
    thesis: `${st5.shortDescription} ${st5.buildingStory}`,
    highlights: [
      "24 apartments · 4 terraced houses · 3 commercial / office units (partner brief)",
      "Geothermal heat/cooling; photovoltaics; grain-storage conversion to housing",
      "Optional ground-floor activation (education/community) — subject to zoning and operators",
      "Reference (verify): ca. €10.9M acquisition; ca. €350k p.a. gross rent (partner brief)",
    ],
    creditLines: ["Partner reference (verify): ca. €10.9M acquisition · ca. €350k p.a. rent"],
    targetRange: "Reference blended residential and commercial rent.",
    riskNote: "More complex operations — not advice; verify operator plans.",
    illustrativePropertyValueUsd: 10_900_000,
    illustrativeShareUsd: 1000,
    squareMeters: 2371 + 1020 + 656,
    units: 31,
    annualRentalIncomeEur: 350_000,
    estimatedYieldPercent: 3.2,
    propertyType: "Mixed-use",
    discoveryCategory: "Coworking Hubs",
    vision: st5.investmentVision,
    architectureNarrative: st5.architecturalValue,
    communityUsers: ["Residents", "Retail tenants", "Coworking operators", "Commuters"],
    ownershipModel:
      "Tokenized fractional ownership with issuer-managed SPV; revenue split by lease type.",
    fundingRoundNote: "Reference economics — verify issuer statements.",
    documentIds: ["land-mark-bernhardsthal-20210625", "bernhardsthal-plans"],
  },
  6: {
    headline: "Altes Presshaus — Katzelsdorf",
    investorCardTitle: "Altes Presshaus",
    investorCardSubtitle: "Katzelsdorf — Adaptive reuse residential",
    whyItMatters:
      "Historic press-house fabric converted to loft-like living — visible half-timber and masonry as the design programme, not decoration.\n\nThis is place-led revitalisation: character stock with disciplined energy retrofit and community-oriented fractional pools.",
    unitCountLabel: "4 units",
    location: "Katzelsdorf · Weinviertel · Austria",
    imageSrc: "/partners/01katzelsdorf.png",
    imageAlt: "Altes Presshaus Katzelsdorf — partner imagery",
    imageGallery: [
      { src: "/partners/01katzelsdorf.png", alt: "Katzelsdorf — partner visualization" },
      { src: "/partners/02katzelsdorf.png", alt: "Katzelsdorf — partner visualization" },
      { src: "/partners/03katzelsdorf.png", alt: "Katzelsdorf — partner visualization" },
    ],
    thesis: `${st6.shortDescription} ${st6.buildingStory}`,
    highlights: [
      "Loft-like plan; visible half-timber in roof truss — tectonic authenticity",
      "Air-source heat pump and solar; terraces; no unnecessary sealing",
      "Reference (verify): ca. €950k acquisition; ca. €70k p.a. gross rent (partner brief)",
    ],
    creditLines: ["Partner reference (verify): ca. €950k acquisition · ca. €70k p.a. rent"],
    targetRange: "Reference in-place rents after renovation.",
    riskNote: "Construction and lease-up risk — verify schedules and budgets.",
    illustrativePropertyValueUsd: 950_000,
    illustrativeShareUsd: 1000,
    squareMeters: 300 + 100 + 800,
    units: 4,
    annualRentalIncomeEur: 70_000,
    estimatedYieldPercent: 7.4,
    propertyType: "Adaptive reuse residential",
    discoveryCategory: "Rural Revitalization",
    vision: st6.investmentVision,
    architectureNarrative: st6.architecturalValue,
    communityUsers: ["Locals", "Remote workers", "Operators seeking character stock"],
    ownershipModel:
      "SPV holds title; tokens represent economic interests; revenue per issuer waterfall.",
    fundingRoundNote: "Reference raise — verify legal docs.",
    documentIds: ["katzelsdorf-studie-auswechslung", "katzelsdorf-studie-encoded"],
  },
  7: {
    headline: "Former department store — Bernhardsthal",
    investorCardTitle: "Historic department store",
    investorCardSubtitle: "Bernhardsthal — Village-centre mixed use",
    whyItMatters:
      "A compact heritage retail building reborn as dwelling, hospitality, and townhouse living — high-street revitalisation without sprawl.\n\nInvestors participate in diversified micro-income streams and a heritage narrative compatible with transparent fractional models.",
    unitCountLabel: "3 units",
    location: "Bernhardsthal · Weinviertel · Austria · village centre",
    imageSrc: "/partners/04bernhardsthal.png",
    imageAlt: "Former department store — Bernhardsthal village centre (partner still)",
    imageGallery: [
      { src: "/partners/04bernhardsthal.png", alt: "Bernhardsthal — heritage department store and street front (partner still)" },
      { src: "/partners/05bernhardsthal.png", alt: "Bernhardsthal village centre — retail fabric and public space (partner still)" },
      { src: "/partners/02bernhardsthal.png", alt: "Bernhardsthal — historic commercial building, village-scale reuse (partner still)" },
    ],
    thesis: `${st7.shortDescription} ${st7.buildingStory}`,
    highlights: [
      "Apartment, café, and modern townhouse — mixed programme in one historic retail fabric",
      "Air-source heat pump and solar; cooling yards; terraces",
      "Reference (verify): ca. €850k acquisition; ca. €50k p.a. gross rent (partner brief)",
    ],
    creditLines: ["Partner reference (verify): ca. €850k acquisition · ca. €50k p.a. rent"],
    targetRange: "Reference blended rent and hospitality income.",
    riskNote: "Operational and renovation risk. Not investment advice.",
    illustrativePropertyValueUsd: 850_000,
    illustrativeShareUsd: 1000,
    squareMeters: 400 + 100 + 200,
    units: 3,
    annualRentalIncomeEur: 50_000,
    estimatedYieldPercent: 5.9,
    propertyType: "Mixed-use adaptive reuse",
    discoveryCategory: "Rural Revitalization",
    vision: st7.investmentVision,
    architectureNarrative: st7.architecturalValue,
    communityUsers: ["Village residents", "Café patrons", "Townhouse occupants"],
    ownershipModel:
      "Tokenized fractional ownership; diversified micro-income streams — issuer-dependent.",
    fundingRoundNote: "Reference campaign — verify issuer docs; not live TVL.",
    documentIds: ["altes-kaufhaus-prater", "bernhardsthal-plans"],
  },
};
