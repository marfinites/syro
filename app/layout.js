import './globals.css'
import { CartProvider } from '@/components/CartContext'

export const metadata = {
  title: 'SYRO Merch - Official Merchandise',
  description: 'Official Syro merch featuring exclusive t-shirts, pins and accessories',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
