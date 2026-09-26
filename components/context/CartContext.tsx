'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ProductWithRelations } from '@/lib/data/products'

export interface CartItem {
  product: ProductWithRelations
  size: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: ProductWithRelations, size: string) => void
  removeItem: (productId: string, size: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setItems(parsed)
        
        // Refresh product data from Supabase to ensure is_available is up to date
        const fetchLatest = async () => {
          try {
            const { supabasePublic } = await import('@/lib/supabase/public');
            const ids = parsed.map((i: any) => i.product.id);
            if (ids.length === 0) return;
            const { data, error } = await supabasePublic.from('products').select('*').in('id', ids);
            
            if (error) throw error;

            if (data) {
              let removedSome = false;
              const validItems = parsed.map((item: any) => {
                const latestProduct = data.find(p => p.id === item.product.id);
                // Si existe y est disponible, lo mantenemos actualizado
                if (latestProduct && latestProduct.is_available) {
                  return { ...item, product: { ...item.product, ...latestProduct } };
                }
                // Si no existe o no est disponible, lo eliminamos
                removedSome = true;
                return null;
              }).filter(Boolean);

              if (removedSome) {
                import('sonner').then(({ toast }) => {
                  toast.error("Algunos productos de tu carrito ya no están disponibles en el catálogo y fueron eliminados automáticamente.");
                });
              }

              setItems(validItems);
            }
          } catch (err) {
            console.error('Failed to refresh cart stock', err);
            // Si hay error de red, mantenemos el carrito como estaba
            setItems(parsed);
          }
        };
        fetchLatest();
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product: ProductWithRelations, size: string) => {
    setItems(current => {
      const existing = current.find(item => item.product.id === product.id && item.size === size)
      if (existing) {
        return current.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...current, { product, size, quantity: 1 }]
    })
  }

  const removeItem = (productId: string, size: string) => {
    setItems(current => current.filter(item => !(item.product.id === productId && item.size === size)))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = items.reduce((acc, item) => acc + (item.product.is_available ? (item.product.price * item.quantity) : 0), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
