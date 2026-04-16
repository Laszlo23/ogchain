import { expect, test } from "@playwright/test";

test("footer link Immersive story navigates to /experience", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await footer.getByRole("link", { name: "Immersive story" }).scrollIntoViewIfNeeded();
  await footer.getByRole("link", { name: "Immersive story" }).click();
  await expect(page).toHaveURL(/\/experience$/);
  await expect(page.getByRole("region", { name: /Immersive stories/i })).toBeVisible();
});

test("footer legal overview link", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await footer.getByRole("link", { name: "Legal overview" }).scrollIntoViewIfNeeded();
  await footer.getByRole("link", { name: "Legal overview" }).click();
  await expect(page).toHaveURL(/\/legal$/);
  await expect(page.getByRole("main")).toBeVisible();
});
