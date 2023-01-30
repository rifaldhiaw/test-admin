import { expect, Page, test } from "@playwright/test";

const waitForLoading = async (page: Page) => {
  // wait for text "..." inside the table to disappear
  const tableLoader = await page.waitForSelector("table");
  await tableLoader.waitForSelector("text=Loading...", { state: "hidden" });
};

test("has table", async ({ page }) => {
  await page.goto("/carts");
  await waitForLoading(page);

  // Expect a table to be present
  const table = await page.waitForSelector("table");
  expect(table).toBeTruthy();
});

test("has required table headers", async ({ page }) => {
  await page.goto("/carts");
  await waitForLoading(page);

  const table = await page.waitForSelector("table");
  const headers = await table.$$("th");
  expect(headers.length).toBe(5);
  expect(await headers[0].innerText()).toBe("Id");
  expect(await headers[1].innerText()).toBe("User Id");
  expect(await headers[2].innerText()).toBe("Discounted Total");
  expect(await headers[3].innerText()).toBe("Total Products");
  expect(await headers[4].innerText()).toBe("Total Quantity");
});

// click row with id = "1" should navigate to /carts/1, and the page should contain the text "Cart 1
test("should be able to click on a row", async ({ page }) => {
  await page.goto("/carts");
  await waitForLoading(page);

  const table = await page.waitForSelector("table");
  const row = await table.$("text=1");
  await row?.click();
  await waitForLoading(page);

  await page.waitForSelector("text=Cart 1");
});
