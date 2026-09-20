'use client'

import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, FormEvent, useEffect, useTransition, useRef } from 'react'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  // Efecto para aplicar búsqueda en vivo con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentUrlQuery = searchParams.get('q') || ''
      if (query !== currentUrlQuery) {
        const params = new URLSearchParams(searchParams.toString())
        if (query.trim()) {
          params.set('q', query.trim())
        } else {
          params.delete('q')
        }
        startTransition(() => {
          router.push(`/?${params.toString()}#catalogo`, { scroll: false })
        })
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [query, router, searchParams])

  // Sincronizar estado si la URL cambia por fuera (ej. botones atrás/adelante)
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    // Solo actualizamos el input si el usuario NO está escribiendo en él (no tiene el foco)
    if (urlQuery !== query && document.activeElement !== inputRef.current) {
      setQuery(urlQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    // El formulario ya no necesita hacer push porque el useEffect lo hace en vivo,
    // pero si le dan Enter, forzamos la actualización sin esperar el debounce
    const params = new URLSearchParams(searchParams.toString())
    if (query.trim()) {
      params.set('q', query.trim())
    } else {
      params.delete('q')
    }
    startTransition(() => {
      router.push(`/?${params.toString()}#catalogo`, { scroll: false })
    })
  }

  const handleClear = () => {
    setQuery('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    startTransition(() => {
      router.push(`/?${params.toString()}#catalogo`, { scroll: false })
    })
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full md:max-w-sm flex">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
          className={`w-full h-11 pl-10 pr-10 rounded-full border border-border/50 shadow-sm bg-background/50 backdrop-blur-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${isPending ? 'opacity-50' : 'opacity-100'}`}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <button type="submit" className="sr-only">Buscar</button>
    </form>
  )
}
