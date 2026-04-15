import { DEMO_PROPERTY_DETAILS } from "@/lib/demo-properties";

/** On-chain property id used for flagship imagery (Keutschach demo). */
export const FLAGSHIP_PROPERTY_ID = 3n;

export const flagshipCampaign = {
  displayName: "C3 Creative Village — Austria",
  projectType: "Coworking + Café + Community Living",
  /** Illustrative campaign metrics — not on-chain TVL. */
  targetRaiseEur: 1_200_000,
  raisedEur: 420_000,
  investors: 178,
  minInvestmentUsd: 500,
} as const;

export function getFlagshipHeroImage(): { src: string; alt: string } {
  const demo = DEMO_PROPERTY_DETAILS[Number(FLAGSHIP_PROPERTY_ID)];
  const slide = demo?.imageGallery?.[0] ?? (demo ? { src: demo.imageSrc, alt: demo.imageAlt } : null);
  return slide ?? { src: "/STIX Wohnanlage Keutschacher See 2024-04-04_0212.jpg", alt: "Flagship project (demo)" };
}
