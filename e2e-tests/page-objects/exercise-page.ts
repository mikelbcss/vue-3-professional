import { expect, Locator, Page } from '@playwright/test'

export class ExercisePage {
  readonly completionRow: Locator = this.page.getByTestId('exercise-toggle')
  readonly toggleButton: Locator = this.page.getByTestId('exercise-toggle')
  readonly statusText: Locator = this.page.getByTestId('exercise-status')

  constructor(private readonly page: Page) {}

  async isCompleted(): Promise<boolean> {
    const text = (await this.statusText.textContent())?.trim() || ''
    return /Completado/i.test(text)
  }

  async markAsCompleted() {
    await this.ensureLoaded()
    await this.toggleButton.click()
  }

    private async ensureLoaded() {
        await expect(this.completionRow).toBeVisible()
    }
}
