'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartContext'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  // Segunda imagem para hover (usa a mesma com filtro diferente se não houver)
  const hoverImage = product.hoverImage || product.image

  return (
    <>
      <Link href={`/product/${product.slug}`}>
        <div
          className="product-card group rounded-lg overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container with neon effect */}
          <div className="relative aspect-square bg-[#1a1a1a] overflow-hidden rounded-lg transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(201,169,98,0.4)]">
            {/* Main Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 ${
                isHovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Hover Image */}
            <Image
              src={hoverImage}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 ${
                isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'none' }}
            />

            {/* Neon glow effect on hover */}
            <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} style={{
              boxShadow: 'inset 0 -40px 60px -20px rgba(201,169,98,0.3)'
            }} />
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
