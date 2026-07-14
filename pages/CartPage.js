const { BasePage } = require('./BasePage');


class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  removeButton(productSlug) {
    return this.page.getByTestId(`remove-${productSlug}`);
  }

  async removeProduct(productSlug) {
    await this.removeButton(productSlug).click();
  }

  async getItemsCount() {
    return this.itemNames.count();
  }

  async getItemNames() {
    return this.itemNames.allTextContents();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };