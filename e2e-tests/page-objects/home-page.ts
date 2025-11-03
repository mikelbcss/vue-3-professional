import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
  private readonly goToModulesButton: Locator = this.page.getByRole('button', { name: 'Ir a los módulos' })
  private readonly progressCount: Locator = this.page.getByTestId('progress-count')

  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/')
    await expect(this.goToModulesButton).toBeVisible()
    await expect(this.progressCount).toBeVisible()
  }

  async clickGoToModules() {
    await this.goToModulesButton.click()
    await expect(this.page).toHaveURL(/\/modules\//)
  }

  async getCompletedCount(): Promise<number> {
    const numberText = (await this.progressCount.textContent())?.trim() || ''
    const match = numberText.match(/(\d+)\s*\/\s*(\d+)/)
    if (!match) throw new Error(`Unable to parse progress from: ${numberText}`)
    const current = Number(match[1])
    return current
  }
}
