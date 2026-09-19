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
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-card backdrop-blur-md mb-3 border border-border shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:bg-card/80 transition-colors">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
          />
          {!product.is_available && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 z-10">
              <Badge variant="destructive" className="font-bold scale-110 shadow-lg">Agotado</Badge>
            </div>
          )}
          {product.is_available && product.is_featured && (
            <Badge className="absolute top-2 right-2 font-black text-[10px] uppercase tracking-wider bg-primary text-primary-foreground border-none shadow-md z-20">
              Destacado
            </Badge>
          )}

          {/* Favoritos Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(product.id)
            }}
            className="absolute top-2 left-2 z-20 p-2 rounded-full bg-secondary backdrop-blur-md border border-border shadow-sm hover:bg-secondary/80 transition-colors outline-none focus:ring-2 ring-primary"
            aria-label="Agregar a favoritos"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${favorite ? 'fill-primary text-primary' : 'text-foreground'}`} 
            />
          </button>
        </div>
        
        <div className="flex flex-col gap-1 px-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
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
