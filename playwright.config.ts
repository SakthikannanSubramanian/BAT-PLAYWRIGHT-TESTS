import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,              
    baseURL: 'https://uat.vuse.com/de/de', 
    trace: 'on-first-retry',    
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure', 
    actionTimeout: 60000,
    navigationTimeout: 100000,
  },

  projects: [
    {
      name: 'graphql', 
      testMatch: ['graphQL/tests/**/*.spec.ts'],  
      grep: /@graphql/,
      use:{
        baseURL: 'https://uat.vuse.com/de/de/graphql', 
        headless: true,   
      }  
    },
    {
      name: 'backend',
      testMatch: ['backend/tests/**/*.spec.ts'], 
      grep: /@backend/, 
    },
    {
      name: 'frontend',
      testMatch: ['frontend/tests/**/*.spec.ts'], 
      grepInvert: /@graphql|@backend/,  
      use: { browserName: 'chromium' },
    },
    {
      name: 'chrome',
      testMatch: ['frontend/tests/**/*.spec.ts'], 
      grepInvert: /@graphql|@backend/, 
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      testMatch: ['frontend/tests/**/*.spec.ts'],
      grepInvert: /@graphql|@backend/,
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      testMatch: ['frontend/tests/**/*.spec.ts'],
      grepInvert: /@graphql|@backend/,
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        outputFolder: "./out/allure-results",
        environmentInfo: {
          node_version: process.version,
        },
      },
    ],
  ],
  workers: 4,
  fullyParallel: true,
  timeout:90000,
});
