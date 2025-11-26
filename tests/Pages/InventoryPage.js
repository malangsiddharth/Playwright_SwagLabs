const { UIActions } = require('../utils/UIActions');

class InventoryPage extends UIActions {
    constructor(page) {
        super(page);
        this.page = page;
        this.titleXPath = "//span[text()='Products']";
        this.productCardsXPath = "//div[@class='inventory_item']";
        this.cartIconXPath = "//a[@class='shopping_cart_link']";
        this.nameRelXPath = ".//div[@data-test='inventory-item-name']";
        this.priceRelXPath = ".//div[@data-test='inventory-item-price']";
        this.addToCartRelXPath = ".//button[contains(@data-test,'add-to-cart')]";
        this.removeFromCartRelXPath = ".//button[contains(@data-test,'remove')]";
        this.product_lbl = page.locator(`xpath=${this.titleXPath}`);
        this.productCards = page.locator(`xpath=${this.productCardsXPath}`);
        this.shoppingCart_icon = page.locator(`xpath=${this.cartIconXPath}`);
    }

    async isTitleVisible() {
        return await this.product_lbl.isVisible();
    }

    async getProductCount() {
        return await this.productCards.count();
    }

    async randomSelectProducts(numberOfProducts = 3) {
        const total = await this.getProductCount();
        if (total === 0) return [];

        const count = Math.min(numberOfProducts, total);
        const pickedIndexes = new Set();

        while (pickedIndexes.size < count) {
            pickedIndexes.add(Math.floor(Math.random() * total));
        }

        const selectedProductNames = [];

        for (const idx of pickedIndexes) {
            const card = this.productCards.nth(idx);

            const name = await card.locator(`xpath=${this.nameRelXPath}`).innerText();

            selectedProductNames.push(name.trim());

            await card.locator(`xpath=${this.addToCartRelXPath}`).click();
            await this.page.waitForTimeout(200);
        }

        console.log("Selected Products:", selectedProductNames);
        return selectedProductNames;
    }

    async clickOnCheckOutIcon() {
        await this.shoppingCart_icon.click();
        await this.page.waitForLoadState("networkidle");
    }

    async randomSelectProductsWithPrice(numberOfProducts = 3) {
        const total = await this.productCards.count();
        if (total === 0) return [];

        const count = Math.min(numberOfProducts, total);
        const pickedIndexes = new Set();

        while (pickedIndexes.size < count) {
            pickedIndexes.add(Math.floor(Math.random() * total));
        }

        const selected = [];

        for (const idx of pickedIndexes) {
            const card = this.productCards.nth(idx);

            const name = await card.locator(`xpath=${this.nameRelXPath}`).innerText();
            const price = await card.locator(`xpath=${this.priceRelXPath}`).innerText();

            await card.locator(`xpath=${this.addToCartRelXPath}`).click();

            selected.push({
                name: name.trim(),
                price: price.trim(),
            });

            await this.page.waitForTimeout(200);
        }

        console.log("Selected Products →", selected);
        return selected;
    }
}

module.exports = { InventoryPage };
