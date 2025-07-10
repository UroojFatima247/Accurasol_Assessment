import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  private firstName: Locator;
  private lastName: Locator;
  private postalCode: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  private confirmationMessage: Locator;

  constructor(private page: Page) {
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationMessage = page.locator('.complete-header');
  }

  async fillCheckoutInfo(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async finishOrder() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await this.finishButton.click();
  }

  async verifyOrderConfirmation() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(this.confirmationMessage).toHaveText('Thank you for your order!');
  }
}
