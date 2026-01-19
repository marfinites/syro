'use client'
import { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, ShoppingCart, Users, Calendar } from 'lucide-react'

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/stats').then(res => res.json()),
      fetch('/api/orders').then(res => res.json())
    ]).then(([statsData, ordersData]) => {
      setStats(statsData)
      setOrders(ordersData.orders || [])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Calcular métricas
  const completedOrders = orders.filter(o => o.status === 'completed')
  const avgOrderValue = completedOrders.length > 0
    ? completedOrders.reduce((sum, o) => sum + o.total, 0) / completedOrders.length
    : 0

  // Vendas por dia (últimos 7 dias)
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  const dailySales = last7Days.map(date => {
    const dayOrders = orders.filter(o =>
      o.created_at.startsWith(date) && o.status !== 'cancelled'
    )
    return {
      date,
      sales: dayOrders.reduce((sum, o) => sum + o.total, 0),
      orders: dayOrders.length
    }
  })

  const maxDailySales = Math.max(...dailySales.map(d => d.sales), 1)

  // Vendas por categoria (baseado em nomes dos produtos)
  const categorySales = {
    'Vestuário': 0,
    'Acessórios': 0,
    'Joias': 0
  }

  orders.forEach(order => {
    if (order.status === 'cancelled') return
    order.items.forEach(item => {
      if (item.name.includes('T-SHIRT')) {
        categorySales['Vestuário'] += item.price * item.quantity
      } else if (item.name.includes('PIN') || item.name.includes('PORTA-CHAVES')) {
        categorySales['Acessórios'] += item.price * item.quantity
      } else {
        categorySales['Joias'] += item.price * item.quantity
      }
    })
  })

  const totalCategorySales = Object.values(categorySales).reduce((a, b) => a + b, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400">Análise de vendas e performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-500" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Vendas Totais</span>
          </div>
          <p className="text-2xl font-bold text-white">€{stats?.totalSales?.toFixed(2) || '0.00'}</p>
        </div>

        <div className="bg-dark-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-blue-500" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Encomendas</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats?.totalOrders || 0}</p>
        </div>

        <div className="bg-dark-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-500" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Valor Médio</span>
          </div>
          <p className="text-2xl font-bold text-white">€{avgOrderValue.toFixed(2)}</p>
        </div>

        <div className="bg-dark-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <Users className="text-gold" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Taxa Conversão</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {orders.length > 0 ? ((completedOrders.length / orders.length) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-dark-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-gold" size={20} />
            <h2 className="text-lg font-bold text-white">Vendas - Últimos 7 Dias</h2>
          </div>

          <div className="space-y-4">
            {dailySales.map((day) => {
              const percentage = (day.sales / maxDailySales) * 100
              const dayName = new Date(day.date).toLocaleDateString('pt-PT', { weekday: 'short' })

              return (
                <div key={day.date}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 capitalize">{dayName}</span>
                    <span className="text-white">€{day.sales.toFixed(2)} ({day.orders} pedidos)</span>
                  </div>
                  <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-yellow-500 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-dark-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6">Vendas por Categoria</h2>

          <div className="space-y-6">
            {Object.entries(categorySales).map(([category, sales]) => {
              const percentage = totalCategorySales > 0 ? (sales / totalCategorySales) * 100 : 0

              return (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{category}</span>
                    <span className="text-gold font-medium">€{sales.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm w-12 text-right">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-dark-800 rounded-lg p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-white mb-6">Encomendas Recentes</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left pb-3 text-gray-400 font-medium">ID</th>
                  <th className="text-left pb-3 text-gray-400 font-medium">Cliente</th>
                  <th className="text-left pb-3 text-gray-400 font-medium">Produtos</th>
                  <th className="text-left pb-3 text-gray-400 font-medium">Total</th>
                  <th className="text-left pb-3 text-gray-400 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id} className="border-b border-dark-700/50">
                    <td className="py-3 text-gold">#{order.id}</td>
                    <td className="py-3 text-white">{order.customer_name}</td>
                    <td className="py-3 text-gray-400">{order.items.length} item(s)</td>
                    <td className="py-3 text-white font-medium">€{order.total.toFixed(2)}</td>
                    <td className="py-3 text-gray-400">
                      {new Date(order.created_at).toLocaleDateString('pt-PT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
