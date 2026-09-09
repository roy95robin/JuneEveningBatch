# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cartPageTest.spec.ts >> Cart page >> verifies the selected product and cart totals
- Location: tests\cartPageTest.spec.ts:25:6

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(received).resolves.toBe()

Received promise rejected instead of resolved
Rejected to value: [Error: locator.innerText: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('li').filter({ has: locator('h3') }).filter({ hasText: 'ADIDAS ORIGINAL' }).getByText(/Quantity:/)
]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart 1" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
          - generic [ref=e22]: "1"
      - listitem [ref=e23] [cursor=pointer]:
        - button "Sign Out" [ref=e24]:
          - generic [ref=e25]: 
          - text: Sign Out
  - generic [ref=e26]:
    - generic [ref=e27]:
      - heading "My Cart" [level=1] [ref=e28]
      - button "Continue Shopping❯" [ref=e29] [cursor=pointer]
    - list [ref=e31]:
      - listitem [ref=e32] [cursor=pointer]:
        - generic [ref=e33]:
          - generic [ref=e34]:
            - paragraph [ref=e35]: "#6960eae1c941646b7a8b3ed3"
            - heading "ADIDAS ORIGINAL" [level=3] [ref=e36]
            - paragraph [ref=e37]: MRP $ 11500
            - paragraph [ref=e38]: In Stock
          - paragraph [ref=e40]: $ 11500
          - generic [ref=e41]:
            - button "Buy Now❯" [ref=e42]
            - button "❯" [ref=e43]:
              - generic [ref=e44]: 
              - text: ❯
    - list [ref=e46]:
      - listitem [ref=e47]:
        - generic [ref=e48]: Subtotal
        - generic [ref=e49]: $11500
      - listitem [ref=e50]:
        - generic [ref=e51]: Total
        - generic [ref=e52]: $11500
      - listitem [ref=e53]:
        - button "Checkout❯" [ref=e54] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { LoginPage } from '../pages/loginPage'
  3  | import { dashboardPage } from '../pages/dashboardPage'
  4  | import { CartPage } from '../pages/cartPage'
  5  | import product from '../testdata/product.json'
  6  | 
  7  | const selectedProduct = product[0]
  8  | 
  9  | test.describe('Cart page', () => {
  10 | 	let loginPage: LoginPage
  11 | 	let dashboard: dashboardPage
  12 | 	let cart: CartPage
  13 | 
  14 | 	test.beforeEach(async ({ page }) => {
  15 | 		loginPage = new LoginPage(page)
  16 | 		dashboard = new dashboardPage(page)
  17 | 		cart = new CartPage(page)
  18 | 
  19 | 		await loginPage.launchUrl(selectedProduct.url)
  20 | 		await loginPage.loginIntoApplication(selectedProduct.email, selectedProduct.password)
  21 | 		await dashboard.searchProduct(selectedProduct.productName, 1)
  22 | 		await dashboard.navigateToCart()
  23 | 	})
  24 | 
  25 | 	test('verifies the selected product and cart totals', async () => {
  26 | 		const cartItem = cart.getCartItem(selectedProduct.productName)
  27 | 		const expectedPrice = dashboard.homePageProductPrice.replace(/\s/g, '')
  28 | 
  29 | 		await expect(cartItem).toBeVisible()
  30 | 		await expect(cartItem).toContainText('In Stock')
  31 | 		await expect(cart.getProductName(selectedProduct.productName)).resolves.toBe(selectedProduct.productName)
> 32 | 		await expect(cart.getQuantity(selectedProduct.productName)).resolves.toBe('Quantity: 1')
     |                                                                        ^ Error: expect(received).resolves.toBe()
  33 | 		await expect(cart.subtotal).toContainText(expectedPrice)
  34 | 		await expect(cart.total).toContainText(expectedPrice)
  35 | 		await expect(cart.checkoutButton).toBeVisible()
  36 | 	})
  37 | })
  38 | 
```