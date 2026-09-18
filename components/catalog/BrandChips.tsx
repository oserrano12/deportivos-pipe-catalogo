'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Brand {
  id: string
  name: string
  slug: string
}

export function BrandChips({ brands }: { brands: Brand[] }) {
  const searchParams = useSearchParams()
  const activeBrand = searchParams.get('marca')
  const currentCategory = searchParams.get('categoria')

  // Helper to keep other params
  const getHref = (brandId?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (brandId) {
      params.set('marca', brandId)
    } else {
      params.delete('marca')
    }
    return `/?${params.toString()}`
  }

  return (
    <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
      <Link
        href={getHref()}
        className={cn(
          "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border",
          !activeBrand
            ? "border-primary text-primary"
            : "border-border text-muted-foreground hover:text-foreground"
        )}
      >
        Todas las Marcas
      </Link>
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={getHref(brand.id)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border",
            activeBrand === brand.id
              ? "border-primary text-primary bg-primary/5"
              : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          {brand.name}
        </Link>
      ))}
    </div>
  )
}
