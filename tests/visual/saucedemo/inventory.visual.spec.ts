import { test, expect } from '../../../src/fixtures/saucedemo/auth.fixture';
import { global } from '../../../src/config/saucedemo/globals';
import { WaitUtils } from '../../../src/utils/WaitUtils';

test.describe('Inventory products visual', () => {
  test('products visual validation', async ({
    page,
    loggedInUser,
    headerMenuPage,
    shoppingCartPage,
  }) => {
    const waitUtils = new WaitUtils();

    await waitUtils.waitForPageReady(
      page,
      global.inventoryRegex,
      headerMenuPage.menuIcon,
    );

    await expect(shoppingCartPage.getBackPackImage()).toHaveScreenshot(
      'backpack.png',
    );

    await expect(shoppingCartPage.getTShirtImage()).toHaveScreenshot(
      'tshirt.png',
    );

    await expect(shoppingCartPage.getOnesieImage()).toHaveScreenshot(
      'onesie.png',
    );

    await expect(shoppingCartPage.getBikeLightImage()).toHaveScreenshot(
      'bike-light.png',
    );

    await expect(shoppingCartPage.getFleeceJacketImage()).toHaveScreenshot(
      'fleece-jacket.png',
    );

    await expect(shoppingCartPage.getTShirtRedImage()).toHaveScreenshot(
      'tshirt-red.png',
    );
  });
});
