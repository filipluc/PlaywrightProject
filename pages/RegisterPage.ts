import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Interface — defines exactly what data a registration requires
// The ? means the field is optional
export interface RegisterData {
  // Step 1 (on /login page)
  name: string;
  email: string;
  // Step 2 (on /signup page)
  password: string;
  title?: 'Mr' | 'Mrs';
  firstName: string;
  lastName: string;
  dateOfBirth?: { day: string; month: string; year: string };
  company?: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class RegisterPage extends BasePage {
  // Step 1 locators — on /login page
  private readonly signupNameInput = this.page.locator('[data-qa="signup-name"]');
  private readonly signupEmailInput = this.page.locator('[data-qa="signup-email"]');
  private readonly signupButton = this.page.locator('[data-qa="signup-button"]');

  // Step 2 locators — on /signup page
  private readonly titleMr = this.page.locator('#id_gender1');
  private readonly titleMrs = this.page.locator('#id_gender2');
  private readonly passwordInput = this.page.locator('[data-qa="password"]');
  private readonly daySelect = this.page.locator('[data-qa="days"]');
  private readonly monthSelect = this.page.locator('[data-qa="months"]');
  private readonly yearSelect = this.page.locator('[data-qa="years"]');
  private readonly firstNameInput = this.page.locator('[data-qa="first_name"]');
  private readonly lastNameInput = this.page.locator('[data-qa="last_name"]');
  private readonly companyInput = this.page.locator('[data-qa="company"]');
  private readonly addressInput = this.page.locator('[data-qa="address"]');
  private readonly address2Input = this.page.locator('[data-qa="address2"]');
  private readonly countrySelect = this.page.locator('[data-qa="country"]');
  private readonly stateInput = this.page.locator('[data-qa="state"]');
  private readonly cityInput = this.page.locator('[data-qa="city"]');
  private readonly zipcodeInput = this.page.locator('[data-qa="zipcode"]');
  private readonly mobileInput = this.page.locator('[data-qa="mobile_number"]');
  private readonly createAccountButton = this.page.locator('[data-qa="create-account"]');

  // After account is created
  private readonly accountCreatedHeading = this.page.locator('[data-qa="account-created"]');
  private readonly continueButton = this.page.locator('[data-qa="continue-button"]');

  constructor(page: Page) {
    super(page);
  }

  // Step 1: fill the signup form on the /login page
  async startSignup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  // Step 2: fill all the account details on the /signup page
  async fillAccountDetails(data: RegisterData): Promise<void> {
    if (data.title === 'Mr') await this.titleMr.check();
    if (data.title === 'Mrs') await this.titleMrs.check();

    await this.passwordInput.fill(data.password);

    if (data.dateOfBirth) {
      await this.daySelect.selectOption(data.dateOfBirth.day);
      await this.monthSelect.selectOption(data.dateOfBirth.month);
      await this.yearSelect.selectOption(data.dateOfBirth.year);
    }

    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    if (data.company) await this.companyInput.fill(data.company);
    await this.addressInput.fill(data.address);
    if (data.address2) await this.address2Input.fill(data.address2);
    await this.countrySelect.selectOption(data.country);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileInput.fill(data.mobileNumber);
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async isAccountCreated(): Promise<boolean> {
    return this.accountCreatedHeading.isVisible();
  }

  // Full registration in one call — used in tests for convenience
  async register(data: RegisterData): Promise<void> {
    await this.startSignup(data.name, data.email);
    await this.fillAccountDetails(data);
    await this.clickCreateAccount();
  }
}
