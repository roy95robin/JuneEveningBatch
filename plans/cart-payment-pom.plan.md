go through this entire folder and take a look at testdata and also at login page and dashboard page, you will get idea about application,
now I want to automate the same POM design for cart page and also for payment page.
Make sure you're creating the page class for cart and also for payment with payment details.
Generate the cart and payment page automation  as per the current structure and make sure you are not updating the existing page.


run the code that is generated for cart page and payment page and check if it is working or not.

expectation is that the framework should work as it is for e2e testing.

No change of code in login an dashboard related copde

only make changes in cart and payment pages test page and test data if required.

Expectation is to have e2e testing completed and not all loctors and values are needed from those pages,

select only one payment and place an order

# Cart and Payment Page Object Model Automation Plan

## Application Overview

Automate the Rahul Shetty Academy Let's Shop checkout flow using the repository's existing TypeScript Playwright POM conventions. Reuse LoginPage and dashboardPage for setup, the credentials and product fixtures in testdata, and add focused CartPage and PaymentPage classes. The live flow observed is dashboard product selection, cart verification and mutation, checkout, payment method and card/shipping data entry, coupon handling, and order confirmation. Each scenario starts from a fresh browser state and logs in through the existing page objects.

## Test Scenarios

### 1. Cart Page POM

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify selected product, quantity, stock, subtotal, total, and checkout controls

**File:** `tests/cartPageTest.spec.ts`

**Steps:**

1. Create LoginPage, dashboardPage, and CartPage instances in a beforeEach hook; launch the URL from test data and log in with the valid credentials.
   - expect: The dashboard is displayed and the authenticated navigation includes the Cart control.
2. Use dashboardPage.searchProduct with a product from testdata/product.json, add it to the cart, then call dashboardPage.navigateToCart().
   - expect: The cart page opens at the dashboard cart route.
3. Use CartPage locators or methods to read the cart product name, displayed item price, quantity, and stock status.
   - expect: The cart contains the selected product name.
   - expect: The item is marked In Stock.
   - expect: The initial quantity is 1.
4. Read the subtotal and total values through CartPage and compare them with the product price captured by dashboardPage.
   - expect: The subtotal and total are present and equal the selected product price for a single item.
5. Verify the Continue Shopping and Checkout controls are visible and actionable.
   - expect: Both controls are visible and the checkout control can advance to the payment route.

#### 1.2. Remove an item from the cart

**File:** `tests/cartPageTest.spec.ts`

**Steps:**

1. Start from a fresh state, log in, add one known product, and navigate to the cart.
   - expect: The cart contains exactly the selected product.
2. Call a CartPage removeProduct method for the cart item and wait for the cart state to refresh.
   - expect: The selected product is removed.
   - expect: The cart count and cart contents update to zero or the application empty-cart state.
3. Check the subtotal and total after removal.
   - expect: The totals are cleared or show the application's empty-cart values.
   - expect: No stale product price remains visible.

#### 1.3. Continue shopping preserves the cart

**File:** `tests/cartPageTest.spec.ts`

**Steps:**

1. Start from a fresh state, log in, add a known product, and navigate to the cart.
   - expect: The selected product is listed in the cart.
2. Click CartPage.continueShopping().
   - expect: The dashboard page opens.
   - expect: The existing cart item remains available through the cart count or cart page.

#### 1.4. Prevent checkout with an empty cart

**File:** `tests/cartPageTest.spec.ts`

**Steps:**

1. Start from a fresh login and navigate directly to the cart without adding a product.
   - expect: The application shows its empty-cart state.
2. Inspect the checkout control and attempt to activate it if the control is enabled.
   - expect: Checkout is disabled or the application prevents navigation without an item.
   - expect: No payment page is opened with an invalid empty order.

### 2. Payment Page POM

**Seed:** `tests/seed.spec.ts`

#### 2.1. Complete card payment and place an order

**File:** `tests/paymentPageTest.spec.ts`

**Steps:**

1. Create LoginPage, dashboardPage, CartPage, and PaymentPage instances in a beforeEach hook; launch the URL from test data, log in, add a known product, open the cart, and click checkout.
   - expect: The payment page opens with the selected product, price, and quantity summary.
2. Verify the default Credit Card payment method and use PaymentPage methods to fill card number, expiry month, expiry year, CVV, and name on card from a dedicated payment section in testdata/product.json or a new testdata/payment.json fixture.
   - expect: Each payment field accepts the supplied value.
   - expect: The selected payment method remains Credit Card.
3. Verify shipping email is populated with the authenticated account email; select a valid country using the Select Country control.
   - expect: The shipping email matches the logged-in account.
   - expect: A country is selected and the shipping section is complete.
4. Click PaymentPage.placeOrder().
   - expect: The order is submitted successfully.
   - expect: The application displays the order confirmation or thank-you state and exposes an order identifier or confirmation message.
   - expect: The order summary matches the selected product and total from the cart.

#### 2.2. Switch payment methods and verify method-specific behavior

**File:** `tests/paymentPageTest.spec.ts`

**Steps:**

1. Reach the payment page with a fresh cart containing one product.
   - expect: Credit Card, Paypal, SEPA, and Invoice payment method options are visible.
2. Select Paypal, then SEPA, then Invoice through PaymentPage methods and inspect the visible payment form after each selection.
   - expect: The selected method is visibly active after each click.
   - expect: The payment form changes or remains consistent according to the application's behavior without losing the order summary.
3. Return to Credit Card and verify the card controls are available before continuing.
   - expect: Credit Card is active and its card-specific fields are usable.

#### 2.3. Validate required payment and shipping data

**File:** `tests/paymentPageTest.spec.ts`

**Steps:**

1. Reach the payment page with a fresh cart and leave CVV, name on card, and country empty.
   - expect: The payment page remains usable for data entry and the missing fields are identifiable.
2. Attempt to place the order with the required payment or shipping fields missing.
   - expect: The order is not submitted.
   - expect: Required-field validation, an error state, or an application-level prevention signal is displayed.
   - expect: The user remains on the payment page.
3. Fill the missing fields with valid values and place the order.
   - expect: The validation clears and the order can be submitted successfully.

#### 2.4. Apply an invalid coupon without corrupting checkout totals

**File:** `tests/paymentPageTest.spec.ts`

**Steps:**

1. Reach the payment page with a fresh cart and record the displayed product total.
   - expect: The payment total is visible before coupon entry.
2. Enter an invalid coupon in the Apply Coupon field and click Apply Coupon.
   - expect: The application shows a coupon error or no-discount response.
   - expect: The checkout remains on the payment page.
3. Compare the displayed total and order summary after the invalid coupon attempt.
   - expect: The original product and total remain intact unless the application explicitly reports a valid discount.
