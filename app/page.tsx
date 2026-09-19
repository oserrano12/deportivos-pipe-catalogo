import { Suspense } from 'react'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { BrandChips } from '@/components/catalog/BrandChips'
import { CategoryChips } from '@/components/catalog/CategoryChips'
import { FilterDrawer } from '@/components/catalog/FilterDrawer'
import { HeroCarousel } from '@/components/catalog/HeroCarousel'
import { SearchBar } from '@/components/catalog/SearchBar'
import { Skeleton } from '@/components/ui/skeleton'
import { getBrands, getProducts, getCategories } from '@/lib/data/products'

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
  const size = typeof resolvedParams.talla === 'string' ? resolvedParams.talla : undefined
  const gender = typeof resolvedParams.genero === 'string' ? resolvedParams.genero : undefined

  const [brands, categories, allProducts] = await Promise.all([
    getBrands(),
    getCategories(),
    getProducts()
  ])

  // Calculate used brands
  const usedBrandIds = new Set(allProducts.map(p => p.brand?.id).filter(Boolean))
  const availableBrands = brands.filter(b => usedBrandIds.has(b.id))

  // Calculate used categories
  const usedCategoryIds = new Set(allProducts.map(p => p.category?.id).filter(Boolean))
  const availableCategories = categories.filter(c => usedCategoryIds.has(c.id))

  // Calculate used sizes and genders
  const allSizes = new Set<string>()
  const availableGenders = new Set<string>()
  allProducts.forEach(p => {
    if (p.sizes && p.sizes.length > 0) {
      p.sizes.forEach(s => {
        if (s.startsWith('C-')) {
          availableGenders.add('Caballero')
          allSizes.add(s.replace('C-', ''))
        } else if (s.startsWith('D-')) {
          availableGenders.add('Dama')
          allSizes.add(s.replace('D-', ''))
        }
      })
    }
  })
  
  const availableSizesList = Array.from(allSizes).sort((a, b) => Number(a) - Number(b))
  const availableGendersList = Array.from(availableGenders).sort()

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
          <div className="flex items-center gap-3 w-full md:w-auto">
            <SearchBar />
            <FilterDrawer availableSizes={availableSizesList} availableGenders={availableGendersList} />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {availableCategories.length > 0 && (
            <CategoryChips categories={availableCategories} />
          )}
          {availableBrands.length > 0 && (
            <BrandChips brands={availableBrands} />
          )}
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid search={search} categoryId={categoryId} brandId={brandId} size={size} gender={gender} />
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
