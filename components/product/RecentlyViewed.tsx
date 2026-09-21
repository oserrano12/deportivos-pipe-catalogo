'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductWithRelations } from '@/lib/data/products'

export interface MinimalProduct {
  id: string
  slug: string
  name: string
  price: number
  imageUrl: string
  brandName: string
}

export function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const [recent, setRecent] = useState<MinimalProduct[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentlyViewed')
      if (stored) {
        let parsed: MinimalProduct[] = JSON.parse(stored)
        // Filter out corrupted data from previous versions or other apps
        parsed = parsed.filter(p => typeof p === 'object' && p !== null && p.id)
        setRecent(parsed.filter(p => p.id !== currentProductId))
      }
    } catch (e) {}
  }, [currentProductId])

  if (recent.length === 0) return null

  return (
    <div className="mt-20 pt-10 border-t-2 border-border space-y-6">
      <h3 className="font-black italic uppercase tracking-tighter text-2xl md:text-3xl">
        Vistos Recientemente
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recent.map((product) => (
          <Link key={product.id} href={`/producto/${product.slug}`} className="group block space-y-3">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-secondary/10 transition-all duration-300 group-hover:shadow-[0_10px_20px_-10px_rgba(0,127,255,0.2)]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest">
                {product.brandName}
              </span>
              <h4 className="text-xs font-bold leading-tight line-clamp-1">{product.name}</h4>
              <span className="text-xs font-black text-primary mt-0.5">
                {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
