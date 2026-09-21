'use client'

import { ShoppingBag, X, Trash2, MessageCircle } from 'lucide-react'
import { useCart } from '@/components/context/CartContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function CartDrawer({ variant = 'default' }: { variant?: 'default' | 'bottom-nav' } = {}) {
  const { items, removeItem, totalItems, totalPrice, isOpen, setIsOpen } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return

    let message = `¡Hola! Me interesan estos pares:\n\n`
    items.forEach(item => {
      const url = `${window.location.origin}/producto/${item.product.slug}`
      
      let sizeLabel = item.size
      if (sizeLabel.startsWith('C-')) sizeLabel = `para Caballero en talla ${sizeLabel.substring(2)}`
      else if (sizeLabel.startsWith('D-')) sizeLabel = `para Dama en talla ${sizeLabel.substring(2)}`
      else if (sizeLabel.startsWith('R-')) sizeLabel = `(Unisex) en talla ${sizeLabel.substring(2)}`
      else sizeLabel = `en talla ${sizeLabel}`

      const status = item.product.is_available ? '' : ' 🔴 (AGOTADO)'
      message += `- ${item.product.name}${status}\n  ${sizeLabel} x${item.quantity}\n  Enlace: ${url}\n\n`
    })

    const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger 
        className={variant === 'bottom-nav' 
          ? "flex flex-col items-center justify-center w-16 h-full text-xs font-medium transition-colors text-muted-foreground hover:text-foreground relative cursor-pointer"
          : "relative p-2 text-muted-foreground hover:text-foreground transition-colors outline-none focus:ring-2 ring-primary rounded-full group cursor-pointer"
        }
        aria-label="Abrir carrito"
      >
        {variant === 'bottom-nav' ? (
          <>
            <div className="relative flex justify-center">
              <ShoppingBag className="h-5 w-5 mb-1" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </div>
            Carrito
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute 0 right-0 top-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col border-l-2 border-border p-0">
        <SheetHeader className="p-6 border-b-2 border-border text-left">
          <SheetTitle className="font-black italic uppercase tracking-tighter text-2xl flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            TU SELECCIÓN
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-6 text-center">
              <ShoppingBag className="h-20 w-20 opacity-20" />
              <div className="space-y-2">
                <p className="font-black tracking-widest uppercase text-lg text-foreground">Tu bolsa está vacía</p>
                <p className="text-sm font-medium">Aún no has agregado ningún par a tu selección.</p>
              </div>
              <SheetClose 
                render={<a href="/#catalogo" className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/25">Descubrir Pares</a>}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}-${i}`} className={`flex gap-4 p-4 rounded-2xl bg-secondary/10 border-2 border-border/50 relative group ${!item.product.is_available ? 'opacity-60 grayscale' : ''}`}>
                  <div className="w-20 h-20 rounded-xl bg-background overflow-hidden relative shrink-0">
                    <Image
                      src={item.product.images?.[0] || '/placeholder-sneaker.webp'}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                    {!item.product.is_available && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm z-10">
                        <span className="text-[10px] font-black uppercase text-foreground">Agotado</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="font-bold text-sm line-clamp-1">{item.product.name}</h3>
                    <span className="text-primary font-black text-sm">
                      {item.product.is_available ? `$${item.product.price.toLocaleString('es-CO')}` : 'Agotado'}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold">Talla: {item.size}</Badge>
                      <span className="text-[10px] text-muted-foreground font-bold">Cant: {item.quantity}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="absolute -top-2 -right-2 p-2 bg-destructive text-destructive-foreground rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100 md:translate-x-2 z-20"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t-2 border-border bg-background space-y-4 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center">
              <span className="font-bold text-muted-foreground uppercase tracking-widest text-sm">Total Estimado</span>
              <span className="font-black text-2xl">${totalPrice.toLocaleString('es-CO')}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Pedir por WhatsApp
            </button>
            <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Lleva + pares, paga menos en el chat
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
