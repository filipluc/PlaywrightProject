import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators — defined once here, used in every method below
  private readonly emailInput = this.page.locator('[data-qa="login-email"]');
  private readonly passwordInput = this.page.locator('[data-qa="login-password"]');
  private readonly loginButton = this.page.locator('[data-qa="login-button"]');
  private readonly errorMessage = this.page.locator('[action="/login"] p');
  private readonly loggedInAs = this.page.locator('a:has-text("Logged in as")');

  constructor(page: Page) {
    super(page); // calls BasePage constructor — stores the page reference
  }

  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  // Convenience method — does the full login in one call
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  async isLoggedIn(): Promise<boolean> {
    return this.loggedInAs.isVisible();
  }
}
