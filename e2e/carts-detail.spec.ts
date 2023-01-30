import { expect, Page, test } from "@playwright/test";

const waitForLoading = async (page: Page) => {
  const tableLoader = await page.waitForSelector("table");
  await tableLoader.waitForSelector("text=Loading...", { state: "hidden" });
};

test("has details section", async ({ page }) => {
  await page.goto("/carts/1");
  await waitForLoading(page);

  await page.waitForSelector("text=Details");
});

// has text in details: "User", "Added On",  "# of items", "Total"
test("has required details", async ({ page }) => {
  await page.goto("/carts/1");
  await waitForLoading(page);

  // find test data-testid "cart-details"
  const details = page.getByTestId("cart-details");
  const detailsText = await details.innerText();

  expect(detailsText).toContain("User");
  expect(detailsText).toContain("Added On");
  expect(detailsText).toContain("# of items");
  expect(detailsText).toContain("Total");
});

test("has products section", async ({ page }) => {
  await page.goto("/carts/1");
  await waitForLoading(page);

  await page.waitForSelector("text=Products");
});

test("has table inside products section", async ({ page }) => {
  await page.goto("/carts/1");
  await waitForLoading(page);

  const table = await page.waitForSelector("table");
  expect(table).toBeTruthy();
});

test("has required table headers", async ({ page }) => {
  await page.goto("/carts/1");
  await waitForLoading(page);

  const table = await page.waitForSelector("table");
  const headers = await table.$$("th");
  expect(headers.length).toBe(7);
  expect(await headers[0].innerText()).toBe("Id");
  expect(await headers[1].innerText()).toBe("Product Name");
  expect(await headers[2].innerText()).toBe("Price");
  expect(await headers[3].innerText()).toBe("Discount %");
  expect(await headers[4].innerText()).toBe("Discount");
  expect(await headers[5].innerText()).toBe("Quantity");
  expect(await headers[6].innerText()).toBe("Total");
});
