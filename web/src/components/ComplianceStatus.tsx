"use client";

import { useAccount, useReadContract } from "wagmi";
import { addresses, complianceAbi } from "@/lib/contracts";

const zero = "0x0000000000000000000000000000000000000000" as const;

/** When no compliance contract is configured, trading is unrestricted in the UI. */
export function useCompliance() {
  const { address } = useAccount();
  const reg = addresses.compliance;
  const hasRegistry = reg !== zero;
  const enabled = !!address && hasRegistry;

  const { data: verified, isLoading } = useReadContract({
    address: reg,
    abi: complianceAbi,
    functionName: "isVerified",
    args: address ? [address] : undefined,
    query: { enabled },
  });

  return {
    hasRegistry,
    verified: !!verified,
    loading: hasRegistry && !!address && isLoading,
    /** Block restricted actions when registry is deployed and wallet not verified */
    blocked: hasRegistry && !!address && !isLoading && !verified,
  };
}

export function ComplianceStatus() {
  const { hasRegistry, verified, loading } = useCompliance();

  if (!hasRegistry) {
    return (
      <p className="rounded-md border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400">
        Set <span className="font-mono">NEXT_PUBLIC_COMPLIANCE_REGISTRY</span> to enforce on-chain KYC for
        restricted shares.
      </p>
    );
  }

  if (loading) {
    return <p className="text-xs text-zinc-500">Checking compliance…</p>;
  }

  if (verified) {
    return (
      <p className="rounded-md border border-emerald-900/60 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-200">
        On-chain KYC: verified
      </p>
    );
  }

  return (
    <div className="rounded-md border border-amber-900/60 bg-amber-950/30 px-3 py-2 text-xs text-amber-100">
      <p className="font-medium">Complete KYC</p>
      <p className="mt-1 text-amber-200/80">
        Your wallet is not marked verified on the ComplianceRegistry. After provider approval, the relayer
        updates on-chain status via webhook. For testnets, a compliance admin may call{" "}
        <span className="font-mono">setWalletStatus</span>.
      </p>
    </div>
  );
}
