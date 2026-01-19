'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { useCart } from '@/components/CartContext'
import { useAuth } from '@/components/AuthContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart, isLoaded } = useCart()
  const { user, refreshOrders } = useAuth()
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || ''
  })

  const shippingCost = cartTotal >= 50 ? 0 : 4.99
  const total = cartTotal + shippingCost

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: cart,
          total,
          userId: user?.id || null
        })
      })

      const data = await response.json()

      if (data.success) {
        setOrderId(data.orderId)
        setOrderComplete(true)

        // Refresh orders in user's profile
        if (user && refreshOrders) {
          refreshOrders()
        }

        clearCart()
      } else {
        throw new Error(data.error || 'Erro desconhecido')
      }
    } catch (error) {
      alert('Erro ao processar encomenda. Tenta novamente.')
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-12 px-6 bg-[rgb(18,18,18)]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[rgba(245,245,245,0.5)] text-sm">A carregar...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (orderComplete) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-12 px-6 bg-[rgb(18,18,18)]">
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 bg-[rgb(26,26,26)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Check size={36} className="text-[rgb(245,245,245)]" />
            </div>
            <h1 className="text-2xl font-light text-[rgb(245,245,245)] mb-3">
              Encomenda Confirmada
            </h1>
            <p className="text-[rgba(245,245,245,0.5)] text-sm mb-2">
              Obrigado pela tua compra.
            </p>
            <p className="text-[rgb(245,245,245)] font-medium mb-8">
              #{orderId}
            </p>
            <p className="text-[rgba(245,245,245,0.4)] text-xs mb-8">
              Receberás um email com os detalhes da encomenda.
            </p>
            <Link
              href="/"
              className="inline-block bg-[rgb(245,245,245)] text-[rgb(18,18,18)] px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Voltar à Loja
            </Link>
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </>
    )
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-12 px-6 bg-[rgb(18,18,18)]">
          <div className="max-w-4xl mx-auto text-center py-16">
            <p className="text-[rgba(245,245,245,0.5)] text-sm mb-8">O teu carrinho está vazio.</p>
            <Link
              href="/"
              className="inline-block bg-[rgb(245,245,245)] text-[rgb(18,18,18)] px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Ver Produtos
            </Link>
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[rgb(18,18,18)] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] mb-8 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao carrinho
          </Link>

          <h1 className="text-2xl font-light text-[rgb(245,245,245)] mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[rgb(26,26,26)] rounded-2xl p-6">
                <h2 className="text-[rgb(245,245,245)] font-medium mb-6">Dados de Envio</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[rgba(245,245,245,0.5)] text-xs mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                      placeholder="João Silva"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[rgba(245,245,245,0.5)] text-xs mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[rgba(245,245,245,0.5)] text-xs mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="+351 912 345 678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[rgba(245,245,245,0.5)] text-xs mb-2">
                      Morada
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                      placeholder="Rua, número, andar"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[rgba(245,245,245,0.5)] text-xs mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="Lisboa"
                      />
                    </div>
                    <div>
                      <label className="block text-[rgba(245,245,245,0.5)] text-xs mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="1000-001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[rgb(245,245,245)] text-[rgb(18,18,18)] py-4 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'A Processar...' : `Confirmar Encomenda · €${total.toFixed(2).replace('.', ',')}`}
              </button>
            </form>

            {/* Order Summary */}
            <div className="bg-[rgb(26,26,26)] rounded-2xl p-6 h-fit">
              <h2 className="text-[rgb(245,245,245)] font-medium mb-6">Resumo</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-[rgb(36,36,36)] rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[rgb(245,245,245)] text-[rgb(18,18,18)] text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[rgb(245,245,245)] text-sm truncate">{item.name}</p>
                      <div className="flex gap-2 mt-1">
                        {item.size && (
                          <p className="text-[rgba(245,245,245,0.4)] text-xs">{item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-[rgba(245,245,245,0.4)] text-xs">{item.color}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-[rgb(245,245,245)] text-sm font-medium">
                      €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[rgba(245,245,245,0.1)] pt-5 space-y-3 text-sm">
                <div className="flex justify-between text-[rgba(245,245,245,0.6)]">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[rgba(245,245,245,0.6)]">
                  <span>Envio</span>
                  <span>{shippingCost === 0 ? 'Grátis' : `€${shippingCost.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div className="flex justify-between text-[rgb(245,245,245)] font-medium pt-3 border-t border-[rgba(245,245,245,0.1)]">
                  <span>Total</span>
                  <span>€{total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}
