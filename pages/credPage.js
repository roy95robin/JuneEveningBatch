import { Locator, Page } from '@playwright/test'
export class LoginPage {
    constructor(page){
        this.page = page
        this.email = this.page.getByPlaceholder('email@example.com')
        this.password = this.page.getByPlaceholder('enter your passsword')
        this.loginBtn = this.page.locator('#login')
        this.errorMessage = this.page.locator('#toast-container')
        this.homePageIdentifier = this.page.locator('[routerlink="/dashboard/"]')
    }
    // create the methods/action
    // launch url , loginintoApplication
    async launchUrl(url){
        await this.page.goto(url)
    }
    async loginIntoApplication(username, password){
        await this.email.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
    }
}