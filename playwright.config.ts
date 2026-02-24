import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Where Playwright looks for test files
  testDir: './tests',

  // Run tests in parallel within each file
  fullyParallel: true,

  // Fail CI builds if someone accidentally left test.only in the code
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, never locally
  retries: process.env.CI ? 1 : 0,

  // How many parallel workers to use (CI: 1 to avoid resource issues)
  workers: process.env.CI ? 1 : undefined,

  // Use HTML reporter — run `npx playwright show-report` to view results
  reporter: [['html', { open: 'never' }]],

  use: {
    // Base URL so tests can use page.goto('/login') instead of full URL
    baseURL: 'https://automationexercise.com',

    // Capture a trace on the first retry of a failed test (great for debugging)
    trace: 'on-first-retry',

    // Take a screenshot when a test fails
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
