'use client'
import { useState, useEffect } from 'react'
import { Search, Eye, X, Package, Truck, Check, Clock, XCircle } from 'lucide-react'

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  processing: { label: 'Em processamento', color: 'bg-blue-500/20 text-blue-400', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-purple-500/20 text-purple-400', icon: Truck },
  completed: { label: 'Concluído', color: 'bg-green-500/20 text-green-400', icon: Check },
  cancelled: { label: 'Cancelado', color: 'bg-red-500/20 text-red-400', icon: XCircle }
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Erro ao carregar encomendas:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      fetchOrders()
      if (selectedOrder?.id === id) {
        setSelectedOrder(prev => ({ ...prev, status }))
      }
    } catch (error) {
      console.error('Erro ao atualizar estado:', error)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search)

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Encomendas</h1>
        <p className="text-gray-400">{orders.length} encomendas no total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Pesquisar por nome, email ou ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark w-full pl-12"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-dark"
        >
          <option value="all">Todos os estados</option>
          <option value="pending">Pendente</option>
          <option value="processing">Em processamento</option>
          <option value="shipped">Enviado</option>
          <option value="completed">Concluído</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-dark-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left p-4 text-gray-400 font-medium">ID</th>
                <th className="text-left p-4 text-gray-400 font-medium">Cliente</th>
                <th className="text-left p-4 text-gray-400 font-medium">Total</th>
                <th className="text-left p-4 text-gray-400 font-medium">Estado</th>
                <th className="text-left p-4 text-gray-400 font-medium">Data</th>
                <th className="text-right p-4 text-gray-400 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const status = statusConfig[order.status] || statusConfig.pending
                const StatusIcon = status.icon

                return (
                  <tr key={order.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                    <td className="p-4 text-gold font-medium">#{order.id}</td>
                    <td className="p-4">
                      <p className="text-white">{order.customer_name}</p>
                      <p className="text-gray-400 text-sm">{order.customer_email}</p>
                    </td>
                    <td className="p-4 text-white font-medium">€{order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon size={14} />
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(order.created_at).toLocaleDateString('pt-PT')}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-400 hover:text-gold transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            Nenhuma encomenda encontrada
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-dark-700">
              <h2 className="text-xl font-bold text-white">
                Encomenda #{selectedOrder.id}
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Update */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Estado da Encomenda</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                  className="input-dark w-full"
                >
                  <option value="pending">Pendente</option>
                  <option value="processing">Em processamento</option>
                  <option value="shipped">Enviado</option>
                  <option value="completed">Concluído</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Cliente</p>
                  <p className="text-white">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-white">{selectedOrder.customer_email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Telefone</p>
                  <p className="text-white">{selectedOrder.customer_phone || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Data</p>
                  <p className="text-white">
                    {new Date(selectedOrder.created_at).toLocaleString('pt-PT')}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-gray-400 text-sm mb-1">Morada de Envio</p>
                <p className="text-white">
                  {selectedOrder.address}<br />
                  {selectedOrder.postal_code} {selectedOrder.city}
                </p>
              </div>

              {/* Items */}
              <div>
                <p className="text-gray-400 text-sm mb-3">Produtos</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-dark-700 p-3 rounded">
                      <div>
                        <p className="text-white">{item.name}</p>
                        {item.size && <p className="text-gray-400 text-sm">Tamanho: {item.size}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-white">{item.quantity}x €{item.price}</p>
                        <p className="text-gold font-medium">€{(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-dark-700">
                <span className="text-gray-400">Total</span>
                <span className="text-2xl font-bold text-gold">€{selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
