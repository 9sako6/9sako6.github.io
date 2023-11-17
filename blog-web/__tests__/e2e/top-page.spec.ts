import { test, expect } from "@playwright/test";

test("top page has a valid title and a link to the about page", async ({
  page,
}) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/腐ったコロッケ/);

  // create a locator
  const aboutPage = page.getByText("A brief resume is here.");

  // Expect an attribute "to be strictly equal" to the value.
  await expect(aboutPage).toHaveAttribute("href", "/about");

  await aboutPage.click();

  await expect(page.locator(".markdown")).toHaveText(/経歴/);
  await expect(page.locator(".markdown")).toHaveText(/Education/);
});
