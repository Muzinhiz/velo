import { test } from '@playwright/test'
import { Navbar } from '../support/components/Navbar'
import { generateOrderCode } from '../support/helpers'
import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage, type OrderDetails } from '../support/pages/OrderLockupPage'

test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)
    await new OrderLockupPage(page).validatePageLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-U91KMJ',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: { name: 'Guilherme Trindade', email: 'gui_newyork@hotmail.com' },
      payment: 'À Vista'
    }
   
    await orderLockupPage.searchOrder(order.number)
    await orderLockupPage.assertOrderResultDetails(order)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-LLDM4P',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: { name: 'Steve Jobs', email: 'jobs@apple.com' },
      payment: 'À Vista'
    }
   
    await orderLockupPage.searchOrder(order.number)
    await orderLockupPage.assertOrderResultDetails(order)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-DP4M46',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: { name: 'Joao da Silva', email: 'joao@velo.dev' },
      payment: 'À Vista'
    }
   
    await orderLockupPage.searchOrder(order.number)
    await orderLockupPage.assertOrderResultDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    const order = generateOrderCode()

    await orderLockupPage.searchOrder(order)
    await orderLockupPage.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código está fora do padrão VLO-XXXXXX', async ({ page }) => {

    await orderLockupPage.searchOrder('PED-SEM-VLO')
    await orderLockupPage.validateOrderNotFound()
  })
})
