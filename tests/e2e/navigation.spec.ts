import { test, expect } from '@playwright/test'

test('navigates to about.html on nav link click', async ({ page }) => {
  const filePath = `file://${process.cwd()}/dist/index.html`
  await page.goto(filePath)

  const menuButton = page.locator('.menu-btn')
  await menuButton.click()

  const link = page.locator('a[href="about.html"]')
  await link.click()

  await expect(page).toHaveURL(/about\.html$/)
})

test('does not navigate to about.html if nav link is not clicked', async ({ page }) => {
  const filePath = `file://${process.cwd()}/dist/index.html`
  await page.goto(filePath)

  const menuButton = page.locator('.menu-btn')
  await menuButton.click()

  await page.waitForTimeout(1000)

  await expect(page).toHaveURL(/index\.html$/)
})
