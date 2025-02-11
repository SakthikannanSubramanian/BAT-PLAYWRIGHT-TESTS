import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';

export class ProductDescriptionPage {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    private registrationSelectors = {
        fistName: '[autocomplete="given-name"]',
        lastName: '[autocomplete="family-name"]',
        dateOfBirth: '[autocomplete="date"]',
        gender:'[aria-labelledby="customer.gender"]',
        acceptAllBtn: '#onetrust-accept-btn-handler'
    };

    async goTo(path) {
        await this.page.goto(path); 

        const acceptAllButton = this.page.locator(this.registrationSelectors.acceptAllBtn);
        await acceptAllButton.waitFor({ state: 'visible', timeout: 5000 });
        await acceptAllButton.click(); 
    }

    async verifyAge(){
        await this.page.getByText('ICH BIN 18 JAHRE ODER ÄLTER').click();
    }

    async fillCredentials(username: string, password: string) {
        await this.page.fill(this.loginSelectors.usernameInput, username);
        await this.page.fill(this.loginSelectors.passwordInput, password);
    }

    async submit() {
        await this.page.click(this.loginSelectors.submitButton);
    }

    async getEmailErrorMessage() : Promise<String>{
        return (await this.page.locator(this.loginSelectors.emailError).textContent()?? '');
    }

    async verifyTextVisible(textToVerify: string){
        await expect(this.page.getByText(textToVerify)).toBeVisible({ timeout: 20000 });
    }
}