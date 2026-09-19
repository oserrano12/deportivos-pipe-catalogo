'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface FilterItem {
  id: string
  name: string
}

interface AdminFiltersProps {
  categories: FilterItem[]
  brands: FilterItem[]
}

export function AdminFilters({ categories, brands }: AdminFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentCategory = searchParams.get('categoria') || ''
  const currentBrand = searchParams.get('marca') || ''

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/admin?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex gap-2">
      <select 
        className="h-10 px-3 rounded-md border bg-background text-sm font-medium"
        value={currentCategory}
        onChange={(e) => handleFilter('categoria', e.target.value)}
      >
        <option value="">Todas las Categorías</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select 
        className="h-10 px-3 rounded-md border bg-background text-sm font-medium"
        value={currentBrand}
        onChange={(e) => handleFilter('marca', e.target.value)}
      >
        <option value="">Todas las Marcas</option>
        {brands.map(b => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>
    </div>
  )
}
