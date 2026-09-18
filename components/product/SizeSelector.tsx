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
        <h3 className="font-semibold text-sm uppercase tracking-wider">Tallas Disponibles</h3>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {sizes.map(sizeId => {
          const info = getSizeInfo(sizeId)
          if (!info) return null
          
          return (
            <button
              key={sizeId}
              type="button"
              className={`flex flex-col items-center justify-center h-14 rounded-xl border transition-all ${
                selectedSize === sizeId 
                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" 
                  : "bg-background hover:border-primary text-foreground"
              }`}
              onClick={() => onSizeChange(sizeId)}
            >
              <span className="text-sm font-bold">{info.eur} EUR</span>
              <span className="text-[10px] opacity-70 leading-none mt-0.5">COL {info.col} | US {info.us}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
