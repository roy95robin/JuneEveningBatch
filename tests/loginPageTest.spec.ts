
import {test , expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
// first time lets perform action using hard coded value 
const url = " https://rahulshettyacademy.com/client/#/auth/login"
let email= 'testnHNk@gmail.com'
let password= 'Testing@1234'
let errorMessage = "Incorrect email or password. "
let invalidPassword = "sfasjgfjasgf"


let lp:LoginPage
test.beforeEach(async ({page}) =>{
    lp = new LoginPage(page)
    await lp.launchUrl(url)
})

test('Login using valid credentials', async({page}) =>{
//  const lp = new LoginPage(page)
//  await lp.launchUrl(url)
 await lp.loginIntoApplication(email, password)
await expect(lp.homePageIdentifier).toBeVisible()
})

test('Login using invalid credentials', async({page}) =>{
//  const lp = new LoginPage(page)
//  await lp.launchUrl(url)
 await lp.loginIntoApplication(email, invalidPassword)
await expect(lp.errorMessage).toBeVisible()
})
// Hooks in playwright
