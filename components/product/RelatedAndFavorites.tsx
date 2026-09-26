'use client'

import { useFavorites } from '@/components/context/FavoritesContext'
import { ProductCard } from '@/components/catalog/ProductCard'
import { ProductWithRelations } from '@/lib/data/products'
import { useMemo, useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel"
import AutoScroll from "embla-carousel-auto-scroll"
import { useRef } from "react"

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
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([])
  const [api, setApi] = useState<CarouselApi>()
  
  const plugin = useRef(
    AutoScroll({ speed: 1.5, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  useEffect(() => {
    if (!api) return

    const restartAutoScroll = () => {
      const autoScroll = api.plugins().autoScroll
      if (!autoScroll) return
      
      // Clear any existing timeouts to prevent multiple timers
      if ((window as any).autoScrollTimeout) {
        clearTimeout((window as any).autoScrollTimeout)
      }
      
      (window as any).autoScrollTimeout = setTimeout(() => {
        if (!autoScroll.isPlaying()) {
          autoScroll.play()
        }
      }, 3000)
    }

    api.on('pointerUp', restartAutoScroll)

    return () => {
      api.off('pointerUp', restartAutoScroll)
      if ((window as any).autoScrollTimeout) {
        clearTimeout((window as any).autoScrollTimeout)
      }
    }
  }, [api])

  useEffect(() => {
    // Leer historial (excluyendo el actual)
    const stored = localStorage.getItem('recentlyViewed')
    let items: string[] = []
    if (stored) {
      try {
        const parsed = JSON.parse(stored); if (Array.isArray(parsed)) { items = parsed.map((item) => typeof item === 'string' ? item : item?.id).filter(Boolean); }
        setRecentlyViewedIds(items.filter((id: string) => id !== currentProductId))
      } catch (e) {}
    }
    
    // Guardar el actual al principio
    items = items.filter((id: string) => id !== currentProductId)
    items.unshift(currentProductId)
    items = items.slice(0, 10) // Guardar solo los últimos 10
    
    localStorage.setItem('recentlyViewed', JSON.stringify(items))
  }, [currentProductId])

  const { relatedProducts, favoriteProducts, recentProducts } = useMemo(() => {
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

    // 3. Vistos recientemente
    const recent = recentlyViewedIds
      .map(id => allProducts.find(p => p.id === id))
      .filter((p): p is ProductWithRelations => p !== undefined && p.is_available)

    return {
      relatedProducts: related.slice(0, 8),
      favoriteProducts: favorites.slice(0, 8),
      recentProducts: recent.slice(0, 8)
    }
  }, [allProducts, currentProductId, categoryId, favoriteIds, recentlyViewedIds])

  if (relatedProducts.length === 0 && favoriteProducts.length === 0 && recentProducts.length === 0) return null

  return (
    <div className="pb-32 space-y-20 overflow-hidden">
      
      {/* Sección 1: Recomendados / Similares */}
      {relatedProducts.length > 0 && (
        <div className="container max-w-7xl mx-auto px-4">
          <div className="border-t-2 border-border pt-12 space-y-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
                TAMBIÉN TE PODRÍA INTERESAR
              </h2>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Productos similares recomendados
              </p>
            </div>
            
            <div className="w-full">
              <Carousel 
                setApi={setApi}
                plugins={[plugin.current]} 
                className="w-full"
                opts={{ align: "start", loop: true, dragFree: true }}
              >
                <CarouselContent className="-ml-4 md:-ml-8">
                  {relatedProducts.map((product, index) => (
                     <CarouselItem key={`${product.id}-${index}`} className="pl-4 md:pl-8 basis-[75%] sm:basis-[50%] md:basis-[33.33%] lg:basis-[25%]">
                       <ProductCard product={product} index={index} />
                     </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      )}

      {/* Sección 2: Tus Favoritos */}
      {favoriteProducts.length > 0 && (
        <div className="container max-w-7xl mx-auto px-4">
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
        </div>
      )}

      {/* Sección 3: Vistos Recientemente */}
      {recentProducts.length > 0 && (
        <div className="container max-w-7xl mx-auto px-4">
          <div className="border-t-2 border-border pt-12 space-y-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-muted-foreground">
                VISTOS RECIENTEMENTE
              </h2>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Para que no les pierdas la pista
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {recentProducts.map((product, index) => (
                <ProductCard key={`recent-${product.id}`} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
