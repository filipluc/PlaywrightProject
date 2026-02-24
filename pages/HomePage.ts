import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Navigation bar locators
  private readonly loginLink = this.page.locator('a[href="/login"]');
  private readonly logoutLink = this.page.locator('a[href="/logout"]');
  private readonly productsLink = this.page.locator('a[href="/products"]');
  private readonly cartLink = this.page.locator('a[href="/view_cart"]');

  // After login, the nav shows "Logged in as [username]"
  private readonly loggedInText = this.page.locator('a:has-text("Logged in as")');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }

  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
  }

  async clickLogoutLink(): Promise<void> {
    await this.logoutLink.click();
  }

  async clickProductsLink(): Promise<void> {
    await this.productsLink.click();
  }

  async clickCartLink(): Promise<void> {
    await this.cartLink.click();
  }

  // Returns true if the "Logged in as" text is visible in the nav
  async isLoggedIn(): Promise<boolean> {
    return this.loggedInText.isVisible();
  }

  // Returns the username shown in "Logged in as Filip"
  async getLoggedInUsername(): Promise<string> {
    const fullText = await this.loggedInText.innerText();
    // innerText returns "Logged in as Filip" — we only want "Filip"
    return fullText.replace('Logged in as', '').trim();
  }
}
