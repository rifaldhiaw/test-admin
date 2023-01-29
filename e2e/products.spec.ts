import { expect, test } from "@playwright/test";

test("has table", async ({ page }) => {
  await page.goto("/products");

  // Expect a table to be present
  const table = await page.waitForSelector("table");
  expect(table).toBeTruthy();
});
