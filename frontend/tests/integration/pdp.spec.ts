import { test } from '../../../fixtures/playwright.fixtures';

const credentials = {
  email: 'testemailvusedeuat1@yopmail.com',
  password: 'test@123',
};

const url ={
    url_PDP:"https://uat.vuse.com/de/de/vuse-e-zigaretten-kfz-halterung/",
};

const commonInputs = {
    qty:"3",
};

test.describe('Login Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goTo();
      await loginPage.verifyAge();
    });
  
    test('@integration Pdp - Input Qty Test', async ({ productDescriptionPage }) => {
       await productDescriptionPage.goTo(url.url_PDP);
       await productDescriptionPage.quantitySelection(commonInputs.qty);
       await productDescriptionPage.clickOnAddToCart();
       await productDescriptionPage.clickOnShowCart();
    });
  });
