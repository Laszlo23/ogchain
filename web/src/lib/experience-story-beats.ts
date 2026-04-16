/**
 * Per-property story arc: Mission → Vision → gallery frames → place narrative → tension → craft → protocol.
 * Images cycle through `getDemoImageSlides`; Culture Land titles when `exploreHref` matches.
 */
import { getCultureLandDisplayForDemoPropertyId } from "@/lib/culture-land-portfolio";
import {
  DEMO_PROPERTY_DETAILS,
  getDemoImageSlides,
  type DemoPropertyDetail,
} from "@/lib/demo-properties";
import { MAX_GALLERY_FRAMES } from "@/lib/property-geo";

export type StoryBeatRole = "mission" | "vision" | "place" | "gallery" | "why" | "how" | "partners" | "solution";

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
  gallery: "The building",
  why: "The investment",
  how: "The build",
  partners: "Partners & craft",
  solution: "The protocol",
};

/** Warm, concise — aligned with mission page; not legal advice. */
const PLATFORM_MISSION_SUBTITLE =
  "Why real estate ownership must change: bring economic exposure back into community hands — transparent rules, fractional access, and programmable settlement so participation aligns with people and places, not only institutions that gate credit.";

/** From vision section + one infrastructure line. */
const PLATFORM_VISION_TITLE = "Community-owned cultural assets.";
const PLATFORM_VISION_SUBTITLE =
  "Infrastructure for community-led rounds, property-linked share tokens, and transparent liquidity — culture-forward real estate where regulation permits. Live on 0G; not a promise of returns.";

const PARTNERS_SUBTITLE =
  "Real places need serious craft: we're grateful to collaborators who shape the built environment and the journey from vision to keys — from careful architectural reinvention to grounded brokerage. Reference narrative; not an endorsement of any security.";

const HOLZBAUER_PARTNER_URL = "https://holzbauer-partner.at/haus-im-weinviertelniederoesterreich/";

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

function appendGalleryBeats(propertyId: number, d: DemoPropertyDetail): StoryBeat[] {
  const slides = getDemoImageSlides(d);
  const n = Math.min(slides.length, MAX_GALLERY_FRAMES);
  const cl = getCultureLandDisplayForDemoPropertyId(propertyId);
  const out: StoryBeat[] = [];

  for (let i = 0; i < n; i++) {
    const img = slides[i]!;
    const isFirst = i === 0;
    const title = isFirst
      ? trunc(cl?.title ?? d.headline, 90)
      : trunc(cl ? `${cl.title} · ${i + 1}/${n}` : `${d.headline} · ${i + 1}/${n}`, 90);
    const subtitle = isFirst
      ? cl
        ? trunc(`${cl.tagline} — ${cl.region}`, 200)
        : trunc(d.vision?.trim() ?? d.thesis, 200)
      : trunc(img.alt, 140);

    out.push({
      role: isFirst ? "place" : "gallery",
      roleLabel: isFirst ? ROLE_LABELS.place : ROLE_LABELS.gallery,
      title,
      subtitle,
      imageSrc: img.src,
      imageAlt: img.alt,
    });
  }

  return out;
}

/** Mission + Vision + gallery sweep + property beats; reuses gallery frames with offset after sweep. */
export function getStoryBeatsForProperty(propertyId: number): StoryBeat[] {
  const d = DEMO_PROPERTY_DETAILS[propertyId];
  if (!d) return [];

  const beats: StoryBeat[] = [...prependPlatformBeats(d)];
  beats.push(...appendGalleryBeats(propertyId, d));

  const slides = getDemoImageSlides(d);
  const sweep = Math.min(slides.length, MAX_GALLERY_FRAMES);
  const base = sweep;

  beats.push({
    role: "why",
    roleLabel: ROLE_LABELS.why,
    title: "Why it matters",
    subtitle: trunc(d.thesis, 220),
    ...pickImage(d, base + 0),
  });

  const howLine =
    d.architectureNarrative?.trim() ??
    (d.highlights?.length ? d.highlights.slice(0, 2).join(" · ") : trunc(d.thesis, 160));
  beats.push({
    role: "how",
    roleLabel: ROLE_LABELS.how,
    title: "How it came together",
    subtitle: trunc(howLine, 220),
    ...pickImage(d, base + 1),
  });

  beats.push({
    role: "partners",
    roleLabel: ROLE_LABELS.partners,
    title: "The story behind the frame",
    subtitle: trunc(PARTNERS_SUBTITLE, 260),
    ...pickImage(d, base + 2),
    partnerLinks: [
      { label: "Holzbauer & Partner — Haus im Weinviertel", href: HOLZBAUER_PARTNER_URL },
      { label: "Culture Land portfolio", href: "/culture-land" },
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
    ...pickImage(d, base + 3),
  });

  return beats;
}
