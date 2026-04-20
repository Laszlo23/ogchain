/**
 * Per-property story arc: exactly three photo beats (one image each, no repeats).
 * Culture Land titles when `exploreHref` matches; partner links on the final beat only.
 */
import { getCultureLandDisplayForDemoPropertyId } from "@/lib/culture-land-portfolio";
import { DEMO_PROPERTY_DETAILS, getDemoImageSlides } from "@/lib/demo-properties";
import {
  EUR_USD_TEASER,
  formatEurReferenceCompact,
  formatLettableM2Compact,
  formatUsdTeaserApprox,
  type ExperiencePortfolioTotals,
} from "@/lib/experience-portfolio-totals";
import { IMMERSIVE_PROJECT_FRAMES } from "@/lib/property-geo";

const INTRO_HERO_IMAGE = "/partners/Keutschach-am-See-1b-1.jpg";

export type StoryBeatRole =
  | "mission"
  | "vision"
  | "place"
  | "gallery"
  | "why"
  | "how"
  | "partners"
  | "solution"
  | "portfolio";

export type StoryBeat = {
  role: StoryBeatRole;
  roleLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  partnerLinks?: readonly { label: string; href: string }[];
};

const ROLE_LABELS: Record<StoryBeatRole, string> = {
  mission: "Mission",
  vision: "Vision",
  place: "The place",
  gallery: "The building",
  why: "The investment",
  how: "The build",
  partners: "Partners & craft",
  solution: "The protocol",
  portfolio: "Portfolio overview",
};

const PARTNERS_BLURB =
  "Craft and collaborators from vision to keys — reference narrative; not an endorsement of any security.";

const HOLZBAUER_PARTNER_URL = "https://holzbauer-partner.at/haus-im-weinviertelniederoesterreich/";

function trunc(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

/** Single beat — paired with economics panel totals; keeps carousel pacing aligned with property slides. */
export function getIntroPortfolioBeats(totals: ExperiencePortfolioTotals): StoryBeat[] {
  const usdVal = formatUsdTeaserApprox(totals.sumReferenceValueUsdApprox);
  const usdRent = formatUsdTeaserApprox(totals.sumAnnualRentUsdApprox);
  const eurVal = formatEurReferenceCompact(totals.sumReferenceValueEur);
  const eurRent = formatEurReferenceCompact(totals.sumAnnualRentEur);
  const combinedM2 = formatLettableM2Compact(totals.combinedLettableM2);
  const catM2 = formatLettableM2Compact(totals.catalogueLettableM2);
  const pipeM2 = formatLettableM2Compact(totals.pipelineLettableM2);
  const pipePur = formatEurReferenceCompact(totals.pipelineIndicativePurchaseEur);
  const pipeRent = formatEurReferenceCompact(totals.pipelineIndicativeRentEur);

  return [
    {
      role: "portfolio",
      roleLabel: ROLE_LABELS.portfolio,
      title: "Start here — reference scale before you choose a story",
      subtitle: trunc(
        `${combinedM2} lettable reference (catalogue ${catM2} + partner pipeline ${pipeM2}). ` +
          `On-chain catalogue: ${usdVal} · ${usdRent} gross rent p.a. (USD illustrative @ ${EUR_USD_TEASER}). ` +
          `EUR: ${eurVal} value · ${eurRent} rent · ${totals.propertyCount} listings in this carousel. ` +
          `Pipeline (indicative, not TVL): ${pipePur} purchase · ${pipeRent} rent p.a. — swipe to explore; not investment advice.`,
        380,
      ),
      imageSrc: INTRO_HERO_IMAGE,
      imageAlt:
        "Portfolio teaser — illustrative reference economics across Culture Land listings; partner imagery, not investment advice.",
      partnerLinks: [
        { label: "Culture Land & pipeline (PDFs)", href: "/culture-land" },
        { label: "On-chain listings", href: "/properties" },
        { label: "Investor hub", href: "/invest" },
      ],
    },
  ];
}

/** Three beats only: slide 0 = place + thesis, slide 1 = build narrative, slide 2 = protocol + partners. */
export function getStoryBeatsForProperty(propertyId: number): StoryBeat[] {
  const d = DEMO_PROPERTY_DETAILS[propertyId];
  if (!d) return [];

  const slides = getDemoImageSlides(d);
  const n = Math.min(slides.length, IMMERSIVE_PROJECT_FRAMES);
  const cl = getCultureLandDisplayForDemoPropertyId(propertyId);

  const howLine =
    d.architectureNarrative?.trim() ??
    (d.highlights?.length ? d.highlights.slice(0, 2).join(" · ") : trunc(d.thesis, 160));
  const protocol =
    d.ownershipModel?.trim() ??
    d.fundingRoundNote?.trim() ??
    "Tokenized fractional exposure with issuer-managed economics — see project brief.";

  const out: StoryBeat[] = [];

  for (let i = 0; i < n; i++) {
    const img = slides[i]!;
    if (i === 0) {
      const subtitle = cl
        ? trunc(`${cl.tagline} — ${cl.region}. ${trunc(d.thesis, 140)}`, 200)
        : trunc(d.vision?.trim() ?? d.thesis, 200);
      out.push({
        role: "place",
        roleLabel: ROLE_LABELS.place,
        title: trunc(cl?.title ?? d.headline, 90),
        subtitle,
        imageSrc: img.src,
        imageAlt: img.alt,
      });
    } else if (i === 1) {
      out.push({
        role: "how",
        roleLabel: ROLE_LABELS.how,
        title: "How it came together",
        subtitle: trunc(howLine, 200),
        imageSrc: img.src,
        imageAlt: img.alt,
      });
    } else {
      out.push({
        role: "partners",
        roleLabel: ROLE_LABELS.partners,
        title: "What we're building",
        subtitle: trunc(`${PARTNERS_BLURB} ${protocol}`, 240),
        imageSrc: img.src,
        imageAlt: img.alt,
        partnerLinks: [
          { label: "Holzbauer & Partner — Haus im Weinviertel", href: HOLZBAUER_PARTNER_URL },
          { label: "Culture Land portfolio", href: "/culture-land" },
        ],
      });
    }
  }

  return out;
}
