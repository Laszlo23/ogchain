"use client";

import { useMemo } from "react";
import { ogGalileo } from "@/lib/chain";
import { getProtocolAddresses, type ProtocolAddresses } from "@/lib/protocol-addresses";

/** Listings UI always reads 0G Galileo deployments (matches /properties copy). */
export function useListingsProtocolAddresses(): ProtocolAddresses {
  return useMemo(() => getProtocolAddresses(ogGalileo.id), []);
}
