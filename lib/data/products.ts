import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'

export type ProductWithRelations = Database['public']['Tables']['products']['Row'] & {
  brand: Database['public']['Tables']['brands']['Row'] | null
  category: Database['public']['Tables']['categories']['Row'] | null
}

export async function getProducts(search?: string, categoryId?: string, brandId?: string, size?: string, gender?: string, sort?: string) {
  const supabase = await createClient()
  let query = supabase.from('products').select('*')

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
  }
  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }
  if (brandId) {
    query = query.eq('brand_id', brandId)
  }

  if (sort === 'price_asc') {
    query = query.order('price', { ascending: true })
  } else if (sort === 'price_desc') {
    query = query.order('price', { ascending: false })
  } else {
    // defaults to newest first if the column exists, else order by id
    query = query.order('created_at', { ascending: false })
  }

  const { data: productsData, error: productsError } = await query
  if (productsError) {
    console.error('Error fetching products:', productsError)
    console.error('Error details:', productsError.message, productsError.details, productsError.hint, productsError.code)
    return []
  }

  // Fetch relations manually to bypass missing foreign key constraints in DB
  const { data: brandsData } = await supabase.from('brands').select('*')
  const { data: categoriesData } = await supabase.from('categories').select('*')

  let products = productsData.map(product => ({
    ...product,
    brand: brandsData?.find(b => b.id === product.brand_id) || null,
    category: categoriesData?.find(c => c.id === product.category_id) || null
  }))

  // JS-side filtering for complex JSON/array fields
  if (size) {
    products = products.filter(p => p.sizes?.some(s => s.endsWith(`-${size}`)))
  }

  if (gender) {
    let prefix = ''
    if (gender === 'Caballero') prefix = 'C-'
    else if (gender === 'Dama') prefix = 'D-'
    else if (gender === 'Ropa (Unisex)') prefix = 'R-'
    
    if (prefix) {
      products = products.filter(p => p.sizes?.some(s => s.startsWith(prefix)))
    }
  }

  return products as ProductWithRelations[]
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  const { data: productData, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (productError) {
    console.error('Error fetching product by slug:', productError)
    console.error('Error details:', productError.message, productError.details, productError.hint, productError.code)
    return null
  }

  const { data: brandsData } = await supabase.from('brands').select('*')
  const { data: categoriesData } = await supabase.from('categories').select('*')

  return {
    ...productData,
    brand: brandsData?.find(b => b.id === productData.brand_id) || null,
    category: categoriesData?.find(c => c.id === productData.category_id) || null
  } as ProductWithRelations
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
