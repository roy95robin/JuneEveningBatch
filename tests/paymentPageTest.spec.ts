import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { dashboardPage } from '../pages/dashboardPage'
import { CartPage } from '../pages/cartPage'
import { PaymentPage } from '../pages/paymentPage'
import product from '../testdata/product.json'
import payment from '../testdata/payment.json'

const selectedProduct = product[0]

test.describe('Cart to payment E2E', () => {
    let loginPage: LoginPage
    let dashboard: dashboardPage
    let cart: CartPage
    let paymentPage: PaymentPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        dashboard = new dashboardPage(page)
        cart = new CartPage(page)
        paymentPage = new PaymentPage(page)

        await loginPage.launchUrl(selectedProduct.url)
        await loginPage.loginIntoApplication(selectedProduct.email, selectedProduct.password)
        await dashboard.searchProduct(selectedProduct.productName, 1)
        await dashboard.navigateToCart()
        await cart.checkout()
    })

    test('places an order with one credit-card payment', async () => {
        await paymentPage.selectCreditCard()
        await paymentPage.enterCardDetails(
            payment.cardNumber,
            payment.expiryMonth,
            payment.expiryYear,
            payment.cvv,
            payment.nameOnCard
        )
        await paymentPage.selectCountry(payment.country)
        await paymentPage.placeOrder()
        await expect(paymentPage.orderConfirmation).toContainText('Thankyou for the order.')
    })
})

/*
Create a new folder 
Enable AI agents 
ask the agent to download the playwright
and the give any url and ask it to generate the framework in POM formet. 
Having  separate page and test files and also testdata file. 

*/