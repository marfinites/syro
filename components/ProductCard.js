'use client'
import Image from 'next/image'
import Link from 'next/link'
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
        <div className="product-card group">
          {/* Image */}
          <div className="relative aspect-square bg-[#2a2a2a] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          {/* Info */}
          <div className="p-3 bg-[#121212]">
            <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">
              {product.name}
            </p>
            <p className="text-[#C9A962] text-sm font-medium">
              €{product.price.toFixed(2).replace('.', ',')} EUR
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
