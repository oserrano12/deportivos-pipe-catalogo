import { ProductForm } from '@/components/admin/ProductForm'
import { getBrands, getCategories } from '@/lib/data/products'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [brands, categories] = await Promise.all([
    getBrands(),
    getCategories()
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Crear Nuevo Producto</h1>
      <ProductForm brands={brands} categories={categories} />
    </div>
  )
}
