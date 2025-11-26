const { UIActions } = require('../utils/UIActions');

class CheckOutStepOnePage extends UIActions {
    constructor(page) {
        super(page);
        this.page = page;
        this.firstname_txtbox = page.locator("//input[@name='firstName']");
        this.lastname_txtbox = page.locator("//input[@name='lastName']");
        this.pincode_txtbox = page.locator("//input[@name='postalCode']");
        this.continue_btn = page.locator("//input[@name='continue']");
        this.checkOut_lbl = page.locator("//span[contains(text(),'Checkout: Your Information')]");
    }

    async clickOnContinueButton() {
        await this.continue_btn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async enterCheckoutInformation(firstname, lastname, pincode) {
        await this.firstname_txtbox.fill(firstname);
        await this.lastname_txtbox.fill(lastname);
        await this.pincode_txtbox.fill(pincode);
    }

    async isTitleVisible() {    
        await this.checkOut_lbl.isVisible();
    }
}

module.exports = { CheckOutStepOnePage };
