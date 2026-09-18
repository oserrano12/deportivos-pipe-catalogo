import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'

export type ProductWithRelations = Database['public']['Tables']['products']['Row'] & {
  brand: Database['public']['Tables']['brands']['Row'] | null
  category: Database['public']['Tables']['categories']['Row'] | null
}

export async function getProducts(search?: string, categoryId?: string, brandId?: string) {
  const supabase = await createClient()
  let query = supabase.from('products').select(`*, brand:brands(*), category:categories(*)`)

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }
  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }
  if (brandId) {
    query = query.eq('brand_id', brandId)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data as ProductWithRelations[]
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, brand:brands(*), category:categories(*)`)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
  return data as ProductWithRelations
}

export async function getCategories() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  return data || []
}

export async function getBrands() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('brands').select('*').order('name')
  return data || []
}
