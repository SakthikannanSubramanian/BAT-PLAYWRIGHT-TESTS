export const signInMutation = `
mutation SignIn($email: String!, $password: String!) {
  generateCustomerToken(email: $email, password: $password) {
    token
    __typename
  }
}
`;
