import { test as base } from './base.fixture';

import { HomePage } from '../../pages/flipkart/HomePage';
import { SearchResultsPage } from '../../pages/flipkart/SearchResultsPage';

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
});

export const expect = test.expect;
