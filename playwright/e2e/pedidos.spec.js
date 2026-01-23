import { test, expect } from '@playwright/test'

test('Deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  // Checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()


  await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible()

  await page.getByTestId('search-order-id').fill('VLO-U91KMJ')

  await page.getByTestId('search-order-button').click()
  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-U91KMJ')
  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

})