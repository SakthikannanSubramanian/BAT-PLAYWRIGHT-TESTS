import { test as base } from '@playwright/test';
import { allure } from 'allure-playwright';
import { APIHelper } from '../backend/utils/apiHelper';
import { CheckoutPage } from '../frontend/pages/checkoutPage';
import {CommonFunction } from '../frontend/pages/commonFunction';
import { GraphQLHelper } from '../graphQL/utils/graphQLHelper';
import {HomePage} from '../frontend/pages/homePage'; 
import { Helper } from '../frontend/pages/helper';
import { LoginPage } from '../frontend/pages/loginPage'; 
import { ProductDescriptionPage } from '../frontend/pages/productDescriptionPage';
import { SearchPage } from '../frontend/pages/searchPage'; 

export const test = base.extend<{ allure: typeof allure,apiHelper: APIHelper,checkoutPage: CheckoutPage,commonFunction: CommonFunction,
  graphqlHelper: GraphQLHelper, homePage:HomePage,uiHelper: Helper, loginPage: LoginPage,
  productDescriptionPage: ProductDescriptionPage,searchPage: SearchPage,}>({

    allure: async ({}, use) => {
      await use(allure);
    },

    apiHelper: async ({ request }, use) => {
      const apiHelper = new APIHelper(request);
      await use(apiHelper);
    },

    checkoutPage: async ({ page }, use) => {
      const checkoutPage = new CheckoutPage(page);
      await use(checkoutPage);
    },
  
    commonFunction:async({page},use) => {
      const commonFunction = new CommonFunction(page);
      await use(commonFunction);
    },

    graphqlHelper: async ({ request, baseURL }, use) => {
      const endpoint = baseURL ? baseURL : 'https://uat.vuse.com/de/de/graphql' 
      const graphqlHelper = new GraphQLHelper(request,endpoint);
      await use(graphqlHelper);
    },
  
    homePage: async ({ page }, use) => {
      const homePage = new HomePage(page);
      await use(homePage);
    },

    uiHelper: async ({ page }, use) => {
      const uiHelper = new Helper(page);
      await use(uiHelper);
    },

    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },
    productDescriptionPage: async ({ page }, use) => {
      const productDescriptionPage = new ProductDescriptionPage(page);
      await use(productDescriptionPage);
    },
  
    searchPage : async ({ page }, use) => {
      const searchPage = new SearchPage(page);
      await use(searchPage);
    },

});

export { expect } from '@playwright/test'; 