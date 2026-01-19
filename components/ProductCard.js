'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from './CartContext'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  return (
    <>
      <Link href={`/product/${product.slug}`}>
        <div className="product-card bg-dark-800 rounded-lg overflow-hidden group">
          {/* Image */}
          <div className="relative aspect-square bg-dark-700 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Quick Add Button */}
            <button
              onClick={handleAddToCart}
              className="absolute bottom-4 right-4 p-3 bg-gold text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
            >
              <ShoppingBag size={18} />
            </button>

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-black text-xs font-semibold rounded">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="text-white font-medium mb-2 group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            <p className="text-gold font-semibold">
              €{product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>

      {/* Toast */}
      {showToast && (
        <div className="toast">
          Adicionado ao carrinho!
        </div>
      )}
    </>
  )
}
