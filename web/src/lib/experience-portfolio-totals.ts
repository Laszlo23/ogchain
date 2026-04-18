/**
 * Aggregates reference economics for demo properties included in `/experience`.
 * Field `illustrativePropertyValueUsd` is EUR-scale reference value per demo catalogue naming.
 */

import { DEMO_PROPERTY_DETAILS } from "@/lib/demo-properties";

/** Demo ids excluded from the immersive carousel (same scope as experience slides). */
export const EXPERIENCE_EXCLUDED_DEMO_IDS = new Set<number>([4]);

/** Illustrative EUR→USD multiplier for teaser copy only — not a live FX rate. */
export const EUR_USD_TEASER = 1.09;

export type ExperiencePortfolioTotals = {
  propertyCount: number;
  sumReferenceValueEur: number;
  sumAnnualRentEur: number;
  sumReferenceValueUsdApprox: number;
  sumAnnualRentUsdApprox: number;
};

/** Sorted demo ids included in `/experience`, matching [`getProjectExperienceSlides`](experience-slides.ts). */
export function getExperienceCarouselPropertyIds(): number[] {
  return Object.keys(DEMO_PROPERTY_DETAILS)
    .map(Number)
    .filter((id) => Number.isFinite(id) && !EXPERIENCE_EXCLUDED_DEMO_IDS.has(id))
    .sort((a, b) => a - b);
}

export function getExperiencePortfolioTotals(): ExperiencePortfolioTotals {
  const ids = getExperienceCarouselPropertyIds();
  let sumReferenceValueEur = 0;
  let sumAnnualRentEur = 0;

  for (const id of ids) {
    const d = DEMO_PROPERTY_DETAILS[id];
    if (!d) continue;
    sumReferenceValueEur += d.illustrativePropertyValueUsd ?? 0;
    sumAnnualRentEur += d.annualRentalIncomeEur ?? 0;
  }

  return {
    propertyCount: ids.length,
    sumReferenceValueEur,
    sumAnnualRentEur,
    sumReferenceValueUsdApprox: sumReferenceValueEur * EUR_USD_TEASER,
    sumAnnualRentUsdApprox: sumAnnualRentEur * EUR_USD_TEASER,
  };
}

/** Compact USD for hero lines, e.g. ~$45M, ~$1.2M */
export function formatUsdTeaserApprox(usd: number): string {
  if (!Number.isFinite(usd) || usd <= 0) return "—";
  if (usd >= 1_000_000_000) return `~$${(usd / 1_000_000_000).toFixed(1)}B`;
  if (usd >= 1_000_000) return `~$${(usd / 1_000_000).toFixed(1)}M`;
  if (usd >= 1_000) return `~$${Math.round(usd / 1_000)}k`;
  return `~$${Math.round(usd).toLocaleString("en-US")}`;
}

/** EUR reference for subtitles / secondary line */
export function formatEurReferenceCompact(eur: number): string {
  if (!Number.isFinite(eur) || eur <= 0) return "—";
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(eur);
}
