import { getCartDetailsQuery } from '../queries/getCartDetailsQuery';
import { signInMutation } from '../mutations/signInMutation';
import { createCartMutation } from '../mutations/createCartMutation';
import { GraphQLHelper } from './graphQLHelper';

export class GraphQLUtils {
  private graphqlHelper: GraphQLHelper;

  constructor(graphqlHelper: GraphQLHelper) {
    this.graphqlHelper = graphqlHelper;
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    const response = await this.graphqlHelper.sendGraphQLRequest(signInMutation, { email, password });
    return response.data?.generateCustomerToken?.token ?? '';
  }

  async createCart(token: string): Promise<string> {
    const response = await this.graphqlHelper.sendGraphQLRequest(createCartMutation, {}, { Authorization: `Bearer ${token}` });
    return response.data?.cartId ?? '';
  }

  async fetchCartDetails(cartId: string, token: string): Promise<any> {
    return await this.graphqlHelper.sendGraphQLRequest(getCartDetailsQuery, { cartId }, { Authorization: `Bearer ${token}` });
  }
}
