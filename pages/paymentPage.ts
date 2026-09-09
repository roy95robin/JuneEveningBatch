import { Locator, Page } from '@playwright/test'

export class PaymentPage {
    page: Page
    orderSummary: Locator
    creditCardOption: Locator
    cardNumber: Locator
    expiryMonth: Locator
    expiryYear: Locator
    cvv: Locator
    nameOnCard: Locator
    country: Locator
    placeOrderButton: Locator
    orderConfirmation: Locator

    constructor(page: Page) {
        this.page = page
        this.orderSummary = this.page.locator('div').filter({ hasText: 'Quantity:' }).first()
        this.creditCardOption = this.page.getByText('Credit Card', { exact: true })
        this.cardNumber = this.page.locator('input.input.txt').nth(0)
        this.expiryMonth = this.page.locator('select').nth(0)
        this.expiryYear = this.page.locator('select').nth(1)
        this.cvv = this.page.locator('input.input.txt').nth(1)
        this.nameOnCard = this.page.locator('input.input.txt').nth(2)
        this.country = this.page.getByPlaceholder('Select Country')
        this.placeOrderButton = this.page.locator('.action__submit')
        this.orderConfirmation = this.page.locator('.hero-primary')
    }

    async selectCreditCard() {
        await this.creditCardOption.click()
    }

    async enterCardDetails(cardNumber: string, month: string, year: string, cvv: string, name: string) {
        await this.cardNumber.fill(cardNumber)
        await this.expiryMonth.selectOption(month)
        await this.expiryYear.selectOption(year)
        await this.cvv.fill(cvv)
        await this.nameOnCard.fill(name)
    }

    async selectCountry(country: string) {
        await this.country.fill('')
        await this.country.pressSequentially(country)
        const countryOption = this.page.locator('.ta-results button').filter({ hasText: country }).first()
        await countryOption.waitFor()
        await countryOption.click()
    }

    async placeOrder() {
        await this.placeOrderButton.click()
    }
}
