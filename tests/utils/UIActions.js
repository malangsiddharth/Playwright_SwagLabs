class UIActions {
    constructor(page) {
        this.page = page;
    }

    async click(locator) {
        await this.page.locator(locator).click();
    }

    async type(locator, text) {
        await this.page.locator(locator).fill(text);
    }

    async waitFor(selector) {
        await this.page.locator(selector).waitFor();
    }

    async getText(locator) {
        return await this.page.locator(locator).innerText();
    }

    async isVisible(locator) {
        return await this.page.locator(locator).isVisible();
    }
}

module.exports = { UIActions };
