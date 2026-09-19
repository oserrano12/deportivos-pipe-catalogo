import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

// This client does not read cookies, allowing Next.js to statically cache public pages (ISR).
export const supabasePublic = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
