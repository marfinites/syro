import { NextResponse } from 'next/server'
import { getProducts, getOrders } from '@/lib/db'

export async function GET() {
  try {
    const products = getProducts()
    const orders = getOrders()

    // Total vendas
    const totalSales = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0)

    // Número de encomendas
    const totalOrders = orders.length

    // Encomendas pendentes
    const pendingOrders = orders.filter(o => o.status === 'pending').length

    // Total produtos
    const totalProducts = products.length

    // Vendas por mês (últimos 6 meses)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlySalesMap = {}
    orders
      .filter(o => o.status !== 'cancelled' && new Date(o.created_at) >= sixMonthsAgo)
      .forEach(order => {
        const month = order.created_at.substring(0, 7)
        if (!monthlySalesMap[month]) {
          monthlySalesMap[month] = { month, sales: 0, orders: 0 }
        }
        monthlySalesMap[month].sales += order.total
        monthlySalesMap[month].orders += 1
      })

    const monthlySales = Object.values(monthlySalesMap).sort((a, b) => a.month.localeCompare(b.month))

    // Top produtos (baseado em quantas vezes aparecem em encomendas)
    const productCounts = {}
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productCounts[item.name]) {
          productCounts[item.name] = { name: item.name, orderCount: 0 }
        }
        productCounts[item.name].orderCount += item.quantity
      })
    })

    const topProducts = Object.values(productCounts)
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 5)
      .map(p => {
        const product = products.find(prod => prod.name === p.name)
        return {
          name: p.name,
          slug: product?.slug || '',
          price: product?.price || 0,
          orderCount: p.orderCount
        }
      })

    // Vendas por categoria
    const categoryMap = {}
    products.forEach(p => {
      if (!categoryMap[p.category]) {
        categoryMap[p.category] = { category: p.category, count: 0, totalStock: 0 }
      }
      categoryMap[p.category].count += 1
      categoryMap[p.category].totalStock += p.stock
    })

    const categoryStats = Object.values(categoryMap)

    return NextResponse.json({
      totalSales,
      totalOrders,
      pendingOrders,
      totalProducts,
      monthlySales,
      topProducts,
      categoryStats
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
