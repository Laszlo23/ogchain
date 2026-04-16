import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

/** Most pages render inside SiteChrome `<main>`. */
export async function expectMainVisible(page: Page) {
  await expect(page.getByRole("main")).toBeVisible();
}

/** Full-screen immersive funnel (no `<main>`). */
export async function expectImmersiveVisible(page: Page) {
  await expect(page.getByRole("region", { name: /Immersive stories/i })).toBeVisible();
}
