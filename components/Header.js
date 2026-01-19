'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from './CartContext'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cartCount } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-wider">
              <span className="text-gold">SYRO</span>
              <span className="text-white ml-1 text-sm font-normal">MERCH</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm text-gray-300 hover:text-gold transition-colors">
              INÍCIO
            </Link>
            <Link href="/#products" className="text-sm text-gray-300 hover:text-gold transition-colors">
              PRODUTOS
            </Link>
            <Link href="/about" className="text-sm text-gray-300 hover:text-gold transition-colors">
              SOBRE
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-dark w-48 text-sm py-2"
                    autoFocus
                    onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-300 hover:text-gold transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* User */}
            <Link href="/admin" className="p-2 text-gray-300 hover:text-gold transition-colors">
              <User size={20} />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-300 hover:text-gold transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="lg:hidden py-4 border-t border-dark-700">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm text-gray-300 hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                INÍCIO
              </Link>
              <Link
                href="/#products"
                className="text-sm text-gray-300 hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                PRODUTOS
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-300 hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                SOBRE
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
