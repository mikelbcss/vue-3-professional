import { expect, Page } from '@playwright/test'

export class ModulePage {
  private readonly sectionCards = this.page.locator('main .grid >> .cursor-pointer')

  constructor(private readonly page: Page) {}

  async goToFirstSection() {
    // Expect at least one section card
    await this.sectionCards.first().click()
    await expect(this.page).toHaveURL(/\/modules\/[^/]+\/[^/]+$/)
  }
}
