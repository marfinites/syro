'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#333] p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300 text-center sm:text-left">
          <p>
            Este site utiliza cookies para melhorar a sua experiência de navegação.{' '}
            <Link href="/privacy" className="text-[#C9A962] hover:underline">
              Saber mais
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-[#C9A962] text-black font-medium rounded hover:bg-[#d4b56a] transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
