'use client'

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface FloatingWhatsAppButtonProps {
  productName: string
  price: number
  selectedSize: string | null
  isAvailable: boolean
}

export function FloatingWhatsAppButton({ productName, price, selectedSize, isAvailable }: FloatingWhatsAppButtonProps) {
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
  
  // Format price
  const formattedPrice = price.toLocaleString('es-CO')
  
  // Handle URL creation (client side)
  const productUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  // Build message
  const message = `¡Hola! Me interesa comprar las ${productName} (Talla: ${selectedSize || 'Por definir'}) por $${formattedPrice}. ¿Están disponibles? ${productUrl}`
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`

  if (!isAvailable) {
    return (
      <div className="fixed bottom-[4.5rem] left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t z-30">
        <Button disabled className="w-full h-14 rounded-full font-bold text-lg" variant="secondary">
          Producto Agotado
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-[4.5rem] left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t z-30 flex gap-2">
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noreferrer"
        className="w-full h-14 rounded-full font-bold text-lg gap-2 shadow-lg hover:scale-[1.02] transition-transform bg-[#25D366] hover:bg-[#25D366]/90 text-white inline-flex items-center justify-center whitespace-nowrap"
      >
        <MessageCircle className="w-6 h-6" />
        Comprar por WhatsApp
      </a>
    </div>
  )
}
