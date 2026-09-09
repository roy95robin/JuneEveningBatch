
import{test, expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { dashboardPage } from '../pages/dashboardPage'
import { ExcelUtils } from '../utils/Excelutils'
import path from 'node:path'

const filepath = path.join(__dirname, "../testdata/login.xlsx")
console.log(__dirname);

// take the sheet name from the excel 
const sheetname = "LoginData"

let data: any
try {
        data = ExcelUtils.getExcelData(filepath, sheetname)
} catch(e){
    console.log(e);
}

let lp:LoginPage
let dp:dashboardPage

test.beforeEach(async ({page}) =>{
        lp = new LoginPage(page)
        dp = new dashboardPage(page)
})

for(let product of data) {

    test(`add an item to cart ${product.productName}`, async() =>{
        await lp.launchUrl(product.url)
        await lp.loginIntoApplication(product.username, product.password)
       await expect(lp.homePageIdentifier).toBeVisible()
       await dp.searchProduct(product.productName, 1)
       await expect(dp.addToCartMessage).toHaveText('Product Added To Cart')

    })
}    