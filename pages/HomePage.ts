import { Page, Locator, expect } from '@playwright/test';
import { CartPage } from './CartPage';

const homePageUrl = 'https://www.kriso.ee/';
const logoSelector = '.logo-icon';

export class HomePage {

  private readonly logo: Locator;
  private readonly consentButton: Locator;

  constructor(private page: Page) {
    this.logo = this.page.locator(logoSelector);
    this.consentButton = this.page.getByRole('button', { name: 'Nõustun' });
  }

  async openUrl() {
    await this.page.goto(homePageUrl);
  }

  async acceptCookies() {
    await this.consentButton.click();
  }

  async verifyLogo() {
    await expect(this.logo).toBeVisible();
  }

  async searchByKeyword(keyword: string) {
    await this.page.getByRole('textbox', { name: 'Pealkiri, autor, ISBN, märksõ' }).click();
    await this.page.getByRole('textbox', { name: 'Pealkiri, autor, ISBN, märksõ' }).fill(keyword);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifyResultsCountMoreThan(minCount: number) {
    const resultsText = await this.page.locator('.sb-results-total').textContent();
    const total = Number((resultsText || '').replace(/\D/g, '')) || 0;
    expect(total).toBeGreaterThan(minCount);
  }

  async addToCartByIndex(index: number) {
    await this.page.getByRole('link', { name: 'Lisa ostukorvi' }).nth(index).click();
  }

  async verifyAddToCartMessage() {
    await expect(this.page.locator('.item-messagebox')).toContainText('Toode lisati ostukorvi');
  }

  async verifyCartCount(expectedCount: number) {
    await expect(this.page.locator('.cart-products')).toContainText(expectedCount.toString());
  }

  async goBackFromCart() {
    await this.page.locator('.cartbtn-event.back').click();
  }

  async openShoppingCart() {
    await this.page.locator('.cartbtn-event.forward').click();
    return new CartPage(this.page);
  }

}
