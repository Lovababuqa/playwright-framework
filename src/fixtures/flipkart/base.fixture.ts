import { test as base } from '@playwright/test';

export const test = base.extend({
  // Overrides the built-in page fixture so EVERY test gets the popup handler.
  page: async ({ page }, use) => {
    const closeLoginPopup = page.getByRole('button', { name: '✕' }).first();

    // Runs automatically whenever the login popup blocks an action.
    await page.addLocatorHandler(closeLoginPopup, async (closeButton) => {
      await closeButton.click();
    });

    await use(page);
  },
});

export const expect = test.expect;
