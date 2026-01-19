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

  const hoverImage = product.hoverImage || product.image

  return (
    <>
      <Link href={`/product/${product.slug}`}>
        <div
          className="product-card group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container - border radius 1.6rem, no border on hover */}
          <div
            className="relative aspect-square bg-[rgb(18,18,18)] overflow-hidden"
            style={{ borderRadius: '1.6rem' }}
          >
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
          </div>

          {/* Info */}
          <div className="pt-3 bg-[rgb(18,18,18)]">
            {/* Product name - 13px, underline on hover */}
            <p
              className="uppercase tracking-wide mb-1 text-[rgba(245,245,245,0.75)] group-hover:underline"
              style={{ fontSize: '13px' }}
            >
              {product.name}
            </p>
            {/* Price - 24px, white */}
            <p
              className="text-[rgb(245,245,245)] font-medium"
              style={{ fontSize: '24px' }}
            >
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
