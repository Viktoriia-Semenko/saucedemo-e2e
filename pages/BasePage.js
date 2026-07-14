class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(path);
  }

  currentUrl() {
    return this.page.url();
  }
}

module.exports = { BasePage };