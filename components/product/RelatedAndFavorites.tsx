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
  const { favoriteIds } = useFavorites()

  const { relatedProducts, favoriteProducts } = useMemo(() => {
    // 1. Favoritos relacionados (excluyendo el actual)
    const favorites = allProducts.filter(p => 
      favoriteIds.includes(p.id) && p.id !== currentProductId && p.is_available
    )

    // 2. Recomendados / Similares (misma categoría, excluyendo actual y favoritos para no repetir)
    let related = allProducts.filter(p => 
      p.category_id === categoryId && 
      p.id !== currentProductId && 
      p.is_available && 
      !favoriteIds.includes(p.id)
    )

    // Si no hay suficientes relacionados, rellenar con otros disponibles
    if (related.length < 4) {
      const fallbacks = allProducts.filter(p => 
        p.id !== currentProductId && 
        p.is_available && 
        !favoriteIds.includes(p.id) && 
        p.category_id !== categoryId
      )
      related = [...related, ...fallbacks]
    }

    return {
      relatedProducts: related.slice(0, 4),
      favoriteProducts: favorites.slice(0, 4)
    }
  }, [allProducts, currentProductId, categoryId, favoriteIds])

  if (relatedProducts.length === 0 && favoriteProducts.length === 0) return null

  return (
    <div className="container max-w-7xl mx-auto px-4 pb-32 space-y-20">
      
      {/* Sección 1: Recomendados / Similares */}
      {relatedProducts.length > 0 && (
        <div className="border-t-2 border-border pt-12 space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
              TAMBIÉN TE PODRÍA INTERESAR
            </h2>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Productos similares recomendados
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Sección 2: Tus Favoritos */}
      {favoriteProducts.length > 0 && (
        <div className="border-t-2 border-border pt-12 space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-primary">
              TUS FAVORITOS
            </h2>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Zapatillas que te han gustado
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {favoriteProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
