import { test, expect } from '../../../src/fixtures/flipkart/pages.fixture';
import { ProductPage } from '../../../src/pages/flipkart/ProductPage';
import { global } from '../../../src/config/flipkart/globals';
import { currentEnv } from '../../../src/config/flipkart/env';

test.describe('Flipkart Search', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto(currentEnv.baseURL);
  });
  //mytest
//  test('only open the home page', async ({ page }) => {
//  await page.pause();
//});
//npx playwright test tests/ui/flipkart/search.spec.ts -g "only open" --headed
  test('should show product results when searching a valid term', async ({
    homePage,
    searchResultsPage,
    page,
  }) => {
    await homePage.searchFor(currentEnv.searchTerm);

    await expect(page).toHaveURL(global.searchUrlRegex);
    await expect(searchResultsPage.productLinks.first()).toBeVisible();
    expect(await searchResultsPage.getProductCount()).toBeGreaterThan(0);
  });

  test('should open the product page from the first search result', async ({
    homePage,
    searchResultsPage,
  }) => {
    await homePage.searchFor(currentEnv.searchTerm);
    await expect(searchResultsPage.productLinks.first()).toBeVisible();

    const openedPage = await searchResultsPage.openFirstProduct();
    const productPage = new ProductPage(openedPage);

    await expect(openedPage).toHaveURL(global.productUrlRegex);
    await expect(productPage.title).toBeVisible();
  });

  test('should show a no-results message for an invalid term', async ({
    homePage,
    searchResultsPage,
  }) => {
    await homePage.searchFor(currentEnv.invalidSearchTerm);

    await expect(searchResultsPage.noResultsMessage).toBeVisible();
  });
});
