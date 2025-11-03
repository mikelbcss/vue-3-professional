import { expect, Locator, Page } from '@playwright/test'

export class SectionPage {
  readonly exerciseCards =  this.page.locator('main .grid >> .cursor-pointer')

  constructor(private readonly page: Page) {}

  async goToFirstExercise() {
    await expect(this.exerciseCards.first()).toBeVisible()
    await this.exerciseCards.first().click()
  }
}
