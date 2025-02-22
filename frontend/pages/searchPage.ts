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
        clickOnFirstProduct: (productId) => `//a[@data-id="${productId}"]/ancestor::form//img[@loading="eager"]`,

    };

    async searchProduct(searchTerm: string) {
        const searchBox = this.page.locator(this.searchSelectors.searchBox);
        await searchBox.waitFor({ state: 'visible'});
        await searchBox.fill(searchTerm); 
        await this.page.keyboard.press('Enter');
    };

    async addProductFromPLP() {
        await this.page.locator(this.searchSelectors.addToCartButton("2100")).isVisible();
        await this.page.click(this.searchSelectors.addToCartButton("2100"));
        await this.waitForButtonToBeEnabled(this.searchSelectors.addToCartButton("2100"));
        await this.page.click(this.searchSelectors.addToCartButton("2105"));
        await this.waitForButtonToBeEnabled(this.searchSelectors.addToCartButton("2105"));
        await this.page.click(this.searchSelectors.addToCartButton("3842"));
        await this.waitForButtonToBeEnabled(this.searchSelectors.addToCartButton("3842"));
    }

    async navigateToPDPFromSubmenu() {
        const subMenu = this.page.locator(this.searchSelectors.subMenu).isVisible();
        await this.page.hover(this.searchSelectors.subMenu);
        const selectVuseGo = this.page.locator(this.searchSelectors.selectVuseGo);
        await selectVuseGo.waitFor({state:'visible'});
        await selectVuseGo.first().click();
        const clickOnPLPProduct = this.page.locator(this.searchSelectors.clickOnFirstProduct('7747'));
        await clickOnPLPProduct.waitFor({state:'visible'});
        await clickOnPLPProduct.click();
    }

    async waitForButtonToBeEnabled(xpath: string) {
        const button = this.page.locator(`xpath=${xpath}`);
    
        // Ensure the button is visible first
        await button.waitFor({ state: 'visible'});
    
        // Wait until the button becomes enabled
        await this.page.waitForFunction(
            (xpath) => {
                const btn = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLButtonElement;
                return btn && !btn.disabled;
            },
            xpath,
            { timeout: 20000 }
        );
    
        // Final assertion to confirm button is enabled
        await expect(button).toBeEnabled();
    }
    

}