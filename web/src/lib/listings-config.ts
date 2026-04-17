import { base } from "viem/chains";
import { isBaseConfigured } from "@/lib/base-addresses";
import { ogGalileo } from "@/lib/chain";
import { addresses } from "@/lib/contracts";

const zero = "0x0000000000000000000000000000000000000000" as const;

/** True when OG (Galileo) registry + factory are non-zero in env. */
function isOgListingsConfigured(): boolean {
  return addresses.registry !== zero && addresses.shareFactory !== zero;
}

/**
 * Chain used for /properties listings and share-token reads.
 * Prefer 0G when both OG env vars are set; otherwise use Base when Base registry + factory are set.
 */
export function getListingsChainId(): number {
  if (isOgListingsConfigured()) return ogGalileo.id;
  if (isBaseConfigured()) return base.id;
  return ogGalileo.id;
}

/** Registry + share factory resolved for `getListingsChainId()` (either OG or Base). */
export function areListingsConfigured(): boolean {
  if (isOgListingsConfigured()) return true;
  return isBaseConfigured();
}
