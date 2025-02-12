import { test } from '../../../fixtures/playwright.fixtures';

const inputs = {
//email: 'testemailvusedeuat1@yopmail.com',
email:'batautotesting@mailinator.com',
password: 'test@123',
};

const commonInputs = {
searchTerm: 'cigarettes',
qty:"3",
holderName:'Harsh Sahay',
cardNumber:'4811567812345678',
expirationDate:'12/29',
cardDigit:'123',
textToVerifyCheckout:"your order is successful",
};

test.describe('Login Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goTo();
      await loginPage.verifyAge();
    });

    test('@integration Place Order', async ({ loginPage, searchPage, productDescriptionPage, checkoutPage}) => 
      {
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
      await checkoutPage.verifyTextVisible(commonInputs.textToVerifyCheckout);
    });
  });