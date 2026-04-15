import Link from "next/link";

export function HomeDisclaimerStrip() {
  return (
    <div className="mx-auto max-w-[1280px] rounded-xl border border-white/[0.06] bg-black/30 px-3 py-2.5 text-center text-[10px] leading-relaxed text-muted sm:px-5">
      Not investment advice. Testnet / illustrative metrics and activity feeds where marked — verify disclosures and
      issuer docs before any production raise.{" "}
      <Link href="/legal/risk" className="text-muted underline underline-offset-2 hover:text-canvas">
        Risk disclosure
      </Link>
      .
    </div>
  );
}
