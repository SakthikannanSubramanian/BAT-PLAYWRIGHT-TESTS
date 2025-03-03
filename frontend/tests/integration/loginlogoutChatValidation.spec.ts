import { test } from '../../../fixtures/playwright.fixtures';
import { CommonFunction } from '../../pages/commonFunction';
import { SearchPage } from '../../pages/searchPage';

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
      await loginPage.submit();
      await loginPage.verifyBlankFieldErrorMessage();
    });

    await allure.step(`Login Function - Incorrect Password Error Message with valid username as ${credentials.email}`, async () => { 
        await loginPage.fillCredentials(credentials.email, credentials.invalidPassword);
        await loginPage.submit();
        await loginPage.verifyIncorrectPasswordErrorMessage();
    });

    await allure.step(`Login Function - Invalid Username as ${credentials.invalidEmail} Error Message validation`, async () => { 
      await loginPage.fillCredentials(credentials.invalidEmail, credentials.password);
      await loginPage.submit();
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

  test('Validate Chat functionality', { tag: "@integration" }, async ({ allure,homePage }) => {
    await allure.step(`Clicking on Start the Chat Button`,async()=>{
      await homePage.clickOnStartChat();
    });

    await allure.step('Validate the Welcome Message and Send a Test Message',async() => {
      await homePage.verifyWelcomeChatMessage();
    });

    await allure.step('Send a Test Message and verify response messge',async() => {
      await homePage.sendTestMessage(testData.sendTestMessage);
      await homePage.verifyResponeMessage();
    });

    await allure.step('Closing the Chat box',async() => {
      await homePage.closeChatBox();
    });
  });
});



