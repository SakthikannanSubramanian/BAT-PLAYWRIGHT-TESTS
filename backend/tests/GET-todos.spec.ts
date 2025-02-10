import { test, expect } from '../../fixtures/playwright.fixtures';
import { APIHelper } from '../utils/apiHelper';

test('@backend GET /todos/1 should return the correct response', async ({ request }) => {
  const apiHelper = new APIHelper(request);
  
  const response = await apiHelper.get('https://jsonplaceholder.typicode.com/todos/1');
  expect(response.status()).toBe(200);
  
  const responseBody = await response.json();
  
  expect(responseBody).toEqual({
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
  });

  expect(responseBody.id).toBe(1);
});
