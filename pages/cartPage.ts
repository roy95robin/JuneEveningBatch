import { Locator, Page } from '@playwright/test'

export class CartPage {
    page: Page
    cartItems: Locator
    continueShoppingButton: Locator
    checkoutButton: Locator
    subtotal: Locator
    total: Locator

    constructor(page: Page) {
        this.page = page
        this.cartItems = this.page.locator('li').filter({ has: this.page.locator('h3') })
        this.continueShoppingButton = this.page.getByRole('button', { name: /Continue Shopping/ })
        this.checkoutButton = this.page.getByRole('button', { name: /Checkout/ })
        this.subtotal = this.page.locator('li').filter({ hasText: /^Subtotal/ })
        this.total = this.page.locator('li').filter({ hasText: /^Total/ })
    }

    getCartItem(productName: string): Locator {
        return this.cartItems.filter({ hasText: productName })
    }

    async getProductName(productName: string): Promise<string> {
        return (await this.getCartItem(productName).locator('h3').innerText()).trim()
    }

    async getQuantity(productName: string): Promise<string> {
        return (await this.getCartItem(productName).getByText(/Quantity:/).innerText()).trim()
    }

    async removeProduct(productName: string) {
        await this.getCartItem(productName).getByRole('button').last().click()
    }

    async continueShopping() {
        await this.continueShoppingButton.click()
    }

    async checkout() {
        await this.checkoutButton.click()
    }
}