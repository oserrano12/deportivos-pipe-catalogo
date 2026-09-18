'use client'

import { useState } from 'react'
import { ProductGallery } from './ProductGallery'
import { SizeSelector } from './SizeSelector'
import { FloatingWhatsAppButton } from './FloatingWhatsAppButton'
import { Badge } from '@/components/ui/badge'
import { ProductWithRelations } from '@/lib/data/products'

interface ProductClientViewProps {
  product: ProductWithRelations
}

export function ProductClientView({ product }: ProductClientViewProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const instagramUser = process.env.NEXT_PUBLIC_INSTAGRAM_USER || 'deportivospipe24'

  return (
    <div className="pb-32">
      <ProductGallery images={product.images} />
      
      <div className="container px-4 mt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {product.brand?.name}
            </span>
            {product.is_featured && (
              <Badge className="bg-primary text-primary-foreground font-bold">Destacado</Badge>
            )}
          </div>
          
          <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>
          <p className="text-2xl font-black text-primary">
            ${product.price.toLocaleString('es-CO')}
          </p>
        </div>

        {product.description && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Descripción</h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        )}

        <SizeSelector 
          sizes={product.sizes} 
          selectedSize={selectedSize} 
          onSizeChange={setSelectedSize} 
        />
        
        <div className="pt-4 border-t">
          <a
            href={`https://instagram.com/${instagramUser}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-4 rounded-xl border border-border bg-secondary/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            Consultar por Instagram Direct
          </a>
        </div>
      </div>

      <FloatingWhatsAppButton 
        productName={product.name}
        price={product.price}
        selectedSize={selectedSize}
        isAvailable={product.is_available}
      />
    </div>
  )
}
