import { test, expect } from '../../fixtures/playwright.fixtures';
import { mutation } from '../mutations/login';


test('@graphql GraphQL SignIn Mutation for Backend API', async ({ graphqlHelper, allure }) => {
    await allure.step('Send SignIn Mutation and Validate Response', async () => {    
    
        const variables = {
            email: 'testemailvusedeuat1@yopmail.com',
            password: 'test@123',
        };

        const response = await graphqlHelper.sendGraphQLRequest(mutation,variables)    

        expect(response).toHaveProperty('data');
        expect(response.data).toHaveProperty('generateCustomerToken');
        expect(response.data.generateCustomerToken).toHaveProperty('token');

        const token = response.data.generateCustomerToken.token;
        allure.attachment('Generated Token', token, 'text/plain');

        expect(token).not.toBeNull();
        expect(token).not.toBe('');
    });
});
