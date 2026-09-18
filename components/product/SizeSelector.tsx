'use client'

import { Button } from "@/components/ui/button"

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
        <h3 className="font-semibold text-sm">Tallas Disponibles (EUR)</h3>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {sizes.map(size => (
          <Button
            key={size}
            type="button"
            variant={selectedSize === size ? "default" : "outline"}
            className={`rounded-xl font-bold transition-all ${
              selectedSize === size 
                ? "shadow-md scale-105" 
                : "hover:border-primary"
            }`}
            onClick={() => onSizeChange(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  )
}
