'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    document.startViewTransition(() => {
      setTheme(newTheme)
    })
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex relative items-center justify-center rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors outline-none focus:ring-2 ring-primary group"
      aria-label="Alternar tema"
    >
      <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 relative z-10" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 relative z-10" />
    </button>
  )
}
