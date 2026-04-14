import Link from "next/link";
import { explorerBase } from "@/lib/contracts";

const items = [
  { label: "Smart contracts", hint: "Verified on-chain logic" },
  { label: "Compliance", hint: "Registry + restricted transfers" },
  { label: "Explorer", hint: "Audit every transaction" },
];

export function TrustStrip() {
  return (
    <div className="glass-card flex flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="flex flex-wrap gap-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-lg shadow-gold-500/50" />
            <span className="text-xs font-medium text-zinc-200">{it.label}</span>
            <span className="hidden text-[10px] text-zinc-500 sm:inline">{it.hint}</span>
          </div>
        ))}
      </div>
      <Link
        href={`${explorerBase}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs font-medium text-gold-400/90 underline-offset-4 hover:underline"
      >
        Open chain explorer →
      </Link>
    </div>
  );
}
