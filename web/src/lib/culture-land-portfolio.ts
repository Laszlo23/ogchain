/**
 * Building Culture Land — partner portfolio copy, editorial English.
 * Reference figures are partner-sourced; verify all numbers with issuer disclosures. Not an offer.
 */

import { BERGGASSE_HERO_STILL } from "@/lib/bergasse-assets";
import { ST_IMMO_HOMEPAGE, ST_IMMO_LAND_PHILOSOPHY } from "@/lib/st-immo-buildings";

/** Short narrative: settlement layer + people-aligned ownership + path to dedicated RWA infrastructure. */
export const CULTURE_LAND_CHAIN_MANIFESTO: readonly string[] = [
  "Building Culture Land is programmable real estate — transparent rules on-chain, community-first capital, and settlement that does not depend on opaque intermediaries for every step.",
  "We are live on 0G with cultural assets you can explore and back; the roadmap is a dedicated chain for real-world property — owned by participants, auditable by design, and built for long-term stewardship.",
];

export const HOLZBAUER_REFERENCE_URL =
  "https://holzbauer-partner.at/haus-im-weinviertelniederoesterreich/";

export type CultureLandProject = {
  id: string;
  title: string;
  region: string;
  /** Short hero line */
  tagline: string;
  narrative: string[];
  factSheet: {
    label: string;
    value: string;
  }[];
  greenPrint: string[];
  /** Partner vision, future use, or context — optional */
  partnerNote?: string;
  imageSrc: string;
  imageAlt: string;
  /** Link to on-chain property detail when the listing aligns */
  exploreHref?: string;
};

/** Homepage hero lines — canonical copy lives in `st-immo-buildings.ts` (ST-IMMO briefs). */
export const BLOCKCHAIN_HOMEPAGE_LINES = ST_IMMO_HOMEPAGE;

export const BUILDING_CULTURE_LAND_PHILOSOPHY: string[] = ST_IMMO_LAND_PHILOSOPHY;

