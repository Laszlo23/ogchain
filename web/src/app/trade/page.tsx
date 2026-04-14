"use client";

import { Suspense } from "react";
import { TradePageInner } from "./TradePageInner";

export default function TradePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-xl py-20 text-center text-zinc-500">Loading…</div>
      }
    >
      <TradePageInner />
    </Suspense>
  );
}
