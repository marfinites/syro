'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useCart } from './CartContext'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only hide/show on mobile (less than 768px)
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHidden(true)
        } else {
          setHidden(false)
        }
      } else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`sticky top-0 z-50 bg-[rgb(18,18,18)] transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="px-4 md:px-10">
        <div className="flex items-center justify-between h-24 md:h-32">
          {/* Logo - Left */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/syrologo.avif"
                alt="Syro Merchandise"
                width={300}
                height={154}
                className="w-auto h-[80px] md:h-[120px]"
                priority
              />
            </Link>
            {/* Navigation - Desktop only */}
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
          <div className="flex flex-col items-end gap-2">
            {/* Icons Row */}
            <div className="flex items-center gap-3">
              {/* Search */}
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-[rgb(245,245,245)] text-sm px-2 py-1 w-32 md:w-40 focus:outline-none border-b border-[rgba(245,245,245,0.2)]"
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
                  <svg fill="none" className="w-5 h-5" viewBox="0 0 18 19">
                    <path fill="currentColor" fillRule="evenodd" d="M11.03 11.68A5.784 5.784 0 1 1 2.85 3.5a5.784 5.784 0 0 1 8.18 8.18m.26 1.12a6.78 6.78 0 1 1 .72-.7l5.4 5.4a.5.5 0 1 1-.71.7z" clipRule="evenodd"></path>
                  </svg>
                </button>
              )}

              {/* Account */}
              <Link
                href="/profile"
                className="p-2 text-[rgb(245,245,245)] hover:opacity-70 transition-opacity"
                aria-label="Conta"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-5 h-5" viewBox="0 0 18 19">
                  <path fill="currentColor" fillRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35" clipRule="evenodd"></path>
                </svg>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 text-[rgb(245,245,245)] hover:opacity-70 transition-opacity relative"
                aria-label="Carrinho"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" fillRule="evenodd" d="M7.5 6h-2l-.5 8a3.5 3.5 0 0 0 3.5 3.75h7A3.5 3.5 0 0 0 19 14l-.5-8h-2v.5a4.5 4.5 0 1 1-9 0V6zm1 0v.5a3.5 3.5 0 1 0 7 0V6h-7z"></path>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[rgb(245,245,245)] text-[rgb(18,18,18)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Biography Link - Mobile only */}
            <Link
              href="/biography"
              className="md:hidden text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)] text-xs transition-colors"
            >
              Biografia
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
