import { test } from '../../../fixtures/playwright.fixtures';

const inputs = {
  password: 'test@123',
};

const commonInputs = {
  searchTerm: 'cigarettes',
  qty: "3",
  holderName: 'BAT Testing',
  cardNumber: '5555 5555 5555 4444',
  expirationDate: '12/29',
  cardDigit: '123',
  textToVerifyOrderConfirmation: "Vielen Dank für deine Bestellung",
};

test.describe('Place Order', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.verifyAge();
  });

  test('@integration Place Order', async ({ loginPage, searchPage, productDescriptionPage, checkoutPage }) => {

    const browserName = test.info().project.name;
    let email = '';

    if (browserName === 'chrome') {
      email = 'batautotesting@mailinator.com';
    } else if (browserName === 'firefox') {
      email = 'batautotesting@mailinator.com';
    } else if (browserName === 'webkit') {
      email = 'battesting@mailinator.com';
    } else {
      throw new Error('Unsupported browser');
    }

    if (!email) {
      throw new Error("No email provided for the test environment");
    }

    await loginPage.fillCredentials(email, inputs.password);
    await loginPage.submit();
    await loginPage.verifyTextVisible('Willkommen zurück, test');
    await searchPage.searchProduct(commonInputs.searchTerm);
    await productDescriptionPage.quantitySelection(commonInputs.qty);
    await productDescriptionPage.clickOnAddToCart();
    await productDescriptionPage.clickOnShowCart();
    await checkoutPage.clickToTheCheckout();
    await checkoutPage.selectStandardDelivery();
    await checkoutPage.creditCardDetails(commonInputs.holderName, commonInputs.cardNumber, commonInputs.expirationDate, commonInputs.cardDigit);
    await checkoutPage.clickOnOrderForFree();
    await checkoutPage.verifyTextVisible(commonInputs.textToVerifyOrderConfirmation);
    await checkoutPage.getOrderNumber();
  });
});
