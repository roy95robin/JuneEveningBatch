

import { test, expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { dashboardPage } from '../pages/dashboardPage'
import product from '../testdata/product.json'


for(const p of product){

    // login page will be the comman action for both test case 

    test.describe(`test for ${p.productName}`, ()=>{
        let lp:LoginPage
        let dp:dashboardPage

      test.beforeEach(async ({page}) =>{
        lp = new LoginPage(page)
        dp = new dashboardPage(page)

        await lp.launchUrl(p.url)
        await lp.loginIntoApplication(p.email,p.password)
      })


      test(`Add the item to cart: ${p.productName}`, async() =>{

        await dp.searchProduct(p.productName, 1)
        await expect(dp.addToCartMessage).toContainText(p.successMessage , {ignoreCase: true})
      })
      
      test(`view product : ${p.productName}`, async() =>{

        await dp.searchProduct(p.productName, 0)
        await expect(dp.viewPageProductPrice).toHaveText(dp.homePageProductPrice)
      }) 
    })
}
