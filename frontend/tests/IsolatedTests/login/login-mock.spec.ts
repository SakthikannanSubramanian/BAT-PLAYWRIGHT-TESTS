import { test } from '../../../../fixtures/playwright.fixtures';
import { mockLoginGraphQLErrorResponse, mockLoginGraphQLSuccessResponse } from '../mocks/loginMock';
import { mockGraphQL } from '../utils/mockGraphQL';  

const credentials = {
  email: 'testemailvusedeuat@yopmail.com',
  password: 'test@123',
};

test.describe('@mock Login Tests with Mocked GraphQL Error response', () => {
  test.beforeEach(async ({ baseURL, page, loginPage }) => {
    await mockGraphQL(page, baseURL, "SignIn", mockLoginGraphQLErrorResponse);
    await loginPage.goTo();
    await loginPage.verifyAge();
  });

  test('@sakthi Login with valid credentials (Mocked GraphQL)', async ({ loginPage }) => {
    await loginPage.fillCredentials(credentials.email, credentials.password);
    await loginPage.submit();
    await loginPage.verifyTextVisible(
      "Die Konto-Anmeldung war nicht korrekt oder dein Konto ist vorübergehend deaktiviert. Bitte warte und versuche es später erneut."
    );
  });
});

test.describe('Login Tests with Mocked GraphQL Sucess response', () => {
  test.beforeEach(async ({ baseURL, page, loginPage }) => {
    await mockGraphQL(page, baseURL, "SignIn", mockLoginGraphQLSuccessResponse);
    await loginPage.goTo();
    await loginPage.verifyAge();
  });

  test('@mock Login with valid credentials (Mocked GraphQL)', async ({ loginPage }) => {
    await loginPage.fillCredentials(credentials.email, credentials.password);
    await loginPage.submit();
    await loginPage.verifyTextVisible('Willkommen zurück, test');
  });
});
