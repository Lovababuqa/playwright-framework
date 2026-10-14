import { Locator, Page } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly productLinks: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLinks = page.locator('a[href*="/p/itm"]');
    this.noResultsMessage = page.getByText(/no results found/i);
  }

  async getProductCount(): Promise<number> {
    return await this.productLinks.count();
  }

  // Product links may open in a new tab or the same tab, so handle both.
  async openFirstProduct(): Promise<Page> {
    const newTab = this.page
      .context()
      .waitForEvent('page', { timeout: 5000 })
      .catch(() => null);

    await this.productLinks.first().click();

    const openedPage = (await newTab) ?? this.page;
    await openedPage.waitForLoadState('domcontentloaded');
    return openedPage;
  }
}
