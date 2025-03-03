import { test } from '../../../fixtures/playwright.fixtures';

const credentials = {
  email: 'Testprod1@yopmail.com',
  password: 'Password1',
};

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToProduction();
    await loginPage.verifyAge();
  });

  test('@integration Login with valid credentials', { tag: "@integration" }, async ({ loginPage }) => {
    await loginPage.fillCredentials(credentials.email, credentials.password);
    await loginPage.submit();
    await loginPage.verifyTextVisible('Willkommen zurück, test');
  });

  test('Login with valid credentials', { tag: ["@integration", "@mobile"] }, async ({ loginPage, uiHelper }) => {
    await uiHelper.setViewPortToMobile();
    await loginPage.fillCredentials(credentials.email, credentials.password);
  });

  //Sample Hybrid approach
  // test('Verify Checkout', { tag: ["@integration", "@mobile"] }, async ({ loginPage, uiHelper, graphQLHelper/ Utils }) => {

  //   Pre requisites using API/ GraphQL
  //   await graphQLHelper.login(xxx,yyy) ;
  //   await graphQLHelper.addItemsToTrolley(xxx);
  //   await graphQLHelper.addVouchersToCheckout(xxx);

  //   await uiHelper.setViewPortToMobile();
  //   await loginPage.fillCredentials(credentials.email, credentials.password);
  //   await checkoutPage.goTo();
  //   await checkoutPage.verifyDetails();

  // });
});



