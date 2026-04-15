import { TrustStrip } from "@/components/TrustStrip";

export function TrustSection({ className = "" }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="trust-heading">
      <h2 id="trust-heading" className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
        Trust &amp; verification
      </h2>
      <TrustStrip />
    </section>
  );
}
