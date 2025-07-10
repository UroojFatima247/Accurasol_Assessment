import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private cartItem: Locator;
  private cartItemName: Locator;
  private checkoutButton: Locator;

  constructor(private page: Page) {
    this.cartItem = page.locator('.cart_item');
    this.cartItemName = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async verifyProductInCart(expectedProductName: string) {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(this.cartItem).toHaveCount(1); 

    const actualProductName = await this.cartItemName.innerText();

  const expectedNameFormatted = expectedProductName
    .replace(/-/g, ' ')
    .toLowerCase()
    .trim();

  expect(actualProductName.trim().toLowerCase()).toBe(expectedNameFormatted);
}

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
