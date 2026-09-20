'use client'

import Link from 'next/link'
import { Home, Grid, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CartDrawer } from '@/components/cart/CartDrawer'

export function BottomNav() {
  const pathname = usePathname()
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
  const whatsappMessage = encodeURIComponent('¡Hola! Quiero hacer una consulta sobre el catálogo.')
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`

  // Hide bottom nav on specific routes like product details where we have a specific bottom action bar
  if (pathname.startsWith('/producto/')) {
    return null
  }

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
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full text-xs font-medium transition-colors text-muted-foreground hover:text-foreground"
          )}
        >
          <Grid className="h-5 w-5 mb-1" />
          Catálogo
        </Link>


        <Link 
          href="/favoritos"
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full text-xs font-medium transition-colors",
            pathname === '/favoritos' ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mb-1">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          Favoritos
        </Link>

        <div className="flex flex-col items-center justify-center w-16 h-full mt-2">
          <CartDrawer />
        </div>
      </div>
    </div>
  )
}
