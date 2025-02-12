import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';

export class CheckoutPage {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    private checkoutSelectors = {
        toTheCheckout: "(//span[@class='button-content-3ns'][normalize-space()='zur Kasse'])[2]",
        standardDelivery: "//input[@class='radio-input-2mJ']",
        selectCreditCard: "//div[contains(@class,'worldpay_cc')]//span[@class='paymentMethods-radioLabel-h9R']",
        cardHolderName: "//input[@id='ac35225d-2254-46d7-9731-aa9e57e3d8f2']",
        cardNumber: "//input[@id='c49d868f-5b7b-423e-81c8-c0b594e1ed83']",
        expirationDate: "//input[@id='84b41f02-da13-421e-b7e8-644457dd4359']",
        lastThreeDigits:"//font[contains(text(),'Last 3 digits on the back of the card')]",
        saveThisCard: "//label[@for='beef1673-07b5-472d-8440-31e6e905dca1']//span[@class='checkbox-switchToggle-3tC left']",
        orderForFree:"//font[contains(text(),'Order for a fee')]",
    };

    async clickToTheCheckout() {
        const checkboxBtn = this.page.locator(this.checkoutSelectors.toTheCheckout);
        await checkboxBtn.waitFor({state:'visible',timeout:10000});
        await checkboxBtn.click();
    }

    async selectStandardDelivery() {
        const standardDelivery = this.page.locator(this.checkoutSelectors.standardDelivery);
        await standardDelivery.waitFor({state:'visible',timeout:10000});
        await standardDelivery.click();
    }

    async creditCardDetails(holderName:string , cardNumber:string , expirationDate:string , cardDigit:string) {
        await this.page.locator(this.checkoutSelectors.cardHolderName).waitFor({state:'visible',timeout:5000});
        await this.page.fill(this.checkoutSelectors.cardHolderName, holderName);
        await this.page.fill(this.checkoutSelectors.cardNumber, cardNumber);
        await this.page.fill(this.checkoutSelectors.expirationDate, expirationDate);
        await this.page.fill(this.checkoutSelectors.lastThreeDigits, cardDigit);
    }

    async verifyTextVisible(textToVerifyCheckout: string) {
        await expect(this.page.getByText(textToVerifyCheckout)).toBeVisible({ timeout: 20000 });
    }
};