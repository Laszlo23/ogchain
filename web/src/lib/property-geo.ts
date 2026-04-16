/**
 * Approximate map centres for demo property listings (illustrative — verify for production).
 * Used for OpenStreetMap embeds; not survey-grade coordinates.
 */
export type PropertyGeo = {
  lat: number;
  lng: number;
  /** Default zoom level for bbox math (OSM embed) */
  zoom?: number;
};

export const PROPERTY_GEO_BY_ID: Partial<Record<number, PropertyGeo>> = {
  1: { lat: 48.2186, lng: 16.3608, zoom: 16 },
  2: { lat: 48.175, lng: 16.285, zoom: 15 },
  3: { lat: 46.583, lng: 14.167, zoom: 14 },
  4: { lat: 48.165, lng: 16.285, zoom: 15 },
  5: { lat: 48.499, lng: 16.816, zoom: 15 },
  6: { lat: 48.467, lng: 16.283, zoom: 15 },
  7: { lat: 48.499, lng: 16.816, zoom: 15 },
};

const MAX_GALLERY_FRAMES = 10;

/** Frames per project used for listing cards and `/experience` story beats (photo-first; no plan/PDF art). */
export const IMMERSIVE_PROJECT_FRAMES = 3;

/** @internal exported for tests */
export function bboxFromCenter(geo: PropertyGeo): { minLon: number; minLat: number; maxLon: number; maxLat: number } {
  const z = geo.zoom ?? 15;
  const span = 0.045 / (z / 14);
  const lat = geo.lat;
  const lng = geo.lng;
  const latPad = span * 0.55;
  const lonPad = span * 0.7;
  return {
    minLon: lng - lonPad,
    minLat: lat - latPad,
    maxLon: lng + lonPad,
    maxLat: lat + latPad,
  };
}

/** OpenStreetMap embed URL (no API key). */
export function getOsmEmbedUrl(geo: PropertyGeo): string {
  const { minLon, minLat, maxLon, maxLat } = bboxFromCenter(geo);
  const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${geo.lat}%2C${geo.lng}`;
}

export function getOsmExternalUrl(geo: PropertyGeo): string {
  const z = Math.min(19, Math.max(3, Math.round(geo.zoom ?? 15)));
  return `https://www.openstreetmap.org/?mlat=${geo.lat}&mlon=${geo.lng}#map=${z}/${geo.lat}/${geo.lng}`;
}

export function getPropertyGeoById(propertyId: number): PropertyGeo | undefined {
  return PROPERTY_GEO_BY_ID[propertyId];
}

export { MAX_GALLERY_FRAMES };
