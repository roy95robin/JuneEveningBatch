import { Locator, Page } from '@playwright/test'
export class LoginPage {
// class consists of properties - nothing but locators and methods
// locators are kinds of data types or types in typescript. 
page:Page
email:Locator
password:Locator
loginBtn: Locator
errorMessage:Locator
homePageIdentifier:Locator
// create constructor
    // all the locators should be written inside the constructor

    constructor(page:Page){
        this.page = page
        this.email = this.page.getByPlaceholder('email@example.com')
        this.password = this.page.getByPlaceholder('enter your passsword')
        this.loginBtn = this.page.locator('#login')
        this.errorMessage = this.page.locator('#toast-container')
        this.homePageIdentifier = this.page.locator('[routerlink="/dashboard/"]')
    }
    // create the methods/action
    // launch url , loginintoApplication
    async launchUrl(url:string){
        await this.page.goto(url)
    }
    async loginIntoApplication(username:string, password:string){
        await this.email.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
    }
}