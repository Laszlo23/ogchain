"use client";

import { useMemo } from "react";
import { zeroAddress } from "viem";
import { useReadContract, useReadContracts } from "wagmi";
import { addresses, erc20Abi, registryAbi, shareFactoryAbi } from "@/lib/contracts";
import { DEMO_PROPERTY_DETAILS, type DemoPropertyDetail } from "@/lib/demo-properties";

export type PropertyShareRow = {
  id: bigint;
  tokenAddress: `0x${string}`;
  name: string;
  symbol: string;
  demo?: DemoPropertyDetail;
};

export function usePropertyShareList() {
  const registry = addresses.registry;
  const shareFactory = addresses.shareFactory;
  const unset = registry === zeroAddress || shareFactory === zeroAddress;

  const { data: nextId } = useReadContract({
    address: registry,
    abi: registryAbi,
    functionName: "nextPropertyId",
    query: { enabled: !unset },
  });

  const propertyIds = useMemo(() => {
    if (!nextId || nextId <= 1n) return [] as bigint[];
    const n = Number(nextId - 1n);
    if (!Number.isFinite(n) || n <= 0 || n > 64) return [];
    return Array.from({ length: n }, (_, i) => BigInt(i + 1));
  }, [nextId]);

  const factoryReads = useMemo(
    () =>
      propertyIds.map((id) => ({
        address: shareFactory,
        abi: shareFactoryAbi,
        functionName: "tokenByPropertyId" as const,
        args: [id],
      })),
    [propertyIds, shareFactory],
  );

  const { data: tokenRows, isPending: loadingTokens } = useReadContracts({
    contracts: factoryReads,
    query: {
      enabled: !unset && factoryReads.length > 0,
    },
  });

  const pairs = useMemo(() => {
    if (!tokenRows?.length || !propertyIds.length) return [];
    const out: { id: bigint; addr: `0x${string}` }[] = [];
    tokenRows.forEach((row, i) => {
      const id = propertyIds[i];
      if (row.status !== "success" || !row.result || row.result === zeroAddress) return;
      out.push({ id, addr: row.result as `0x${string}` });
    });
    return out;
  }, [tokenRows, propertyIds]);

  const erc20Reads = useMemo(
    () =>
      pairs.flatMap((p) => [
        { address: p.addr, abi: erc20Abi, functionName: "name" as const },
        { address: p.addr, abi: erc20Abi, functionName: "symbol" as const },
      ]),
    [pairs],
  );

  const { data: erc20Rows, isPending: loadingMeta } = useReadContracts({
    contracts: erc20Reads,
    query: { enabled: erc20Reads.length > 0 },
  });

  const rows: PropertyShareRow[] = useMemo(() => {
    if (!erc20Rows?.length || !pairs.length) return [];
    return pairs.map((p, i) => {
      const nameResult = erc20Rows[i * 2];
      const symResult = erc20Rows[i * 2 + 1];
      const name =
        nameResult?.status === "success" && typeof nameResult.result === "string"
          ? nameResult.result
          : "PropertyShare";
      const symbol =
        symResult?.status === "success" && typeof symResult.result === "string"
          ? symResult.result
          : "???";
      const key = Number(p.id);
      const demo = DEMO_PROPERTY_DETAILS[key];
      return {
        id: p.id,
        tokenAddress: p.addr,
        name,
        symbol,
        demo,
      };
    });
  }, [erc20Rows, pairs]);

  const loading = unset || loadingTokens || (pairs.length > 0 && loadingMeta);

  return {
    unset,
    nextPropertyId: nextId,
    rows,
    loading,
    propertyIds,
  };
}
