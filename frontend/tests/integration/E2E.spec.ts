import { test } from '../../../fixtures/playwright.fixtures';

const inputs = {
  email: 'testemailvusedeuat1@yopmail.com',
  password: 'test@123',
  searchTerm: 'cigarettes'
};

test.describe('Login Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goTo('/sign-in');
      await loginPage.verifyAge();
    });
  
    test('@integration Login with valid credentials', async ({ loginPage, searchPage}) => {
      await loginPage.fillCredentials(inputs.email, inputs.password);
      await loginPage.submit();
      await loginPage.verifyTextVisible('Willkommen zurück, test');
      await searchPage.searchProduct(inputs.searchTerm);
    });
  });
