/**
 * Per-property story arc: exactly three photo beats (one image each, no repeats).
 * Culture Land titles when `exploreHref` matches; partner links on the final beat only.
 */
import { getCultureLandDisplayForDemoPropertyId } from "@/lib/culture-land-portfolio";
import { DEMO_PROPERTY_DETAILS, getDemoImageSlides } from "@/lib/demo-properties";
import { IMMERSIVE_PROJECT_FRAMES } from "@/lib/property-geo";

export type StoryBeatRole = "mission" | "vision" | "place" | "gallery" | "why" | "how" | "partners" | "solution";

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
};

const PARTNERS_BLURB =
  "Craft and collaborators from vision to keys — reference narrative; not an endorsement of any security.";

const HOLZBAUER_PARTNER_URL = "https://holzbauer-partner.at/haus-im-weinviertelniederoesterreich/";

function trunc(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
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
