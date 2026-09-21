'use client'

import { useFavorites } from '@/components/context/FavoritesContext'
import { ProductCard } from './ProductCard'
import { ProductWithRelations } from '@/lib/data/products'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function FavoritesGrid({ allProducts }: { allProducts: ProductWithRelations[] }) {
  const { favoriteIds } = useFavorites()
  const [liveProducts, setLiveProducts] = useState<ProductWithRelations[]>(allProducts)

  // Fetch the latest stock data for favorites on mount
  useEffect(() => {
    if (favoriteIds.length === 0) return;
    
    const fetchLatest = async () => {
      try {
        const { supabasePublic } = await import('@/lib/supabase/public');
        const { data } = await supabasePublic.from('products').select('*').in('id', favoriteIds);
        
        if (data && data.length > 0) {
          setLiveProducts(current => current.map(product => {
            const latest = data.find(p => p.id === product.id);
            if (latest) {
              return { ...product, ...latest };
            }
            return product;
          }));
        }
      } catch (err) {
        console.error('Failed to refresh favorites stock', err);
      }
    };
    
    fetchLatest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favoriteProducts = liveProducts.filter(p => favoriteIds.includes(p.id))

  if (favoriteProducts.length === 0) {
    return (
      <div className="py-20 text-center space-y-6 rounded-xl border-2 border-dashed bg-secondary/20 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm">
          <span className="text-3xl grayscale opacity-50">🤍</span>
        </div>
        <div className="space-y-2 max-w-sm mx-auto">
          <h2 className="text-xl font-bold text-foreground">Aún no tienes favoritos</h2>
          <p className="text-muted-foreground">Explora el catálogo y toca el corazón en los productos que más te gusten para guardarlos aquí.</p>
        </div>
        <Link href="/#catalogo" className={buttonVariants({ variant: 'default' })}>
          Ver Catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {favoriteProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
