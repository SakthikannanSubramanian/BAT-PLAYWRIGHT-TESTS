import { Page } from '@playwright/test';

export class Helper {

    private page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    async pause(){
        this.page.pause();
    }
}
