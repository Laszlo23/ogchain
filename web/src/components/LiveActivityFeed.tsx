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

export function LiveActivityFeed() {
  const [lines, setLines] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => randomLine()),
  );

  useEffect(() => {
    const t = setInterval(() => {
      setLines((prev) => [randomLine(), ...prev.slice(0, 7)]);
    }, 12_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-white/[0.06] px-5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">Live activity</p>
        <p className="text-xs text-zinc-500">Illustrative feed — demo only</p>
      </div>
      <ul className="max-h-52 space-y-0 divide-y divide-white/[0.05] overflow-y-auto text-sm">
        {lines.map((line, i) => (
          <li
            key={`${line}-${i}`}
            className={`px-5 py-2.5 text-zinc-300 transition ${i === 0 ? "bg-brand/[0.06]" : ""}`}
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
