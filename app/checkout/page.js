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
        <main className="min-h-screen pt-12 px-4 bg-[#121212]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 text-sm">A carregar...</p>
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
        <main className="min-h-screen pt-12 px-4 bg-[#121212]">
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h1 className="text-xl font-medium text-white mb-2">
              Encomenda Confirmada!
            </h1>
            <p className="text-gray-400 text-sm mb-1">
              Obrigado pela tua compra.
            </p>
            <p className="text-[#C9A962] font-medium mb-6">
              Encomenda #{orderId}
            </p>
            <p className="text-gray-400 text-xs mb-6">
              Receberás um email com os detalhes.
            </p>
            <Link href="/" className="btn-gold inline-block">
              VOLTAR À LOJA
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
        <main className="min-h-screen pt-12 px-4 bg-[#121212]">
          <div className="max-w-4xl mx-auto text-center py-16">
            <p className="text-gray-400 text-sm mb-6">O teu carrinho está vazio.</p>
            <Link href="/" className="btn-gold inline-block">
              VER PRODUTOS
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

      <main className="min-h-screen bg-[#121212] py-8">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A962] mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            Voltar ao carrinho
          </Link>

          <h1 className="text-xl font-medium text-white mb-6">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#1a1a1a] p-5">
                <h2 className="text-white font-medium mb-4">Dados de Envio</h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#222] border border-[#333] text-white text-sm px-3 py-2 focus:outline-none focus:border-[#C9A962]"
                      placeholder="João Silva"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#222] border border-[#333] text-white text-sm px-3 py-2 focus:outline-none focus:border-[#C9A962]"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#222] border border-[#333] text-white text-sm px-3 py-2 focus:outline-none focus:border-[#C9A962]"
                        placeholder="912 345 678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Morada *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#222] border border-[#333] text-white text-sm px-3 py-2 focus:outline-none focus:border-[#C9A962]"
                      placeholder="Rua, número, andar"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#222] border border-[#333] text-white text-sm px-3 py-2 focus:outline-none focus:border-[#C9A962]"
                        placeholder="Lisboa"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#222] border border-[#333] text-white text-sm px-3 py-2 focus:outline-none focus:border-[#C9A962]"
                        placeholder="1000-001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-3 disabled:opacity-50"
              >
                {loading ? 'A PROCESSAR...' : `CONFIRMAR - €${total.toFixed(2).replace('.', ',')} EUR`}
              </button>
            </form>

            {/* Order Summary */}
            <div className="bg-[#1a1a1a] p-5 h-fit">
              <h2 className="text-white font-medium mb-4">Resumo</h2>

              <div className="space-y-3 mb-4">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-3">
                    <div className="relative w-14 h-14 bg-[#2a2a2a] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A962] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs truncate">{item.name}</p>
                      {item.size && (
                        <p className="text-gray-400 text-[10px]">Tamanho: {item.size}</p>
                      )}
                    </div>
                    <p className="text-white text-sm font-medium">
                      €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#333] pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envio</span>
                  <span>{shippingCost === 0 ? 'Grátis' : `€${shippingCost.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div className="flex justify-between text-white font-medium pt-2 border-t border-[#333]">
                  <span>Total</span>
                  <span className="text-[#C9A962]">€{total.toFixed(2).replace('.', ',')} EUR</span>
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
