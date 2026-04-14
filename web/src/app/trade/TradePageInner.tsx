"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ComplianceStatus, useCompliance } from "@/components/ComplianceStatus";
import {
  addresses,
  erc20Abi,
  explorerBase,
  pairAbi,
  proofNftAbi,
  routerAbi,
} from "@/lib/contracts";
import { formatIllustrativeEconomics } from "@/lib/demo-properties";
import { usePropertyShareList } from "@/lib/usePropertyShareList";

function deadline(): bigint {
  return BigInt(Math.floor(Date.now() / 1000) + 1800);
}

const zero = "0x0000000000000000000000000000000000000000" as const;

export function TradePageInner() {
  const searchParams = useSearchParams();
  const propertyFromUrl = searchParams.get("property");

  const { address, isConnected } = useAccount();
  const { blocked } = useCompliance();
  const router = addresses.router;
  const weth = addresses.weth;
  const proofNft = addresses.proofNft;

  const { rows, loading, unset } = usePropertyShareList();
  const [selectedId, setSelectedId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [amountOg, setAmountOg] = useState("0.1");
  const [slippageBps, setSlippageBps] = useState(50);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    if (rows.length === 0) return;
    if (propertyFromUrl && rows.some((r) => r.id.toString() === propertyFromUrl)) {
      setSelectedId(propertyFromUrl);
      return;
    }
    if (selectedId === "") {
      setSelectedId(rows[0].id.toString());
    }
  }, [rows, selectedId, propertyFromUrl]);

  const selected = useMemo(() => {
    if (!selectedId) return rows[0];
    const id = BigInt(selectedId);
    return rows.find((r) => r.id === id) ?? rows[0];
  }, [rows, selectedId]);

  const tokenOut = selected?.tokenAddress;

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const h = r.demo?.headline ?? r.name;
      const loc = r.demo?.location ?? "";
      return h.toLowerCase().includes(q) || loc.toLowerCase().includes(q) || r.symbol.toLowerCase().includes(q);
    });
  }, [rows, search]);

  const amountInWei = useMemo(() => {
    try {
      return parseEther(amountOg || "0");
    } catch {
      return 0n;
    }
  }, [amountOg]);

  const { data: ethPair } = useReadContract({
    address: router,
    abi: routerAbi,
    functionName: "getPair",
    args:
      weth !== zero && tokenOut ? [weth as `0x${string}`, tokenOut] : undefined,
    query: {
      enabled: !!tokenOut && weth !== zero && router !== zero,
    },
  });

  const { data: ethRes } = useReadContract({
    address: (ethPair ?? zero) as `0x${string}`,
    abi: pairAbi,
    functionName: "getReserves",
    query: {
      enabled: !!ethPair && ethPair !== zero,
    },
  });

  const { data: ethToken0 } = useReadContract({
    address: (ethPair ?? zero) as `0x${string}`,
    abi: pairAbi,
    functionName: "token0",
    query: {
      enabled: !!ethPair && ethPair !== zero,
    },
  });

  const { data: quoteEthOut } = useReadContract({
    address: router,
    abi: routerAbi,
    functionName: "getAmountOut",
    args:
      ethRes && ethToken0 && ethPair && amountInWei > 0n && weth
        ? (() => {
            const [r0, r1] = [ethRes[0], ethRes[1]];
            const t0 = ethToken0 as `0x${string}`;
            const reserveIn = weth === t0 ? BigInt(r0) : BigInt(r1);
            const reserveOut = weth === t0 ? BigInt(r1) : BigInt(r0);
            return [amountInWei, reserveIn, reserveOut] as const;
          })()
        : undefined,
    query: {
      enabled:
        !!ethPair &&
        ethPair !== zero &&
        amountInWei > 0n &&
        !!ethRes &&
        !!ethToken0,
    },
  });

  const minOutEth =
    quoteEthOut !== undefined ? (quoteEthOut * BigInt(10000 - slippageBps)) / 10000n : 0n;

  const { data: shareBalance } = useReadContract({
    address: tokenOut,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!tokenOut },
  });

  const { data: nativeBal } = useBalance({ address });

  const { data: alreadyClaimed, isFetched: claimStatusLoaded } = useReadContract({
    address: proofNft,
    abi: proofNftAbi,
    functionName: "claimed",
    args:
      address && selected
        ? [address, selected.id]
        : undefined,
    query: {
      enabled:
        !!address && !!selected && proofNft !== zero,
    },
  });

  const { writeContract: writeSwap, data: swapHash, isPending: swapPending, error: swapError } =
    useWriteContract();
  const { isLoading: swapConfirming, isSuccess: swapSuccess } = useWaitForTransactionReceipt({
    hash: swapHash,
  });

  const { writeContract: writeClaim, data: claimHash, isPending: claimPending } = useWriteContract();
  const { isLoading: claimConfirming } = useWaitForTransactionReceipt({ hash: claimHash });

  const canSwap =
    isConnected &&
    !!address &&
    !blocked &&
    router !== zero &&
    !!tokenOut &&
    ethPair !== zero &&
    amountInWei > 0n;

  function buy() {
    if (!canSwap || !address || !tokenOut) return;
    writeSwap({
      address: router,
      abi: routerAbi,
      functionName: "swapExactETHForTokens",
      args: [minOutEth, tokenOut, address, deadline()],
      value: amountInWei,
    });
  }

  function claimProof() {
    if (!address || !selected || proofNft === zero) return;
    writeClaim({
      address: proofNft,
      abi: proofNftAbi,
      functionName: "claim",
      args: [selected.id],
    });
  }

  const busy = swapPending || swapConfirming || claimPending || claimConfirming;
  const economicsLine = selected?.demo ? formatIllustrativeEconomics(selected.demo) : null;
  const displayTitle = selected?.demo?.headline ?? selected?.name ?? "Choose a property";
  return (
    <div className="mx-auto max-w-xl space-y-8 pb-16">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Buy shares</h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          Pick a property, enter how much OG you want to spend, and confirm. No contract addresses needed — like
          sending a payment, but you receive tokenized shares.
        </p>
      </header>

      <ComplianceStatus />

      <p className="text-center text-[11px] leading-relaxed text-zinc-500">
        Demo economics assume about <span className="text-zinc-400">$1,000</span> minimum notional per whole token;
        the AMM does not enforce that without price oracles.
      </p>

      {unset ? (
        <p className="text-center text-sm text-amber-400">
          Configure registry and factory in <code className="text-gold-400">.env.local</code> to load listings.
        </p>
      ) : loading && rows.length === 0 ? (
        <p className="text-center text-zinc-500">Loading properties…</p>
      ) : rows.length === 0 ? (
        <p className="text-center text-zinc-400">No share tokens yet. Seed properties first.</p>
      ) : (
        <>
          <label className="block text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
            Search
            <input
              type="search"
              placeholder="City, name, or symbol…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-gold-600/50 focus:outline-none"
            />
          </label>

          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {filteredRows.map((r) => {
              const active = selected?.id === r.id;
              return (
                <button
                  key={r.id.toString()}
                  type="button"
                  onClick={() => setSelectedId(r.id.toString())}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                    active
                      ? "border-gold-500/50 bg-gold-500/10 ring-1 ring-gold-500/30"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/15"
                  }`}
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
                    <p className="text-xs text-zinc-500">{r.demo?.location ?? r.symbol}</p>
                  </div>
                  <span className="shrink-0 text-xs text-zinc-500">#{r.id.toString()}</span>
                </button>
              );
            })}
          </div>

          <div className="glass-card-strong overflow-hidden shadow-2xl shadow-black/40">
            <div className="space-y-1 border-b border-white/[0.06] px-6 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gold-500/90">You pay</p>
              <div className="flex items-baseline justify-between gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  value={amountOg}
                  onChange={(e) => setAmountOg(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-3xl font-semibold tracking-tight text-white placeholder:text-zinc-600 focus:outline-none"
                  placeholder="0.0"
                />
                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-medium text-zinc-200">
                  OG
                </span>
              </div>
              {nativeBal && (
                <p className="text-xs text-zinc-500">
                  Balance: {formatEther(nativeBal.value)} OG
                </p>
              )}
            </div>

            <div className="space-y-1 px-6 py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gold-500/90">You receive (est.)</p>
              <p className="text-gold-400/90">{displayTitle}</p>
              <p className="text-2xl font-semibold text-white">
                {quoteEthOut !== undefined ? formatEther(quoteEthOut) : "—"}{" "}
                <span className="text-lg font-normal text-zinc-400">
                  {selected?.symbol ?? "shares"}
                </span>
              </p>
              {quoteEthOut !== undefined && (
                <p className="text-xs text-zinc-500">
                  Min after slippage: {formatEther(minOutEth)} {selected?.symbol}
                </p>
              )}
            </div>

            {economicsLine && (
              <p className="border-t border-white/[0.06] px-6 py-3 text-xs text-zinc-400">{economicsLine}</p>
            )}

            <div className="border-t border-white/[0.06] px-6 py-4">
              <label className="text-xs text-zinc-500">
                Slippage tolerance (bps)
                <input
                  type="number"
                  value={slippageBps}
                  onChange={(e) => setSlippageBps(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 font-mono text-sm"
                />
              </label>
            </div>

            {blocked && (
              <p className="border-t border-white/[0.06] px-6 py-3 text-xs text-amber-300">
                Complete verification to buy restricted shares.
              </p>
            )}

            {ethPair === zero && tokenOut && (
              <p className="border-t border-white/[0.06] px-6 py-3 text-xs text-amber-400">
                No liquidity pool for this property yet. Add OG + shares on the Pool page first.
              </p>
            )}

            <div className="p-4">
              <button
                type="button"
                disabled={!canSwap || busy || ethPair === zero}
                onClick={buy}
                className="w-full rounded-2xl bg-gradient-to-r from-gold-600 to-gold-500 py-4 text-base font-semibold text-black shadow-lg shadow-gold-900/20 transition hover:from-gold-500 hover:to-gold-400 disabled:opacity-40"
              >
                {busy ? "Confirm in wallet…" : "Buy shares"}
              </button>
            </div>
          </div>

          {(shareBalance !== undefined && shareBalance > 0n) || swapSuccess ? (
            <div className="glass-card px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Your position</p>
              <p className="mt-1 text-sm text-zinc-300">
                {selected?.symbol}: {shareBalance !== undefined ? formatEther(shareBalance) : "…"} shares
              </p>
              {proofNft !== zero &&
                selected &&
                claimStatusLoaded &&
                !alreadyClaimed &&
                shareBalance !== undefined &&
                shareBalance > 0n && (
                <button
                  type="button"
                  disabled={busy || blocked}
                  onClick={claimProof}
                  className="mt-3 w-full rounded-xl border border-gold-800/50 bg-gold-950/30 py-3 text-sm font-medium text-gold-100 hover:bg-gold-900/40 disabled:opacity-40"
                >
                  Mint soulbound proof NFT (certificate)
                </button>
              )}
              {proofNft !== zero && claimStatusLoaded && alreadyClaimed && (
                <p className="mt-2 text-xs text-zinc-500">You already claimed a certificate for this property.</p>
              )}
            </div>
          ) : null}

          {swapSuccess && swapHash && (
            <p className="text-center text-sm text-gold-400/90">
              Swap confirmed.{" "}
              <a
                href={`${explorerBase}/tx/${swapHash}`}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                View transaction
              </a>
            </p>
          )}
          {swapError && <p className="text-center text-xs text-red-400">{swapError.message}</p>}

          <button
            type="button"
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="w-full text-center text-xs text-zinc-500 underline-offset-2 hover:text-zinc-400"
          >
            {advancedOpen ? "Hide" : "Show"} technical details
          </button>
          {advancedOpen && selected && (
            <div className="rounded-xl border border-white/[0.06] bg-zinc-950/80 p-4 font-mono text-[10px] leading-relaxed text-zinc-500">
              <p>Share token: {tokenOut}</p>
              <p>WETH: {weth}</p>
              <p>Router: {router}</p>
              <p>Pair: {ethPair === zero ? "—" : ethPair}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
