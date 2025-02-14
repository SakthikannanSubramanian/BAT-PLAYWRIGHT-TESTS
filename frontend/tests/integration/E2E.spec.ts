import { test } from '../../../fixtures/playwright.fixtures';

const inputs = {
//email: 'testemailvusedeuat1@yopmail.com',
email:'batautotesting@mailinator.com',
password: 'test@123',
};

const commonInputs = {
searchTerm: 'cigarettes',
qty:"3",
holderName:'BAT Testing',
cardNumber:'5555 5555 5555 4444',
expirationDate:'12/29',
cardDigit:'123',
textToVerifyOrderConfirmation:"Vielen Dank für deine Bestellung",
};

test.describe('Login Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goTo();
      await loginPage.verifyAge();
    });

    test('@integration Place Order', async ({ loginPage, searchPage, productDescriptionPage, checkoutPage}) => {
      await loginPage.fillCredentials(inputs.email, inputs.password);
      await loginPage.submit();
      await loginPage.verifyTextVisible('Willkommen zurück, test');
      await searchPage.searchProduct(commonInputs.searchTerm);
      await productDescriptionPage.quantitySelection(commonInputs.qty);
      await productDescriptionPage.clickOnAddToCart();
      await productDescriptionPage.clickOnShowCart();
      await checkoutPage.clickToTheCheckout();
      await checkoutPage.selectStandardDelivery();
      await checkoutPage.creditCardDetails(commonInputs.holderName,commonInputs.cardNumber,commonInputs.expirationDate,commonInputs.cardDigit);
      await checkoutPage.clickOnOrderForFree();
      await checkoutPage.verifyTextVisible(commonInputs.textToVerifyOrderConfirmation);
      await checkoutPage.getOrderNumber();
    });
  });