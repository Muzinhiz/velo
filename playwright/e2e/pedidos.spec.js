import { test, expect } from '@playwright/test'

// AAA - Arrange, Act, Assert

//Arrange
 test('Deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible()

  //Act

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-U91KMJ')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()


  //Assert

  await expect(page.getByText('VLO-U91KMJ')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-U91KMJ')).toContainText('VLO-U91KMJ');
  await expect(page.getByText('APROVADO')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-U91KMJ')).toContainText('APROVADO');
});

