import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";
import { FundingMeter } from "@/components/FundingMeter";
import { TrustSection } from "@/components/TrustSection";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";
import { ButtonLink } from "@/components/ui/Button";
import { getGlobalFundingMeter, getGlobalPlatformStats } from "@/lib/funding-stats";
import { SocialProofBand } from "@/components/home/SocialProofBand";
import { ProblemSolutionSection } from "@/components/home/ProblemSolutionSection";
import { PlatformEcosystemSection } from "@/components/home/PlatformEcosystemSection";
import { VisionSection } from "@/components/home/VisionSection";
import { CommunityOwnershipSection } from "@/components/home/CommunityOwnershipSection";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { HomeDisclaimerStrip } from "@/components/home/HomeDisclaimerStrip";
import { HomeFeaturedProperties } from "@/components/home/HomeFeaturedProperties";
import { HomeHowItWorksSimple } from "@/components/home/HomeHowItWorksSimple";
import { OwnershipFlowDiagram } from "@/components/home/OwnershipFlowDiagram";
import { RealWorldOnChainSection } from "@/components/home/RealWorldOnChainSection";

/** Talent app domain verification — must appear on the homepage <head>. */
export const metadata: Metadata = {
  other: {
    "talentapp:project_verification":
      "e960f18a1356b6f99de376cde74522d2a12215e74741b1cfd909876bfdf5c22e69a0ec4049043ef69795e249624cf583c5589aa671635e00fffcd6bd1fb266ee",
  },
};

export default function Home() {
  const globalFunding = getGlobalFundingMeter();
  const platform = getGlobalPlatformStats();

  return (
    <div className="relative -mx-4 -mt-8 overflow-hidden px-4 pt-8">
      <HeroBackground />

      <div className="stagger-fade relative z-10 mx-auto max-w-4xl space-y-6 pb-8 pt-8 text-center sm:space-y-8 sm:pt-14">
        <p className="inline-flex rounded-full border border-eco/30 bg-eco/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-eco-light">
          Building Culture · 0G
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.1]">
          Own the Future of{" "}
          <span className="text-gradient-eco">Real Estate</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-canvas sm:text-xl">
          The first global platform for community-owned property on-chain.
        </p>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Invest. Trade. Earn. All powered by smart contracts.
        </p>

        <div className="mx-auto w-full max-w-2xl px-0 text-left">
          <FundingMeter
            stats={globalFunding}
            label="Community funding raised"
            propertiesOnboarded={platform.propertiesFunded}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <ButtonLink href="/properties">Explore Properties</ButtonLink>
          <ButtonLink href="/invest" variant="secondary">
            Start Investing
          </ButtonLink>
        </div>
        <p className="text-sm text-muted">
          <Link href="/mission" className="text-eco-light underline-offset-4 transition hover:text-canvas hover:underline">
            Read the Vision
          </Link>
        </p>

        <p className="text-xs text-muted">
          Not investment advice. Testnet / illustrative where marked — verify disclosures before any production raise.
        </p>

        <div className="mx-auto w-full max-w-[1280px]">
          <LiveActivityFeed variant="ticker" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] space-y-16 pb-16 sm:space-y-24">
        <SocialProofBand funding={globalFunding} platform={platform} />

        <HomeHowItWorksSimple />

        <ProblemSolutionSection />

        <PlatformEcosystemSection />

        <section className="glass-card border-eco/20 p-6 sm:p-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-eco-muted">Tokenized ownership</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">From asset to yield</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            A simplified view of how real-world exposure becomes programmable on-chain — actual terms vary by issuer.
          </p>
          <div className="mt-10">
            <OwnershipFlowDiagram />
          </div>
        </section>

        <RealWorldOnChainSection />

        <HomeFeaturedProperties />

        <div className="grid gap-8 lg:grid-cols-2">
          <LiveActivityFeed variant="list" />
          <div className="glass-card flex flex-col justify-center border-eco/20 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-canvas">Why tokenize</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Transparent liquidity and programmable settlement can sit alongside traditional bank-led leverage. This
              stack is a testnet-first step — read the full story on our mission page.
            </p>
            <Link
              href="/mission"
              className="mt-6 inline-flex w-fit rounded-full border border-action/50 bg-action/10 px-5 py-2 text-sm font-semibold text-action-light hover:bg-action/20"
            >
              Read mission →
            </Link>
          </div>
        </div>

        <TrustSection />

        <VisionSection />

        <CommunityOwnershipSection />

        <HomeFinalCta />

        <HomeDisclaimerStrip />

        <section className="rounded-2xl border border-eco/15 bg-forest/20 px-6 py-8 sm:px-10">
          <h2 className="text-lg font-semibold text-canvas">Learn more</h2>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <Link href="/how-it-works" className="font-medium text-action hover:underline">
              Investor walkthrough →
            </Link>
            <Link href="/guide" className="text-muted hover:text-canvas">
              Operator guide →
            </Link>
            <Link href="/legal" className="text-muted hover:text-canvas">
              Legal &amp; risks →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
