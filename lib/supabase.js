// TODO: Supabase temporarily disabled - using mock client
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock supabase client for build
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: async () => ({ data: { user: null }, error: { message: 'Auth temporarily disabled' } }),
    signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Auth temporarily disabled' } }),
    signOut: async () => {},
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: () => ({ data: [], error: null }),
      }),
      order: () => ({ data: [], error: null }),
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null }),
      }),
    }),
  }),
}
