'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { useCart } from '@/components/CartContext'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, isLoaded } = useCart()

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

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-12 px-4 bg-[#121212]">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="w-16 h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={24} className="text-gray-500" />
            </div>
            <h1 className="text-lg text-white mb-2">
              O teu carrinho está vazio
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              Explora a nossa coleção e adiciona produtos.
            </p>
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

  const shippingCost = cartTotal >= 50 ? 0 : 4.99
  const total = cartTotal + shippingCost

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#121212] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A962] mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            Continuar a comprar
          </Link>

          <h1 className="text-xl font-medium text-white mb-6">
            Carrinho ({cart.length})
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  className="bg-[rgb(26,26,26)] p-4 flex gap-4"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-[rgb(42,42,42)] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[rgb(245,245,245)] text-sm font-medium truncate">
                      {item.name}
                    </h3>
                    {item.size && (
                      <p className="text-[rgba(245,245,245,0.5)] text-xs mt-1">
                        Tamanho: {item.size}
                      </p>
                    )}
                    {item.color && (
                      <p className="text-[rgba(245,245,245,0.5)] text-xs mt-1">
                        Cor: {item.color}
                      </p>
                    )}
                    <p className="text-[rgb(245,245,245)] text-sm font-medium mt-1">
                      €{item.price.toFixed(2).replace('.', ',')}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="w-6 h-6 bg-[rgb(42,42,42)] flex items-center justify-center text-[rgb(245,245,245)] hover:bg-[rgb(51,51,51)]"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-[rgb(245,245,245)] text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="w-6 h-6 bg-[rgb(42,42,42)] flex items-center justify-center text-[rgb(245,245,245)] hover:bg-[rgb(51,51,51)]"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="p-1 text-[rgba(245,245,245,0.4)] hover:text-red-500 self-start"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-[#1a1a1a] p-5 h-fit">
              <h2 className="text-white font-medium mb-4">Resumo</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envio</span>
                  <span>{shippingCost === 0 ? 'Grátis' : `€${shippingCost.toFixed(2).replace('.', ',')}`}</span>
                </div>
              </div>

              <div className="border-t border-[#333] pt-4 mb-4">
                <div className="flex justify-between text-white font-medium">
                  <span>Total</span>
                  <span className="text-[#C9A962]">
                    €{total.toFixed(2).replace('.', ',')} EUR
                  </span>
                </div>
                {cartTotal < 50 && (
                  <p className="text-gray-500 text-xs mt-2">
                    Faltam €{(50 - cartTotal).toFixed(2).replace('.', ',')} para envio grátis
                  </p>
                )}
              </div>

              <Link
                href="/checkout"
                className="btn-gold block text-center w-full"
              >
                FINALIZAR COMPRA
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}
