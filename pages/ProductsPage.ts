import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

  private readonly searchInput = this.page.locator('#search_product');
  private readonly searchButton = this.page.locator('#submit_search');
  private readonly productCards = this.page.locator('.productinfo');
  private readonly searchResultsSection = this.page.locator('#search_product_results');


  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/products');
  }

  async searchProduct(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async getProductNames(): Promise<string[]> {
    const cards = await this.productCards.all();
    const names: string[] = [];
    for (const card of cards) {
      names.push(await card.locator('p').innerText());
    }
    return names;
  }

}
