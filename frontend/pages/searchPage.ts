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
        plpProdOne: '//a[@data-id="2105"]/ancestor::form//button[@type="submit"]',
        lastName: '[autocomplete="family-name"]',
        dateOfBirth: '[autocomplete="date"]',
        gender:'[aria-labelledby="customer.gender"]',
        acceptAllBtn: '#onetrust-accept-btn-handler'

    };

    async searchProduct(searchTerm: string) {
        const searchBox = this.page.locator(this.searchSelectors.searchBox);
        await searchBox.waitFor({ state: 'visible', timeout: 5000 });
        await searchBox.fill(searchTerm); 
        await this.page.keyboard.press('Enter');
        await this.page.click(this.searchSelectors.addToCartButton("2100"));
        await this.page.click(this.searchSelectors.addToCartButton("2105"));
        await this.page.click(this.searchSelectors.addToCartButton("3842"));
    

    }

    async verifyAge(){
        await this.page.getByText('ICH BIN 18 JAHRE ODER ÄLTER').click();
    }

    

   

    async verifyTextVisible(textToVerify: string){
        await expect(this.page.getByText(textToVerify)).toBeVisible({ timeout: 20000 });
    }
}