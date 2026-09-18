'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/app/admin/actions'
import { toast } from 'sonner'

export function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    
    setLoading(true)
    try {
      await deleteProduct(id)
      toast.success('Producto eliminado')
    } catch (error) {
      toast.error('Error al eliminar producto')
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleDelete} disabled={loading} variant="destructive" size="sm">
      {loading ? '...' : 'Eliminar'}
    </Button>
  )
}
