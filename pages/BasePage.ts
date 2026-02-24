import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to a path relative to the baseURL in playwright.config.ts
  // e.g. this.navigate('/login') goes to https://automationexercise.com/login
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  // Returns the current page title — useful for assertions
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  // Waits for the page to finish loading (no pending network requests)
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // Returns true if the element is visible on the page
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
}
