'use client'

import Link from 'next/link'
import { Home, Grid, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
  const whatsappMessage = encodeURIComponent('¡Hola! Quiero hacer una consulta sobre el catálogo.')
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`

  return (
    <div className="fixed bottom-0 z-40 w-full bg-background border-t pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-center justify-around h-16 px-4">
        <Link 
          href="/"
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full text-xs font-medium transition-colors",
            pathname === '/' ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Home className="h-5 w-5 mb-1" />
          Inicio
        </Link>

        <Link 
          href="/#catalogo"
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full text-xs font-medium transition-colors text-muted-foreground hover:text-foreground"
          )}
        >
          <Grid className="h-5 w-5 mb-1" />
          Catálogo
        </Link>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center w-16 h-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="h-5 w-5 mb-1" />
          Contacto
        </a>
      </div>
    </div>
  )
}
