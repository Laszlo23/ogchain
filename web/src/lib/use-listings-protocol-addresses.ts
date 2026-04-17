"use client";

import { useMemo } from "react";
import { getListingsChainId } from "@/lib/listings-config";
import { getProtocolAddresses, type ProtocolAddresses } from "@/lib/protocol-addresses";

/** Listings UI reads 0G when configured, otherwise Base mainnet when Base registry + factory are set. */
export function useListingsProtocolAddresses(): ProtocolAddresses {
  return useMemo(() => getProtocolAddresses(getListingsChainId()), []);
}
