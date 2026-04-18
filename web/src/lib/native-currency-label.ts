import { base } from "viem/chains";
import { ogGalileo } from "@/lib/chain";

/** Native currency ticker for listings / wallet UX (OgRouter swaps wrap this to WETH internally). */
export function nativeCurrencySymbol(chainId: number): string {
  if (chainId === base.id) return "ETH";
  if (chainId === ogGalileo.id) return "OG";
  return "ETH";
}
