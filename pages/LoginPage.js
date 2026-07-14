const { BasePage } = require('./BasePage');


class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByTestId('error');
  }

  async open() {
    await super.open('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorText() {
    return (await this.errorMessage.textContent())?.trim();
  }
}

module.exports = { LoginPage };