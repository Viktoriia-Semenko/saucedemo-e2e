const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.inventoryItems = page.getByTestId('inventory-item');
  }

  addToCartButton(productSlug) {
    return this.page.getByTestId(`add-to-cart-${productSlug}`);
  }

  async addProductToCart(productSlug) {
    await this.addToCartButton(productSlug).click();
  }

  async getCartCount() {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number((await this.cartBadge.textContent())?.trim());
  }

  async goToCart() {
    await this.cartLink.click();
  }

  isLoaded() {
    return this.currentUrl().includes('/inventory.html');
  }
}

module.exports = { InventoryPage };