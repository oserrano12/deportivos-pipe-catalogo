'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { seedProducts } from '@/app/admin/actions'
import { toast } from 'sonner'
import { Loader2, Sparkles } from 'lucide-react'

export function SeedButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button 
      variant="outline" 
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await seedProducts()
            toast.success('¡10 productos generados con éxito!')
          } catch (error: any) {
            toast.error(error.message || 'Error al generar productos')
          }
        })
      }}
      className="gap-2 font-bold"
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-primary" />}
      Generar 10 de Prueba
    </Button>
  )
}
