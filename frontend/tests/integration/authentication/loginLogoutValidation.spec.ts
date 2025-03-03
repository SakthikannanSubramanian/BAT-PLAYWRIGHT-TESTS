import { test } from '../../../../fixtures/playwright.fixtures';

const credentials = {
  email: 'bat-auto-chrome@mailinator.com',
  password: 'test@123',
  invalidEmail:'battest@',
  invalidPassword:'test321',
};

const testData={
  accountName:'BAT AUTO',
  redirectionIN5SecondsMessage:'Du hast dich abgemeldt und wirst in 5 Sekunden zu unserer Homepage weitergeleitet.',
  sendTestMessage:'Hi, Test Auto Bat Message'
}

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.verifyAge();
  });

  test('Login failure scenarios', { tag: ["@integration", "@demo"] }, async ({ allure,loginPage }) => {
    await allure.step(`Login Function - Username and Password Blank Field Error Message Validation`,async() => {
      await loginPage.verifyBlankFieldErrorMessage();
    });

    await allure.step(`Login Function - Incorrect Password Error Message with valid username as ${credentials.email}`, async () => { 
      await loginPage.fillCredentials(credentials.email, credentials.invalidPassword);
      await loginPage.verifyIncorrectPasswordErrorMessage();
    });

    await allure.step(`Login Function - Invalid Username as ${credentials.invalidEmail} Error Message validation`, async () => { 
      await loginPage.fillCredentials(credentials.invalidEmail, credentials.password);
      await loginPage.verifyInvalidEmailErrorMessage();
    });
  });

  test('Login/Logout Validation ', { tag: ["@integration", "@demo"] }, async ({ allure,loginPage }) => {
    await allure.step(`Login Function validation with valid username as ${credentials.email}`, async () => { 
      await loginPage.fillCredentials(credentials.email, credentials.password);
      await loginPage.submit();
      await loginPage.verifyTextVisible(`Willkommen zurück, ${testData.accountName}`);
    });

    await allure.step(`Logout from Account Side Bar`,async() =>{
      await loginPage.clickOnLogoutFromSideBar();
    });

    await allure.step(`You have Logged out and redirected to Homepage in 5seconds Message validation`,async() => {
      await loginPage.logoutMessageValidation(testData.redirectionIN5SecondsMessage);
    });
  });
});

