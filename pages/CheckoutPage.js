const { BasePage } = require('./BasePage');


// дані -> огляд -> підтвердження
class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.errorMessage = page.getByTestId('error');

    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillCustomerInfo(customer) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getConfirmationText() {
    return (await this.completeHeader.textContent())?.trim();
  }
}

module.exports = { CheckoutPage };