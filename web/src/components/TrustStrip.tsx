import Link from "next/link";
import { explorerBase } from "@/lib/contracts";

const items = [
  { label: "Smart contracts", hint: "Verify bytecode & txs on-chain" },
  { label: "Legal & disclosures", hint: "Issuer-specific; see Legal" },
  { label: "Custody & SPV", hint: "Structure varies by issuer" },
  { label: "Insurance", hint: "Where applicable — not guaranteed" },
  { label: "Audit-ready stack", hint: "Open architecture for review" },
  { label: "Public explorer", hint: "Every transaction traceable" },
];

export function TrustStrip() {
  return (
    <div className="glass-card flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-wrap gap-3">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex max-w-[220px] items-start gap-2 rounded-full border border-eco/25 bg-forest/30 px-3 py-2"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-eco shadow-lg shadow-eco/40" />
            <span>
              <span className="block text-xs font-medium text-canvas">{it.label}</span>
              <span className="mt-0.5 block text-[10px] text-muted">{it.hint}</span>
            </span>
          </div>
        ))}
      </div>
      <Link
        href={`${explorerBase}`}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 text-xs font-medium text-action underline-offset-4 hover:underline"
      >
        Open chain explorer →
      </Link>
    </div>
  );
}
