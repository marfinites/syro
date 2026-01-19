'use client'
import { useState, useEffect } from 'react'
import { DollarSign, ShoppingCart, Package, Clock, TrendingUp, TrendingDown } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const statCards = [
    {
      title: 'Vendas Totais',
      value: `€${stats?.totalSales?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Total Encomendas',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Pendentes',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Produtos',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Visão geral da tua loja</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-dark-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <card.icon className={card.color} size={24} />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">{card.title}</p>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Produtos */}
        <div className="bg-dark-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Top Produtos</h2>
          <div className="space-y-4">
            {stats?.topProducts?.slice(0, 5).map((product, index) => (
              <div key={product.slug} className="flex items-center gap-4">
                <span className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white truncate">{product.name}</p>
                  <p className="text-gray-400 text-sm">€{product.price}</p>
                </div>
                <span className="text-gray-400 text-sm">
                  {product.orderCount} vendas
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Categorias */}
        <div className="bg-dark-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Por Categoria</h2>
          <div className="space-y-4">
            {stats?.categoryStats?.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between">
                <div>
                  <p className="text-white">{cat.category}</p>
                  <p className="text-gray-400 text-sm">{cat.count} produtos</p>
                </div>
                <span className="px-3 py-1 bg-dark-700 rounded-full text-gold text-sm">
                  {cat.totalStock} em stock
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vendas Mensais */}
      {stats?.monthlySales?.length > 0 && (
        <div className="bg-dark-800 rounded-lg p-6 mt-6">
          <h2 className="text-lg font-bold text-white mb-4">Vendas Mensais</h2>
          <div className="space-y-3">
            {stats.monthlySales.map((month) => {
              const maxSales = Math.max(...stats.monthlySales.map(m => m.sales))
              const percentage = (month.sales / maxSales) * 100

              return (
                <div key={month.month}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{month.month}</span>
                    <span className="text-white">€{month.sales.toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
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
      )}
    </div>
  )
}
