'use client'

import { useFavorites } from '@/components/context/FavoritesContext'
import { ProductCard } from '@/components/catalog/ProductCard'
import { ProductWithRelations } from '@/lib/data/products'
import { useMemo } from 'react'

export function RelatedAndFavorites({ 
  currentProductId, 
  categoryId, 
  allProducts 
}: { 
  currentProductId: string
  categoryId: string | null
  allProducts: ProductWithRelations[] 
}) {
  const { favoriteIds: favorites } = useFavorites()

  const displayProducts = useMemo(() => {
    // Get favorite products that are NOT the current product
    const favoriteProducts = allProducts.filter(p => 
      favorites.includes(p.id) && p.id !== currentProductId && p.is_available
    )

    // Get related products (same category) that are NOT the current product and NOT already in favorites
    const relatedProducts = allProducts.filter(p => 
      p.category_id === categoryId && 
      p.id !== currentProductId && 
      p.is_available && 
      !favorites.includes(p.id)
    )

    // Get fallback products (any available) just in case we need more
    const fallbackProducts = allProducts.filter(p => 
      p.id !== currentProductId && 
      p.is_available && 
      !favorites.includes(p.id) && 
      p.category_id !== categoryId
    )

    // Combine them, prioritizing favorites, then related, then fallbacks
    // We want exactly 4 products if possible
    const combined = [...favoriteProducts, ...relatedProducts, ...fallbackProducts]
    return combined.slice(0, 4)
  }, [allProducts, currentProductId, categoryId, favorites])

  if (displayProducts.length === 0) return null

  return (
    <div className="container max-w-7xl mx-auto px-4 pb-32">
      <div className="border-t-2 border-border pt-12 space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
            PODRÍA INTERESARTE
          </h2>
          {favorites.length > 0 && (
            <p className="text-sm font-bold text-primary uppercase tracking-widest">
              Basado en tus favoritos y categoría
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
