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
  /** EUR facility / loan lines for display (e.g. "€7,0 Mio") */
  creditLines?: string[];
  /** Total nominal in EUR (full euros) for funding-meter scale; aligns with sum of credit where applicable */
  illustrativePropertyValueUsd?: number;
  /** Per-share reference in USD for UI (e.g. 1000) */
  illustrativeShareUsd?: number;
};

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
    headline: "Gesellschaft für Wohnungen — vier Häuser",
    location: "Berggasse-Projekt (Wien) · Vier-Häuser-Portfolio",
    imageSrc: "/Foto-©-AnnABlaU-_DSC0788.jpg",
    imageAlt: "Berggasse-Projekt — Außenansicht (Demo)",
    imageGallery: [
      { src: "/Foto-©-AnnABlaU-_DSC0788.jpg", alt: "Berggasse-Projekt — Ansicht 1 (Demo)" },
      { src: "/Foto-©-AnnABlaU-_DSC0863.jpg", alt: "Berggasse-Projekt — Ansicht 2 (Demo)" },
      { src: "/Foto-©-AnnABlaU-_DSC0971.jpg", alt: "Berggasse-Projekt — Ansicht 3 (Demo)" },
    ],
    thesis:
      "Zwei miteinander verbundene Teilprojekte: Im Projekt Berggasse stehen drei Wohnungen fertig; der Kreditbetrag beträgt €13,675 Mio. Eine Wohnung wird verkauft, zwei bleiben vermietet. Parallel umfasst das Portfolio vier Häuser — zwei davon sind fertiggestellt, zwei stehen zur Renovierung; eines der beiden fertigen Häuser befindet sich in Kanada. Für dieses Vier-Häuser-Paket beträgt der Kredit €3,9 Mio; die Häuser werden vermietet.",
    highlights: [
      "Berggasse: drei Einheiten fertig — eine Veräußerung, zwei Bestandsmieten",
      "Vier Häuser: zwei fertig (eines in Kanada), zwei Sanierungsobjekte",
      "Kreditfacilities: €13,675 Mio (Berggasse) und €3,9 Mio (Vier Häuser)",
    ],
    creditLines: ["Berggasse (3 WE): €13,675 Mio", "Vier Häuser: €3,9 Mio"],
    targetRange:
      "Geplante Miet- und Veräußerungserlöse je Teilprojekt (Illustrativ, keine Prognose — Demo).",
    riskNote:
      "Währungs-, Zins- und Auslastungsrisiko; Kanada-Exposure. Keine Anlageberatung — Testnet-Demo.",
    illustrativePropertyValueUsd: 13_675_000 + 3_900_000,
    illustrativeShareUsd: 1000,
  },
  2: {
    headline: "1130 Wien — MFH mit 10 Wohnungen",
    location: "Hietzing / 1130 Wien",
    imageSrc: "/Kamera01_Variante.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Kamera01_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Kamera02_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innen01.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Mehrfamilienhaus mit zehn Wohnungen — kurz vor Fertigstellung; etwa drei Monate bis zur Fertigstellung. Nach Übergabe sollen die Wohnungen vermietet werden.",
    highlights: [
      "10 Wohnungen, Fertigstellung in ca. drei Monaten",
      "Anschließend Vermietung der Einheiten",
      "Kreditbetrag: €7 Mio",
    ],
    creditLines: ["€7,0 Mio"],
    targetRange: "Mieteinnahmen nach Fertigstellung und Vermietung (Illustrativ — Demo).",
    riskNote: "Bau- und Finanzierungsrisiko bis zur Vermietung. Demo-Kontext.",
    illustrativePropertyValueUsd: 7_000_000,
    illustrativeShareUsd: 1000,
  },
  3: {
    headline: "Keutschach — Wohnhausanlage (fertiggestellt)",
    location: "Kärnten · Keutschach",
    imageSrc: "/STIX Wohnanlage Keutschacher See 2024-04-04_0212.jpg",
    imageAlt: "Wohnanlage Keutschacher See — Außenansicht (Demo)",
    imageGallery: [
      { src: "/STIX Wohnanlage Keutschacher See 2024-04-04_0212.jpg", alt: "Keutschacher See — Ansicht 1 (Demo)" },
      { src: "/STIX Wohnanlage Keutschacher See 2024-04-04_0239.jpg", alt: "Keutschacher See — Ansicht 2 (Demo)" },
      { src: "/STIX Wohnanlage Keutschacher See 2024-04-04_0257.jpg", alt: "Keutschacher See — Ansicht 3 (Demo)" },
    ],
    thesis:
      "Fertiggestellte Wohnhausanlage: acht fertiggestellte Wohnungen werden erworben. Die Einheiten bleiben im Bestand und werden vermietet.",
    highlights: [
      "8 fertiggestellte Wohnungen im Ankauf",
      "Langfristiger Bestand, Vermietung",
      "Kreditbetrag: €9,5 Mio",
    ],
    creditLines: ["€9,5 Mio"],
    targetRange: "Bestandsmieten nach Übernahme (Illustrativ — Demo).",
    riskNote: "Markt- und Mietausfallrisiko. Kein Angebot — Testnet.",
    illustrativePropertyValueUsd: 9_500_000,
    illustrativeShareUsd: 1000,
  },
  4: {
    headline: "Reifnitz — Wohnhausanlage (fertiggestellt)",
    location: "Kärnten · Reifnitz",
    imageSrc: "/Innenraum_Jagdschlossgasse_81.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Innenraum_Jagdschlossgasse_81.jpg", alt: "Illustrative interior — demo" },
      { src: "/Kamera01_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innen02.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Fertiggestellte Wohnhausanlage: sechs fertiggestellte Wohnungen werden gekauft. Die Wohnungen bleiben im Bestand und werden vermietet.",
    highlights: [
      "6 fertiggestellte Wohnungen",
      "Halten im Bestand, Vermietung",
      "Kreditbetrag: €6 Mio",
    ],
    creditLines: ["€6,0 Mio"],
    targetRange: "Mietträger nach Übernahme (Illustrativ — Demo).",
    riskNote: "Liquidität und Zinsänderung. Nur Demo-Zwecke.",
    illustrativePropertyValueUsd: 6_000_000,
    illustrativeShareUsd: 1000,
  },
  5: {
    headline: "LandMark — Hochhaus im Weinviertel",
    location: "Weinviertel · LandMark",
    imageSrc: "/Kamera02_Variante.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Kamera02_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innen01.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innenraum_Jagdschlossgasse_81.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Hochhaus im ehemaligen Silo, Reihenhäuser und kleine Gewerbeflächen: die Einheiten bleiben im Bestand und werden vermietet.",
    highlights: [
      "Mix aus Silo-Nutzung, Reihenhäusern und Gewerbe",
      "Bestandserhalt, Vermietung",
      "Kreditbetrag: €9,5 Mio",
    ],
    creditLines: ["€9,5 Mio"],
    targetRange: "Gemischte Mieterträge aus Wohnen und Gewerbe (Illustrativ — Demo).",
    riskNote: "Komplexe Bewirtschaftung — Demo, keine Beratung.",
    illustrativePropertyValueUsd: 9_500_000,
    illustrativeShareUsd: 1000,
  },
  6: {
    headline: "1210 Wien — Sanierungsbedürftiges Zinshaus",
    location: "1210 Wien · Floridsdorf",
    imageSrc: "/Innen02.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Innen02.jpg", alt: "Illustrative interior — demo" },
      { src: "/Kamera01_Variante.jpg", alt: "Illustrative interior — demo" },
      { src: "/Kamera02_Variante.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Sanierungsbedürftiges Zinshaus mit 1.700 m² Bestand und 1.000 m² Entwicklungspotenzial. Nach der Sanierung sollen die Wohnungen abverkauft werden.",
    highlights: [
      "1.700 m² Bestand, 1.000 m² Potenzial",
      "Sanierung, danach Abverkauf der Wohnungen",
      "Kreditbetrag: €5,5 Mio",
    ],
    creditLines: ["€5,5 Mio"],
    targetRange: "Exit über Verkauf nach Sanierung (Illustrativ — Demo).",
    riskNote: "Baukosten und Verkaufsrisiko. Testnet-Demo.",
    illustrativePropertyValueUsd: 5_500_000,
    illustrativeShareUsd: 1000,
  },
  7: {
    headline: "1010 Wien — Leerstehendes Haus (7 Wohnungen)",
    location: "1010 Wien · Innere Stadt",
    imageSrc: "/Innen01.jpg",
    imageAlt: "Illustrative interior — demo",
    imageGallery: [
      { src: "/Innen01.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innen02.jpg", alt: "Illustrative interior — demo" },
      { src: "/Innenraum_Jagdschlossgasse_81.jpg", alt: "Illustrative interior — demo" },
    ],
    thesis:
      "Leerstehendes Haus mit sieben Wohnungen; geplant ist eine Sanierung für kurzfristige Vermietung (z. B. furnished short-stay).",
    highlights: [
      "7 Wohnungen, derzeit leer",
      "Sanierung für Kurzzeit-/ befristete Vermietung",
      "Kreditbetrag: €14,5 Mio",
    ],
    creditLines: ["€14,5 Mio"],
    targetRange: "Erträge aus Kurzzeitvermietung nach Sanierung (Illustrativ — Demo).",
    riskNote: "Regulatorik Kurzzeitvermietung, Aufwand Sanierung. Keine Anlageberatung.",
    illustrativePropertyValueUsd: 14_500_000,
    illustrativeShareUsd: 1000,
  },
};
