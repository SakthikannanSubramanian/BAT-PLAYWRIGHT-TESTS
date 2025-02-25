import { Page } from '@playwright/test';
import { expect } from '../../fixtures/playwright.fixtures';
import { CommonFunction } from '../pages/commonFunction';

export class HomePage {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    private homePageSelectors = {
        startTheChatButton:'[class="message"]',
        assistantToVuse: '//div[contains(@class,"dockableContainer")]/descendant::h2',
        imYourVirtualAssistant: '(//ul[contains(@class,"messageWrapper")]/descendant::div[@class="uiOutputRichText"])[1]',
        chatMessageInput: '//div[contains(@class,"chasitorControls")]/descendant::textarea',
        chatresponeMessage: '//div[contains(text(),"Leider habe ich keine Antwort auf deine Frage.")]',
        closeChatBoxButton: '[class="closeButton"]',
        endOfChatConfirmationButton: '//span[contains(text(),"Bestätigung des Chat-Endes")',
        closeChatButton: '//span[contains(text(),"Chat schließen")]'
    };

    async clickOnStartChat(){
        await this.page.click(this.homePageSelectors.startTheChatButton,{timeout:50000});
    }

    async verifyWelcomeChatMessage(){
        await this.verifyTextPresent(this.homePageSelectors.assistantToVuse,"Assistent von Vuse");
        await this.verifyTextPresent(this.homePageSelectors.imYourVirtualAssistant,"Hi, ich bin dein virtueller Assistent von Vuse");
        await this.page.click(this.homePageSelectors.chatMessageInput,{timeout:30000});
    }

    async sendTestMessage(testMessage){
        await this.page.fill(this.homePageSelectors.chatMessageInput,testMessage);
        await this.page.keyboard.press('Enter');
    }

    async verifyResponeMessage(){
        await this.verifyTextPresent(this.homePageSelectors.chatresponeMessage,"Leider habe ich keine Antwort auf deine Frage.");
    }

    async closeChatBox(){
        await this.page.click(this.homePageSelectors.closeChatBoxButton,{timeout:20000});
        await this.page.click(this.homePageSelectors.endOfChatConfirmationButton,{timeout:20000});
        await this.page.click(this.homePageSelectors.closeChatButton,{timeout:20000});
    }

    async verifyTextPresent(element,expectedText){
        const actualText = await this.page.locator(element).textContent({timeout:60000});
        await expect(actualText).toBe(expectedText);
    }
}