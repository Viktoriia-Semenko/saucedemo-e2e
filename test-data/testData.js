const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
};

const PRODUCTS = {
  backpack: { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
};

function aCustomer(overrides = {}) {
  return {
    firstName: 'Test',
    lastName: 'User',
    postalCode: '01001',
    ...overrides,
  };
}

module.exports = { USERS, PRODUCTS, aCustomer };