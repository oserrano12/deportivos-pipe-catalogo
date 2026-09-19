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
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md mb-3 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:bg-white/10 transition-colors">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
          />
          {!product.is_available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 z-10">
              <Badge variant="destructive" className="font-bold scale-110 shadow-lg">Agotado</Badge>
            </div>
          )}
          {product.is_available && product.is_featured && (
            <Badge className="absolute top-2 right-2 font-black text-[10px] uppercase tracking-wider bg-[#FFD700] text-black border-none shadow-md z-20">
              Destacado
            </Badge>
          )}

          {/* Favoritos Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(product.id)
            }}
            className="absolute top-2 left-2 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm hover:bg-black/60 transition-colors outline-none focus:ring-2 ring-[#FFD700]"
            aria-label="Agregar a favoritos"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${favorite ? 'fill-[#FFD700] text-[#FFD700]' : 'text-white'}`} 
            />
          </button>
        </div>
        
        <div className="flex flex-col gap-1 px-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
              {product.brand?.name || 'Marca'}
            </span>
            <span className="text-sm font-black text-[#FFD700]">
              {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar'}
            </span>
          </div>
          <h3 className="text-sm font-bold leading-tight text-white line-clamp-2">
            {product.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}
