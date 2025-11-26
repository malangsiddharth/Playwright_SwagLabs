const { UIActions } = require('../utils/UIActions');

class CheckOutCompletePage extends UIActions {
    constructor(page) {
        super(page);
        this.page = page;
        this.checkOutComplete_lbl = page.locator("//span[text()='Checkout: Complete!']");
        this.orderconfirmation_lbl = page.locator("//h2[text()='Thank you for your order!']");
        this.dispatched_lbl = page.locator("//div[text()='Your order has been dispatched, and will arrive just as fast as the pony can get there!']");
    }

    async isTitleVisible() {
        return await this.checkOutComplete_lbl.isVisible();
    }

    async isOrderConfirmationVisible() {
        return await this.orderconfirmation_lbl.isVisible();
    }

    async isDispatchedMessageVisible() {
        return await this.dispatched_lbl.isVisible();
    }
}

module.exports = { CheckOutCompletePage };
