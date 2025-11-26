class CartPage {
    constructor(page) {
        this.page = page;
        this.titleXPath = "//span[text()='Your Cart']";
        this.cartItemXPath = "//div[@class='cart_item']";
        this.checkoutBtnXPath = "//button[@id='checkout']";
        this.nameRelXPath = ".//div[@class='inventory_item_name']";
        this.priceRelXPath = ".//div[@class='inventory_item_price']";
        this.cartItems = page.locator(this.cartItemXPath);
        this.checkoutBtn = page.locator(this.checkoutBtnXPath);
    }

    async waitForCartPage() {
        await this.page.locator(this.titleXPath).waitFor({ state: "visible" });
        await this.cartItems.first().waitFor({ state: "visible" });
    }

    async getCartProducts() {
        await this.waitForCartPage();

        const count = await this.cartItems.count();
        const products = [];

        for (let i = 0; i < count; i++) {
            const item = this.cartItems.nth(i);

            const name = (await item.locator(`xpath=${this.nameRelXPath}`).innerText()).trim();
            const price = (await item.locator(`xpath=${this.priceRelXPath}`).innerText()).trim();

            products.push({ name, price });
        }

        console.log("Products in cart:", products);
        return products;
    }

    async clickOnCheckOutButton() {
        console.log("Clicking on CheckOut button");
        await this.checkoutBtn.click();
        await this.page.waitForLoadState("networkidle");
    }

    async isTitleVisible() {
        return await this.page.locator(this.titleXPath).isVisible();
    }
}

module.exports = { CartPage };
