'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isFlashing, setIsFlashing] = useState(false)
  const [nextTheme, setNextTheme] = useState<'light' | 'dark' | null>(null)

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setNextTheme(newTheme)
    setIsFlashing(true)
    
    // Cambiar el tema a la mitad del flash
    setTimeout(() => {
      setTheme(newTheme)
    }, 150)

    // Quitar el flash después
    setTimeout(() => {
      setIsFlashing(false)
    }, 600)
  }

  return (
    <>
      <button
        onClick={toggleTheme}
        className="inline-flex relative items-center justify-center rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors outline-none focus:ring-2 ring-primary group"
        aria-label="Alternar tema"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 relative z-10" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 relative z-10" />
      </button>

      {/* Kinetic Flash Overlay */}
      {isFlashing && (
        <div 
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center mix-blend-difference"
          style={{
            animation: 'kinetic-flash 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards'
          }}
        >
          <div className="w-screen h-screen bg-white" />
        </div>
      )}

      <style jsx global>{`
        @keyframes kinetic-flash {
          0% { clip-path: circle(0% at 90% 10%); opacity: 1; }
          40% { clip-path: circle(150% at 90% 10%); opacity: 1; }
          100% { clip-path: circle(150% at 90% 10%); opacity: 0; }
        }
      `}</style>
    </>
  )
}
