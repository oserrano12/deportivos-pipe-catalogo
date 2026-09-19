'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { useInView } from 'react-intersection-observer'
import type { ProductWithRelations } from '@/lib/data/products'

interface InfiniteScrollGridProps {
  products: ProductWithRelations[]
}

const ITEMS_PER_PAGE = 12

export function InfiniteScrollGrid({ products }: InfiniteScrollGridProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '400px', // Pre-load before actually hitting the very bottom
  })

  // Reset visible count when products change (e.g., filters applied)
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [products])

  useEffect(() => {
    if (inView && visibleCount < products.length) {
      // Small timeout to allow animation fluidity
      setTimeout(() => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
      }, 150)
    }
  }, [inView, visibleCount, products.length])

  const visibleProducts = products.slice(0, visibleCount)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {visibleProducts.map((product, index) => (
          <ProductCard 
            key={`${product.id}-${index}`} // Use index in key to force re-animation if needed, or just id
            product={product} 
            index={index % ITEMS_PER_PAGE} // Reset animation delay for each chunk
          />
        ))}
      </div>
      
      {/* Invisible trigger element at the bottom */}
      {visibleCount < products.length && (
        <div ref={ref} className="w-full h-20 flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
