/**
 * Fullscreen funnel slides — one panel per demo property (imagery + copy from `demo-properties`).
 * Titles align with Culture Land when `exploreHref` matches (`culture-land-portfolio`).
 */
import { getCultureLandDisplayForDemoPropertyId } from "@/lib/culture-land-portfolio";
import { DEMO_PROPERTY_DETAILS, getDemoImageSlides } from "@/lib/demo-properties";

export type ExperienceSlide = {
  kicker?: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  /** Demo catalogue id — drives deep links and overlay economics. */
  propertyId: number;
};

function truncateThesis(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

/** Ordered slides — one hero image per property (first gallery frame). */
export function getProjectExperienceSlides(): ExperienceSlide[] {
  const ids = Object.keys(DEMO_PROPERTY_DETAILS)
    .map(Number)
    .sort((a, b) => a - b);
  return ids.map((propertyId) => {
    const d = DEMO_PROPERTY_DETAILS[propertyId]!;
    const img = getDemoImageSlides(d)[0]!;
    const cl = getCultureLandDisplayForDemoPropertyId(propertyId);
    const title = cl?.title ?? d.headline;
    const subtitle = cl
      ? truncateThesis(`${cl.tagline} — ${cl.region}`, 220)
      : truncateThesis(d.thesis, 220);
    return {
      propertyId,
      kicker: d.discoveryCategory,
      title,
      subtitle,
      imageSrc: img.src,
      imageAlt: img.alt,
    };
  });
}

/** @deprecated Use `getProjectExperienceSlides()` — kept for any stray imports. */
export const EXPERIENCE_SLIDES: ExperienceSlide[] = getProjectExperienceSlides();
