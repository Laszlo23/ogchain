import { expect, test } from "@playwright/test";

test.describe("Mobile drawer", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("open menu and navigate to Trade", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "Main menu" })).toBeVisible();
    await page.getByRole("dialog", { name: "Main menu" }).getByRole("link", { name: "Trade" }).click();
    await expect(page).toHaveURL(/\/trade$/);
    await expect(page.getByRole("main")).toBeVisible();
  });
});
