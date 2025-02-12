import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';

export class SearchPage {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    private searchSelectors = {
        searchBox: '[name="search_query"]', 
        addToCartButton : (productId) => `//a[@data-id="${productId}"]/ancestor::form//button[@type="submit"]`,
        subMenu: '[data-submenu="2"]',
        selectVuseGo: '(//a[contains(text(),"Vuse GO")])[2]',
        clickOnProduct: '//a[@data-id="6647"]/ancestor::form//img[@loading="eager"]',

    };

    async searchProduct(searchTerm: string) {
        const searchBox = this.page.locator(this.searchSelectors.searchBox);
        await searchBox.waitFor({ state: 'visible', timeout: 5000 });
        await searchBox.fill(searchTerm); 
        await this.page.keyboard.press('Enter');
        await this.page.click(this.searchSelectors.addToCartButton("2100"));
        await this.waitForButtonToBeEnabled(this.searchSelectors.addToCartButton("2100"));
        await this.page.click(this.searchSelectors.addToCartButton("2105"));
        await this.waitForButtonToBeEnabled(this.searchSelectors.addToCartButton("2105"));
        await this.page.click(this.searchSelectors.addToCartButton("3842"));
        await this.waitForButtonToBeEnabled(this.searchSelectors.addToCartButton("3842"));
        const subMenu = this.page.locator(this.searchSelectors.subMenu);
        await subMenu.waitFor({state:'visible',timeout:5000});
        await this.page.hover(this.searchSelectors.subMenu);
        const selectVuseGo = this.page.locator(this.searchSelectors.selectVuseGo);
        await selectVuseGo.first().click();
        const clickOnPLPProduct = this.page.locator(this.searchSelectors.clickOnProduct);
        await clickOnPLPProduct.waitFor({state:'visible',timeout:10000});
        await clickOnPLPProduct.click();
    }

    async waitForButtonToBeEnabled(WebElement) {
        const startTime = Date.now();
        const timeout = 12000;
        while (Date.now() - startTime < timeout) {
        const isEnabled = await this.page.locator(WebElement).isEnabled();
        if (isEnabled) {
          await expect(this.page.locator(WebElement)).toBeEnabled();
          return;
        }
        await this.page.waitForTimeout(1000);
      }
      throw new Error(`Button did not become enabled within ${timeout}ms`);
    }
}