import { base } from "viem/chains";
import { isBaseConfigured } from "@/lib/base-addresses";
import { ogGalileo } from "@/lib/chain";
import { addresses } from "@/lib/contracts";

/** Human label for the chain used by property listings (matches `getListingsChainId`). */
export function getListingsChainDisplayName(chainId: number): string {
  if (chainId === base.id) return "Base";
  if (chainId === ogGalileo.id) return "0G Galileo (testnet)";
  return `Chain ${chainId}`;
}

const zero = "0x0000000000000000000000000000000000000000" as const;

/** True when 0G (Galileo) registry + factory are non-zero in env. */
function isOgListingsConfigured(): boolean {
  return addresses.registry !== zero && addresses.shareFactory !== zero;
}

/**
 * Chain used for /properties listings and share-token reads.
 * Prefer Base mainnet when registry + factory are configured; otherwise fall back to 0G Galileo.
 */
export function getListingsChainId(): number {
  if (isBaseConfigured()) return base.id;
  if (isOgListingsConfigured()) return ogGalileo.id;
  return ogGalileo.id;
}

/** Registry + share factory resolved for `getListingsChainId()` (either OG or Base). */
export function areListingsConfigured(): boolean {
  if (isOgListingsConfigured()) return true;
  return isBaseConfigured();
}
