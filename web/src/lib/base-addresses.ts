const zero = "0x0000000000000000000000000000000000000000" as const;

type Addr = `0x${string}`;

/** Base (or other L2) explorer base URL — no trailing slash. */
export const baseExplorerBase =
  (process.env.NEXT_PUBLIC_BASE_EXPLORER as string | undefined)?.replace(/\/$/, "") ?? "";

/** Optional second deployment on Base — mirror of `addresses` in contracts.ts */
export const baseAddresses = {
  registry: (process.env.NEXT_PUBLIC_BASE_REGISTRY as Addr | undefined) ?? zero,
  shareFactory: (process.env.NEXT_PUBLIC_BASE_SHARE_FACTORY as Addr | undefined) ?? zero,
  compliance: (process.env.NEXT_PUBLIC_BASE_COMPLIANCE_REGISTRY as Addr | undefined) ?? zero,
  weth: (process.env.NEXT_PUBLIC_BASE_WETH as Addr | undefined) ?? zero,
  router: (process.env.NEXT_PUBLIC_BASE_ROUTER as Addr | undefined) ?? zero,
  lendingPool: (process.env.NEXT_PUBLIC_BASE_LENDING_POOL as Addr | undefined) ?? zero,
  predictionMarket: (process.env.NEXT_PUBLIC_BASE_PREDICTION_MARKET as Addr | undefined) ?? zero,
  proofNft: (process.env.NEXT_PUBLIC_BASE_PROOF_NFT as Addr | undefined) ?? zero,
  staking: (process.env.NEXT_PUBLIC_BASE_STAKING as Addr | undefined) ?? zero,
};

export function isBaseConfigured(): boolean {
  if (!baseExplorerBase) return false;
  return Object.values(baseAddresses).some((a) => a !== zero);
}
