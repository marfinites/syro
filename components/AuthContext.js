'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id)
        fetchOrders(session.user.id)
      }
      setIsLoaded(true)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
        await fetchOrders(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        setOrders([])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data && !error) {
      setProfile(data)
    }
  }

  const fetchOrders = async (userId) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (data && !error) {
      setOrders(data)
    }
  }

  const register = async (email, password, userData) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // Update profile with additional data
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            name: userData.name,
            phone: userData.phone || null,
            newsletter: userData.newsletter || false,
          })
          .eq('id', data.user.id)

        if (profileError) console.error('Profile update error:', profileError)
      }

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setOrders([])
  }

  const updateProfile = async (updates) => {
    if (!user) return { error: 'Not logged in' }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      setProfile(data)
      return { profile: data, error: null }
    } catch (error) {
      return { profile: null, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const toggleNewsletter = async () => {
    if (!user || !profile) return

    await updateProfile({ newsletter: !profile.newsletter })
  }

  // Combined user data for easy access
  const userData = user ? {
    id: user.id,
    email: user.email,
    name: profile?.name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    postalCode: profile?.postal_code || '',
    newsletter: profile?.newsletter || false,
  } : null

  return (
    <AuthContext.Provider value={{
      user: userData,
      orders,
      isLoaded,
      loading,
      register,
      login,
      logout,
      updateProfile,
      toggleNewsletter,
      refreshOrders: () => user && fetchOrders(user.id),
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
