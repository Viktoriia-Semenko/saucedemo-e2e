const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { USERS } = require('../test-data/testData');

test.describe('TC-02: Авторизація користувача', () => {
  const negativeCases = [
    {
      title: 'заблокований користувач бачить помилку блокування',
      username: USERS.lockedOut.username,
      password: USERS.lockedOut.password,
      expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    },
    {
      title: 'неправильний пароль показує помилку',
      username: USERS.standard.username,
      password: 'wrong_password',
      expectedError:
        'Epic sadface: Username and password do not match any user in this service',
    },
    {
      title: 'пусті поля показують помилку',
      username: '',
      password: '',
      expectedError: 'Epic sadface: Username is required',
    },
  ];

  for (const c of negativeCases) {
    test(`Негативний: ${c.title}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.login(c.username, c.password);

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(c.expectedError);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }

  test('Позитивний: стандартний користувач успішно входить', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });
});