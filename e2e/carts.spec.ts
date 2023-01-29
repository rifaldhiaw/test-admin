import { expect, Page, test } from "@playwright/test";

const waitForLoading = async (page: Page) => {
  // wait for text "..." inside the table to disappear
  const tableLoader = await page.waitForSelector("table");
  await tableLoader.waitForSelector("text=...", { state: "hidden" });
};

test("has table", async ({ page }) => {
  await page.goto("/carts");
  await waitForLoading(page);

  // Expect a table to be present
  const table = await page.waitForSelector("table");
  expect(table).toBeTruthy();
});
