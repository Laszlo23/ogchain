"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatEther, zeroAddress } from "viem";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { ComplianceStatus } from "@/components/ComplianceStatus";
import { InvestorJourney } from "@/components/InvestorJourney";
import { TrustSection } from "@/components/TrustSection";
import { erc20Abi, ogStakingAbi } from "@/lib/contracts";
import { useProtocolAddresses } from "@/lib/use-protocol-addresses";
import { usePropertyShareList } from "@/lib/usePropertyShareList";

function parseShareFloat(wei: bigint): number {
  const s = formatEther(wei);
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

type Tab = "overview" | "properties" | "liquidity";

export default function InvestPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const { address, isConnected } = useAccount();
  const { weth, staking } = useProtocolAddresses();

  const { rows, loading, unset } = usePropertyShareList();

  const { data: nativeBal } = useBalance({ address, query: { enabled: !!address } });

  const balanceReads = useMemo(
    () =>
      address
        ? rows.map((r) => ({
            address: r.tokenAddress,
            abi: erc20Abi,
            functionName: "balanceOf" as const,
            args: [address] as const,
          }))
        : [],
    [rows, address],
  );

  const { data: balanceRows, isPending: loadingBalances } = useReadContracts({
    contracts: balanceReads,
    query: { enabled: !!address && balanceReads.length > 0 },
  });

  const wethRead = useMemo(
    () =>
      address && weth !== zeroAddress
        ? [
            {
              address: weth,
              abi: erc20Abi,
              functionName: "balanceOf" as const,
              args: [address] as const,
            },
          ]
        : [],
    [weth, address],
  );

  const { data: wethBalData } = useReadContracts({
    contracts: wethRead,
    query: { enabled: wethRead.length > 0 },
  });

  const stakingReads = useMemo(
    () =>
      staking !== zeroAddress && address
        ? [
            { address: staking, abi: ogStakingAbi, functionName: "balanceOf" as const, args: [address] },
            { address: staking, abi: ogStakingAbi, functionName: "earned" as const, args: [address] },
          ]
        : [],
    [staking, address],
  );

  const { data: stakeData } = useReadContracts({
    contracts: stakingReads,
    query: { enabled: stakingReads.length > 0 },
  });

  const wethBalance = wethBalData?.[0]?.status === "success" ? (wethBalData[0].result as bigint) : undefined;
  const stakedOg =
    stakeData?.[0]?.status === "success" ? (stakeData[0].result as bigint) : undefined;
  const stakeEarned =
    stakeData?.[1]?.status === "success" ? (stakeData[1].result as bigint) : undefined;

  const withBalances = useMemo(() => {
    if (!balanceRows?.length) return rows.map((r) => ({ ...r, balance: undefined as bigint | undefined }));
    return rows.map((r, i) => {
      const row = balanceRows[i];
      const bal =
        row?.status === "success" && typeof row.result === "bigint" ? row.result : undefined;
      return { ...r, balance: bal };
    });
  }, [rows, balanceRows]);

  const { totalUsdEst } = useMemo(() => {
    let total = 0;
    for (const r of withBalances) {
      const bal = r.balance ?? 0n;
      if (bal === 0n) continue;
      const shares = parseShareFloat(bal);
      const px = r.demo?.illustrativeShareUsd ?? 0;
      total += shares * px;
    }
    return { totalUsdEst: total };
  }, [withBalances]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "properties", label: "Properties" },
    { id: "liquidity", label: "Liquidity & lending" },
  ];

  return (
    <div className="mx-auto max-w-[1280px] space-y-8 pb-16">
      <header className="space-y-2 text-center sm:text-left">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">One place</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Investor hub</h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          A compact view of exposure and participation: balances, illustrative property weights, and links to stake,
          pool, and trade. Liquidity and pools are per network — switch your wallet to 0G or Base to match the deployment
          you use. Nothing here is a promise of returns — see{" "}
          <Link href="/legal/risk" className="text-brand hover:underline">
            risks &amp; disclaimer
          </Link>
          .
        </p>
      </header>

      <section className="glass-card border border-gold-500/15 p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold-500/90">
          How value can compound (illustrative)
        </p>
        <ul className="mt-3 grid gap-3 text-sm text-zinc-400 sm:grid-cols-3">
          <li>
            <span className="font-medium text-zinc-200">Trading fees</span> — LPs in automated pools may earn swap fees
            when liquidity and volume exist (not guaranteed).
          </li>
          <li>
            <span className="font-medium text-zinc-200">Staking</span> — Rewards follow the staking contract&apos;s
            rules; yields vary and can be zero.
          </li>
          <li>
            <span className="font-medium text-zinc-200">Issuance &amp; property economics</span> — Longer-term outcomes
            follow offering documents and off-chain performance — not a monthly ROI from this UI.
          </li>
        </ul>
      </section>

      <details className="group glass-card">
        <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            Investor journey &amp; trust
            <span className="text-[11px] font-normal text-zinc-500">(expand)</span>
          </span>
        </summary>
        <div className="space-y-6 border-t border-white/[0.06] px-5 py-5">
          <InvestorJourney />
          <TrustSection />
        </div>
      </details>

      <ComplianceStatus />

      <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === t.id
                ? "bg-gold-500/15 text-gold-300"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {!isConnected ? (
        <p className="text-center text-zinc-500">Connect a wallet for personalized totals.</p>
      ) : unset ? (
        <p className="text-zinc-400">Configure registry and share factory to list properties.</p>
      ) : loading && rows.length === 0 ? (
        <p className="text-zinc-500">Loading…</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass-card-strong p-4">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">Native OG</p>
              <p className="mt-1 font-mono text-xl text-white">{nativeBal ? formatEther(nativeBal.value) : "—"}</p>
            </div>
            <div className="glass-card-strong p-4">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">WETH</p>
              <p className="mt-1 font-mono text-xl text-white">
                {wethBalance !== undefined ? formatEther(wethBalance) : loadingBalances ? "…" : "—"}
              </p>
            </div>
            <div className="glass-card-strong p-4">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">Staked OG</p>
              <p className="mt-1 font-mono text-xl text-gradient-gold">
                {stakedOg !== undefined ? formatEther(stakedOg) : staking === zeroAddress ? "—" : "0"}
              </p>
              {stakeEarned !== undefined && stakeEarned > 0n && (
                <p className="mt-1 text-[10px] text-zinc-500">Pending ~{formatEther(stakeEarned)} OG</p>
              )}
            </div>
            <div className="glass-card-strong p-4">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">Illustrative USD (shares)</p>
              <p className="mt-1 font-mono text-xl text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(totalUsdEst)}
              </p>
              <p className="mt-1 text-[10px] text-zinc-500">Not NAV — demo weighting only.</p>
            </div>
          </div>

          {tab === "overview" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">
                Use the tabs for per-property exposure and liquidity routes. Numbers are chain reads plus illustrative
                USD where configured — not a suitability assessment.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/stake"
                  className="rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-6 py-2.5 text-sm font-semibold text-black"
                >
                  Stake OG
                </Link>
                <Link
                  href="/portfolio"
                  className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-zinc-200"
                >
                  Detailed portfolio
                </Link>
              </div>
            </div>
          )}

          {tab === "properties" && (
            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                Browse the catalog or open a property to trade. Share balances mirror your wallet holdings.
              </p>
              <Link href="/properties" className="inline-block text-sm font-medium text-gold-400 hover:underline">
                All properties →
              </Link>
              <div className="space-y-2 pt-2">
                {rows.length === 0 ? (
                  <p className="text-sm text-zinc-500">No share tokens deployed yet.</p>
                ) : (
                  withBalances.map((r) => {
                    const usdEst =
                      r.balance && r.demo?.illustrativeShareUsd != null
                        ? parseShareFloat(r.balance) * r.demo.illustrativeShareUsd
                        : null;
                    return (
                      <Link
                        key={r.id.toString()}
                        href={`/properties/${r.id.toString()}`}
                        className="glass-card flex flex-wrap items-center gap-3 p-4 transition hover:border-gold-500/25"
                      >
                        {r.demo?.imageSrc ? (
                          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                            <Image
                              src={r.demo.imageSrc}
                              alt={r.demo.imageAlt}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                        ) : (
                          <div className="h-14 w-20 shrink-0 rounded-lg bg-zinc-800" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-zinc-100">{r.demo?.headline ?? r.name}</p>
                          <p className="text-xs text-zinc-500">{r.symbol}</p>
                        </div>
                        <div className="text-right text-sm">
                          {r.balance !== undefined ? (
                            <>
                              <p className="font-mono text-white">{formatEther(r.balance)} shares</p>
                              {usdEst != null && (
                                <p className="text-[11px] text-zinc-500">
                                  ~{" "}
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    maximumFractionDigits: 0,
                                  }).format(usdEst)}{" "}
                                  demo
                                </p>
                              )}
                            </>
                          ) : (
                            <span className="text-zinc-500">…</span>
                          )}
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {tab === "liquidity" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/pool" className="glass-card block p-5 transition hover:border-gold-500/25">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gold-500/80">AMM</p>
                <h2 className="mt-2 text-lg font-semibold text-white">Liquidity pool</h2>
                <p className="mt-1 text-sm text-zinc-500">Add or remove WETH + property share liquidity.</p>
              </Link>
              <Link href="/lend" className="glass-card block p-5 transition hover:border-gold-500/25">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gold-500/80">Lending</p>
                <h2 className="mt-2 text-lg font-semibold text-white">Lend / borrow</h2>
                <p className="mt-1 text-sm text-zinc-500">Collateralize shares, borrow WETH (demo pool).</p>
              </Link>
              <Link href="/trade" className="glass-card block p-5 transition hover:border-gold-500/25 sm:col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gold-500/80">Primary</p>
                <h2 className="mt-2 text-lg font-semibold text-white">Buy shares</h2>
                <p className="mt-1 text-sm text-zinc-500">Swap native OG into property share tokens.</p>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
