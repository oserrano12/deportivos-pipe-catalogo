'use client'

import { useTransition } from 'react'
import { Switch } from '@/components/ui/switch'
import { toggleAvailability, toggleFeatured } from '@/app/admin/actions'
import { toast } from 'sonner'

export function AvailabilitySwitch({ id, initial }: { id: string, initial: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Switch 
      checked={initial}
      disabled={isPending}
      onCheckedChange={(checked) => {
        startTransition(async () => {
          await toggleAvailability(id, checked)
          toast.success(checked ? 'Producto activado' : 'Producto desactivado')
        })
      }}
    />
  )
}

export function FeaturedSwitch({ id, initial }: { id: string, initial: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Switch 
      checked={initial}
      disabled={isPending}
      onCheckedChange={(checked) => {
        startTransition(async () => {
          await toggleFeatured(id, checked)
          toast.success(checked ? 'Producto destacado' : 'Producto quitado de destacados')
        })
      }}
    />
  )
}
