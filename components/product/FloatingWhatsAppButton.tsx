// C:\Users\serra\OneDrive\Documentos\deportivos-pipe-catalogo\components\product\FloatingWhatsAppButton.tsx
'use client'

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

import { useCart } from '@/components/context/CartContext'
import { ProductWithRelations } from '@/lib/data/products'
import { ShoppingBag, Check } from "lucide-react"
import { useState } from 'react'
import { toast } from 'sonner'

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

interface FloatingWhatsAppButtonProps {
  product: ProductWithRelations
  selectedSize: string | null
  selectedGender?: 'Caballero' | 'Dama' | 'Ropa (Unisex)' | null
  isAvailable: boolean
  needsSize?: boolean
  needsGender?: boolean
  inline?: boolean
  className?: string
}

export function FloatingWhatsAppButton({ 
  product, 
  selectedSize, 
  selectedGender, 
  isAvailable,
  needsSize,
  needsGender,
  inline = false,
  className = ''
}: FloatingWhatsAppButtonProps) {
  const { addItem, setIsOpen } = useCart()
  const [added, setAdded] = useState(false)

  const isCartDisabled = needsSize || needsGender || !isAvailable
  const isWaDisabled = needsSize || needsGender
  
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
  const productUrl = typeof window !== 'undefined' ? window.location.href : ''
  const genderText = selectedGender ? `para ${selectedGender}` : ''
  const sizeText = selectedSize ? `en talla ${selectedSize.replace(/^[CD]-/, '')}` : ''
  const comboText = [genderText, sizeText].filter(Boolean).join(' ')

  const waMessage = isAvailable
    ? `¡Hola! Me interesa este par:\n\n*${product.name}*\n${comboText}\nEnlace: ${productUrl}`
    : `¡Hola! Me interesa este par pero veo que está agotado. ¿Cuándo volverán a tener stock?\n\n*${product.name}*\n${comboText}\nEnlace: ${productUrl}`;

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waMessage)}`

  let buttonTextCart = isAvailable ? (added ? "Añadido" : "Añadir al Carrito") : "Agotado"
  let buttonTextWa = isAvailable ? "Pedir por WhatsApp" : "Consultar Restock"
  
  if (needsGender && needsSize) {
    buttonTextCart = "Elige Talla"
    buttonTextWa = "Elige Talla"
  } else if (needsGender) {
    buttonTextCart = "Elige Género"
    buttonTextWa = "Elige Género"
  } else if (needsSize) {
    buttonTextCart = "Elige Talla"
    buttonTextWa = "Elige Talla"
  }

  const kineticStyles = "h-14 md:h-16 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider md:tracking-widest transition-all rounded-none border-2 shadow-[6px_6px_0_0_oklch(var(--color-border))] md:shadow-[8px_8px_0_0_oklch(var(--color-border))] hover:translate-x-1 hover:translate-y-1 hover:shadow-none relative z-10 text-center"
  
  const handleAdd = () => {
    if (isCartDisabled || !selectedSize) return
    addItem(product, selectedSize)
    setAdded(true)
    toast.success(`${product.name} añadido a tu selección`, {
      action: {
        label: 'Ver bolsa',
        onClick: () => setIsOpen(true)
      }
    })
    setTimeout(() => setAdded(false), 2000)
  }

  let content: React.ReactNode

  if (needsSize || needsGender) {
    let promptText = "Elige Talla"
    if (needsGender && needsSize) promptText = "Elige Género y Talla"
    else if (needsGender) promptText = "Elige el Género"

    content = (
      <div className="flex w-full">
        <button disabled className={`w-full ${kineticStyles} border-muted bg-secondary text-muted-foreground shadow-[6px_6px_0_0_oklch(var(--color-muted))] md:shadow-[8px_8px_0_0_oklch(var(--color-muted))] opacity-70 cursor-not-allowed`}>
          <span className="relative z-10 leading-none">{promptText}</span>
        </button>
      </div>
    )
  } else {
    content = (
      <div className="flex w-full gap-2 md:gap-4 group">
        {/* Añadir al Carrito */}
        {isCartDisabled ? (
          <button disabled className={`flex-1 ${kineticStyles} border-muted bg-secondary text-muted-foreground shadow-[6px_6px_0_0_oklch(var(--color-muted))] md:shadow-[8px_8px_0_0_oklch(var(--color-muted))] opacity-70 cursor-not-allowed`}>
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 opacity-50 shrink-0" />
            <span className="relative z-10 leading-none">{buttonTextCart}</span>
          </button>
        ) : (
          <button 
            onClick={handleAdd}
            className={`flex-1 ${kineticStyles} ${added ? 'bg-primary border-primary text-primary-foreground shadow-none translate-x-1 translate-y-1' : 'bg-foreground border-foreground text-background shadow-[6px_6px_0_0_oklch(var(--color-primary))] md:shadow-[8px_8px_0_0_oklch(var(--color-primary))]'} overflow-hidden`}
          >
            {added ? <Check className="w-4 h-4 md:w-5 md:h-5 z-10 shrink-0" /> : <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 z-10 shrink-0" />}
            <span className="relative z-10 leading-none">{buttonTextCart}</span>
          </button>
        )}
        
        {/* Pedir por WhatsApp / Consultar Restock */}
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noreferrer"
          className={`flex-1 ${kineticStyles} animate-soft-vibrate bg-[linear-gradient(110deg,#25D366,45%,#7df5a9,55%,#25D366)] bg-[length:200%_100%] border-[#25D366] text-white shadow-[6px_6px_0_0_oklch(var(--color-foreground))] md:shadow-[8px_8px_0_0_oklch(var(--color-foreground))] hover:shadow-[0_0_0_0_oklch(var(--color-foreground))] overflow-hidden`}
        >
          <WhatsAppIcon className="w-4 h-4 md:w-5 md:h-5 z-10 shrink-0" />
          <span className="relative z-10 leading-none">{buttonTextWa}</span>
        </a>
      </div>
    )
  }

  if (inline) {
    return <div className={`w-full ${className}`}>{content}</div>
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-md border-t-2 border-border z-40 md:hidden flex justify-center ${className}`}>
      <div className="w-full max-w-6xl mx-auto flex">
        {content}
      </div>
    </div>
  )
}
