'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    document.startViewTransition(() => {
      setTheme(newTheme)
    })
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="relative inline-flex h-8 w-16 shrink-0 items-center rounded-full border-2 border-transparent bg-muted shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] opacity-50 cursor-default" />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] ${
        isDark ? 'bg-zinc-800' : 'bg-zinc-300'
      }`}
      aria-label="Alternar tema"
    >
      {/* Background Icons */}
      <span className="absolute inset-0 flex h-full w-full items-center justify-between px-2.5 pointer-events-none">
        <Sun className={`h-3.5 w-3.5 transition-opacity duration-300 ${isDark ? 'opacity-30 text-white' : 'opacity-100 text-zinc-600'}`} />
        <Moon className={`h-3 w-3 transition-opacity duration-300 ${isDark ? 'opacity-100 text-white' : 'opacity-30 text-zinc-600'}`} />
      </span>

      {/* Sliding Thumb */}
      <span
        className={`pointer-events-none relative flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-[0_2px_5px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] ring-0 transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-8' : 'translate-x-1'
        }`}
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.05) 100%)'
        }}
      >
        {/* Grip texture lines */}
        <span className="flex gap-[2px] opacity-40">
          <span className="h-2.5 w-[1px] bg-foreground/80 rounded-full shadow-[1px_0_0_rgba(255,255,255,0.4)]"></span>
          <span className="h-2.5 w-[1px] bg-foreground/80 rounded-full shadow-[1px_0_0_rgba(255,255,255,0.4)]"></span>
          <span className="h-2.5 w-[1px] bg-foreground/80 rounded-full shadow-[1px_0_0_rgba(255,255,255,0.4)]"></span>
        </span>
      </span>
    </button>
  )
}
