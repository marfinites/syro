'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
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
        <main className="min-h-screen pt-12 px-4 bg-[#121212]">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl text-white mb-4">Produto não encontrado</h1>
            <Link href="/" className="text-[#C9A962] hover:underline text-sm">
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

      <main className="min-h-screen bg-[#121212] py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A962] mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square bg-[#2a2a2a] rounded overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-medium text-white mb-2">
                {product.name}
              </h1>
              <p className="text-2xl text-[#C9A962] font-medium mb-6">
                €{product.price.toFixed(2).replace('.', ',')} EUR
              </p>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && (
                <div className="mb-6">
                  <p className="text-white text-sm mb-2">Tamanho</p>
                  <div className="flex gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-[#C9A962] text-black'
                            : 'bg-[#2a2a2a] text-white hover:bg-[#333]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-white text-sm mb-2">Quantidade</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#333]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-white w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-[#2a2a2a] flex items-center justify-center text-white hover:bg-[#333]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="btn-gold w-full py-3"
              >
                ADICIONAR AO CARRINHO
              </button>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-[#333] text-xs text-gray-400 space-y-2">
                <p>• Envio em 24-48h para Portugal</p>
                <p>• Pagamento seguro</p>
                <p>• Trocas e devoluções grátis</p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-lg font-medium text-white mb-6">
                Produtos Relacionados
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <CookieBanner />

      {/* Toast */}
      {showToast && (
        <div className="toast">
          Adicionado ao carrinho!
        </div>
      )}
    </>
  )
}
