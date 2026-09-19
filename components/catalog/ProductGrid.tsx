import { getProducts } from '@/lib/data/products'
import { InfiniteScrollGrid } from './InfiniteScrollGrid'

interface ProductGridProps {
  search?: string
  categoryId?: string
  brandId?: string
  size?: string
  gender?: string
  sort?: string
}

export async function ProductGrid({ search, categoryId, brandId, size, gender, sort }: ProductGridProps) {
  const allProducts = await getProducts(search, categoryId, brandId, size, gender, sort)

  if (allProducts.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 rounded-xl border-2 border-dashed bg-secondary/20">
        <h3 className="text-xl font-bold text-muted-foreground">No encontramos productos</h3>
        <p className="text-muted-foreground/80">Intenta cambiar los filtros o buscar otra cosa.</p>
      </div>
    )
  }

  return <InfiniteScrollGrid products={allProducts} />
}
