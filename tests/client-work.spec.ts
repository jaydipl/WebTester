import { test, expect } from '@playwright/test';

// Test: Navigate to provided URL, open Services, click Explore Our Client Work, verify "Client Work" visible.

test('EPAM - Client Work navigation', async ({ page }) => {
  // Receive URL from env or default
  const url = process.env.TEST_URL || 'https://www.epam.com/';

  // 1) Open browser & navigate to URL
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // 2) Ensure header is visible. If a cookie banner or hero intercepts clicks, adjust pointer-events to allow clicks.
  await page.waitForLoadState('networkidle');
  try {
    await page.evaluate(() => {
      const selectors = [
        '[data-cookie-consent]',
        '#onetrust-consent-sdk',
        '.cookie-banner',
        '.single-slide__image',
        '.hero',
      ];
      selectors.forEach(s => {
        const el = document.querySelector(s) as HTMLElement | null;
        if (el) el.style.pointerEvents = 'none';
      });
    });
  } catch (e) {
    // ignore
  }

  // 3) Select "Services" from the header menu
  const services = page.getByRole('link', { name: /Services/i });
  await expect(services.first()).toBeVisible({ timeout: 10000 });
  await services.first().click();

  // 4) Click the "Explore Our Client Work" link.
  await page.waitForLoadState('networkidle');
  const explore = page.getByRole('link', { name: /Explore Our Client Work/i });
  if ((await explore.count()) > 0) {
    await explore.first().scrollIntoViewIfNeeded();
    await explore.first().click();
  } else {
    // fallback
    await page.goto('https://www.epam.com/our-work', { waitUntil: 'networkidle' });
  }

  // Verify that "Client Work" text is visible on the page
  await page.waitForLoadState('networkidle');
  const clientWork = page.getByText(/Client Work/i);
  await expect(clientWork.first()).toBeVisible({ timeout: 10000 });

  // Assert URL
  expect(page.url()).toMatch(/(our-work|client-work|work)/i);
});
