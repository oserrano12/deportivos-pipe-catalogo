'use client'

import { Button } from "@/components/ui/button"
import { getSizeInfo } from '@/lib/sizing'

interface SizeSelectorProps {
  sizes: string[] | null
  selectedSize: string | null
  onSizeChange: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm uppercase tracking-wider">Tallas Disponibles</h2>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {sizes.map(sizeId => {
          const info = getSizeInfo(sizeId)
          if (!info) return null
          
          return (
            <Button
              key={sizeId}
              type="button"
              variant={selectedSize === sizeId ? "default" : "secondary"}
              className={`rounded-xl font-bold transition-all ${
                selectedSize === sizeId 
                  ? "shadow-md scale-105" 
                  : "hover:border-primary border-2 border-transparent bg-secondary"
              }`}
              onClick={() => onSizeChange(sizeId)}
            >
              {info.eur} EUR
            </Button>
          )
        })}
      </div>
    </div>
  )
}
