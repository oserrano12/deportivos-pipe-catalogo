'use client'

import { useEffect, useState } from 'react'

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Only show once per session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setIsVisible(false)
      return
    }

    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1500)

    const removeTimer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('hasSeenSplash', 'true')
    }, 2000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
        <span 
          className="font-bold text-3xl md:text-5xl tracking-tight uppercase animate-fade-in-up"
          style={{ animationDelay: '300ms', animationFillMode: 'both' }}
        >
          Deportivos Pipe
        </span>
        
        {/* Pequeña barra de carga estilizada */}
        <div className="w-full max-w-[100px] h-1 bg-secondary rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-primary"
            style={{ 
              animation: 'fill-width 1.2s ease-in-out forwards',
              animationDelay: '500ms'
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fill-width {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
