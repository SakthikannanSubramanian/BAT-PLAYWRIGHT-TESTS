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

test.describe('Chat validation Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.verifyAge();
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



