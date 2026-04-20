/**
 * Curated listing narratives for registered properties (chain metadata may still use placeholder URIs).
 * Not financial advice. Sustainability claims in copy should match verifiable operations and audit data.
 * Long-form narrative aligns with ST-IMMO / BuildingCulture partner briefs (`st-immo-buildings.ts`).
 */
import { BERGGASSE_HERO_STILL } from "@/lib/bergasse-assets";
import { demoWholeTokenSupply } from "@/lib/demo-investment-math";
import type { PublicDocumentId } from "@/lib/public-documents";
import { IMMERSIVE_PROJECT_FRAMES } from "@/lib/property-geo";
import { getStImmoBuildingForDemoPropertyId } from "@/lib/st-immo-buildings";

/** Target yield band shown on listings — not a guarantee (see disclaimer). */
export const REFERENCE_YIELD_BAND_LABEL = "7–10%";

export const REFERENCE_YIELD_DISCLAIMER =
  "Target band for orientation only — not guaranteed. Actual results depend on issuer terms, occupancy, leverage, taxes, currency, and market conditions.";

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
  /** Sustainability / stewardship bullets (partner “Green Print”) */
  greenPrint?: string[];
  /** Third-party brokerage / data-room text — verify independently; not an offer by Building Culture */
  brokerOrDataRoomNotice?: string;
  /** One emotional line under the hero title (place-first hook). */
  emotionalHero?: string;
  /** Building / architecture / history — investor-facing story (section “Building story”). */
  buildingStory?: string;
  /** Who owns what off-chain; what the token represents; issuer — bullet list. */
  assetStructureBullets?: string[];
  /** Investor economics: distributions, governance hooks, transfer rules — bullets. */
  investorRightsBullets?: string[];
  /** Exit paths — illustrative; not guaranteed (secondary, refinance, sale). */
  exitOptionsBullets?: string[];
  /** Optional trust row overrides next to the invest column. */
  trustStrip?: {
    issuerDisplayName?: string;
    jurisdictionLine?: string;
    custodyLine?: string;
  };
  /** Simulator presets currency (defaults to USD-style labels if unset). */
  simulatorCurrency?: "EUR" | "USD";
  /** Invest page: liquidity / lock / buyback framing — illustrative; issuer terms override. */
  liquidityRulesBullets?: string[];
};

/** Reference price per whole-token unit using demo cap math (same currency basis as `illustrativePropertyValueUsd`). */
export function getReferencePricePerShareUnits(d: DemoPropertyDetail): number | null {
  const v = d.illustrativePropertyValueUsd;
  if (v == null || v <= 0) return null;
  const cap = demoWholeTokenSupply(v);
  if (cap <= 0) return null;
  return v / cap;
}

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

/** Slides for carousel UIs; default cap for cards/home; use `{ limit: 48 }` on property detail heroes. */
export function getDemoImageSlides(d: DemoPropertyDetail, opts?: { limit?: number }): DemoImageSlide[] {
  const limit = opts?.limit ?? IMMERSIVE_PROJECT_FRAMES;
  if (d.imageGallery?.length) return d.imageGallery.slice(0, limit);
  return [{ src: d.imageSrc, alt: d.imageAlt }];
}

const st1 = getStImmoBuildingForDemoPropertyId(1)!;
const st2 = getStImmoBuildingForDemoPropertyId(2)!;
const st3 = getStImmoBuildingForDemoPropertyId(3)!;
const st5 = getStImmoBuildingForDemoPropertyId(5)!;
const st6 = getStImmoBuildingForDemoPropertyId(6)!;
const st7 = getStImmoBuildingForDemoPropertyId(7)!;

