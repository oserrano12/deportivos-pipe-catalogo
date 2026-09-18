import { ProductForm } from '@/components/admin/ProductForm'
import { getBrands, getCategories } from '@/lib/data/products'

export const revalidate = 0

export default async function NewProductPage() {
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
