import { APIRequestContext } from '@playwright/test';

export class APIHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string) {
    const response = await this.request.get(endpoint);
    return response;
  }

  async post(endpoint: string, payload: any) {
    const response = await this.request.post(endpoint, { data: payload });
    return response;
  }

  async put(endpoint: string, payload: any) {
    const response = await this.request.put(endpoint, { data: payload });
    return response;
  }

  async patch(endpoint: string, payload: any) {
    const response = await this.request.patch(endpoint, { data: payload });
    return response;
  }

  async delete(endpoint: string) {
    const response = await this.request.delete(endpoint);
    return response;
  }
}
