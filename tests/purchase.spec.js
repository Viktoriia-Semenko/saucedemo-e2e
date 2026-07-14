const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { USERS, PRODUCTS, aCustomer } = require('../test-data/testData');

test.describe('TC-01: Наскрізний сценарій покупки - happy path', () => {
  test('Користувач успішно оформлює замовлення', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const product = PRODUCTS.backpack;
    const customer = aCustomer();

    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);

    await inventoryPage.addProductToCart(product.slug);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart\.html/);
    expect(await cartPage.getItemsCount()).toBe(1);
    expect(await cartPage.getItemNames()).toContain(product.name);

    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkoutPage.fillCustomerInfo(customer);

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    expect(await checkoutPage.getConfirmationText()).toBe('Thank you for your order!');
  });
});