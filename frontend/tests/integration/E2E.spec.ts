import { test } from '../../../fixtures/playwright.fixtures';

const inputs = {
email: 'testemailvusedeuat1@yopmail.com',
password: 'test@123',
};

const url ={
url_PDP:"https://uat.vuse.com/de/de/vuse-e-zigaretten-kfz-halterung/",
};

const commonInputs = {
searchTerm: 'cigarettes',
qty:"3",
holderName:'Harsh Sahay',
cardNumber:'4811567812345678',
expirationDate:'12/29',
cardDigit:'123',
textToVerifyCheckout:"your order is successful"

};

test.describe('Login Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goTo();
      await loginPage.verifyAge();
    });

    test('@integration Login with valid credentials', async ({ loginPage, searchPage, productDescriptionPage, checkoutPage}) => 
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