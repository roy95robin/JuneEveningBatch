
import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { dashboardPage } from '../pages/dashboardPage'


const url = " https://rahulshettyacademy.com/client/#/auth/login"
let email= 'testnHNk@gmail.com'
let password= 'Testing@1234'
let productName = "ADIDAS ORIGINAL"

let lp:LoginPage
let dp:dashboardPage

test.beforeEach(async ({page}) =>{
    lp = new LoginPage(page)
    dp = new dashboardPage(page)
    await lp.launchUrl(url)
    await lp.loginIntoApplication(email, password)

})

test('add the item to cart', async({page}) =>{
    await dp.searchProduct(productName, 1)
    await expect(dp.addToCartMessage).toBeVisible()

})

test('view the product', async()=>{
    await dp.searchProduct(productName,0)
    await expect(dp.viewPageProductName).toHaveText(productName)
    await expect(dp.viewPageProductPrice).toHaveText(dp.homePageProductPrice)
})