/** Shared reference: property #2 and #4 in the demo seed both map to Jagdschlossgasse 81 (Hietzing VKP was a duplicate slot). */
const DEMO_JAGDSCHLOSSGASSE_81: DemoPropertyDetail = {
  headline: "Building Culture City Jagdschlossgasse 81",
  emotionalHero:
    "Nine homes opposite the Werkbundsiedlung — new Viennese housing in conversation with modernist heritage.",
  buildingStory:
    "Cubist forms, generous glazing, and terraces face greenery on all sides. Heat pumps and solar anchor operating costs while the building courts tenants who value design and proximity to recreation.\n\nFigures in partner briefs are reference only — verify acquisition, rent roll, and SPV structure with the issuer.",
  assetStructureBullets: [
    "Title and debt live in issuer SPVs off-chain; tokens represent contractual economic exposure.",
    "Share token transfers may be restricted — check ComplianceRegistry and offering terms.",
    "Rent and capex flow through issuer-controlled accounts — waterfall in disclosure.",
  ],
  investorRightsBullets: [
    "Cash-flow participation only when declared by the issuer — not a guaranteed coupon.",
    "Governance follows issuer articles and any token-side hooks described in documents.",
    "Liquidity via permitted secondary venues or OTC — pool depth varies.",
  ],
  exitOptionsBullets: [
    "Secondary trading when pools exist and rules allow.",
    "Potential asset sale or refinance — issuer-dependent and time-uncertain.",
    "No mandatory redemption — align horizon with offering documents.",
  ],
  trustStrip: {
    issuerDisplayName: "Issuer SPV (reference — verify offering)",
    jurisdictionLine: "Austria — confirm prospectus / exemption path with counsel.",
    custodyLine: "Building custody per land register excerpts in issuer data room.",
  },
  simulatorCurrency: "EUR",
  liquidityRulesBullets: [
    "Investment lock period — reference 30 days after purchase (verify issuer program).",
    "Sell / buyback request cooldown — reference 7 days before buyback execution (if offered).",
    "Buyback capacity — reference up to 15% of treasury processed per cycle (program cap; verify issuer).",
    "Secondary trading — when AMM pools exist and rules allow (depth varies).",
  ],
  investorCardTitle: "Building Culture City Jagdschlossgasse 81",
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
  /** Lettable reference m² — Apr 2026 fact sheet (terrace/garden in partner brief). */
  squareMeters: 553,
  units: 9,
  annualRentalIncomeEur: 187_000,
  propertyType: "Multi-family residential",
  discoveryCategory: "Sustainable Housing",
  vision: st2.investmentVision,
  architectureNarrative: st2.architecturalValue,
  communityUsers: ["Residents", "Design-conscious tenants", "Commuters near recreation"],
  ownershipModel: "SPV + tokenized shares for fractional exposure; distributions per issuer waterfall.",
  fundingRoundNote: "Reference figures — not an offer.",
  documentIds: ["bau-land-kultur-20201113"],
};

