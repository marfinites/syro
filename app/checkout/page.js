'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart, isLoaded } = useCart()
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
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
          total
        })
      })

      const data = await response.json()

      if (data.success) {
        setOrderId(data.orderId)
        setOrderComplete(true)
        clearCart()
      }
    } catch (error) {
      alert('Erro ao processar encomenda. Tenta novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">A carregar...</p>
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
        <main className="min-h-screen pt-24 px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Encomenda Confirmada!
            </h1>
            <p className="text-gray-400 mb-2">
              Obrigado pela tua compra.
            </p>
            <p className="text-gold font-medium mb-8">
              Número da encomenda: #{orderId}
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Receberás um email com os detalhes da tua encomenda e informações de tracking.
            </p>
            <Link href="/" className="btn-gold inline-block">
              VOLTAR À LOJA
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 mb-8">O teu carrinho está vazio.</p>
            <Link href="/" className="btn-gold inline-block">
              EXPLORAR PRODUTOS
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar ao carrinho
          </Link>

          <h1 className="text-3xl font-bold text-white mb-8">CHECKOUT</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-dark-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-6">Dados de Envio</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-dark w-full"
                      placeholder="João Silva"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-dark w-full"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-dark w-full"
                        placeholder="912 345 678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Morada *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="input-dark w-full"
                      placeholder="Rua, número, andar"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="input-dark w-full"
                        placeholder="Lisboa"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="input-dark w-full"
                        placeholder="1000-001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-4 disabled:opacity-50"
              >
                {loading ? 'A PROCESSAR...' : `CONFIRMAR ENCOMENDA - €${total.toFixed(2)}`}
              </button>
            </form>

            {/* Order Summary */}
            <div className="bg-dark-800 rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold text-white mb-6">
                Resumo da Encomenda
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-dark-700 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.name}</p>
                      {item.size && (
                        <p className="text-gray-400 text-xs">Tamanho: {item.size}</p>
                      )}
                    </div>
                    <p className="text-white font-medium">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-dark-700 pt-4 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envio</span>
                  <span>{shippingCost === 0 ? 'Grátis' : `€${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-dark-700">
                  <span>Total</span>
                  <span className="text-gold">€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
