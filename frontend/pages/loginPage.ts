import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';

export class LoginPage {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    private loginSelectors = {
        usernameInput: '[name="email"]',
        passwordInput: '[name="password"]',
        submitButton: '//button/span[contains(text(), "EINLOGGEN")]',
        emailError:'#email-errorText',
        acceptAllBtn: '#onetrust-accept-btn-handler'
    };

    async goTo() {
        await this.page.goto('/sign-in'); 

        const acceptAllButton = this.page.locator(this.loginSelectors.acceptAllBtn);
        await acceptAllButton.isVisible({ timeout: 60000 });
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
        await expect(this.page.getByText(textToVerify)).toBeVisible({ timeout: 50000 });
    }
}
