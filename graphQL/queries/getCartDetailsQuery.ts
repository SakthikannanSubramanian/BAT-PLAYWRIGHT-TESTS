export const getCartDetailsQuery = `
query GetCartDetails($cartId: String!) {
  cart(cart_id: $cartId) {
    id
    total_quantity
    items {
      id
      product {
        name
        sku
      }
    }
  }
}
`;
