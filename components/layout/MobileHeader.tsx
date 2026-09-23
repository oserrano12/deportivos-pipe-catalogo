'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import * as React from 'react'

import { useFavorites } from '@/components/context/FavoritesContext'

export function MobileHeader() {
  const router = useRouter()
  const clickCount = useRef(0)
  const clickTimeout = useRef<NodeJS.Timeout | null>(null)
  
  const { favoriteIds } = useFavorites()
  const totalFavorites = favoriteIds.length
  
  const [favBump, setFavBump] = useState(false)
  const prevFavsRef = useRef(totalFavorites)

  useEffect(() => {
    if (totalFavorites > prevFavsRef.current) {
      setFavBump(true)
      const t = setTimeout(() => setFavBump(false), 300)
      prevFavsRef.current = totalFavorites
      return () => clearTimeout(t)
    }
    prevFavsRef.current = totalFavorites
  }, [totalFavorites])

  useEffect(() => {
    console.log(
      "%c🚀 Designed and Developed by oserrano12",
      "color: #ff5500; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px; background: #111;"
    )
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    clickCount.current += 1
    
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
    }

    if (clickCount.current >= 3) {
      e.preventDefault() // Detener la navegación normal a "/"
      clickCount.current = 0
      router.push('/admin')
      return
    }

    clickTimeout.current = setTimeout(() => {
      clickCount.current = 0
    }, 1200) // 1.2 segundos para hacer los 3 clics
  }

  const instagramUser = process.env.NEXT_PUBLIC_INSTAGRAM_USER || 'deportivospipe24'
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
  const whatsappMessage = encodeURIComponent('¡Hola! Quiero hacer una consulta sobre el catálogo.')
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
          <img src="/IMAGOTIPO.svg" alt="Deportivos Pipe" className="h-8 md:h-10 w-auto object-contain dark:invert" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <Link 
            href="/#catalogo" 
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-primary transition-colors"
          >
            Catálogo
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Contacto</a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Link href="/favoritos" className={`relative inline-flex items-center justify-center p-2 rounded-full outline-none transition-all duration-300 group ${favBump ? 'scale-125 text-primary drop-shadow-[0_0_15px_oklch(var(--color-primary))]' : 'text-muted-foreground hover:text-foreground'}`} aria-label="Favoritos">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            {totalFavorites > 0 && (
              <span className={`absolute right-0 top-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center transition-all ${favBump ? 'scale-125' : 'animate-in zoom-in'}`}>
                {totalFavorites}
              </span>
            )}
          </Link>
          <CartDrawer />
          <a
            href={`https://instagram.com/${instagramUser}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-all duration-300 rounded-full outline-none group"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
