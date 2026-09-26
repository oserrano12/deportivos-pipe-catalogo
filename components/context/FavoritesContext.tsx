'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface FavoritesContextType {
  favoriteIds: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem('pipe_favorites')
    if (saved) {
      try {
        const parsedIds = JSON.parse(saved)
        if (Array.isArray(parsedIds) && parsedIds.length > 0) {
          
          const verifyFavorites = async () => {
            try {
              const { supabasePublic } = await import('@/lib/supabase/public');
              const { data, error } = await supabasePublic.from('products').select('id, is_available').in('id', parsedIds);
              
              if (error) throw error;

              if (data) {
                const validIds = data.filter(p => p.is_available).map(p => p.id);
                
                if (validIds.length < parsedIds.length) {
                  import('sonner').then(({ toast }) => {
                    toast.error("Algunas zapatillas de tus favoritos ya no están disponibles y fueron removidas automáticamente.");
                  });
                }
                
                setFavoriteIds(validIds);
              }
            } catch (err) {
              console.error('Failed to verify favorites', err);
              setFavoriteIds(parsedIds); // Fallback if network fails
            } finally {
              setIsLoaded(true);
            }
          };

          verifyFavorites();
          return; // Skip immediate setIsLoaded
        } else {
          setFavoriteIds(parsedIds);
        }
      } catch (e) {}
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pipe_favorites', JSON.stringify(favoriteIds))
    }
  }, [favoriteIds, isLoaded])

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    )
  }

  const isFavorite = (id: string) => favoriteIds.includes(id)

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
