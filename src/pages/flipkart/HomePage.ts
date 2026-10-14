import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
  //  this.searchInput = page.locator('input[name="q"]');
  this.searchInput = page.locator('input[name="q"]:not([readonly])');
  }

  async goto(baseURL: string): Promise<void> {
    await this.page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  }

  async searchFor(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}
