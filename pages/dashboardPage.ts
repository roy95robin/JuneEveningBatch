

import { Locator, Page } from "@playwright/test";

export class dashboardPage{

page:Page
products:Locator
cart: Locator
addToCartMessage: Locator
viewPageProductPrice: Locator
viewPageProductName:Locator
homePageProductPrice: string

        constructor (page:Page){

        this.page = page
        this.products = this.page.locator('div.card-body')
        this.cart = this.page.locator('[routerlink="/dashboard/cart"]')
        this.addToCartMessage = this.page.locator('#toast-container')
        this.viewPageProductPrice = this.page.locator('.rtl-text h3')
        this.viewPageProductName = this.page.locator('.rtl-text h2')
        this.homePageProductPrice= ""

    }

    // methods need to be created: 
    async searchProduct(productName:string, index:number){
        // wait for atleast one product to load 
        await this.products.nth(0).waitFor()

        // count the number of product present on the page: 
        const countOfProduct = await this.products.count()
        console.log(countOfProduct);

        // iterate through the product value: 
        for(let i = 0;i <=countOfProduct;i++){
            // locator b is nothing but locator chaining with the help of products locations
            const productText = await this.products.nth(i).locator('b').textContent()
            if(productText?.trim().toLowerCase() === productName.trim().toLowerCase()){
                this.homePageProductPrice = await this.products.nth(i).locator('div.text-muted').innerText()
                await this.products.nth(i).locator('button').nth(index).click()
                break
            }

        }

    }
    async navigateToCart(){
        await this.cart.click()
    }


}