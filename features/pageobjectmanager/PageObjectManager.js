const { HomePage } = require('../../tests/Pages/HomePage');
const { InventoryPage } = require('../../tests/Pages/InventoryPage');
const { CartPage } = require('../../tests/Pages/CartPage');
const { CheckOutStepOnePage } = require('../../tests/Pages/CheckOutStepOnePage');
const { CheckOutStepTwoPage } = require('../../tests/Pages/CheckOutStepTwoPage');
const { CheckOutCompletePage } = require('../../tests/Pages/CheckOutCompletePage');

class PageObjectManager {
  constructor(page) {
    this.page = page;
  }

  getHomePage() {
    return new HomePage(this.page);
  }

  getInventoryPage() {
    return new InventoryPage(this.page);
  }

  getCartPage() {
    return new CartPage(this.page);
  }

  getCheckOutStepOnePage() {
    return new CheckOutStepOnePage(this.page);
  }

  getCheckOutStepTwoPage() {
    return new CheckOutStepTwoPage(this.page);
  }

  getCheckOutCompletePage() {
    return new CheckOutCompletePage(this.page);
  }
}

module.exports = PageObjectManager;
