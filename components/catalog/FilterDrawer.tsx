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

export function FilterDrawer({ availableSizes, availableGenders }: { availableSizes: string[], availableGenders: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedSize, setSelectedSize] = useState<string | null>(searchParams.get('talla'))
  const [selectedGender, setSelectedGender] = useState<string | null>(searchParams.get('genero'))

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedSize) params.set('talla', selectedSize)
    else params.delete('talla')

    if (selectedGender) params.set('genero', selectedGender)
    else params.delete('genero')

    params.delete('page')
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  const clearFilters = () => {
    setSelectedSize(null)
    setSelectedGender(null)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('talla')
    params.delete('genero')
    params.delete('page')
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  if (availableSizes.length === 0 && availableGenders.length === 0) {
    return null
  }

  const activeParamsCount = (searchParams.get('talla') ? 1 : 0) + (searchParams.get('genero') ? 1 : 0)

  return (
    <Drawer>
      <DrawerTrigger className="inline-flex items-center justify-center h-11 md:h-11 gap-2 px-6 rounded-full border-2 border-border bg-background text-sm font-bold hover:bg-muted hover:text-foreground outline-none transition-colors shrink-0">
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
        {activeParamsCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-primary text-[10px] font-black text-primary-foreground flex items-center justify-center ml-1">
            {activeParamsCount}
          </span>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Filtrar Catálogo</DrawerTitle>
            <DrawerDescription>Encuentra tus sneakers ideales.</DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0 space-y-6">
            {availableGenders.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-3 text-foreground uppercase tracking-wider">Género</h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableGenders.map(gender => (
                    <Button
                      key={gender}
                      variant={selectedGender === gender ? 'default' : 'outline'}
                      className="rounded-xl font-bold h-12"
                      onClick={() => setSelectedGender(gender === selectedGender ? null : gender)}
                    >
                      {gender}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {availableSizes.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-3 text-foreground uppercase tracking-wider">Talla (EUR)</h3>
                <div className="grid grid-cols-5 gap-2">
                  {availableSizes.map(size => (
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
            )}
          </div>
          
          <DrawerFooter className="mt-4">
            <DrawerClose onClick={applyFilters} className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-wider hover:bg-primary/90 outline-none shadow-md">
              Aplicar Filtros
            </DrawerClose>
            <DrawerClose onClick={clearFilters} className="w-full h-12 inline-flex items-center justify-center rounded-xl hover:bg-muted hover:text-foreground text-sm font-bold outline-none border border-transparent hover:border-border mt-2">
              Limpiar Todo
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
