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
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
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
  const totalPrice = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
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
