import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Scenario 2: User places an order and checks out successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.loginAs('standard_user', 'secret_sauce');
  await loginPage.assertLoginSuccess();

  await productsPage.addToCartByProductId('sauce-labs-backpack'); 
  await productsPage.goToCart();
  await productsPage.verifyCartPage();

  await cartPage.verifyProductInCart('sauce-labs-backpack');
  await cartPage.proceedToCheckout();

  await checkoutPage.fillCheckoutInfo('Urooj', 'Fatima', '44000');
  await checkoutPage.finishOrder();

  await checkoutPage.verifyOrderConfirmation();
});
