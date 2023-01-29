import { expect, Page, test } from "@playwright/test";

test("has table", async ({ page }) => {
  await page.goto("/products");

  // Expect a table to be present
  const table = await page.waitForSelector("table");
  expect(table).toBeTruthy();
});

const waitForLoading = async (page: Page) => {
  // wait for text "..." inside the table to disappear
  const tableLoader = await page.waitForSelector("table");
  await tableLoader.waitForSelector("text=...", { state: "hidden" });
};

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

test("should be able to search for products", async ({ page }) => {
  await page.goto("/products");

  // search for "iPhone" in the search input with test-id="search-input"
  const searchInput = page.getByTestId("search-input");
  await searchInput.fill("iPhone");
  await searchInput.press("Enter");

  await waitForLoading(page);

  // expect the table to have a row with the text "iPhone"
  const table = await page.waitForSelector("table");
  const rows = await table.$$("tr");
  expect(rows.length).toBeGreaterThan(0);
  const hasIphone = await Promise.all(
    rows.map(async (row) => {
      const text = await row.innerText();
      return text.includes("iPhone");
    })
  );

  expect(hasIphone).toContain(true);
});

test("should be able to filter products by category", async ({ page }) => {
  await page.goto("/products");

  // click the select button with test-id="categories-select"
  const select = page.getByTestId("categories-select");
  await select.click();

  // find the element with test-id "categories-select-content" and select "smartphones"
  const selectContent = page.getByTestId("categories-select-content");
  const option = selectContent.getByText("smartphones");
  await option.click();

  await waitForLoading(page);

  // expect the table to have a row with the text "smartphones"
  const table = await page.waitForSelector("table");
  const rows = await table.$$("tr");
  expect(rows.length).toBeGreaterThan(0);
  const hasSmartphones = await Promise.all(
    rows.map(async (row) => {
      const text = await row.innerText();
      return text.includes("smartphones");
    })
  );

  expect(hasSmartphones).toContain(true);
});

test("should be able to filter products by brand", async ({ page }) => {
  await page.goto("/products");

  // click the select button with test-id="brands-select"
  const select = page.getByTestId("brands-select");
  await select.click();

  // find the element with test-id "brands-select-content" and select "Samsung"
  const selectContent = page.getByTestId("brands-select-content");
  const option = selectContent.getByText("Samsung");
  await option.click();

  await waitForLoading(page);

  // expect the table to have a row with the text "Samsung"
  const table = await page.waitForSelector("table");
  const rows = await table.$$("tr");
  expect(rows.length).toBeGreaterThan(0);
  const hasSamsung = await Promise.all(
    rows.map(async (row) => {
      const text = await row.innerText();
      return text.includes("Samsung");
    })
  );

  expect(hasSamsung).toContain(true);
});

test("should be able to filter products by min price and max price", async ({
  page,
}) => {
  await page.goto("/products");

  // input "1000" in the min price input with test-id="min-price-input"
  const minPriceInput = page.getByTestId("min-price-input");
  await minPriceInput.fill("1000");
  await minPriceInput.press("Enter");
  await waitForLoading(page);

  // input "1500" in the max price input with test-id="max-price-input"
  const maxPriceInput = page.getByTestId("max-price-input");
  await maxPriceInput.fill("1500");
  await maxPriceInput.press("Enter");
  await waitForLoading(page);

  // grab all values in the 3rd Td (price)
  const table = await page.waitForSelector("table");
  const rows = await table.$$("tr").then((rows) => rows.slice(1));
  expect(rows.length).toBeGreaterThan(0);

  const prices = await Promise.all(
    rows.map(async (row) => {
      const text = await row.innerText();
      const price = text.split("\n")[2];
      return parseInt(price);
    })
  );

  // expect all prices to be between 1000 and 1500
  expect(prices.every((price) => price >= 1000 && price <= 1500)).toBe(true);
});
