'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { seedTaxonomies } from '@/app/admin/actions'
import { toast } from 'sonner'
import { Loader2, Tags } from 'lucide-react'

export function SeedTaxonomiesButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button 
      variant="outline" 
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await seedTaxonomies()
            toast.success('¡Marcas y Categorías añadidas con éxito!')
          } catch (error: any) {
            toast.error(error.message || 'Error al agregar marcas')
          }
        })
      }}
      className="gap-2 font-bold"
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tags className="h-4 w-4 text-primary" />}
      Añadir Marcas
    </Button>
  )
}
