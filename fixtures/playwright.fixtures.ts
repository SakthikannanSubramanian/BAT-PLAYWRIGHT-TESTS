import { test as base } from '@playwright/test';
import { LoginPage } from '../frontend/pages/loginPage'; 
import { SearchPage } from '../frontend/pages/searchPage'; 
import { APIHelper } from '../backend/utils/apiHelper';
import { Helper } from '../frontend/pages/helper';
import { GraphQLHelper } from '../graphQL/utils/graphQLHelper';
import { ProductDescriptionPage } from '../frontend/pages/productDescriptionPage';
import { CheckoutPage } from '../frontend/pages/checkoutPage';
import { allure } from 'allure-playwright';

export const test = base.extend<{ loginPage: LoginPage, apiHelper: APIHelper,  
  graphqlHelper: GraphQLHelper, uiHelper: Helper, allure: typeof allure,searchPage: SearchPage,productDescriptionPage: ProductDescriptionPage,checkoutPage: CheckoutPage}>({

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
  productDescriptionPage: async ({ page }, use) => {
    const productDescriptionPage = new ProductDescriptionPage(page);
    await use(productDescriptionPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from '@playwright/test'; 