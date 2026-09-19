'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
}

export function CategoryChips({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('categoria')

  // Helper to keep other params
  const getHref = (categoryId?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId) {
      params.set('categoria', categoryId)
    } else {
      params.delete('categoria')
    }
    params.delete('page') // Reset page on filter change
    return `/?${params.toString()}`
  }

  return (
    <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
      <Link
        href={getHref()}
        scroll={false}
        className={cn(
          "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border",
          !activeCategory
            ? "bg-primary text-primary-foreground border-primary"
            : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
        )}
      >
        Todas las Categorías
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={getHref(category.id)}
          scroll={false}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border",
            activeCategory === category.id
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
