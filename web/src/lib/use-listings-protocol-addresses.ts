"use client";

import { useMemo } from "react";
import { getListingsChainId } from "@/lib/listings-config";
import { getProtocolAddresses, type ProtocolAddresses } from "@/lib/protocol-addresses";

/** Listings UI prefers Base mainnet when registry + factory are set; otherwise 0G Galileo when configured. */
export function useListingsProtocolAddresses(): ProtocolAddresses {
  return useMemo(() => getProtocolAddresses(getListingsChainId()), []);
}
