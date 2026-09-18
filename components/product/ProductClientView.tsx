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
    <div className="pb-32 md:pb-16 container max-w-6xl mx-auto px-4 md:py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Column: Image Gallery (Sticky on Desktop) */}
        <div className="md:sticky md:top-24 h-fit">
          <ProductGallery images={product.images} />
        </div>
        
        {/* Right Column: Product Details */}
        <div className="mt-6 md:mt-0 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {product.brand?.name}
              </span>
              {product.is_featured && (
                <Badge className="bg-primary text-primary-foreground font-bold">Destacado</Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{product.name}</h1>
            <p className="text-3xl font-black text-primary">
              {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar precio'}
            </p>
          </div>

          {product.description && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider">Descripción</h3>
              <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <SizeSelector 
              sizes={product.sizes} 
              selectedSize={selectedSize} 
              onSizeChange={setSelectedSize} 
            />
            
            <div className="pt-6 border-t border-border/50">
              <a
                href={`https://instagram.com/${instagramUser}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-4 rounded-xl border border-border bg-secondary/50 hover:bg-secondary"
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
