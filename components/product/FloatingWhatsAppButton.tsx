'use client'

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface FloatingWhatsAppButtonProps {
  productName: string
  price: number
  selectedSize: string | null
  selectedGender?: 'Caballero' | 'Dama' | 'Ropa (Unisex)' | null
  isAvailable: boolean
  needsSize?: boolean
  needsGender?: boolean
}

export function FloatingWhatsAppButton({ 
  productName, 
  price, 
  selectedSize, 
  selectedGender, 
  isAvailable,
  needsSize,
  needsGender
}: FloatingWhatsAppButtonProps) {
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
  
  // Handle URL creation (client side)
  const productUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  // Build message: "quiero estos [modelo del zapato], seguido de para y el genero caballero o dama y en la talla que se introduzca el valor de la talla que se seleccionó"
  const genderText = selectedGender ? `para ${selectedGender}` : ''
  const sizeText = selectedSize ? `en la talla ${selectedSize}` : ''
  const spaceOrEmpty = genderText || sizeText ? ' ' : ''
  const comboText = [genderText, sizeText].filter(Boolean).join(' y ')

  const message = isAvailable
    ? `¡Hola! Quiero estos ${productName}${spaceOrEmpty}${comboText}. ${productUrl}`
    : `¡Hola! Vi que los ${productName}${spaceOrEmpty}${comboText} están agotados. ¿Cuándo volverán a tener stock? ${productUrl}`

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`

  const isDisabled = needsSize || needsGender
  
  let buttonText = isAvailable ? "Quiero Estos" : "Consultar Restock"
  
  if (needsGender && needsSize) buttonText = "Elige Género y Talla"
  else if (needsGender) buttonText = "Elige el Género"
  else if (needsSize) buttonText = "Elige tu Talla"

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-background border-t z-30 flex justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="w-full max-w-6xl mx-auto flex md:justify-end">
        {isDisabled ? (
          <Button 
            disabled 
            className="w-full md:w-auto md:px-12 h-14 rounded-xl font-bold text-lg gap-2 shadow-sm transition-all bg-secondary/80 text-secondary-foreground/80"
            variant="secondary"
          >
            <MessageCircle className="w-6 h-6 opacity-50" />
            {buttonText}
          </Button>
        ) : (
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noreferrer"
            className={`w-full md:w-auto md:px-12 h-14 rounded-xl font-bold text-lg gap-2 shadow-lg hover:scale-[1.02] transition-transform text-white inline-flex items-center justify-center whitespace-nowrap ${isAvailable ? 'bg-[#25D366] hover:bg-[#25D366]/90' : 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300'}`}
          >
            <MessageCircle className="w-6 h-6" />
            {buttonText}
          </a>
        )}
      </div>
    </div>
  )
}
