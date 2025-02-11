import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';

export class ProductDescriptionPage {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    private productDescriptionSelectors = {
        quantitySelectionInput: '[name="quantity"]',
        addToCartBtn:'[id="addToCartStockBtn"]',
        showCartBtn: '//button[@class="miniCart-editCartButton-3iU"]/span[@class="button-content-3ns"]',
    };

    async goTo(path) {
        await this.page.goto(path);
        await this.page.locator(this.productDescriptionSelectors.quantitySelectionInput).waitFor({ state: 'visible', timeout: 5000 });
        await this.page.click(this.productDescriptionSelectors.quantitySelectionInput);
    }

    async quantitySelection(quantity) {
        const inputQuantity = this.page.locator(this.productDescriptionSelectors.quantitySelectionInput);
        await inputQuantity.first().fill('');
        await inputQuantity.last().fill(quantity);
    }

    async clickOnAddToCart() {
        await this.page.click(this.productDescriptionSelectors.addToCartBtn);
    }

    async clickOnShowCart(){
        const showCartBtn = this.page.locator(this.productDescriptionSelectors.showCartBtn);
        await showCartBtn.waitFor({ state: 'visible', timeout: 5000 });
        await showCartBtn.click();
    }
}