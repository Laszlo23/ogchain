import { expect, test } from "@playwright/test";

test.describe("Desktop header navigation", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("primary nav links reach expected URLs", async ({ page }) => {
    await page.goto("/");

    const cases: { name: string | RegExp; path: string }[] = [
      { name: "Properties", path: "/properties" },
      { name: "Trade", path: "/trade" },
      { name: "Invest", path: "/invest" },
      { name: "Stake", path: "/stake" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Community", path: "/community" },
    ];

    const mainNav = page.locator("header").getByRole("navigation", { name: "Main" });

    for (const { name, path } of cases) {
      await mainNav.getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${path.replace("?", "\\?")}$`));
      await expect(page.getByRole("main")).toBeVisible();
      await page.goto("/");
      await expect(mainNav.getByRole("link", { name: "Properties", exact: true })).toBeVisible();
    }
  });

  test("logo returns home from /mission", async ({ page }) => {
    await page.goto("/mission");
    await page.getByRole("link", { name: /Building Culture/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
