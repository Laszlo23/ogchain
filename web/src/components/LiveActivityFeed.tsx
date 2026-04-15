"use client";

import { useEffect, useState } from "react";

const NAMES = ["Laszlo", "Anna", "Marco", "Sofia", "Jonas", "Elena", "David", "Priya"];
const CITIES = ["Vienna", "Berlin", "Munich", "Zurich", "Amsterdam", "Paris", "Milan", "Stockholm"];
const ACTIONS = [
  (n: string, c: string, a: number) => `${n} from ${c} invested $${a.toLocaleString("en-US")}`,
  (n: string, c: string, shares: number) => `${n} from ${c} bought ${shares.toLocaleString("en-US")} shares`,
];

function randomLine(): string {
  const n = NAMES[Math.floor(Math.random() * NAMES.length)];
  const c = CITIES[Math.floor(Math.random() * CITIES.length)];
  if (Math.random() > 0.45) {
    const amt = 800 + Math.floor(Math.random() * 9200);
    return ACTIONS[0](n, c, amt);
  }
  const shares = 12 + Math.floor(Math.random() * 400);
  return ACTIONS[1](n, c, shares);
}

type Props = {
  /** Horizontal marquee ticker (home hero) vs stacked list */
  variant?: "list" | "ticker";
};

export function LiveActivityFeed({ variant = "list" }: Props) {
  const [lines, setLines] = useState<string[]>(() => Array.from({ length: 5 }, () => randomLine()));

  useEffect(() => {
    const t = setInterval(() => {
      setLines((prev) => [randomLine(), ...prev.slice(0, 7)]);
    }, 12_000);
    return () => clearInterval(t);
  }, []);

  if (variant === "ticker") {
    const duplicated = [...lines, ...lines];
    return (
      <div className="glass-card overflow-hidden border-eco/20 py-0">
        <div className="flex items-center gap-4 border-b border-eco/15 px-4 py-3 sm:px-6">
          <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-eco-muted">Live activity</p>
          <p className="text-[10px] text-muted">Illustrative — demo only</p>
        </div>
        <div className="relative overflow-hidden py-3 motion-reduce:animate-none">
          <div className="flex w-max animate-marquee gap-16 whitespace-nowrap pr-16 motion-reduce:animate-none">
            {duplicated.map((line, i) => (
              <span key={`${line}-${i}`} className="text-sm text-canvas/90">
                <span className="text-eco">●</span> {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden border-eco/20">
      <div className="border-b border-eco/15 px-5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-eco-muted">Live activity</p>
        <p className="text-xs text-muted">Illustrative feed — demo only</p>
      </div>
      <ul className="max-h-52 space-y-0 divide-y divide-eco/10 overflow-y-auto text-sm">
        {lines.map((line, i) => (
          <li
            key={`${line}-${i}`}
            className={`px-5 py-2.5 text-canvas/90 transition ${i === 0 ? "bg-eco/10" : ""}`}
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
