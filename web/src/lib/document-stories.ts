import type { PublicDocumentId } from "@/lib/public-documents";

export type DocumentStorySection = {
  heading: string;
  body: string;
};

export type DocumentStory = {
  id: PublicDocumentId;
  /** Short label for nav / cards */
  label: string;
  /** Page title */
  title: string;
  /** One-line context */
  dek: string;
  sections: DocumentStorySection[];
  /** Plain-language disclaimer (not legal advice) */
  disclaimer: string;
};

/**
 * Editorial storytelling for each plan PDF — illustrative; verify against issuer docs.
 * Optional future step: anchor file hashes on-chain via a registry contract + IPFS.
 */
export const DOCUMENT_STORIES: Record<PublicDocumentId, DocumentStory> = {
  "droes-plans-221219": {
    id: "droes-plans-221219",
    label: "Droeß plan set",
    title: "Droeß — engineering plans (221219)",
    dek: "Technical drawings for parcel and envelope decisions — use with legal survey and title.",
    sections: [
      {
        heading: "Why this matters",
        body: "Plan sets translate architect intent into buildable scope. For community investors, they show what was modeled for costs, setbacks, and services — not a promise of final as-built conditions.",
      },
      {
        heading: "How to read it",
        body: "Look for sheet index, scales, and revision dates. Cross-check boundaries against land registry excerpts. Any redlines after this PDF belong in a change log with issuer sign-off.",
      },
      {
        heading: "On-chain note",
        body: "The PDF itself stays off-chain (size and privacy). A production deployment can store a commitment hash (e.g. keccak256 of file bytes or IPFS CID) in a registry contract for tamper evidence — this UI is preparatory.",
      },
    ],
    disclaimer:
      "Illustrative context only — not an offering memorandum. Jurisdiction-specific rules apply; consult qualified advisers.",
  },
  "katzelsdorf-studie-auswechslung": {
    id: "katzelsdorf-studie-auswechslung",
    label: "Katzelsdorf — A3 Auswechslung",
    title: "Hausumbau Katzelsdorf — A3 map (Auswechslung)",
    dek: "Study binder for a residential retrofit in Katzelsdorf — replacement / swap scope.",
    sections: [
      {
        heading: "Story",
        body: "Rural revitalization often starts with a clear study: what stays, what is swapped out, and how the building meets modern energy and fire codes. This map supports that narrative for community-funded projects.",
      },
      {
        heading: "Community angle",
        body: "Locals, remote workers, and small operators can share use of upgraded spaces. Tokenization maps economic participation to disclosures — not to guaranteed occupancy or rent.",
      },
      {
        heading: "Integrity",
        body: "For real testing, pin the canonical file (IPFS or secure storage) and record its hash on-chain so updates are visible to holders.",
      },
    ],
    disclaimer: "Demo / illustrative documentation — not a securities filing.",
  },
  "katzelsdorf-studie-encoded": {
    id: "katzelsdorf-studie-encoded",
    label: "Katzelsdorf — A3 (alt)",
    title: "Hausumbau Katzelsdorf — alternate export",
    dek: "Same study line as the primary A3 map; alternate filename from export tooling.",
    sections: [
      {
        heading: "Purpose",
        body: "Duplicate exports happen when CAD/PDF pipelines encode spaces in filenames. Treat one file as canonical for governance votes on documentation.",
      },
      {
        heading: "Investor takeaway",
        body: "Before relying on either file, confirm with the issuer which revision is referenced in the subscription agreement.",
      },
    ],
    disclaimer: "Keep both hashes if both circulate — mismatch risks confusion in audits.",
  },
  "bernhardsthal-plans": {
    id: "bernhardsthal-plans",
    label: "Bernhardsthal plans",
    title: "Bernhardsthal — plan set (illustrative)",
    dek: "Parcel and layout references for the Bernhardsthal storyline in the rural bucket.",
    sections: [
      {
        heading: "Narrative",
        body: "Smaller municipalities can combine housing and micro-commercial. Plans anchor the conversation about what capital is buying: footprint, access, and servicing.",
      },
      {
        heading: "Testing checklist",
        body: "For testnet demos: verify wallet reads, property IDs, and that document links resolve with encoded URLs (spaces, double .pdf extensions).",
      },
    ],
    disclaimer: "Illustrative — verify against current land records.",
  },
  "altes-kaufhaus-prater": {
    id: "altes-kaufhaus-prater",
    label: "Altes Kaufhaus — Prater",
    title: "Altes Kaufhaus — Prater (A3 klein)",
    dek: "Adaptive reuse context near the Prater — cultural/commercial fabric.",
    sections: [
      {
        heading: "Cultural real estate",
        body: "Heritage-adjacent assets need both preservation discipline and a clear operating story (hospitality, retail, events). Plans communicate volume and circulation for stakeholders.",
      },
      {
        heading: "Liquidity layer",
        body: "Tokenized shares can fund renovation milestones; secondary liquidity depends on pools and compliance — never assumed from a PDF alone.",
      },
    ],
    disclaimer: "Marketing context — rights to names and imagery require separate clearance.",
  },
  "stix-a3-klein": {
    id: "stix-a3-klein",
    label: "Stix — A3 klein",
    title: "Stix — A3 plans (klein)",
    dek: "Compact A3 set associated with the Stix / Keutschach storyline — flagship creative village narrative.",
    sections: [
      {
        heading: "Vision",
        body: "Lakeside clusters can mix housing, work, and gathering. This drawing set supports the ‘C3 Creative Village’ story: community-owned places with transparent funding rounds.",
      },
      {
        heading: "What on-chain can prove",
        body: "Smart contracts can enforce supply caps, transfers, and compliance hooks; PDFs prove what was disclosed off-chain at a point in time. Together: process integrity, not investment performance.",
      },
      {
        heading: "Next step for production",
        body: "Deploy a DocumentRegistry contract that stores bytes32 commitments, wire the app to display matching hashes, and host files on IPFS or HTTPS with TLS.",
      },
    ],
    disclaimer: "Testnet-first — figures on the site are illustrative unless stated otherwise.",
  },
};

export function getStoryBySlug(slug: string): DocumentStory | undefined {
  if (slug in DOCUMENT_STORIES) return DOCUMENT_STORIES[slug as PublicDocumentId];
  return undefined;
}

export function allStorySlugs(): PublicDocumentId[] {
  return Object.keys(DOCUMENT_STORIES) as PublicDocumentId[];
}
