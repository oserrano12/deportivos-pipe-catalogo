'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ProductWithRelations } from '@/lib/data/products'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/components/context/FavoritesContext'

interface ProductCardProps {
  product: ProductWithRelations
  index?: number // used for staggered delay
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(product.id)

  // Use a fallback image if array is empty or null
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/placeholder-sneaker.webp'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/producto/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/30 mb-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,127,255,0.2)]">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal"
          />
          {!product.is_available && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-md transition-all duration-300 z-10">
              <span className="px-4 py-1 text-xs font-black uppercase tracking-widest bg-foreground text-background rounded-full shadow-lg">Agotado</span>
            </div>
          )}
          {product.is_available && product.is_featured && (
            <span className="absolute top-3 right-3 z-20 w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#007FFF]" />
          )}

          {/* Favoritos Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(product.id)
            }}
            className="absolute top-3 left-3 z-20 p-2.5 rounded-full bg-background/80 backdrop-blur-md shadow-sm hover:scale-110 transition-transform outline-none focus:ring-2 ring-primary"
            aria-label="Agregar a favoritos"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${favorite ? 'fill-primary text-primary' : 'text-foreground/70 group-hover:text-foreground'}`} 
            />
          </button>
        </div>
        
        <div className="flex flex-col gap-1 px-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest">
              {product.brand?.name || 'Marca'}
            </span>
            <span className="text-sm font-black text-primary">
              {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar'}
            </span>
          </div>
          <h3 className="text-sm font-bold leading-tight text-foreground line-clamp-2">
            {product.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}
