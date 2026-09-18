import { ProductCard } from './ProductCard'
import { getProducts } from '@/lib/data/products'

interface ProductGridProps {
  search?: string
  categoryId?: string
  brandId?: string
}

export async function ProductGrid({ search, categoryId, brandId }: ProductGridProps) {
  const products = await getProducts(search, categoryId, brandId)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">No hay resultados</h3>
        <p className="text-muted-foreground">No encontramos sneakers con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
