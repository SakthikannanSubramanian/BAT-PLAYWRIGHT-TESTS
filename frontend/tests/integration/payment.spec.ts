import { test } from '../../../fixtures/playwright.fixtures';

const inputs = {
  password: 'Password1',
};

const testData = {
  searchTerm: 'cigarettes',
  qty: "3",
  holderName: 'BAT Testing',
  cardNumber: '5555 5555 5555 4444',
  expirationDate: '12/29',
  cardDigit: '123',
  textToVerifyOrderConfirmation: "Vielen Dank für deine Bestellung",
  deliveryMethod: "Standardlieferung"
  
};

test.describe('Payment page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.verifyAge();
  });

  test('@integration Place Order', async ({ allure, checkoutPage, loginPage, searchPage, productDescriptionPage}) => {

    const browserName = test.info().project.name;
    let email = '';

    if (browserName === 'chrome') {
      email = 'testemailvusedeuat1@yopmail.com';
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
    await allure.step(`Login with ${email}`, async () => { 
      
      await loginPage.fillCredentials(email, inputs.password);
      await loginPage.submit();
      await loginPage.verifyTextVisible('Willkommen zurück');

     });

    await allure.step(`Search for ${testData.searchTerm}`, async () => { 
      await searchPage.searchProduct(testData.searchTerm);
    });

    await allure.step(`Add ${testData.qty} to cart`, async () => { 
      await productDescriptionPage.quantitySelection(testData.qty);
      await productDescriptionPage.clickOnAddToCart();
      await productDescriptionPage.clickOnShowCart();
    });
    await allure.step(`Verify delivery method after selecting ${testData.deliveryMethod}`, async () => { 
      await checkoutPage.clickToTheCheckout();
      await checkoutPage.selectStandardDelivery();
      await checkoutPage.verifyDeliveryMethod(testData.deliveryMethod);
    });
  });
});
