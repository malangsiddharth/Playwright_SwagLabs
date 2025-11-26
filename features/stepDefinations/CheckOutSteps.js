const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const playwright = require('playwright');
const { PageObjectManager } = require('../pageobjectmanager/PageObjectManager');
const { time } = require('console');


Given('Login into application', async function () {
  
  await this.HomePage.goToApplication();
  await this.HomePage.isTitleVisible(); 
  await this.HomePage.loginToApplication();

});

When('Select three random items', async function () {
  await this.InventoryPage.isTitleVisible();
  await this.page.waitForTimeout(3000)
  const selected = await this.InventoryPage.randomSelectProductsWithPrice(3);
  this.selectedProducts = selected;   
  console.log(this.selectedProducts);
  await this.InventoryPage.clickOnCheckOutIcon();
});

When('View My Cart', async function () {
    await this.CartPage.isTitleVisible();
    
    const cartProducts = await this.CartPage.getCartProducts();

    console.log("Validating cart items...");

    for (const selected of this.selectedProducts) {

        const match = cartProducts.find(
            item => item.name === selected.name && item.price === selected.price
        );

        if (!match) {
            throw new Error('Product NOT found in cart: ${selected.name} ${selected.price}');
        }
    }

    console.log("All selected products are correctly present in the cart");
    
    await this.CartPage.clickOnCheckOutButton();
});


 Then('Add Address', async function () 
 {  
   await this.CheckOutStepOnePage.isTitleVisible();
   const firstName="FNAME"+Math.floor(Math.random()*1000);
   const lastName="LNAME"+Math.floor(Math.random()*1000);
   const postalCode=Math.floor(Math.random()*1000).toString();
  await this.CheckOutStepOnePage.enterCheckoutInformation(firstName, lastName, postalCode);
  await this.CheckOutStepOnePage.clickOnContinueButton();
           
           
         });

When('CheckOut the order', async function () 
{
  await this.CheckOutStepTwoPage.isTitleVisible();
  await this.CheckOutStepTwoPage.clickOnContinueButton();
           
});

Then('Complete order', async function () {
  await this.CheckOutCompletePage.isTitleVisible();
  await this.CheckOutCompletePage.isOrderConfirmationVisible();
  await this.CheckOutCompletePage.isDispatchedMessageVisible();
         });



