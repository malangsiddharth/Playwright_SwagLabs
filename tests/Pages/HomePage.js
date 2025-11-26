const { UIActions } = require('../utils/UIActions');

class HomePage extends UIActions {
    constructor(page){
        super(page);
        this.page = page;
        this.username_txtbox = page.locator("//input[@name='user-name']");
        this.password_txtbox = page.locator("//input[@name='password']");
        this.login_button = page.locator("//input[@name='login-button']");
        this.title_lbl = page.locator("//div[text()='Swag Labs']");
    }

    async goToApplication(){
        const applicationURL = process.env.BASE_URL;
        console.log('Go to application: ' + applicationURL);
        await this.page.goto(applicationURL);
    }

    async loginToApplication(){
        console.log('Filling ' + process.env.SWAG_USERNAME + ' in Username textBox');
        await this.username_txtbox.fill(process.env.SWAG_USERNAME);
        console.log('Filling ' + process.env.SWAG_PASSWORD + ' in Password textBox');
        await this.password_txtbox.fill(process.env.SWAG_PASSWORD);

        console.log('Clicking on Login button');
        await this.login_button.click();
        await this.page.waitForLoadState('networkidle');
    }

    async isTitleVisible(){
        return await this.title_lbl.isVisible();
    }
}

module.exports = { HomePage };
