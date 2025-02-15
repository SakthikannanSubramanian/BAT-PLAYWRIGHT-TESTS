import { test } from '../../../fixtures/playwright.fixtures';

const credentials = {
  email: 'testemailvusedeuat1@yopmail.com',
  password: 'test@123',
};

test.describe('Login Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goTo();
      await loginPage.verifyAge();
    });
  
    test('@integration Login with valid credentials', async ({ loginPage }) => {
      await loginPage.fillCredentials(credentials.email, credentials.password);
      await loginPage.submit();
      await loginPage.verifyTextVisible('Willkommen zurück, test');
    });'/create-account'
  });
