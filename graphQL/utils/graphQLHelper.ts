import { APIRequestContext } from '@playwright/test';

export class GraphQLHelper {

  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async sendGraphQLRequest(query: string, variables: any, headers?: Record<string, string>) {

    const response = await this.request.post(this.baseURL, {
      headers: {
        'accept': '*/*',
        'content-type': 'application/json',
        'origin': 'BASE URL',
        'store': 'vuse_de_de_de',
       ...(headers || {}),
      },
      data: {
        query,
        variables,
      },
    });

    return await response.json();
  }
}
