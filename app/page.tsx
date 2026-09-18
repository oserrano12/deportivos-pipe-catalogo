import { Suspense } from 'react'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { CategoryChips } from '@/components/catalog/CategoryChips'
import { BrandChips } from '@/components/catalog/BrandChips'
import { FilterDrawer } from '@/components/catalog/FilterDrawer'
import { Skeleton } from '@/components/ui/skeleton'
import { getCategories, getBrands } from '@/lib/data/products'

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

  const [categories, brands] = await Promise.all([
    getCategories(),
    getBrands()
  ])

  return (
    <div className="container px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Catálogo</h1>
        <FilterDrawer />
      </div>

      <div className="space-y-3">
        <CategoryChips categories={categories} />
        <BrandChips brands={brands} />
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid search={search} categoryId={categoryId} brandId={brandId} />
      </Suspense>
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
