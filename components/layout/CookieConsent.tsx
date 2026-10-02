'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if consent has already been given or denied
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowConsent(false)
    // Reload to allow scripts to mount
    window.location.reload()
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:right-auto md:w-[400px] bg-background border shadow-2xl p-6 rounded-2xl z-[100] animate-in slide-in-from-bottom-5">
      <div className="space-y-4">
        <h3 className="font-black italic uppercase tracking-tighter text-xl">Uso de Cookies</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar anuncios. 
          Al hacer clic en "Aceptar", das tu consentimiento para el uso de TODAS las cookies. 
          Visita nuestra <Link href="/politica-cookies" className="text-primary hover:underline">Política de Cookies</Link> para más detalles.
        </p>
        <div className="flex gap-3 pt-2">
          <button 
            onClick={declineCookies}
            className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground font-bold text-sm uppercase tracking-widest hover:bg-secondary/80 transition-colors"
          >
            Rechazar
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:bg-primary/90 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
