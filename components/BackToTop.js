'use client'
import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-4 bottom-20 z-40 w-8 h-12 bg-[rgb(26,26,26)] border border-[rgba(245,245,245,0.2)] rounded-full flex items-center justify-center text-[rgb(245,245,245)] hover:bg-[rgb(36,36,36)] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Voltar ao topo"
    >
      <ChevronUp size={18} strokeWidth={1.5} />
    </button>
  )
}
