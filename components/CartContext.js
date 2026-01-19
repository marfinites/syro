'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('syro-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('syro-cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (product, quantity = 1, size = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.size === size
      )

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }

      return [...prev, { ...product, quantity, size }]
    })
  }

  const removeFromCart = (productId, size = null) => {
    setCart(prev => prev.filter(
      item => !(item.id === productId && item.size === size)
    ))
  }

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }

    setCart(prev => prev.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ))
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isLoaded
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
