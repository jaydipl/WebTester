import { test, expect } from '@playwright/test';

// Test: verify Client Work navigation from Services -> Explore Our Client Work
// Steps:
// 1) Open browser and navigate to provided URL
// 2) Select "Services" from header menu
// 3) Click "Explore Our Client Work" link
// 4) Verify the "Client Work" text is visible

const BASE_URL = process.env.TEST_BASE_URL || 'https://www.epam.com/';

test.describe('EPAM - Client Work navigation', () => {
  test('should navigate to Client Work from Services', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Dismiss cookie banner if present
    const acceptBtn = page.locator('button', { hasText: /accept|agree|continue/i });
    if (await acceptBtn.count() > 0) {
      await acceptBtn.first().click().catch(()=>{});
    }

    // Click Services in header
    const services = page.getByRole('link', { name: /^Services$/i });
    if (await services.count() > 0) {
      await services.first().click();
    } else {
      const servicesText = page.getByText(/^Services$/i);
      await servicesText.first().click();
    }

    // Click Explore Our Client Work
    const explore = page.getByRole('link', { name: /Explore Our Client Work/i });
    if (await explore.count() > 0) {
      await explore.first().click();
    } else {
      const exploreText = page.getByText(/Explore Our Client Work/i);
      await exploreText.first().click();
    }

    // Assert Client Work text is visible
    const clientWork = page.getByText(/Client Work/i);
    await expect(clientWork).toBeVisible();
  });
});