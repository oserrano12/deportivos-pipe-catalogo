'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductGallery } from './ProductGallery'
import { SizeSelector } from './SizeSelector'
import { FloatingWhatsAppButton } from '@/components/product/FloatingWhatsAppButton'
import { SizeGuideModal } from '@/components/product/SizeGuideModal'
import { TrustBadges } from '@/components/product/TrustBadges'
import { Badge } from '@/components/ui/badge'
import { ProductWithRelations } from '@/lib/data/products'

interface ProductClientViewProps {
  product: ProductWithRelations
}

import { getSizeInfo } from '@/lib/sizing'
import { Heart, Share2 } from 'lucide-react'
import { useFavorites } from '@/components/context/FavoritesContext'
import { toast } from 'sonner'

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

  const handleShare = async () => {
    const url = window.location.href
    const title = `${product.name} | Deportivos Pipe`
    const text = `Mira estas zapatillas ${product.name} en Deportivos Pipe 👟🔥`

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        })
      } catch (error) {
        // user cancelled or failed
      }
    } else {
      // Fallback for desktop/unsupported browsers
      navigator.clipboard.writeText(url)
      toast.success('¡Enlace copiado al portapapeles!')
    }
  }

  return (
    <div className="pb-32 md:pb-16 container max-w-7xl mx-auto px-4 md:py-8 pt-4 relative min-h-screen">
      
      {/* MASSIVE WATERMARK BACKGROUND */}
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-[-1]" aria-hidden="true">
        <span className="text-[20vw] font-black italic tracking-tighter text-foreground/[0.04] dark:text-foreground/[0.15] whitespace-nowrap -rotate-6">
          {product.brand?.name?.toUpperCase() || 'KINETIC'}
        </span>
      </div>

      <div className="sticky top-[4.5rem] md:top-24 z-30 mb-8 -mx-2 px-2 py-2 pointer-events-none">
        <a 
          href="/#catalogo"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground transition-all bg-background border-2 border-border shadow-[4px_4px_0_0_oklch(var(--color-border))] px-5 py-3 rounded-none w-fit hover:translate-x-1 hover:translate-y-1 hover:shadow-none pointer-events-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Volver al Catálogo
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-20">
        <div className="md:sticky md:top-36 h-fit bg-secondary/20 p-0 md:p-8 rounded-[2rem] border border-border shadow-2xl overflow-hidden">
          <ProductGallery images={product.images} />
        </div>
        
        <div className="mt-6 md:mt-0 flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Highlighted Brand */}
              <div className="flex items-center gap-3">
                {product.brand?.logo_url && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-border shadow-[2px_2px_0_0_oklch(var(--color-border))] flex items-center justify-center p-1.5 shrink-0">
                    <div className="relative w-full h-full">
                      <Image 
                        src={product.brand.logo_url} 
                        alt={product.brand.name} 
                        fill 
                        className="object-contain" 
                        sizes="40px"
                      />
                    </div>
                  </div>
                )}
                <span className="text-xs md:text-sm font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-none border-l-4 border-primary shadow-sm">
                  {product.brand?.name || 'Marca'}
                </span>
              </div>

              {/* Badges & Actions */}
              <div className="flex gap-2 items-center">
                {!product.is_available && (
                  <Badge variant="destructive" className="font-black uppercase rounded-none px-3 py-1">Agotado</Badge>
                )}
                {product.is_featured && (
                  <Badge className="bg-primary text-primary-foreground font-black uppercase rounded-none px-3 py-1">Destacado</Badge>
                )}
                <div className="flex items-center ml-2 gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-background border-2 border-border shadow-sm hover:scale-110 transition-transform outline-none focus:ring-2 ring-primary"
                    aria-label="Compartir producto"
                  >
                    <Share2 className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(product.id)
                    }}
                    className="p-2.5 rounded-full bg-background border-2 border-border shadow-sm hover:scale-110 transition-transform outline-none focus:ring-2 ring-primary"
                    aria-label="Agregar a favoritos"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors ${favorite ? 'fill-primary text-primary' : 'text-foreground'}`} 
                    />
                  </button>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] text-foreground">
              {product.name}
            </h1>
            <p className="text-4xl md:text-5xl font-black italic tracking-tighter text-primary">
              {product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar precio'}
            </p>
          </div>

          {product.description && (
            <div className="space-y-4 border-l-4 border-primary pl-4 py-2">
              <h2 className="font-black text-sm uppercase tracking-widest text-foreground">Descripción</h2>
              <p className="text-base text-muted-foreground font-medium leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}

          <div className="space-y-8">
            {availableGenders.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-black text-sm uppercase tracking-widest">Género / Tipo</h2>
                  {!hasRopa && <SizeGuideModal />}
                </div>
                <div className="flex flex-wrap gap-4">
                  {availableGenders.map(gender => (
                    <button
                      key={gender}
                      onClick={() => {
                        setSelectedGender(gender as any)
                        setSelectedSizeId(null)
                      }}
                      className={`flex-1 h-14 border-2 text-sm font-black uppercase tracking-widest transition-all shadow-[4px_4px_0_0_oklch(var(--color-border))] hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
                        selectedGender === gender
                          ? 'border-primary bg-primary text-primary-foreground shadow-[4px_4px_0_0_oklch(var(--color-primary))]'
                          : 'border-border bg-secondary/50 hover:bg-foreground hover:border-foreground hover:text-background'
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
            
            <div className="pt-4">
              <TrustBadges />
            </div>
            
            <div className="pt-8 border-t-2 border-border hidden md:block">
              <FloatingWhatsAppButton 
                product={product}
                selectedSize={displaySize}
                selectedGender={selectedGender}
                isAvailable={product.is_available}
                needsSize={!!(sizesForGender && sizesForGender.length > 0 && !selectedSizeId)}
                needsGender={!!(availableGenders.length > 0 && !selectedGender)}
                inline={true}
              />
            </div>
          </div>
        </div>
      </div>

      <FloatingWhatsAppButton 
        product={product}
        selectedSize={displaySize}
        selectedGender={selectedGender}
        isAvailable={product.is_available}
        needsSize={!!(sizesForGender && sizesForGender.length > 0 && !selectedSizeId)}
        needsGender={!!(availableGenders.length > 0 && !selectedGender)}
      />
    </div>
  )
}
