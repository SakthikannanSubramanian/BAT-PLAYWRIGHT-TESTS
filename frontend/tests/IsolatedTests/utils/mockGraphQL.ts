import { Page } from '@playwright/test';

export async function mockGraphQL(page: Page, baseURL: string | undefined, operationName: string, mockResponse: object) {
  await page.route(`${baseURL}/graphql`, async (route) => {
    const request = await route.request();
    const postData = await request.postDataJSON();

    if (postData.operationName === operationName) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse),
      });
    } else {
      await route.continue();
    }
  });
}
