'use client'

import { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from 'next/navigation'

export function FilterDrawer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Just an example state for size filtering
  const [selectedSize, setSelectedSize] = useState<string | null>(searchParams.get('talla'))

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedSize) {
      params.set('talla', selectedSize)
    } else {
      params.delete('talla')
    }
    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedSize(null)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('talla')
    router.push(`/?${params.toString()}`)
  }

  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"]

  return (
    <Drawer>
      <DrawerTrigger className="inline-flex items-center justify-center h-9 gap-2 px-3 rounded-full border border-border bg-background text-sm font-medium hover:bg-muted hover:text-foreground outline-none">
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Filtrar Catálogo</DrawerTitle>
            <DrawerDescription>Encuentra tus sneakers ideales.</DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0">
            <h4 className="text-sm font-medium mb-3 text-foreground">Talla (EUR)</h4>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map(size => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'default' : 'outline'}
                  className="rounded-xl font-bold"
                  onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          <DrawerFooter>
            <DrawerClose onClick={applyFilters} className="w-full h-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/90 outline-none">
              Aplicar Filtros
            </DrawerClose>
            <DrawerClose onClick={clearFilters} className="w-full h-10 inline-flex items-center justify-center rounded-md hover:bg-muted hover:text-foreground text-sm font-medium outline-none">
              Limpiar
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
