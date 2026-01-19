'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, User, ShoppingBag, X } from 'lucide-react'
import { useCart } from './CartContext'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-[rgb(18,18,18)] border-b border-[rgba(245,245,245,0.1)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - 300x154 */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/syrologo.avif"
              alt="SYRO"
              width={300}
              height={154}
              className="w-auto h-[100px]"
              priority
            />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2 mr-2">
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[rgba(245,245,245,0.05)] text-[rgb(245,245,245)] text-sm px-3 py-1.5 rounded w-40 focus:outline-none focus:ring-1 focus:ring-[rgb(252,228,119)]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="p-1.5 text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)]"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)] transition-colors"
              >
                <Search size={18} />
              </button>
            )}

            {/* User */}
            <Link href="/admin" className="p-2 text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)] transition-colors">
              <User size={18} />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)] transition-colors relative">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
