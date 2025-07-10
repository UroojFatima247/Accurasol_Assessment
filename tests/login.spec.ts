import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Scenario 1:User can log in successfully with valid credentials', async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();
  await login.loginAs('standard_user', 'secret_sauce');
  await login.assertLoginSuccess();
});
