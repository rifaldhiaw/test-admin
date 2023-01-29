import { expect, test } from "@playwright/test";

test("has table", async ({ page }) => {
  await page.goto("/products");

  // Expect a table to be present
  const table = await page.waitForSelector("table");
  expect(table).toBeTruthy();
});

test("has required table headers", async ({ page }) => {
  await page.goto("/products");

  // Expect a table with headers: Product Name, Brand, Price, Stock, Category
  const table = await page.waitForSelector("table");
  const headers = await table.$$("th");
  expect(headers.length).toBe(5);
  expect(await headers[0].innerText()).toBe("Product Name");
  expect(await headers[1].innerText()).toBe("Brand");
  expect(await headers[2].innerText()).toBe("Price");
  expect(await headers[3].innerText()).toBe("Stock");
  expect(await headers[4].innerText()).toBe("Category");
});
