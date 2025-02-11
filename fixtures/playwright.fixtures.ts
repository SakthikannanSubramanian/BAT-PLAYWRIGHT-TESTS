import { test as base } from '@playwright/test';
import { LoginPage } from '../frontend/pages/loginPage'; 
import { SearchPage } from '../frontend/pages/searchPage'; 
import { APIHelper } from '../backend/utils/apiHelper';
import { Helper } from '../frontend/pages/helper';
import { GraphQLHelper } from '../graphQL/utils/graphQLHelper';
import { allure } from 'allure-playwright';

export const test = base.extend<{ loginPage: LoginPage, searchPage: SearchPage, apiHelper: APIHelper,  
  graphqlHelper: GraphQLHelper, uiHelper: Helper, allure: typeof allure}>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  searchPage : async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
  uiHelper: async ({ page }, use) => {
    const uiHelper = new Helper(page);
    await use(uiHelper);
  },
  apiHelper: async ({ request }, use) => {
    const apiHelper = new APIHelper(request);
    await use(apiHelper);
  },
  graphqlHelper: async ({ request, baseURL }, use) => {
    const endpoint = baseURL ? baseURL : 'https://uat.vuse.com/de/de/graphql' 
    const graphqlHelper = new GraphQLHelper(request,endpoint);
    await use(graphqlHelper);
  },
  allure: async ({}, use) => {
    await use(allure);
  },

});

export { expect } from '@playwright/test'; 