export const DEMO_PROPERTY_DETAILS: Partial<Record<number, DemoPropertyDetail>> = {
  1: {
    headline: "Building Culture City Berggasse",
    emotionalHero:
      "A 19th-century Viennese ensemble in the Servitenviertel — opening stewardship of heritage to a global community.",
    buildingStory:
      "Berggasse sits where Gründerzeit fabric meets everyday Vienna: courtyards, rooflines, and rental homes woven into the 9th district. The bundle combines the landmark Berggasse position with reference satellite holdings — partner economics are summarized under Financial breakdown; reconcile every figure with issuer filings before committing capital.\n\nArchitecture here is not a render: it is continuity with the city — daylight, proportion, and long renewal horizons that match patient capital.",
    assetStructureBullets: [
      "Legal title to land and buildings sits with issuer SPVs and registered owners off-chain — not automatic on-chain title.",
      "The ERC-20 share token represents a programmed economic interest under issuer disclosure — not a direct land registry claim for the wallet.",
      "Issuance, compliance gating, and distributions follow the issuer’s offering documents and ComplianceRegistry rules on this chain.",
    ],
    investorRightsBullets: [
      "Economic participation per issuer waterfall — typically pro-rata to tokens for declared distributions (verify SPV docs).",
      "Governance hooks depend on issuer design; on-chain admin roles are protocol-side — not a shareholder vote by default.",
      "Transfers may be restricted for regulated offerings; secondary liquidity requires pools and permitted venues.",
    ],
    exitOptionsBullets: [
      "Secondary: swap or OTC when ComplianceRegistry and liquidity allow — see Trade after you hold shares.",
      "Issuer-led events: potential refinance or portfolio sale — timelines and gates are disclosure-specific (not guaranteed).",
      "No guaranteed buy-back — treat tokens as long-duration exposure unless issuer terms say otherwise.",
    ],
    trustStrip: {
      issuerDisplayName: "Issuer SPV (reference — verify in offering docs)",
      jurisdictionLine: "Austria / EU offering context — confirm with counsel.",
      custodyLine: "Land/building custody: Austrian land register + issuer structure — verify cadastre excerpts in data room.",
    },
    simulatorCurrency: "EUR",
    liquidityRulesBullets: [
      "Investment lock period — reference 30 days after purchase (verify issuer program).",
      "Sell / buyback request cooldown — reference 7 days before buyback execution (if offered).",
      "Buyback capacity — reference up to 15% of treasury processed per cycle (program cap; verify issuer).",
      "Secondary trading — when AMM pools exist and rules allow (depth varies).",
    ],
    investorCardTitle: "Building Culture City Berggasse",
    investorCardSubtitle: "Vienna IX — Historic residential property",
    whyItMattersTitle: "Why Berggasse matters",
    whyItMatters:
      "Located in Vienna's historic 9th district (Servitenviertel), Berggasse represents the typology of late 19th-century European residential architecture — Gründerzeit scale, courtyard life, and continuity with the city's urban fabric.\n\nThrough Building Culture, the property becomes a shared cultural asset: heritage preservation aligned with long-term community investment.\n\nInvestors participate in yield and in the stewardship of architectural culture — transparent rules, fractional access, and a narrative grounded in place.",
    unitCountLabel: "3 apartments",
    location: "Vienna · Multi-asset bundle (incl. one house abroad)",
    imageSrc: "/partners/01berggasse.jpeg",
    imageAlt: "Building Culture City Berggasse — Servitenviertel (partner still)",
    imageGallery: [
      { src: "/partners/01berggasse.jpeg", alt: "Berggasse 35 — Servitenviertel (partner still)" },
      { src: BERGGASSE_HERO_STILL, alt: "Berggasse 35 — façade and tower (photography)" },
      { src: "/_T1A1366.jpg", alt: "Berggasse 35 — street view toward tower" },
      { src: "/berg01.jpg", alt: "Building Culture City Berggasse — 1" },
      { src: "/berg02.jpg", alt: "Building Culture City Berggasse — 2" },
      { src: "/berg03.jpg", alt: "Building Culture City Berggasse — 3" },
      { src: "/berg04.jpg", alt: "Building Culture City Berggasse — 4" },
      { src: "/berg05.jpg", alt: "Building Culture City Berggasse — 5" },
      { src: "/berg06.jpg", alt: "Building Culture City Berggasse — 6" },
      { src: "/berg07.jpg", alt: "Building Culture City Berggasse — 7" },
      { src: "/berg08.jpg", alt: "Building Culture City Berggasse — 8" },
      { src: "/berg09.jpg", alt: "Building Culture City Berggasse — 9" },
      { src: "/berg10.jpg", alt: "Building Culture City Berggasse — 10" },
      { src: "/berg11.jpg", alt: "Building Culture City Berggasse — 11" },
    ],
    thesis:
      `This on-chain listing bundles Berggasse 35 with reference satellite holdings (see facility lines). Partner narrative — Berggasse 35: ${st1.shortDescription} ${st1.buildingStory}`,
    highlights: [
      "Apr 2026 fact sheet — Berggasse line: KP samt NK €15.917M · Miete €25k p.a. · 730 m² (verify data room).",
      "Servitenviertel Gründerzeit — satellite holdings and terraces under separate diligence.",
      "Discovery and token workflow on-platform — issuer terms govern any offering.",
    ],
    creditLines: ["Fact sheet (Apr 2026): €15.917M KP · €25k p.a. gross rent — Berggasse reference"],
    targetRange: "Reference in-place economics — issuer model governs distributions.",
    riskNote: "Currency, rate, and occupancy risk. Not investment advice — verify issuer materials.",
    illustrativePropertyValueUsd: 15_917_000,
    illustrativeShareUsd: 1000,
    squareMeters: 730,
    units: 3,
    annualRentalIncomeEur: 25_000,
    propertyType: "Mixed residential",
    discoveryCategory: "Sustainable Housing",
    vision: st1.investmentVision,
    architectureNarrative: st1.architecturalValue,
    communityUsers: ["Tenants", "Local operators", "Investors tracking portfolio yield"],
    ownershipModel:
      "Assets held in issuer structures off-chain; economic exposure via on-chain share tokens — revenue rules are issuer-specific.",
    fundingRoundNote: "Reference metrics — not a live securities offering.",
    documentIds: ["berggasse-brochure-en"],
  },
  2: DEMO_JAGDSCHLOSSGASSE_81,
  3: {
    headline: "BuildingCultureLand – Whalewatching",
    investorCardTitle: "BuildingCultureLand – Whalewatching",
    investorCardSubtitle: "Canada — coastal lodge reference (not Keutschach / Water Side)",
    whyItMatters:
      "BuildingCultureLand – Whalewatching groups reference coastal lodge assets in Canada (renovation and extension of the original cottage, structure and sea-ward orientation preserved). This is not the Carinthia Water Side / Keutschach programme, which remains a separate partner archive in the portfolio.\n\nIssuers should reconcile geography and disclosures before any offering.",
    unitCountLabel: "Reference lodge / hospitality programme",
    location: "Canada — coastal reference (verify province and parcel with issuer)",
    imageSrc: "/whale01.jpg",
    imageAlt: "BuildingCultureLand – Whalewatching — Canada coastal lodge reference imagery",
    imageGallery: [
      { src: "/whale01.jpg", alt: "Whalewatching — 1" },
      { src: "/whale02.jpg", alt: "Whalewatching — 2" },
      { src: "/whale03.jpg", alt: "Whalewatching — 3" },
      { src: "/whale04.jpg", alt: "Whalewatching — 4" },
      { src: "/whale05.jpg", alt: "Whalewatching — 5" },
      { src: "/whale06.jpg", alt: "Whalewatching — 6" },
    ],
    thesis: `${st3.shortDescription} ${st3.buildingStory}`,
    highlights: [
      "Canadian coastal reference programme — not Water Side Keutschach (Carinthia); see archived Water Side narrative separately.",
      "Fact sheet (reference): total rental area ca. 440 m² · terrace ca. 100 m² · garden ca. 800 m²",
      "Reference acquisition ca. €2.9M · gross rental income ca. €100k p.a. (partner figures — verify FX and entity)",
      "Teaser PDF (Biberstraße, Vienna) is third-party brokerage diligence — unrelated geography to the Canadian lodge narrative.",
    ],
    creditLines: ["Partner reference (verify): ca. €2.9M acquisition · ca. €100k p.a. gross rent"],
    targetRange: "Reference in-place rents — verify issuer model.",
    riskNote:
      "Mixed collateral narrative (Canada lodge vs Austria brokerage PDF). Not Keutschach. Verify legal descriptions and issuer mapping. Not an offering.",
    illustrativePropertyValueUsd: 2_900_000,
    illustrativeShareUsd: 1000,
    /** Fact sheet lettable m²; terrace/garden on Culture Land card. */
    squareMeters: 440,
    units: 1,
    annualRentalIncomeEur: 100_000,
    propertyType: "Canada coastal lodge (reference)",
    discoveryCategory: "Rural Revitalization",
    vision: st3.investmentVision,
    architectureNarrative: st3.architecturalValue,
    communityUsers: ["Guests", "Operators", "Community investors (reference)"],
    ownershipModel:
      "SPV / issuer structures off-chain; token represents economic exposure per disclosure — revenue rules are issuer-specific.",
    fundingRoundNote: "Reference economics — reconcile with on-chain reads and issuer filings.",
    documentIds: ["teaser-biberstrasse-4-1010-wien"],
    greenPrint: [
      "Large green yards that help cool the microclimate",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
    brokerOrDataRoomNotice:
      "The following excerpt reproduces third-party brokerage correspondence for orientation alongside the teaser PDF. It is not an offer by Building Culture; dates and procedures may change — verify with the appointed broker and counsel.\n\nLadies and Gentlemen,\n\nWe respectfully inform you that our company has been appointed by the owner as the exclusive agent for the sale of the following property:\n\n1010 Vienna, Biberstraße 4\n\nAfter submitting the confidentiality agreement (Appendix B) to o.friedrich@friedrich.at, you will be granted access to the data room without delay.\n\nA binding purchase offer (Appendix C), including a financing confirmation or proof of capital from an Austrian bank specifically for this property, must be sent by registered mail or email to the appointed real estate agent Otto Friedrich & Partner Immobilientreuhand GmbH, Krotenthallergasse 6, 1080 Vienna, no later than Thursday, May 7, 2026.\n\nFor a personal consultation and information, please contact Mr. Otto Friedrich by telephone at 0664/340 87 66 or by email at o.friedrich@friedrich.at.\n\nIn the event of a purchase, the broker's commission is 3% of the transaction value plus statutory VAT.\n\nThe seller will bear the costs of drawing up the purchase agreement, including its registration in the land register.\n\nMr. RA Dr. Georg Braunegg, Elisabethstraße 15, 1010 Vienna, has been commissioned with the preparation of the purchase agreement, the assumption of escrow and the implementation in the land register.\n\nThe general terms and conditions apply in accordance with the brokerage regulations also attached as an attachment (Appendix D).",
  },
  4: {
    ...DEMO_JAGDSCHLOSSGASSE_81,
    fundingRoundNote:
      "Same Jagdschlossgasse 81 reference as listing #2 — duplicate demo registry token id historically labeled “Hietzing”; not the VKP Hietzing interim. Align cap table with issuer.",
  },
  5: {
    headline: "BuildingCultureLand – LandMark",
    investorCardTitle: "BuildingCultureLand – LandMark",
    investorCardSubtitle: "Bernhardsthal · Weinviertel — Mixed-use village landmark",
    whyItMatters:
      "A modern village is growing from the former warehouse area in Bernhardsthal (Weinviertel, northeast of Vienna): a residential tower will house lofts with spacious terraces, and the lively ground floor zone will turn the formerly dormant site into a new village quarter.\n\nLandMark converts a granary into modern living with historic agricultural charm and original features. The high-rise and long building will be extended by four terraced houses with apartment roofs covered in greenery, while the ground floor zone will host commercial and common areas as well as cultural utilisation.\n\nLandMark is an icon of rural–modern living: open structures of the former warehouse are reused; generous glass surfaces and natural materials support a modern, cosy atmosphere. Unlike new settlements on the outskirts, new living space is created here in the village centre — compacting the settlement inward with respect for the evolved landscape.",
    unitCountLabel: "31 units",
    location: "Bernhardsthal · Weinviertel · Austria",
    imageSrc: "/land0.jpg",
    imageAlt: "BuildingCultureLand – LandMark — Bernhardsthal",
    imageGallery: [
      { src: "/land0.jpg", alt: "LandMark — context 1" },
      { src: "/land01.jpg", alt: "LandMark — context 2" },
      { src: "/land02.jpg", alt: "LandMark — context 3" },
      { src: "/land03.jpg", alt: "LandMark — context 4" },
      { src: "/land04.jpg", alt: "LandMark — context 5" },
      { src: "/CAM02 2.jpg", alt: "LandMark — CAM 02" },
      { src: "/CAM03 2.jpg", alt: "LandMark — CAM 03" },
      { src: "/CAM05.jpg", alt: "LandMark — CAM 05" },
      { src: "/CAM06.jpg", alt: "LandMark — CAM 06" },
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
    /** Fact sheet programme lettable m². */
    squareMeters: 2371,
    units: 31,
    annualRentalIncomeEur: 350_000,
    propertyType: "Mixed-use",
    discoveryCategory: "Coworking Hubs",
    vision: st5.investmentVision,
    architectureNarrative: st5.architecturalValue,
    communityUsers: ["Residents", "Retail tenants", "Coworking operators", "Commuters"],
    ownershipModel:
      "Tokenized fractional ownership with issuer-managed SPV; revenue split by lease type.",
    fundingRoundNote: "Reference economics — verify issuer statements.",
    documentIds: ["land-mark-bernhardsthal-20210625", "bernhardsthal-plans"],
    greenPrint: [
      "Geothermal heat and cooling",
      "Photovoltaics",
      "Large green yards that help cool the microclimate",
      "Terraces for all apartments",
      "No unnecessary sealing of valuable land",
      "Conversion of grain storage into contemporary apartments — high-quality reuse",
    ],
  },
  6: {
    headline: "BuildingCultureLand – Altes Presshaus",
    investorCardTitle: "BuildingCultureLand – Altes Presshaus",
    investorCardSubtitle: "Katzelsdorf — Adaptive reuse residential",
    whyItMatters:
      "Historic press-house fabric converted to loft-like living — visible half-timber and masonry as the design programme, not decoration.\n\nThis is place-led revitalisation: character stock with disciplined energy retrofit and community-oriented fractional pools.",
    unitCountLabel: "4 units",
    location: "Katzelsdorf · Weinviertel · Austria",
    imageSrc: "/press0.jpg",
    imageAlt: "BuildingCultureLand – Altes Presshaus — Katzelsdorf",
    imageGallery: [
      { src: "/press0.jpg", alt: "Altes Presshaus — 1" },
      { src: "/press01.jpg", alt: "Altes Presshaus — 2" },
      { src: "/press02.jpg", alt: "Altes Presshaus — 3" },
      { src: "/press03.jpg", alt: "Altes Presshaus — 4" },
      { src: "/press04.jpg", alt: "Altes Presshaus — 5" },
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
    squareMeters: 300,
    units: 4,
    annualRentalIncomeEur: 70_000,
    propertyType: "Adaptive reuse residential",
    discoveryCategory: "Rural Revitalization",
    vision: st6.investmentVision,
    architectureNarrative: st6.architecturalValue,
    communityUsers: ["Locals", "Remote workers", "Operators seeking character stock"],
    ownershipModel:
      "SPV holds title; tokens represent economic interests; revenue per issuer waterfall.",
    fundingRoundNote: "Reference raise — verify legal docs.",
    documentIds: ["katzelsdorf-studie-auswechslung", "katzelsdorf-studie-encoded"],
    greenPrint: [
      "Air-source heat pump and solar",
      "Large green yards that help cool the microclimate",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
  },
  7: {
    headline: "BuildingCultureLand – Former department store",
    investorCardTitle: "BuildingCultureLand – Former department store",
    investorCardSubtitle: "Bernhardsthal — Village-centre mixed use",
    whyItMatters:
      "A compact heritage retail building reborn as dwelling, hospitality, and townhouse living — high-street revitalisation without sprawl.\n\nInvestors participate in diversified micro-income streams and a heritage narrative compatible with transparent fractional models.",
    unitCountLabel: "3 units",
    location: "Bernhardsthal · Weinviertel · Austria · village centre",
    imageSrc: "/old01.jpg",
    imageAlt: "BuildingCultureLand – Former department store — Bernhardsthal",
    imageGallery: [
      { src: "/old01.jpg", alt: "Former department store — 1" },
      { src: "/old02.jpg", alt: "Former department store — 2" },
      { src: "/old03.jpg", alt: "Former department store — 3" },
      { src: "/old04.jpg", alt: "Former department store — 4" },
      { src: "/old05.jpg", alt: "Former department store — 5" },
      { src: "/old06.jpg", alt: "Former department store — 6" },
      { src: "/old07.jpg", alt: "Former department store — 7" },
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
    squareMeters: 400,
    units: 3,
    annualRentalIncomeEur: 50_000,
    propertyType: "Mixed-use adaptive reuse",
    discoveryCategory: "Rural Revitalization",
    vision: st7.investmentVision,
    architectureNarrative: st7.architecturalValue,
    communityUsers: ["Village residents", "Café patrons", "Townhouse occupants"],
    ownershipModel:
      "Tokenized fractional ownership; diversified micro-income streams — issuer-dependent.",
    fundingRoundNote: "Reference campaign — verify issuer docs; not live TVL.",
    documentIds: ["altes-kaufhaus-prater", "bernhardsthal-plans"],
    greenPrint: [
      "Air-source heat pump and solar",
      "Green yards for cooling",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
  },
};

/** Token address used when the registry has no deployed share contracts yet — narrative-only grid. */
export const DEMO_LISTING_PLACEHOLDER_TOKEN =
  "0x0000000000000000000000000000000000000000" as const satisfies `0x${string}`;

export type DemoListingFallbackRow = {
  id: bigint;
  tokenAddress: `0x${string}`;
  name: string;
  symbol: string;
  demo?: DemoPropertyDetail;
};

/** When on-chain registry is empty (`nextPropertyId <= 1`), drive the discovery grid from demo copy (images + metrics). */
export function getDemoListingFallbackRows(): DemoListingFallbackRow[] {
  const ids = [1, 2, 3, 4, 5, 6, 7] as const;
  const out: DemoListingFallbackRow[] = [];
  for (const id of ids) {
    const demo = DEMO_PROPERTY_DETAILS[id];
    if (!demo) continue;
    out.push({
      id: BigInt(id),
      tokenAddress: DEMO_LISTING_PLACEHOLDER_TOKEN,
      name: demo.headline,
      symbol: `OG${id}`,
      demo,
    });
  }
  return out;
}
