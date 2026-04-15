/**
 * Curated PDFs under `public/` for Architecture / Documents tabs.
 * Paths use encodeURI when rendered in href (spaces, double extensions).
 */
export type PublicDocumentId =
  | "droes-plans-221219"
  | "katzelsdorf-studie-auswechslung"
  | "katzelsdorf-studie-encoded"
  | "bernhardsthal-plans"
  | "altes-kaufhaus-prater"
  | "stix-a3-klein";

export type PublicDocument = {
  id: PublicDocumentId;
  title: string;
  /** Path under public/ (may contain spaces — encode in UI) */
  filePath: string;
};

export const PUBLIC_DOCUMENTS: readonly PublicDocument[] = [
  {
    id: "droes-plans-221219",
    title: "Plan set — Droeß (illustrative)",
    filePath: "/377-DROES-100-P-S-221219.pdf",
  },
  {
    id: "katzelsdorf-studie-auswechslung",
    title: "Studie Hausumbau Katzelsdorf — A3 Mappe (Auswechslung)",
    filePath: "/Studie Hausumbau Katzelsdorf_A3-Mappe_AUSWECHSLUNG.pdf",
  },
  {
    id: "katzelsdorf-studie-encoded",
    title: "Studie Hausumbau Katzelsdorf — A3 (alt. file)",
    filePath: "/Studie_20Hausumbau_20Katzelsdorf_A3-Mappe_AUSWECHSLUNG.pdf.pdf",
  },
  {
    id: "bernhardsthal-plans",
    title: "Plan set — Bernhardsthal (illustrative)",
    filePath: "/371-BERNHARDSTHAL-100-P-S-221114.pdf.pdf",
  },
  {
    id: "altes-kaufhaus-prater",
    title: "Altes Kaufhaus — Prater (A3 klein)",
    filePath: "/Altes_20Kaufhaus_Pra_CC_88s_20A3_20klein.pdf.pdf",
  },
  {
    id: "stix-a3-klein",
    title: "Stix — A3 plans (klein)",
    filePath: "/Pr_C3_A4_StixA3klein.pdf.pdf",
  },
];

export function getPublicDocumentById(id: PublicDocumentId): PublicDocument | undefined {
  return PUBLIC_DOCUMENTS.find((d) => d.id === id);
}

/** Safe href for Next/static public files */
export function publicDocumentHref(filePath: string): string {
  if (!filePath.startsWith("/")) return encodeURI(`/${filePath}`);
  return encodeURI(filePath);
}
