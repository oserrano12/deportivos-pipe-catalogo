'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function SortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'newest'

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value === 'newest') {
      params.delete('sort')
    } else {
      params.set('sort', e.target.value)
    }
    params.delete('page') // Reset page on sort change
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  return (
    <select
      aria-label="Ordenar productos"
      value={currentSort}
      onChange={handleSortChange}
      className="h-10 px-3 rounded-xl border-2 border-border/50 bg-secondary/30 text-sm font-semibold hover:border-border transition-colors outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_8px_center] bg-no-repeat"
    >
      <option value="newest">Más Recientes</option>
      <option value="price_asc">Precio: Menor a Mayor</option>
      <option value="price_desc">Precio: Mayor a Menor</option>
    </select>
  )
}
