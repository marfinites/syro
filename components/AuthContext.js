'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('syro-user')
    const savedOrders = localStorage.getItem('syro-orders')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded && user) {
      localStorage.setItem('syro-user', JSON.stringify(user))
    }
  }, [user, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('syro-orders', JSON.stringify(orders))
    }
  }, [orders, isLoaded])

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      newsletter: userData.newsletter || false,
      createdAt: new Date().toISOString()
    }
    setUser(newUser)
    localStorage.setItem('syro-user', JSON.stringify(newUser))
    return newUser
  }

  const login = (email, password) => {
    // Simple login - in real app would validate against backend
    const savedUser = localStorage.getItem('syro-user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      if (userData.email === email) {
        setUser(userData)
        return userData
      }
    }
    return null
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('syro-user')
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('syro-user', JSON.stringify(updatedUser))
    return updatedUser
  }

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    const updatedOrders = [newOrder, ...orders]
    setOrders(updatedOrders)
    localStorage.setItem('syro-orders', JSON.stringify(updatedOrders))
    return newOrder
  }

  const toggleNewsletter = () => {
    if (user) {
      const updatedUser = { ...user, newsletter: !user.newsletter }
      setUser(updatedUser)
      localStorage.setItem('syro-user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      orders,
      isLoaded,
      register,
      login,
      logout,
      updateUser,
      addOrder,
      toggleNewsletter
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
