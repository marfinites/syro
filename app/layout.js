import './globals.css'
import { CartProvider } from '@/components/CartContext'
import { AuthProvider } from '@/components/AuthContext'
import BackToTop from '@/components/BackToTop'
import localFont from 'next/font/local'

const customFont = localFont({
  src: '../font/P-Regular.ttf',
  display: 'swap',
  variable: '--font-custom',
})

export const metadata = {
  title: 'SYRO - Official Merchandise',
  description: 'Merch Oficial SYRO. T-shirts exclusivas, pins e acessórios.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={customFont.variable}>
      <body className={customFont.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <BackToTop />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
