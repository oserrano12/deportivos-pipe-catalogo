import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ProductWithRelations } from '@/lib/data/products'

import Image from 'next/image'

interface ProductCardProps {
  product: ProductWithRelations
}

export function ProductCard({ product }: ProductCardProps) {
  // Use a fallback image if array is empty or null
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/placeholder-sneaker.webp'

  return (
    <Link href={`/producto/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary/50 mb-3 border border-border/50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.is_available && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive" className="font-bold">Agotado</Badge>
          </div>
        )}
        {product.is_available && product.is_featured && (
          <Badge className="absolute top-2 right-2 font-bold bg-primary text-primary-foreground">
            Destacado
          </Badge>
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {product.brand?.name || 'Marca'}
          </span>
          <span className="text-sm font-bold text-foreground">
            {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar precio'}
          </span>
        </div>
        <h3 className="text-sm font-medium leading-tight text-foreground line-clamp-2">
          {product.name}
        </h3>
      </div>
    </Link>
  )
}
