import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';
import { SearchPage } from './searchPage';

export class ProductDescriptionPage {

    private page: Page; 
    private searchPage:SearchPage;

    constructor(page: Page) {
        this.page = page;
    }

    private productDescriptionSelectors = {
        quantitySelectionInput: '(//div[@class="productFullDetail-actionsContainer-igW"]//button[@aria-label="Increase Quantity"])[1]',
        addToCartBtn:'[id="addToCartStockBtn"]',
        showCartBtn: '//button[@class="miniCart-editCartButton-3iU"]/span[@class="button-content-3ns"]',
    };

    async quantitySelection(quantity) {
        const inputQuantity = this.page.locator(this.productDescriptionSelectors.quantitySelectionInput);
        for (let i =1; i < quantity ; i++) {
            await inputQuantity.waitFor({state:'visible',timeout:5000});
            await inputQuantity.click();
          }
    }

    async clickOnAddToCart() {
        await this.page.click(this.productDescriptionSelectors.addToCartBtn);
        //await this.searchPage.waitForButtonToBeEnabled(this.productDescriptionSelectors.addToCartBtn);
    }

    async clickOnShowCart(){
        const showCartBtn = this.page.locator(this.productDescriptionSelectors.showCartBtn);
        await showCartBtn.waitFor({ state: 'visible', timeout: 30000 });
        await showCartBtn.click();
    }
}