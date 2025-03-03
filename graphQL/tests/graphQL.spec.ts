import { test, expect } from '../../fixtures/playwright.fixtures';

test('@graphql Fetch Cart Details After Sign-In', async ({ graphQLUtils, allure }) => {
    let token, cartId;

    await allure.step('Authenticate and Get Token', async () => {
        token = await graphQLUtils.authenticateUser('testemailvusedeuat1@yopmail.com', 'test@123');
        allure.attachment('Generated Token', token, 'text/plain');
        expect(token).not.toBeNull();
        expect(token).not.toBe('');
    });

    await allure.step('Create Cart After Sign-In', async () => {
        cartId = await graphQLUtils.createCart(token);
        allure.attachment('Generated Cart ID', cartId, 'text/plain');
        expect(cartId).not.toBeNull();
        expect(cartId).not.toBe('');
    });

    await allure.step('Fetch Cart Details Using Cart ID', async () => {
        const cartResponse = await graphQLUtils.fetchCartDetails(cartId, token);
        expect(cartResponse).toHaveProperty('data.cart.id');
        expect(cartResponse.data.cart.items).toBeInstanceOf(Array);
        allure.attachment('Cart Details', JSON.stringify(cartResponse.data.cart, null, 2), 'application/json');
    });
});
