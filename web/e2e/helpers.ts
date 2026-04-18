import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

/** Matches `FIRST_VISIT_INTRO_STORAGE_KEY` — without this, `/` client-redirects to `/experience` and drops `<main>`. */
export async function skipHomeIntroRedirect(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem("building-culture-intro-v1", "1");
  });
}

/** Most pages render inside SiteChrome `<main>`. */
export async function expectMainVisible(page: Page) {
  await expect(page.getByRole("main")).toBeVisible();
}

/** Full-screen immersive funnel (no `<main>`). */
export async function expectImmersiveVisible(page: Page) {
  await expect(page.getByRole("region", { name: /Immersive stories/i })).toBeVisible();
}
