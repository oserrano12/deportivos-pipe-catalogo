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

  return (
    <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
      <Link
        href="/"
        className={cn(
          "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors",
          !activeCategory
            ? "bg-foreground text-background"
            : "bg-secondary text-foreground hover:bg-secondary/80"
        )}
      >
        Todos
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/?categoria=${category.id}`}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors",
            activeCategory === category.id
              ? "bg-foreground text-background"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
