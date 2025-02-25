import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';

export class CommonFunction {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    async verifyTextPresent(element,expectedText){
        const actualText = await this.page.locator(element).textContent({timeout:60000});
        await expect(actualText).toBe(expectedText);
    }
    
}