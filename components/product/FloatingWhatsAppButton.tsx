// C:\Users\serra\OneDrive\Documentos\deportivos-pipe-catalogo\components\product\FloatingWhatsAppButton.tsx
'use client'

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

import { useCart } from '@/components/context/CartContext'
import { ProductWithRelations } from '@/lib/data/products'
import { ShoppingBag, Check } from "lucide-react"
import { useState } from 'react'
import { toast } from 'sonner'

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
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const isDisabled = needsSize || needsGender || !isAvailable
  
  let buttonText = isAvailable ? (added ? "Añadido" : "Añadir a mi selección") : "Agotado"
  
  if (needsGender && needsSize) buttonText = "Elige Género y Talla"
  else if (needsGender) buttonText = "Elige el Género"
  else if (needsSize) buttonText = "Elige tu Talla"

  const kineticStyles = "w-full h-16 flex items-center justify-center gap-3 text-sm md:text-base font-black uppercase tracking-widest transition-all rounded-none border-2 shadow-[8px_8px_0_0_oklch(var(--color-border))] hover:translate-x-1 hover:translate-y-1 hover:shadow-none relative z-10"
  
  const handleAdd = () => {
    if (isDisabled || !selectedSize) return
    addItem(product, selectedSize)
    setAdded(true)
    toast.success(`${product.name} añadido a tu bolsa`)
    setTimeout(() => setAdded(false), 2000)
  }

  const content = isDisabled ? (
    <button 
      disabled 
      className={`${kineticStyles} border-muted bg-secondary text-muted-foreground shadow-[8px_8px_0_0_oklch(var(--color-muted))] opacity-70 cursor-not-allowed`}
    >
      <ShoppingBag className="w-6 h-6 opacity-50" />
      {buttonText}
    </button>
  ) : (
    <div className="relative w-full h-full group">
      <button 
        onClick={handleAdd}
        className={`${kineticStyles} ${added ? 'bg-primary border-primary text-primary-foreground shadow-none translate-x-1 translate-y-1' : 'bg-foreground border-foreground text-background shadow-[8px_8px_0_0_oklch(var(--color-primary))]'} overflow-hidden`}
      >
        {added ? <Check className="w-6 h-6 z-10" /> : <ShoppingBag className="w-6 h-6 z-10" />}
        <span className="relative z-10">
          {buttonText}
        </span>
      </button>
    </div>
  )

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
