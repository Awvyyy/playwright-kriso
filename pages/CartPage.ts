import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  // TODO: define locators

  constructor(private page: Page) {
    // TODO: initialize locators
  }

  async verifyCartCount(expectedCount: number) {
    await expect(this.page.locator('.order-qty > .o-value')).toContainText(expectedCount.toString());
  }

  async verifyCartSumIsCorrect() {
    const cartItems = await this.page.locator('.tbl-row > .subtotal').all();

    let cartItemsSum = 0;

    for (const item of cartItems) {
      const text = await item.textContent();
      const price = Number((text || '').replace(/[^0-9.,]+/g, '').replace(',', '.')) || 0;
      cartItemsSum += price;
    }

    let basketSumTotalText = await this.page.locator('.order-total > .o-value').textContent();
    let basketSumTotal = Number((basketSumTotalText || '').replace(/[^0-9.,]+/g, '').replace(',', '.')) || 0;

    expect(basketSumTotal).toBeCloseTo(cartItemsSum, 2);
    return cartItemsSum;
  }

  async removeItemByIndex(index: number) {
    await this.page.locator('.icon-remove').nth(index).click();
  }
}
