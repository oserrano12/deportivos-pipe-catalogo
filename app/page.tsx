import { Suspense } from 'react'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { BrandChips } from '@/components/catalog/BrandChips'
import { FilterDrawer } from '@/components/catalog/FilterDrawer'
import { HeroCarousel } from '@/components/catalog/HeroCarousel'
import { Skeleton } from '@/components/ui/skeleton'
import { getBrands, getProducts } from '@/lib/data/products'

export const revalidate = 0 // For now, dynamic fetching

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const categoryId = typeof resolvedParams.categoria === 'string' ? resolvedParams.categoria : undefined
  const brandId = typeof resolvedParams.marca === 'string' ? resolvedParams.marca : undefined
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined

  const [brands, allProducts] = await Promise.all([
    getBrands(),
    getProducts()
  ])

  // Get featured products for the Hero, or fallback to the latest 5 if none are featured
  let featuredProducts = allProducts.filter(p => p.is_featured && p.is_available)
  if (featuredProducts.length === 0) {
    featuredProducts = allProducts.filter(p => p.is_available).slice(0, 5)
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroCarousel featuredProducts={featuredProducts} />

      {/* Catalog Section */}
      <div id="catalogo" className="container px-4 py-12 md:py-16 space-y-6 mx-auto scroll-mt-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Catálogo</h1>
            <p className="text-muted-foreground font-medium">Explora nuestra colección completa</p>
          </div>
          <FilterDrawer />
        </div>

        <div className="space-y-4">
          <BrandChips brands={brands} />
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid search={search} categoryId={categoryId} brandId={brandId} />
        </Suspense>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
