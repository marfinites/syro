'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartContext'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, isLoaded } = useCart()

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

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-600" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              O teu carrinho está vazio
            </h1>
            <p className="text-gray-400 mb-8">
              Explora a nossa coleção e adiciona produtos ao teu carrinho.
            </p>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            Continuar a comprar
          </Link>

          <h1 className="text-3xl font-bold text-white mb-8">
            CARRINHO <span className="text-gold">({cart.length})</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${index}`}
                  className="bg-dark-800 rounded-lg p-4 flex gap-4"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-dark-700 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {item.name}
                    </h3>
                    {item.size && (
                      <p className="text-gray-400 text-sm">
                        Tamanho: {item.size}
                      </p>
                    )}
                    <p className="text-gold font-semibold mt-1">
                      €{item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 bg-dark-700 rounded flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 bg-dark-700 rounded flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-dark-800 rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold text-white mb-6">Resumo</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envio</span>
                  <span>{cartTotal >= 50 ? 'Grátis' : '€4.99'}</span>
                </div>
              </div>

              <div className="border-t border-dark-700 pt-4 mb-6">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gold">
                    €{(cartTotal + (cartTotal >= 50 ? 0 : 4.99)).toFixed(2)}
                  </span>
                </div>
                {cartTotal < 50 && (
                  <p className="text-gray-400 text-xs mt-2">
                    Faltam €{(50 - cartTotal).toFixed(2)} para envio grátis
                  </p>
                )}
              </div>

              <Link
                href="/checkout"
                className="btn-gold block text-center w-full"
              >
                FINALIZAR COMPRA
              </Link>

              <p className="text-gray-500 text-xs text-center mt-4">
                Pagamento seguro com encriptação SSL
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
