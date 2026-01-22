// TODO: Supabase temporarily disabled - using mock client
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
// export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Mock supabase admin client for build
export const supabaseAdmin = {
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
      }),
      order: () => ({ data: [], error: null }),
    }),
    update: () => ({
      eq: () => ({ data: null, error: null }),
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null }),
      }),
    }),
    delete: () => ({
      eq: () => ({ data: null, error: null }),
    }),
  }),
}
