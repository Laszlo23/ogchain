/**
 * Deterministic demo stats for the "live funding meter" and property cards.
 * Not on-chain data — for hackathon / investor narrative only.
 */
function hashSeed(id: bigint): number {
  const s = id.toString();
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

export type FundingStats = {
  /** Demo goal in USD */
  goalUsd: number;
  /** Demo funded amount in USD */
  fundedUsd: number;
  /** 0–1 */
  progress: number;
  investors: number;
  countries: number;
};

export function getFundingStats(propertyId: bigint, goalUsd: number): FundingStats {
  const h = hashSeed(propertyId);
  const ratio = 0.42 + ((h % 3800) / 10000) * 0.45; // 42%–87%
  const fundedUsd = Math.round(goalUsd * ratio);
  const investors = 120 + (h % 900);
  const countries = 8 + (h % 14);
  return {
    goalUsd,
    fundedUsd,
    progress: Math.min(1, fundedUsd / goalUsd),
    investors,
    countries,
  };
}

export function getGlobalFundingMeter(goalUsd = 10_000_000): FundingStats {
  const h = hashSeed(0x0badc0ffeen);
  const fundedUsd = 6_420_000 + (h % 120_000);
  const investors = 742 + (h % 80);
  const countries = 18 + (h % 5);
  return {
    goalUsd,
    fundedUsd,
    progress: Math.min(1, fundedUsd / goalUsd),
    investors,
    countries,
  };
}
