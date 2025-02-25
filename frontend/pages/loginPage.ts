import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';
import { CommonFunction } from '../pages/commonFunction';

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
        acceptAllBtn: '#onetrust-accept-btn-handler',
        logoutButtonSideBar: '//a[contains(text(),"Ausloggen")]',
        redirectionIn5SecMessage: '//p[contains(@class,"signoutPage-signoutContent")]',
        emailBlankErrMessage:'//label[contains(text(),"E-Mail")]/following-sibling::p',
        passwordBlankErrMessage: '//label[contains(text(),"Passwort")]/following-sibling::p',
        incorrectPasswordErrMessage: '//div[contains(@class,"signInPage-module")]//span[contains(@class,"errorMessage")]',
    };

    async goTo() {
        await this.page.goto('/sign-in'); 
        const acceptAllButton = this.page.locator(this.loginSelectors.acceptAllBtn);
        await acceptAllButton.isVisible({ timeout: 60000 });
        await acceptAllButton.click(); 
    }

    async goToProduction() {
        await this.page.goto('https://vuse.com/de/de/sign-in'); 
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
        await this.page.click(this.loginSelectors.submitButton,{timeout:30000});
    }

    async getEmailErrorMessage() : Promise<String>{
        return (await this.page.locator(this.loginSelectors.emailError).textContent()?? '');
    }

    async verifyTextVisible(textToVerify: string){
        await expect(this.page.getByText(textToVerify)).toBeVisible({ timeout: 50000 });
    }

    async clickOnLogoutFromSideBar(){
        await this.page.click(this.loginSelectors.logoutButtonSideBar);
    }

    async logoutMessageValidation(expectedText){
        await this.verifyTextPresent(this.loginSelectors.redirectionIn5SecMessage,expectedText);
    }

    async verifyTextPresent(element,expectedText){
        const actualText = await this.page.locator(element).textContent({timeout:60000});
        await expect(actualText).toBe(expectedText);
    }

    async verifyBlankFieldErrorMessage(){
        await this.submit();
        await this.verifyTextPresent(this.loginSelectors.emailBlankErrMessage,"Pflichtfeld. Bitte ausfüllen.");
        await this.verifyTextPresent(this.loginSelectors.passwordBlankErrMessage,"Pflichtfeld. Bitte ausfüllen.");
    }

    async verifyIncorrectPasswordErrorMessage(){
        await this.submit();
        await this.verifyTextPresent(this.loginSelectors.incorrectPasswordErrMessage,"Die Konto-Anmeldung war nicht korrekt oder dein Konto ist vorübergehend deaktiviert. Bitte warte und versuche es später erneut.");
    }

    async verifyInvalidEmailErrorMessage(){
        await this.submit();
        await this.verifyTextPresent(this.loginSelectors.emailBlankErrMessage,"Ungültige Eingabe. Bitte gebe deine E-Mail-Adresse im richtigen Format ein: beispiel@domain.com");
    }
}
