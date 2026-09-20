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
  const { items, removeItem, totalItems, totalPrice } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return

    let message = `¡Hola! Me interesan estos pares:\n\n`
    items.forEach(item => {
      const url = `${window.location.origin}/producto/${item.product.slug}`
      message += `- ${item.product.name} (Talla: ${item.size}) x${item.quantity}\n  Enlace: ${url}\n\n`
    })
    message += `Total estimado: $${totalPrice.toLocaleString('es-CO')}`

    const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Sheet>
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
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <ShoppingBag className="h-16 w-16 opacity-20" />
              <p className="font-bold tracking-widest uppercase text-sm">Tu bolsa está vacía</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}-${i}`} className="flex gap-4 p-4 rounded-2xl bg-secondary/10 border-2 border-border/50 relative group">
                  <div className="w-20 h-20 rounded-xl bg-background overflow-hidden relative shrink-0">
                    <Image
                      src={item.product.images?.[0] || '/placeholder-sneaker.webp'}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="font-bold text-sm line-clamp-1">{item.product.name}</h3>
                    <span className="text-primary font-black text-sm">${item.product.price.toLocaleString('es-CO')}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold">Talla: {item.size}</Badge>
                      <span className="text-[10px] text-muted-foreground font-bold">Cant: {item.quantity}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="absolute -top-2 -right-2 p-2 bg-destructive text-destructive-foreground rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100 md:translate-x-2"
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
