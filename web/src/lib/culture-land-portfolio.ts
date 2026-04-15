/**
 * Partner / investor portfolio copy — editorial English, illustrative economics.
 * Not an offer; verify all figures with official disclosures.
 */

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
  /** Link to on-chain property detail when the demo listing aligns */
  exploreHref?: string;
};

export const BLOCKCHAIN_HOMEPAGE_LINES = {
  kicker: "Building Culture",
  headline: "Creating spaces that enrich everyday life",
  sublines: [
    "We make a contribution to the world of construction and life with our projects.",
    "Structures are reflections — they are intended to create positive change.",
  ],
} as const;

export const BUILDING_CULTURE_LAND_PHILOSOPHY: string[] = [
  "We care about preserving spaces that represent our future.",
  "As active players in housing and urban development, we revitalise old village centres to preserve the attractive architectural character of historic country houses and reinforce their relevance for modern life. The structural quality of old buildings is often more sustainable than that of many new builds.",
  "We revive traditional techniques before they are lost and use natural materials such as wood, brick, and plaster. That creates an elegant atmosphere indoors, while solid brickwork supports a healthy indoor climate.",
  "Our work brings new life not only to old houses and villages, but to nature as well. An attractive village helps people enjoy spending time there, turns connecting routes into lifelines, and curbs sprawl. Existing green space should not be sealed unnecessarily.",
  "Individualisation is often the start of future problems — building culture must be a shared concern. Professional revitalisation enables modern living in old walls for the long term. We seek intelligent solutions that reflect local conditions, enrich village life, and inspire architecturally. A home of one’s own need not remain a dream when old knowledge meets modern needs — opening new aesthetic territory.",
];

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
      { label: "Acquisition (illustrative)", value: "€650,000" },
      { label: "Gross rental income (p.a., illustrative)", value: "€50,000" },
    ],
    greenPrint: [
      "Air-source heat pump",
      "Large green yards that help cool the microclimate",
      "Generous terraces",
      "No unnecessary sealing of valuable land",
    ],
    partnerNote:
      "Weinviertel reference architecture (external site — imagery may differ from this project): see link in the introduction.",
    imageSrc: "/Kamera01_Variante.jpg",
    imageAlt: "Interior atmosphere — illustrative (AlterStadl programme)",
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
      { label: "Acquisition (illustrative)", value: "€2,900,000" },
      { label: "Gross rental income (p.a., illustrative)", value: "€100,000" },
    ],
    greenPrint: [
      "Large green yards that help cool the microclimate",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
    imageSrc: "/STIX Wohnanlage Keutschacher See 2024-04-04_0212.jpg",
    imageAlt: "Waterfront architecture — illustrative mood (Whalewatching narrative)",
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
      { label: "Acquisition (illustrative)", value: "€850,000" },
      { label: "Gross rental income (p.a., illustrative)", value: "€50,000" },
    ],
    greenPrint: [
      "Air-source heat pump and solar",
      "Green yards for cooling",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
    imageSrc: "/Innen01.jpg",
    imageAlt: "Interior — illustrative (department store adaptive reuse)",
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
      { label: "Acquisition (illustrative)", value: "€950,000" },
      { label: "Gross rental income (p.a., illustrative)", value: "€70,000" },
    ],
    greenPrint: [
      "Air-source heat pump and solar",
      "Large green yards",
      "Terraces",
      "No unnecessary sealing of valuable land",
    ],
    imageSrc: "/Kamera02_Variante.jpg",
    imageAlt: "Interior — illustrative (Presshaus programme)",
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
      { label: "Acquisition (illustrative)", value: "€10,900,000" },
      { label: "Gross rental income (p.a., illustrative)", value: "€350,000" },
    ],
    greenPrint: [
      "Geothermal heating and cooling",
      "Photovoltaics",
      "Large green yards",
      "Terraces for all apartments",
      "No unnecessary sealing of valuable land",
      "Conversion of grain storage into contemporary homes — high-quality reuse",
    ],
    imageSrc: "/Innen02.jpg",
    imageAlt: "Interior — illustrative (LandMark mixed programme)",
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
      { label: "Acquisition (illustrative)", value: "€10,500,000" },
      { label: "Gross rental income (p.a., illustrative)", value: "€250,000" },
    ],
    greenPrint: [
      "Geothermal heating and cooling",
      "Large green yards",
      "Terraces for all apartments",
      "Private lake access with jetty and bathhouse",
    ],
    imageSrc: "/STIX Wohnanlage Keutschacher See 2024-04-04_0239.jpg",
    imageAlt: "Keutschach am See — residential scheme (project imagery)",
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
      { label: "Acquisition (illustrative)", value: "€8,300,000" },
      { label: "Gross rental income (p.a., illustrative)", value: "€187,000" },
    ],
    greenPrint: [
      "Air-source heat pump and solar",
      "Large green yards",
      "Terraces for all apartments",
      "Prime location beside the Lainzer Tiergarten — Vienna’s large recreational forest",
    ],
    imageSrc: "/Innenraum_Jagdschlossgasse_81.jpg",
    imageAlt: "Interior — Jagdschlossgasse programme (illustrative)",
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
      { label: "Acquisition (illustrative)", value: "€15,917,000" },
      { label: "Gross rental income (illustrative)", value: "€250,000" },
    ],
    greenPrint: [
      "District heating and district cooling",
      "Shared green courtyard for tenants and owners",
      "Terraces for nearly all apartments",
      "Central, vibrant residential quarter",
      "Conversion of office / telegraph use into contemporary homes — high-quality reuse",
    ],
    imageSrc: "/Foto-©-AnnABlaU-_DSC0788.jpg",
    imageAlt: "Berggasse — exterior (project imagery)",
    exploreHref: "/properties/1",
  },
];
