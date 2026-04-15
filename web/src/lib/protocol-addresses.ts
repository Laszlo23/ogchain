import { base } from "viem/chains";
import { addresses, explorerBase } from "@/lib/contracts";
import { baseAddresses, baseExplorerBase } from "@/lib/base-addresses";

/** Protocol contract bundle + explorer base URL (no trailing slash) for the active chain. */
export type ProtocolAddresses = {
  registry: `0x${string}`;
  shareFactory: `0x${string}`;
  compliance: `0x${string}`;
  weth: `0x${string}`;
  router: `0x${string}`;
  lendingPool: `0x${string}`;
  predictionMarket: `0x${string}`;
  proofNft: `0x${string}`;
  staking: `0x${string}`;
  guestbook: `0x${string}`;
  explorer: string;
};

function stripSlash(s: string) {
  return s.replace(/\/$/, "");
}

function bundleOg(): ProtocolAddresses {
  return {
    ...addresses,
    explorer: stripSlash(explorerBase),
  };
}

function bundleBase(): ProtocolAddresses {
  return {
    registry: baseAddresses.registry,
    shareFactory: baseAddresses.shareFactory,
    compliance: baseAddresses.compliance,
    weth: baseAddresses.weth,
    router: baseAddresses.router,
    lendingPool: baseAddresses.lendingPool,
    predictionMarket: baseAddresses.predictionMarket,
    proofNft: baseAddresses.proofNft,
    staking: baseAddresses.staking,
    guestbook: baseAddresses.guestbook,
    explorer: stripSlash(baseExplorerBase || explorerBase),
  };
}

/** Resolve env-configured contracts for a chain id (0G vs Base). Unknown chains fall back to 0G. */
export function getProtocolAddresses(chainId: number): ProtocolAddresses {
  if (chainId === base.id) return bundleBase();
  return bundleOg();
}

export { base as baseChain };
