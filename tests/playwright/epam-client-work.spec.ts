import { test, expect } from '@playwright/test';

// Receives URL from user input and verifies navigation to Client Work via Services menu
test.describe('EPAM site - Client Work navigation', () => {
  test('open services and explore client work', async ({ page }) => {
    // 1. Navigate to the provided URL
    await page.goto('https://www.epam.com/');

    // 2. Select "Services" from the header menu
    // Use a role-based locator for resilience; fall back to text matching if needed
    const services = page.getByRole('link', { name: /services/i });
    await expect(services).toBeVisible({ timeout: 10_000 });
    await services.click();

    // 3. Click the "Explore Our Client Work" link
    // The target link may appear as a link or button; try role locator first
    const exploreClientWork = page.getByRole('link', { name: /explore our client work/i });
    if (await exploreClientWork.count() === 0) {
      // fallback to text-based locator
      await page.getByText(/explore our client work/i).click();
    } else {
      await exploreClientWork.first().click();
    }

    // 4. Verify that the "Client Work" text is visible on the page
    const clientWorkHeading = page.getByText(/client work/i);
    await expect(clientWorkHeading).toBeVisible({ timeout: 10_000 });
  });
});
