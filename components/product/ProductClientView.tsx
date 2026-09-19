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

import { getSizeInfo } from '@/lib/sizing'

import { SizeGuideModal } from './SizeGuideModal'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/components/context/FavoritesContext'

export function ProductClientView({ product }: ProductClientViewProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(product.id)
  
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<'Caballero' | 'Dama' | 'Ropa (Unisex)' | null>(null)
  const instagramUser = process.env.NEXT_PUBLIC_INSTAGRAM_USER || 'deportivospipe24'

  const hasDama = product.sizes?.some(s => s.startsWith('D-'))
  const hasCaballero = product.sizes?.some(s => s.startsWith('C-'))
  const hasRopa = product.sizes?.some(s => s.startsWith('R-'))
  
  const availableGenders = []
  if (hasCaballero) availableGenders.push('Caballero')
  if (hasDama) availableGenders.push('Dama')
  if (hasRopa) availableGenders.push('Ropa (Unisex)')

  const currentPrefix = selectedGender === 'Caballero' ? 'C-' : selectedGender === 'Dama' ? 'D-' : selectedGender === 'Ropa (Unisex)' ? 'R-' : null
  const sizesForGender = currentPrefix 
    ? product.sizes?.filter(s => s.startsWith(currentPrefix)) 
    : []

  // Clean size display for WhatsApp message
  const sizeInfo = selectedSizeId ? getSizeInfo(selectedSizeId) : null
  const displaySize = sizeInfo ? sizeInfo.eur : null

  return (
    <div className="pb-32 md:pb-16 container max-w-6xl mx-auto px-4 md:py-8 pt-4 relative">
      <div className="sticky top-[4.5rem] md:top-20 z-30 mb-6 -mx-2 px-2 py-2 pointer-events-none">
        <a 
          href="/#catalogo"
          className="inline-flex items-center gap-2 text-sm font-black text-foreground transition-all bg-background/95 backdrop-blur-xl border-2 border-border shadow-md px-5 py-2.5 rounded-full w-fit hover:bg-muted hover:scale-[1.02] pointer-events-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Volver al Catálogo
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="md:sticky md:top-36 h-fit">
          <ProductGallery images={product.images} />
        </div>
        
        <div className="mt-6 md:mt-0 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {product.brand?.name}
              </span>
              <div className="flex gap-2 items-center">
                {!product.is_available && (
                  <Badge variant="destructive" className="font-bold">Agotado</Badge>
                )}
                {product.is_featured && (
                  <Badge className="bg-primary text-primary-foreground font-bold">Destacado</Badge>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(product.id)
                  }}
                  className="ml-2 p-2 rounded-full bg-background border shadow-sm hover:bg-muted transition-colors outline-none focus:ring-2 ring-primary"
                  aria-label="Agregar a favoritos"
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
                  />
                </button>
              </div>
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
            {availableGenders.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Género / Tipo</h3>
                  {!hasRopa && <SizeGuideModal />}
                </div>
                <div className="flex flex-wrap gap-4">
                  {availableGenders.map(gender => (
                    <button
                      key={gender}
                      onClick={() => {
                        setSelectedGender(gender as any)
                        setSelectedSizeId(null) // reset size when changing gender
                      }}
                      className={`flex-1 h-12 rounded-xl border text-sm font-bold transition-all ${
                        selectedGender === gender
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'bg-background hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedGender && (
              <SizeSelector 
                sizes={sizesForGender || []} 
                selectedSize={selectedSizeId} 
                onSizeChange={setSelectedSizeId} 
              />
            )}
            
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
        selectedSize={displaySize}
        selectedGender={selectedGender}
        isAvailable={product.is_available}
        needsSize={!!(sizesForGender && sizesForGender.length > 0 && !selectedSizeId)}
        needsGender={!!(availableGenders.length > 0 && !selectedGender)}
      />
    </div>
  )
}
