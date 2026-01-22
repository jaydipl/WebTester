import { test, expect } from '@playwright/test';

test('Verify Explore Our Client Work from Services -> Client Work', async ({ page }) => {
  // 1) Open browser and navigate to the provided URL
  await page.goto('https://www.epam.com/');

  // 2) Select "Services" from the header menu
  const services = page.getByRole('link', { name: /Services/i }).first();
  await services.click();

  // 3) Click the "Explore Our Client Work" link
  const explore = page.getByRole('link', { name: /Explore( our)? client work/i }).first();
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    explore.click(),
  ]);

  // 4) Verify that the "Client Work" text is visible on the page
  await expect(page.getByText(/Client Work/i)).toBeVisible();
});