'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronDown, Minus, Plus } from 'lucide-react'
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

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false)
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false)

  // Set default color when product loads
  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0])
    }
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0])
    }
  }, [product])

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-12 px-4 bg-[rgb(18,18,18)]">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl text-[rgb(245,245,245)] mb-4">Produto não encontrado</h1>
            <Link href="/" className="text-[rgb(245,245,245)] hover:opacity-70 text-sm transition-opacity">
              Voltar à loja
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  // Get current images based on selected color
  const getCurrentImages = () => {
    if (product.colorVariants && selectedColor && product.colorVariants[selectedColor]) {
      return product.colorVariants[selectedColor]
    }
    return product.images || [product.image]
  }

  const currentImages = getCurrentImages()

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[rgb(18,18,18)] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-[rgb(18,18,18)] rounded-lg overflow-hidden">
                <Image
                  src={currentImages[currentImageIndex] || product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnails */}
              {currentImages.length > 1 && (
                <div className="flex gap-3">
                  {currentImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-[rgb(245,245,245)]'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Product Name - 40px */}
              <h1
                className="font-medium text-[rgb(245,245,245)] mb-3"
                style={{ fontSize: '40px', lineHeight: '1.1' }}
              >
                {product.name}
              </h1>

              {/* Price - 18px */}
              <p
                className="text-[rgb(245,245,245)] mb-6"
                style={{ fontSize: '18px' }}
              >
                €{product.price.toFixed(2).replace('.', ',')} EUR
              </p>

              {/* Size Dropdown */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4 relative">
                  <button
                    onClick={() => {
                      setSizeDropdownOpen(!sizeDropdownOpen)
                      setColorDropdownOpen(false)
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[rgb(18,18,18)] border border-[rgba(245,245,245,0.2)] text-[rgb(245,245,245)] text-sm"
                  >
                    <span>{product.sizeType || 'Tamanho'}: {selectedSize || 'Selecionar'}</span>
                    <ChevronDown size={16} className={`transition-transform ${sizeDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {sizeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-[rgb(18,18,18)] border border-[rgba(245,245,245,0.2)] border-t-0 z-10">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSize(size)
                            setSizeDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-[rgba(245,245,245,0.1)] transition-colors ${
                            selectedSize === size ? 'bg-[rgba(245,245,245,0.1)] text-[rgb(245,245,245)]' : 'text-[rgba(245,245,245,0.7)]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Color Dropdown */}
              {product.colors && product.colors.length > 1 && (
                <div className="mb-4 relative">
                  <button
                    onClick={() => {
                      setColorDropdownOpen(!colorDropdownOpen)
                      setSizeDropdownOpen(false)
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[rgb(18,18,18)] border border-[rgba(245,245,245,0.2)] text-[rgb(245,245,245)] text-sm"
                  >
                    <span>Cor: {selectedColor || 'Selecionar'}</span>
                    <ChevronDown size={16} className={`transition-transform ${colorDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {colorDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-[rgb(18,18,18)] border border-[rgba(245,245,245,0.2)] border-t-0 z-10">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => {
                            setSelectedColor(color)
                            setColorDropdownOpen(false)
                            setCurrentImageIndex(0)
                          }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-[rgba(245,245,245,0.1)] transition-colors ${
                            selectedColor === color ? 'bg-[rgba(245,245,245,0.1)] text-[rgb(245,245,245)]' : 'text-[rgba(245,245,245,0.7)]'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <div className="flex items-center border border-[rgba(245,245,245,0.2)]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-[rgb(245,245,245)] hover:bg-[rgba(245,245,245,0.05)] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center text-[rgb(245,245,245)] text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-[rgb(245,245,245)] hover:bg-[rgba(245,245,245,0.05)] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[rgb(245,245,245)] text-[rgb(18,18,18)] font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
              >
                Adicionar ao carrinho
              </button>

              {/* Description */}
              <p className="mt-6 text-[rgba(245,245,245,0.6)] text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-[rgba(245,245,245,0.1)] text-xs text-[rgba(245,245,245,0.5)] space-y-2">
                <p>• Envio em 24-48h para Portugal</p>
                <p>• Pagamento seguro</p>
                <p>• Trocas e devoluções grátis</p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-lg font-medium text-[rgb(245,245,245)] mb-6">
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
