'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export function MobileHeader() {
  const router = useRouter()
  const clickCount = React.useRef(0)
  const clickTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const handleLogoClick = (e: React.MouseEvent) => {
    clickCount.current += 1
    
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
    }

    if (clickCount.current >= 3) {
      clickCount.current = 0
      router.push('/admin')
      return
    }

    clickTimeout.current = setTimeout(() => {
      clickCount.current = 0
    }, 600) // 600ms window for 3 clicks
  }

  const instagramUser = process.env.NEXT_PUBLIC_INSTAGRAM_USER || 'deportivospipe24'
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
  const whatsappMessage = encodeURIComponent('¡Hola! Quiero hacer una consulta sobre el catálogo.')
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
          <span className="font-bold text-xl md:text-2xl tracking-tight uppercase">Deportivos Pipe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <Link href="/#catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Contacto</a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <a
            href={`https://instagram.com/${instagramUser}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors rounded-md outline-none"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
