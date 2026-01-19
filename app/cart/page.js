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
        <main className="min-h-screen pt-12 px-6 bg-[rgb(18,18,18)]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[rgba(245,245,245,0.5)] text-sm">A carregar...</p>
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
        <main className="min-h-screen pt-12 px-6 bg-[rgb(18,18,18)]">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-[rgb(26,26,26)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={28} className="text-[rgba(245,245,245,0.3)]" />
            </div>
            <h1 className="text-xl text-[rgb(245,245,245)] font-light mb-3">
              O teu carrinho está vazio
            </h1>
            <p className="text-[rgba(245,245,245,0.5)] text-sm mb-8">
              Explora a nossa coleção e adiciona produtos.
            </p>
            <Link
              href="/"
              className="inline-block bg-[rgb(245,245,245)] text-[rgb(18,18,18)] px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
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

  const shippingCost = cartTotal >= 50 ? 0 : 4.99
  const total = cartTotal + shippingCost

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[rgb(18,18,18)] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] mb-8 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Continuar a comprar
          </Link>

          <h1 className="text-2xl font-light text-[rgb(245,245,245)] mb-8">
            Carrinho <span className="text-[rgba(245,245,245,0.4)]">({cart.length})</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  className="bg-[rgb(26,26,26)] p-5 rounded-2xl flex gap-5"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-[rgb(36,36,36)] rounded-xl overflow-hidden">
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
                    <div className="flex gap-3 mt-1">
                      {item.size && (
                        <p className="text-[rgba(245,245,245,0.4)] text-xs">
                          {item.size}
                        </p>
                      )}
                      {item.color && (
                        <p className="text-[rgba(245,245,245,0.4)] text-xs">
                          {item.color}
                        </p>
                      )}
                    </div>
                    <p className="text-[rgb(245,245,245)] text-base font-medium mt-3">
                      €{item.price.toFixed(2).replace('.', ',')}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="w-8 h-8 bg-[rgb(36,36,36)] rounded-lg flex items-center justify-center text-[rgb(245,245,245)] hover:bg-[rgb(46,46,46)] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-[rgb(245,245,245)] text-sm w-10 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="w-8 h-8 bg-[rgb(36,36,36)] rounded-lg flex items-center justify-center text-[rgb(245,245,245)] hover:bg-[rgb(46,46,46)] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="p-2 text-[rgba(245,245,245,0.3)] hover:text-[rgb(245,245,245)] self-start transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-[rgb(26,26,26)] p-6 rounded-2xl h-fit">
              <h2 className="text-[rgb(245,245,245)] font-medium mb-6">Resumo</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-[rgba(245,245,245,0.6)]">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-[rgba(245,245,245,0.6)]">
                  <span>Envio</span>
                  <span>{shippingCost === 0 ? 'Grátis' : `€${shippingCost.toFixed(2).replace('.', ',')}`}</span>
                </div>
              </div>

              <div className="border-t border-[rgba(245,245,245,0.1)] pt-5 mb-6">
                <div className="flex justify-between text-[rgb(245,245,245)]">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">
                    €{total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                {cartTotal < 50 && (
                  <p className="text-[rgba(245,245,245,0.4)] text-xs mt-3">
                    Faltam €{(50 - cartTotal).toFixed(2).replace('.', ',')} para envio grátis
                  </p>
                )}
              </div>

              <Link
                href="/checkout"
                className="block text-center w-full bg-[rgb(245,245,245)] text-[rgb(18,18,18)] py-4 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Finalizar Compra
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
