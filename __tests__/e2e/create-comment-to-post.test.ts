import { test, expect } from "@playwright/test";

test("Authenticated user can create a post comment", async ({ page }) => {
  // Sign in
  await page.goto("/posts/00example");
  await page.locator("data-testid=sign-in-button").click();
  await page.locator("text=Jane Doe").click();

  // Create a comment
  await page
    .locator("data-testid=comment-textarea")
    .fill("Hello, this is a test comment.", {
      timeout: 120 * 1000,
    });
  await page.locator("text=Send").click();
});
