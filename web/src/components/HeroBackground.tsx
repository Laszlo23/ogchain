"use client";

/**
 * Subtle animated backdrop: grid + gradient orbs + abstract "skyline" bars (CSS only, mobile-friendly).
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0 opacity-[0.4] motion-reduce:animate-none animate-mesh-pan"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, transparent 42%, rgba(255,255,255,0.06) 50%, transparent 58%)",
          backgroundSize: "220% 220%",
        }}
      />
      <div className="absolute -left-[18%] top-[18%] h-[min(90vw,560px)] w-[min(90vw,560px)] rounded-full bg-gradient-to-br from-gold-500/25 via-amber-600/10 to-transparent blur-[118px] motion-reduce:animate-none animate-aurora" />
      <div
        className="absolute -left-1/4 top-0 h-[420px] w-[70%] rounded-full bg-gold-500/10 blur-[100px] animate-pulse-soft motion-reduce:animate-none"
        style={{ animationDuration: "6s" }}
      />
      <div className="absolute -right-1/4 top-24 h-[320px] w-[55%] rounded-full bg-white/[0.04] blur-[90px] animate-float motion-reduce:animate-none" />
      {/* Abstract building silhouettes */}
      <div className="skyline absolute bottom-0 left-0 right-0 flex h-32 items-end justify-center gap-1 px-8 opacity-30 sm:h-40">
        {[28, 42, 36, 52, 38, 45, 32, 48, 34, 40].map((h, i) => (
          <div
            key={i}
            className="w-full max-w-[8%] rounded-t-sm bg-gradient-to-t from-zinc-800 to-zinc-600"
            style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
