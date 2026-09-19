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

  // Hide bottom nav on specific routes like product details where we have a specific bottom action bar
  if (pathname.startsWith('/producto/')) {
    return null
  }

  const handleCatalogClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm md:hidden">
      <nav className="flex items-center justify-around h-16 px-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-full">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors ${
            pathname === '/' ? 'bg-[#FFD700] text-black shadow-lg shadow-yellow-500/20' : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </Link>
        
        <Link 
          href="/#catalogo" 
          onClick={handleCatalogClick}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16"/><path d="M4 14h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>
        </Link>

        <Link 
          href="/favoritos" 
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors ${
            pathname === '/favoritos' ? 'bg-[#FFD700] text-black shadow-lg shadow-yellow-500/20' : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </Link>
        
        <Link 
          href="/admin" 
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors ${
            pathname.startsWith('/admin') ? 'bg-[#FFD700] text-black shadow-lg shadow-yellow-500/20' : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </Link>
      </nav>
    </div>
  )
}
