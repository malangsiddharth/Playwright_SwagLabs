require('dotenv').config();
const { setDefaultTimeout } = require('@cucumber/cucumber');

const { After, Before, AfterStep, Status } = require('@cucumber/cucumber');
const playwright = require('playwright');
const PageObjectManager = require('../pageobjectmanager/PageObjectManager');

setDefaultTimeout(60 * 3000);   

Before(async function () {
  
  console.log("i am first");
  this.browser = await playwright.chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  const pom = new PageObjectManager(this.page);
  this.HomePage = pom.getHomePage();
  this.InventoryPage = pom.getInventoryPage();
  this.CartPage = pom.getCartPage();
  this.CheckOutStepOnePage = pom.getCheckOutStepOnePage();
  this.CheckOutStepTwoPage = pom.getCheckOutStepTwoPage();
  this.CheckOutCompletePage = pom.getCheckOutCompletePage();
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED && this.page) {
    const buffer = await this.page.screenshot();
    await this.page.screenshot({ path: 'screenshot1.png' }).catch(() => {});
    this.attach(buffer.toString('base64'), 'base64:image/png');
    console.log("Screenshot logged");
  }
});

After(async function () {
  if (this.page) await this.page.close().catch(()=>{});
  if (this.context) await this.context.close().catch(()=>{});
  if (this.browser) await this.browser.close().catch(()=>{});
});