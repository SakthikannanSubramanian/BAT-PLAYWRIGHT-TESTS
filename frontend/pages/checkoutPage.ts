import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';

export class CheckoutPage {

    private page: Page;
    private timeout = 10000;

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
        txt_OrderNumber: '//span[@class="orderConfirmationPageSimple-orderNumberHidden-8ox utils-visuallyHidden-uKK"]',
        deliveryMethod: (deliveryMethod) =>`//span[text()="${deliveryMethod}"]/ancestor::form[contains(@class,"shippingMethod-form")]//input`
    };

    async clickToTheCheckout() {
        const checkoutBtn = this.page.locator(this.checkoutSelectors.toTheCheckout);
        await checkoutBtn.isVisible({timeout:50000});
        await checkoutBtn.click();
    }

    async selectStandardDelivery() {
        const standardDelivery = this.page.locator(this.checkoutSelectors.standardDeliveryRdBtn);
        await standardDelivery.waitFor({state:'visible',timeout:50000});
        await standardDelivery.click();
    }

    async verifyDeliveryMethod(deliveryMethod: string) {
        expect(this.page.locator(this.checkoutSelectors.deliveryMethod(deliveryMethod))).toBeChecked();
    }

    async creditCardDetails(holderName:string , cardNumber:string , expirationDate:string , cardDigit:string) {
        await this.page.evaluate("window.scrollBy(0,300)");
        const creditCard = this.page.locator(this.checkoutSelectors.selectCreditCard)
        await creditCard.waitFor({state:'visible',timeout:20000})
        await creditCard.click();
        const cardHolder = this.page.locator(this.checkoutSelectors.cardHolderName);
        await cardHolder.waitFor({ state: 'visible', timeout: 20000 });
        await this.page.locator(this.checkoutSelectors.cardHolderName).waitFor({state:'visible',timeout:5000});
        await this.page.fill(this.checkoutSelectors.cardHolderName, holderName);
        await this.page.fill(this.checkoutSelectors.cardNumber, cardNumber);
        await this.page.fill(this.checkoutSelectors.expirationDate, expirationDate);
        await this.page.fill(this.checkoutSelectors.lastThreeDigits, cardDigit);
    }

    async clickOnOrderForFree() {
        const orderForFreeText = this.page.locator(this.checkoutSelectors.orderForFree);
        await orderForFreeText.waitFor({ state: 'visible', timeout: 10000 });
        await orderForFreeText.click();
    }

    async verifyTextVisible(textToVerifyCheckout: string) {
        await this.page.waitForLoadState('domcontentloaded'); 
        const verifyCheckout = this.page.locator(`text=${textToVerifyCheckout}`);
        await verifyCheckout.waitFor({ state: 'visible', timeout: 90000 });
    }

    async getOrderNumber(){
        const orderNumber = this.page.locator(this.checkoutSelectors.txt_OrderNumber);
        await orderNumber.waitFor({ state: 'visible', timeout: 5000 });
        const orderNumberTxt =  await orderNumber.textContent();
        console.log("Order Number is "+orderNumberTxt);
    }
};