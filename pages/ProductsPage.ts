import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  private cartIcon: Locator;
  private pageTitle: Locator;

  constructor(private page: Page) {
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.pageTitle = page.locator('.title');
  }

  async navigateToInventoryPage() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addToCartByProductId(productId: string) {
    const addToCartSelector = `[data-test="add-to-cart-${productId}"]`;
    const addToCartButton = this.page.locator(addToCartSelector);
    await addToCartButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async verifyCartPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.pageTitle).toHaveText('Your Cart');
  }
}


