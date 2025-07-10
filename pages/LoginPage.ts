import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  private pageTitle: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#login-button');
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async loginAs(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.pageTitle).toHaveText('Products');
  }
}
