/** Public origin for share links and metadata. Set in production for correct URLs when env differs from browser. */
export function getPublicOrigin(): string {
  if (typeof window !== "undefined") return window.location.origin;
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv ?? "";
}
