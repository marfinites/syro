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
    <header className="sticky top-0 z-50 bg-[#121212] border-b border-[#222]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/syrologo.avif"
              alt="SYRO"
              width={80}
              height={32}
              className="h-8 w-auto"
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
                  className="bg-[#222] text-white text-sm px-3 py-1.5 rounded w-40 focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="p-1.5 text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
            )}

            {/* User */}
            <Link href="/admin" className="p-2 text-gray-400 hover:text-white transition-colors">
              <User size={20} />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <ShoppingBag size={20} />
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
