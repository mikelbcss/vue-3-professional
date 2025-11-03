import { test, expect } from '@playwright/test'
import { HomePage } from './page-objects/home-page'
import { ModulePage } from './page-objects/module-page'
import { SectionPage } from './page-objects/section-page'
import { ExercisePage } from './page-objects/exercise-page'

test.describe('Course progress', () => {
  test('should increase when solving the first exercise', async ({ page }) => {
    const home = new HomePage(page)

    await home.goto()
    const before = await home.getCompletedCount()

    await home.clickGoToModules()

    const modulePage = new ModulePage(page)
    await modulePage.goToFirstSection()

    const sectionPage = new SectionPage(page)
    await sectionPage.goToFirstExercise()

    const exercisePage = new ExercisePage(page)
    await exercisePage.markAsCompleted()

    await page.goto('/')
    const after = await home.getCompletedCount()

    expect(after).toBeGreaterThanOrEqual(before + 1)
  })
})
