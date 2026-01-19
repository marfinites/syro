import './globals.css'
import { CartProvider } from '@/components/CartContext'
import { AuthProvider } from '@/components/AuthContext'

export const metadata = {
  title: 'SYRO - Official Merchandise',
  description: 'Merch Oficial SYRO. T-shirts exclusivas, pins e acessórios.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
