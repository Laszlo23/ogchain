"use client";

import { useMemo } from "react";
import { useChainId } from "wagmi";
import { getProtocolAddresses, type ProtocolAddresses } from "@/lib/protocol-addresses";

export type { ProtocolAddresses };

export function useProtocolAddresses(): ProtocolAddresses {
  const chainId = useChainId();
  return useMemo(() => getProtocolAddresses(chainId), [chainId]);
}
