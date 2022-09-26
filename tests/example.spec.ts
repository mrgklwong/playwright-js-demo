import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.locator('text=Get Started');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
  const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast','landmark-one-main','landmark-unique'])
      .analyze();
  await expect(accessibilityScanResults.violations).toEqual([]);
});


test('my first test using playwright JS', async ({ page }) => {
  const getStarted = page.locator('[title="Search"]');
  await page.goto('https://www.google.co.uk/');
  const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast','landmark-one-main'])
      .analyze();
  await expect(accessibilityScanResults.violations).toEqual([]);
});
