import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1').first();
  }

  async getTitleText(): Promise<string> {
    return (await this.title.innerText()).trim();
  }
}
