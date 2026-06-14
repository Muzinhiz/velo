import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import type { OrderDetails } from '../support/actions/orderLookupActions'

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLookup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-U91KMJ',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: { name: 'Guilherme Trindade', email: 'gui_newyork@hotmail.com' },
      payment: 'À Vista',
    }

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-LLDM4P',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: { name: 'Steve Jobs', email: 'jobs@apple.com' },
      payment: 'À Vista',
    }

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-DP4M46',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: { name: 'Joao da Silva', email: 'joao@velo.dev' },
      payment: 'À Vista',
    }

    await app.orderLookup.searchOrder(order.number)
    await app.orderLookup.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()

    await app.orderLookup.searchOrder(order)
    await app.orderLookup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
    await app.orderLookup.searchOrder('PED-SEM-VLO')
    await app.orderLookup.validateOrderNotFound()
  })

  test('deve manter o botão de busca desabilitado com campo vazio ou apenas espaços', async ({
    app,
    page,
  }) => {
    const button = app.orderLookup.elements.searchButton

    await expect(button).toBeDisabled()

    await app.orderLookup.elements.orderInput.fill('    ')

    await expect(button).toBeDisabled()
  })
})
