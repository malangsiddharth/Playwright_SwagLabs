const { UIActions } = require('../utils/UIActions');

class CheckOutStepTwoPage extends UIActions {
    constructor(page) {
        super(page);
        this.page = page;
        this.checkOutOverview_lbl = page.locator("//span[text()='Checkout: Overview']");
        this.finish_btn = page.locator("//button[@name='finish']");
    }

    async isTitleVisible() {
        return await this.checkOutOverview_lbl.isVisible();
    }

    async clickOnContinueButton() {
        await this.finish_btn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { CheckOutStepTwoPage };
