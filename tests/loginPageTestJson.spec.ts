
import {test , expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import  data from '../testdata/testdata.json'


let lp:LoginPage
test.beforeEach(async ({page}) =>{
    lp = new LoginPage(page)
    await lp.launchUrl(data.url)
})

test('Login using valid credentials', async({page}) =>{
//  const lp = new LoginPage(page)
//  await lp.launchUrl(url)
 await lp.loginIntoApplication(data.email, data.password)
await expect(lp.homePageIdentifier).toBeVisible()
})

test('Login using invalid credentials', async({page}) =>{
//  const lp = new LoginPage(page)
//  await lp.launchUrl(url)
 await lp.loginIntoApplication(data.email, data.invalidPassword)
await expect(lp.errorMessage).toBeVisible()
})
// Hooks in playwright
