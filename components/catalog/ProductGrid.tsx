import { ProductCard } from './ProductCard'
import { getProducts } from '@/lib/data/products'
import { CatalogPagination } from './CatalogPagination'

interface ProductGridProps {
  search?: string
  categoryId?: string
  brandId?: string
  size?: string
  gender?: string
  sort?: string
  page?: number
}

export async function ProductGrid({ search, categoryId, brandId, size, gender, sort, page = 1 }: ProductGridProps) {
  const allProducts = await getProducts(search, categoryId, brandId, size, gender, sort)

  if (allProducts.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 rounded-xl border-2 border-dashed bg-secondary/20">
        <h3 className="text-xl font-bold text-muted-foreground">No encontramos productos</h3>
        <p className="text-muted-foreground/80">Intenta cambiar los filtros o buscar otra cosa.</p>
      </div>
    )
  }

  const itemsPerPage = 12
  const totalPages = Math.ceil(allProducts.length / itemsPerPage)
  const safePage = Math.max(1, Math.min(page, totalPages))
  const startIndex = (safePage - 1) * itemsPerPage
  const paginatedProducts = allProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {paginatedProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      <CatalogPagination currentPage={safePage} totalPages={totalPages} />
    </div>
  )
}
