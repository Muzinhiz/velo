import { test, expect } from '@playwright/test'

// AAA - Arrange, Act, Assert

//Arrange
 test('Deve consultar um pedido aprovado', async ({ page }) => {

  // Test Data
  const order = 'VLO-U91KMJ'

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible()

  //Act

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()


  //Assert

  //const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-U91KMJ"]')
  //await expect(orderCode).toBeVisible({timeout: 10_000})

  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /ˆPedido$/ })
    .locator('..') // Sobe para o elemento pai ( a div que agrupa ambos)

    await expect(containerPedido).toContainText('order')
  await expect(page.getByText('APROVADO')).toBeVisible()

})

test('deve exibir mensagem quando o pedido nao e encontrado',async({page}))

  const order = 'VLO-ABC123' 

  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()

  await page.getByRole('link', {name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