export const CULTURE_LAND_PROJECTS: CultureLandProject[] = [
  {
    id: "alter-stadl",
    title: "AlterStadl",
    region: "Katzelsdorf · Weinviertel · northeast of Vienna",
    tagline: "Historic masonry, carefully renovated",
    narrative: [
      "Modern enjoyment of time: the historic masonry of the AlterStadl in Katzelsdorf was carefully renovated. Existing structures are woven into the new design as a defining feature.",
    ],
    factSheet: [
      { label: "Total rental area", value: "220 m²" },
      { label: "Terrace (rental)", value: "100 m²" },
      { label: "Garden (rental)", value: "1,000 m²" },
      { label: "Reference acquisition", value: "€650,000" },
      { label: "Gross rental income (p.a., reference)", value: "€50,000" },
    ],
    greenPrint: [
      "Air-source heat pump",
      "Large green yards that help cool the microclimate",
      "Generous terraces",
      "No unnecessary sealing of valuable land",
    ],
    partnerNote:
      "Weinviertel reference architecture (external site — imagery may differ from this project): see link in the introduction.",
    imageSrc: "/extracted/katzelsdorf-studie-auswechslung/page-02.jpg",
    imageAlt: "Katzelsdorf study — masonry and reuse (PDF preview)",
  },
  {
    id: "whalewatching",
    title: "Whalewatching lodge",
    region: "Coastal concept · renovation narrative",
    tagline: "Preserved structure, orientation to the sea",
    narrative: [
      "The old cottage was extended and fully renovated. A priority was preserving the existing structure and its orientation toward the sea.",
      "Partners have also explored adapting a comparable programme to the Land-Mark warehouse context in the Weinviertel — a creative reuse conversation, not a committed plan.",
    ],
    factSheet: [
      { label: "Total rental area", value: "440 m²" },
      { label: "Terrace (rental)", value: "100 m²" },
      { label: "Garden (rental)", value: "800 m²" },
      { label: "Reference acquisition", value: "€2,900,000" },
      { label: "Gross rental income (p.a., reference)", value: "€100,000" },
    ],
    greenPrint: [
      "Large green yards that help cool the microclimate",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
    imageSrc: "/STIX Wohnanlage Keutschacher See 2024-04-04_0312.jpg",
    imageAlt: "Waterfront architecture — coastal reference programme",
  },
  {
    id: "old-department-store",
    title: "Former department store",
    region: "Bernhardsthal · village centre · Weinviertel",
    tagline: "New life for a historic retail building",
    narrative: [
      "New life for the historic department store in the village centre of Bernhardsthal, northeast of Vienna. The original fabric is being renovated and adapted for contemporary use: an all-round retreat with an apartment, a café, and a modern townhouse.",
    ],
    factSheet: [
      { label: "Total rental area", value: "400 m²" },
      { label: "Terrace (rental)", value: "100 m²" },
      { label: "Garden (rental)", value: "200 m²" },
      { label: "Reference acquisition", value: "€850,000" },
      { label: "Gross rental income (p.a., reference)", value: "€50,000" },
    ],
    greenPrint: [
      "Air-source heat pump and solar",
      "Green yards for cooling",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
    imageSrc: "/extracted/altes-kaufhaus-prater/page-01.jpg",
    imageAlt: "Former department store — plan preview (PDF)",
    exploreHref: "/properties/7",
  },
  {
    id: "altes-presshaus",
    title: "Altes Presshaus",
    region: "Katzelsdorf · Weinviertel",
    tagline: "Loft character, visible timber",
    narrative: [
      "Historic masonry of the old press house in Katzelsdorf, carefully renovated with existing structures integrated into the design. A loft-like plan and visible half-timbering in the open roof truss create space for creativity and a distinctive living atmosphere.",
    ],
    factSheet: [
      { label: "Total rental area", value: "300 m²" },
      { label: "Terrace (rental)", value: "100 m²" },
      { label: "Garden (rental)", value: "800 m²" },
      { label: "Reference acquisition", value: "€950,000" },
      { label: "Gross rental income (p.a., reference)", value: "€70,000" },
    ],
    greenPrint: [
      "Air-source heat pump and solar",
      "Large green yards",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
    imageSrc: "/extracted/katzelsdorf-studie-auswechslung/page-01.jpg",
    imageAlt: "Altes Presshaus — study PDF preview",
    exploreHref: "/properties/6",
  },
  {
    id: "landmark-bernhardsthal",
    title: "LandMark",
    region: "Bernhardsthal · Weinviertel",
    tagline: "From warehouse to village quarter",
    narrative: [
      "A modern quarter is growing from a former warehouse site: a residential tower with lofts and generous terraces, and a lively ground floor that turns a dormant plot into a new village hub. A landmark in the landscape — a granary converted into modern living with historic agricultural character and authentic detail.",
      "The ensemble adds terraced houses with green roofscapes; the ground floor mixes commercial, shared, and cultural uses.",
      "Partners have discussed activating the ground floor as a hotspot for education and community around Bitcoin and digital assets — developer showcases, beginner training, and small executive gatherings — alongside classic commercial use. Any programme would follow zoning, compliance, and community consultation.",
    ],
    factSheet: [
      { label: "Programme", value: "24 apartments · 4 terraced houses · 3 commercial / office units" },
      { label: "Total rental area", value: "2,371 m²" },
      { label: "Terrace (rental)", value: "1,020 m²" },
      { label: "Garden (rental)", value: "656 m²" },
      { label: "Parking spaces", value: "23" },
      { label: "Reference acquisition", value: "€10,900,000" },
      { label: "Gross rental income (p.a., reference)", value: "€350,000" },
    ],
    greenPrint: [
      "Geothermal heating and cooling",
      "Photovoltaics",
      "Large green yards",
      "Terraces for all apartments",
      "No unnecessary sealing of valuable land",
      "Conversion of grain storage into contemporary homes — high-quality reuse",
    ],
    imageSrc: "/extracted/land-mark-bernhardsthal-20210625/page-01.jpg",
    imageAlt: "Land-Mark Bernhardsthal — project PDF preview",
    exploreHref: "/properties/5",
  },
  {
    id: "water-side-keutschach",
    title: "Water Side",
    region: "Keutschach am See · Carinthia",
    tagline: "Six houses, thirty-four homes, lake panorama",
    narrative: [
      "Water Side on Lake Keutschach: six buildings, thirty-four apartments (roughly 50–247 m²), with wooden façades and large glass walls that sit lightly in the landscape. Full-height glazing opens living space toward the water; the lake and the Sattnitz range form a panoramic backdrop. A calm place that invites you to stay.",
    ],
    factSheet: [
      { label: "Total rental area", value: "802 m²" },
      { label: "Terrace (rental)", value: "230 m²" },
      { label: "Garden (rental)", value: "429 m²" },
      { label: "Parking spaces", value: "16" },
      { label: "Reference acquisition", value: "€10,500,000" },
      { label: "Gross rental income (p.a., reference)", value: "€250,000" },
    ],
    greenPrint: [
      "Geothermal heating and cooling",
      "Large green yards",
      "Terraces for all apartments",
      "Private lake access with jetty and bathhouse",
    ],
    imageSrc: "/extracted/water-side-keutschach-20220112/page-01.jpg",
    imageAlt: "Water Side Keutschach — project PDF preview",
    exploreHref: "/properties/3",
  },
  {
    id: "jagdschlossgasse-81",
    title: "Jagdschlossgasse 81",
    region: "Vienna · opposite the historic Werkbundsiedlung",
    tagline: "Nine apartments, modernist clarity",
    narrative: [
      "Opposite the Werkbundsiedlung of the 1930s, a contemporary residential building with nine rental apartments is taking shape: cubist forms, clean lines, generous glazing, and open spaces. Greenery wraps the site; views are green on all sides.",
    ],
    factSheet: [
      { label: "Total rental area", value: "553 m²" },
      { label: "Terrace (rental)", value: "106 m²" },
      { label: "Garden (rental)", value: "429 m²" },
      { label: "Parking spaces", value: "6" },
      { label: "Reference acquisition", value: "€8,300,000" },
      { label: "Gross rental income (p.a., reference)", value: "€187,000" },
    ],
    greenPrint: [
      "Air-source heat pump and solar",
      "Large green yards",
      "Terraces for all apartments",
      "Prime location beside the Lainzer Tiergarten — Vienna’s large recreational forest",
    ],
    imageSrc: "/extracted/bau-land-kultur-20201113/page-01.jpg",
    imageAlt: "Jagdschlossgasse — Bau–Land–Kultur PDF preview",
    exploreHref: "/properties/4",
  },
  {
    id: "berggasse-35",
    title: "Berggasse 35",
    region: "Vienna · Servitenviertel",
    tagline: "Gründerzeit fabric, adapted with care",
    narrative: [
      "Berggasse 35 is a historic place of connections. To Franz von Neumann’s plans, the Centrale II telephone exchange was built here in 1898. More than a century later, the Gründerzeit building has been carefully updated. In a prime location at the heart of the Servitenviertel, a new chapter offers a home that already feels lived-in.",
    ],
    factSheet: [
      { label: "Total rental area", value: "730 m²" },
      { label: "Terrace (rental)", value: "340 m²" },
      { label: "Parking spaces", value: "4" },
      { label: "Reference acquisition", value: "€15,917,000" },
      { label: "Gross rental income (reference)", value: "€250,000" },
    ],
    greenPrint: [
      "District heating and district cooling",
      "Shared green courtyard for tenants and owners",
      "Terraces for nearly all apartments",
      "Central, vibrant residential quarter",
      "Conversion of office / telegraph use into contemporary homes — high-quality reuse",
    ],
    imageSrc: BERGGASSE_HERO_STILL,
    imageAlt: "Berggasse — exterior with tower (project imagery)",
    exploreHref: "/properties/1",
  },
];

export type CultureLandDisplay = {
  title: string;
  tagline: string;
  region: string;
};

/** Culture Land card copy for a seeded listing id when `exploreHref` matches `/properties/{id}`. */
export function getCultureLandDisplayForDemoPropertyId(id: number): CultureLandDisplay | null {
  const href = `/properties/${id}`;
  const p = CULTURE_LAND_PROJECTS.find((x) => x.exploreHref === href);
  if (!p) return null;
  return { title: p.title, tagline: p.tagline, region: p.region };
}
