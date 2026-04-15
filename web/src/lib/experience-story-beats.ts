/**
 * Per-property story arc: Mission → Vision → place → tension → craft → protocol.
 * Images cycle through `getDemoImageSlides`; copy is trimmed from `DemoPropertyDetail` + platform lines.
 */
import {
  DEMO_PROPERTY_DETAILS,
  getDemoImageSlides,
  type DemoPropertyDetail,
} from "@/lib/demo-properties";

export type StoryBeatRole = "mission" | "vision" | "place" | "why" | "how" | "partners" | "solution";

export type StoryBeat = {
  role: StoryBeatRole;
  /** Short label for UI */
  roleLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  /** External attribution links (e.g. partners beat). */
  partnerLinks?: readonly { label: string; href: string }[];
};

const ROLE_LABELS: Record<StoryBeatRole, string> = {
  mission: "Mission",
  vision: "Vision",
  place: "The place",
  why: "The reality",
  how: "The build",
  partners: "Partners & craft",
  solution: "The protocol",
};

/** Warm, concise — aligned with mission page; not legal advice. */
const PLATFORM_MISSION_SUBTITLE =
  "Bring economic exposure back into community hands: transparent rules, fractional access, programmable settlement — so participation can align with people around these assets, not only institutions that gate credit.";

/** From vision section + one infrastructure line. */
const PLATFORM_VISION_TITLE = "Turning cities into community-owned assets.";
const PLATFORM_VISION_SUBTITLE =
  "Infrastructure for community-led rounds, property-linked share tokens, and transparent liquidity — culture-forward real estate where regulation permits. Testnet-first; not a promise of returns.";

const PARTNERS_SUBTITLE =
  "Real places need serious craft: we're grateful to collaborators who shape the built environment and the journey from vision to keys — from careful architectural reinvention to grounded brokerage. Illustrative funnel; not an endorsement of any security.";

const HOLZBAUER_PARTNER_URL = "https://holzbauer-partner.at/haus-im-weinviertelniederoesterreich/";
const SIXT_IMMO_URL = "https://sixt-immobilien.at";

function trunc(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function pickImage(d: DemoPropertyDetail, index: number): { imageSrc: string; imageAlt: string } {
  const slides = getDemoImageSlides(d);
  const img = slides[index % slides.length]!;
  return { imageSrc: img.src, imageAlt: img.alt };
}

function prependPlatformBeats(d: DemoPropertyDetail): StoryBeat[] {
  return [
    {
      role: "mission",
      roleLabel: ROLE_LABELS.mission,
      title: "Why we build",
      subtitle: trunc(PLATFORM_MISSION_SUBTITLE, 240),
      ...pickImage(d, 0),
    },
    {
      role: "vision",
      roleLabel: ROLE_LABELS.vision,
      title: PLATFORM_VISION_TITLE,
      subtitle: trunc(PLATFORM_VISION_SUBTITLE, 240),
      ...pickImage(d, 1),
    },
  ];
}

/** Mission + Vision + four property beats; reuses gallery frames. */
export function getStoryBeatsForProperty(propertyId: number): StoryBeat[] {
  const d = DEMO_PROPERTY_DETAILS[propertyId];
  if (!d) return [];

  const beats: StoryBeat[] = [...prependPlatformBeats(d)];

  const placeTitle = d.headline;
  const placeSub = d.vision?.trim() ?? trunc(d.thesis, 160);
  beats.push({
    role: "place",
    roleLabel: ROLE_LABELS.place,
    title: trunc(placeTitle, 90),
    subtitle: trunc(placeSub, 200),
    ...pickImage(d, 0),
  });

  beats.push({
    role: "why",
    roleLabel: ROLE_LABELS.why,
    title: "Why it matters",
    subtitle: trunc(d.thesis, 220),
    ...pickImage(d, 1),
  });

  const howLine =
    d.architectureNarrative?.trim() ??
    (d.highlights?.length ? d.highlights.slice(0, 2).join(" · ") : trunc(d.thesis, 160));
  beats.push({
    role: "how",
    roleLabel: ROLE_LABELS.how,
    title: "How it came together",
    subtitle: trunc(howLine, 220),
    ...pickImage(d, 2),
  });

  beats.push({
    role: "partners",
    roleLabel: ROLE_LABELS.partners,
    title: "The story behind the frame",
    subtitle: trunc(PARTNERS_SUBTITLE, 260),
    ...pickImage(d, 4),
    partnerLinks: [
      { label: "Holzbauer & Partner — Haus im Weinviertel", href: HOLZBAUER_PARTNER_URL },
      { label: "SIXT Immobilien", href: SIXT_IMMO_URL },
    ],
  });

  const protocol =
    d.ownershipModel?.trim() ??
    d.fundingRoundNote?.trim() ??
    "Tokenized fractional exposure with issuer-managed economics — see project brief.";
  beats.push({
    role: "solution",
    roleLabel: ROLE_LABELS.solution,
    title: "What we're building",
    subtitle: trunc(protocol, 220),
    ...pickImage(d, 3),
  });

  return beats;
}
