import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';

export class CheckoutPage {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    private checkoutSelectors = {
        toTheCheckout: '//div[@class="priceSummary-checkoutButton_container-2KD"]/button/span',
        standardDeliveryRdBtn: '//form[@class="shippingMethod-form-33F shippingMethod-form-223"]//input',
        selectCreditCard: '(//div[@class="paymentMethods-paymentContainer-2qL"]//span[@class="paymentMethods-radioLabel-h9R"])[1]',
        cardHolderName: '//label[contains(text(),"NAME DES KARTENINHABERS")]/..//following-sibling::span//input',
        cardNumber: '//label[contains(text(),"Kartennummer")]/..//following-sibling::span//input',
        expirationDate: '//label[contains(text(),"ABLAUFDATUM")]/..//following-sibling::span//input',
        lastThreeDigits:'//label[contains(text(),"KARTENPRÜFZIFFER")]/..//following-sibling::span//input',
        orderForFree:'//span[contains(text(),"Kostenpflichtig bestellen")]',
        thankU4OrderTxt: '//font[contains(text(),"Thank you for your order")]'
    };

    async clickToTheCheckout() {
        const checkoutBtn = this.page.locator(this.checkoutSelectors.toTheCheckout);
        await this.page.waitForTimeout(5000);
        await checkoutBtn.waitFor({ state: 'visible', timeout:30000});
        await checkoutBtn.click();
    }

    async selectStandardDelivery() {
        const standardDelivery = this.page.locator(this.checkoutSelectors.standardDeliveryRdBtn);
        await standardDelivery.waitFor({state:'visible',timeout:30000});
        await standardDelivery.click();
    }

    async creditCardDetails(holderName:string , cardNumber:string , expirationDate:string , cardDigit:string) {
        const creditCard = this.page.locator(this.checkoutSelectors.selectCreditCard)
        await creditCard.waitFor({state:'visible',timeout:5000})
        await creditCard.click();
        const cardHolder = this.page.locator(this.checkoutSelectors.cardHolderName);
        await cardHolder.waitFor({ state: 'visible', timeout: 5000 });
        await this.page.locator(this.checkoutSelectors.cardHolderName).waitFor({state:'visible',timeout:5000});
        await this.page.fill(this.checkoutSelectors.cardHolderName, holderName);
        await this.page.fill(this.checkoutSelectors.cardNumber, cardNumber);
        await this.page.fill(this.checkoutSelectors.expirationDate, expirationDate);
        await this.page.fill(this.checkoutSelectors.lastThreeDigits, cardDigit);
    }

    async clickOnOrderForFree() {
        await this.page.click(this.checkoutSelectors.orderForFree);
    }

    async verifyTextVisible(textToVerifyCheckout: string) {
        await expect(this.page.getByText(textToVerifyCheckout)).toBeVisible({ timeout: 20000 });
    }
};