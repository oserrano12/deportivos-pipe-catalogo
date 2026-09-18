import { ProductForm } from '@/components/admin/ProductForm'
import { getBrands, getCategories } from '@/lib/data/products'
import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'

export const revalidate = 0

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const resolvedParams = await params
  
  const { data: product } = await supabase.from('products').select('*').eq('id', resolvedParams.id).single()
  
  if (!product) {
    notFound()
  }

  const [brands, categories] = await Promise.all([
    getBrands(),
    getCategories()
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editar Producto</h1>
      <ProductForm product={product} brands={brands} categories={categories} />
    </div>
  )
}
