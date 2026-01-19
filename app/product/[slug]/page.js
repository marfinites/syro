'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Minus, Plus, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartContext'
import { getProductBySlug, products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function ProductPage() {
  const params = useParams()
  const product = getProductBySlug(params.slug)
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl text-white mb-4">Produto não encontrado</h1>
            <Link href="/" className="text-gold hover:underline">
              Voltar à loja
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Por favor seleciona um tamanho')
      return
    }
    addToCart(product, quantity, selectedSize)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Header />

      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar à loja
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square bg-dark-800 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-gold text-black text-sm font-semibold rounded">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <p className="text-gold text-sm uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-3xl text-gold font-bold mb-6">
                €{product.price.toFixed(2)}
              </p>

              <p className="text-gray-400 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && (
                <div className="mb-6">
                  <p className="text-white font-medium mb-3">Tamanho</p>
                  <div className="flex gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-gold text-black'
                            : 'bg-dark-700 text-white hover:bg-dark-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <p className="text-white font-medium mb-3">Quantidade</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-white font-medium text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="btn-gold flex items-center justify-center gap-3 w-full py-4"
              >
                <ShoppingBag size={20} />
                ADICIONAR AO CARRINHO
              </button>

              {/* Features */}
              <div className="mt-8 pt-8 border-t border-dark-700">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Truck size={20} className="text-gold" />
                    <span className="text-sm">Envio 24-48h</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Shield size={20} className="text-gold" />
                    <span className="text-sm">Pagamento seguro</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <RotateCcw size={20} className="text-gold" />
                    <span className="text-sm">Trocas grátis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold text-white mb-8">
                Produtos Relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />

      {/* Toast */}
      {showToast && (
        <div className="toast">
          Adicionado ao carrinho!
        </div>
      )}
    </>
  )
}
