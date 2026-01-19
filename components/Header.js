'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'
import { useCart } from './CartContext'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-[rgb(18,18,18)]">
      <div className="px-6 md:px-10">
        <div className="flex items-center justify-between h-32">
          {/* Logo - Left */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/syrologo.avif"
                alt="Syro Merchandise"
                width={300}
                height={154}
                className="w-auto h-[120px]"
                priority
              />
            </Link>
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/biography"
                className="text-[rgba(245,245,245,0.7)] hover:text-[rgb(245,245,245)] text-sm transition-colors"
              >
                Biografia
              </Link>
            </nav>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2 mr-2">
                <input
                  type="text"
                  placeholder="Pesquisar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[rgb(245,245,245)] text-sm px-2 py-1 w-40 focus:outline-none border-b border-[rgba(245,245,245,0.2)]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="p-1 text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)]"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[rgb(245,245,245)] hover:opacity-70 transition-opacity"
                aria-label="Pesquisar"
              >
                <svg fill="none" className="w-[18px] h-[18px]" viewBox="0 0 18 19">
                  <path fill="currentColor" fillRule="evenodd" d="M11.03 11.68A5.784 5.784 0 1 1 2.85 3.5a5.784 5.784 0 0 1 8.18 8.18m.26 1.12a6.78 6.78 0 1 1 .72-.7l5.4 5.4a.5.5 0 1 1-.71.7z" clipRule="evenodd"></path>
                </svg>
              </button>
            )}

            {/* Account */}
            <Link
              href="/admin"
              className="p-2 text-[rgb(245,245,245)] hover:opacity-70 transition-opacity"
              aria-label="Conta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-[18px] h-[18px]" viewBox="0 0 18 19">
                <path fill="currentColor" fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd"></path>
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-[rgb(245,245,245)] hover:opacity-70 transition-opacity relative"
              aria-label="Carrinho"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-[18px] h-[18px]" viewBox="0 0 40 40">
                <path fill="currentColor" fillRule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[rgb(245,245,245)] text-[rgb(18,18,18)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
