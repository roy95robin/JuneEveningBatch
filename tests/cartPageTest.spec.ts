import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { dashboardPage } from '../pages/dashboardPage'
import { CartPage } from '../pages/cartPage'
import product from '../testdata/product.json'

const selectedProduct = product[0]

test.describe('Cart page', () => {
	let loginPage: LoginPage
	let dashboard: dashboardPage
	let cart: CartPage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)
		dashboard = new dashboardPage(page)
		cart = new CartPage(page)

		await loginPage.launchUrl(selectedProduct.url)
		await loginPage.loginIntoApplication(selectedProduct.email, selectedProduct.password)
		await dashboard.searchProduct(selectedProduct.productName, 1)
		await dashboard.navigateToCart()
	})

	test('verifies the selected product and cart totals', async () => {
		const cartItem = cart.getCartItem(selectedProduct.productName)
		const expectedPrice = dashboard.homePageProductPrice.replace(/\s/g, '')

		await expect(cartItem).toBeVisible()
		await expect(cartItem).toContainText('In Stock')
		await expect(cartItem).toContainText('MRP')
		await expect(cart.getProductName(selectedProduct.productName)).resolves.toBe(selectedProduct.productName)
		await expect(cart.subtotal).toContainText(expectedPrice)
		await expect(cart.total).toContainText(expectedPrice)
		await expect(cart.checkoutButton).toBeVisible()
	})
})
