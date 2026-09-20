'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { AvailabilitySwitch, FeaturedSwitch } from '@/components/admin/ProductSwitches'
import { deleteProductsBulk, deleteProduct } from '@/app/admin/actions'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'

export function ProductTableClient({ groupedProducts }: { groupedProducts: Record<string, any[]> }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  const toggleProduct = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const toggleCategory = (catProducts: any[]) => {
    const next = new Set(selectedIds)
    const allSelected = catProducts.every(p => next.has(p.id))
    
    if (allSelected) {
      catProducts.forEach(p => next.delete(p.id))
    } else {
      catProducts.forEach(p => next.add(p.id))
    }
    setSelectedIds(next)
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`¿Estás seguro de eliminar ${selectedIds.size} productos? Esta acción no se puede deshacer.`)) return

    setLoading(true)
    try {
      await deleteProductsBulk(Array.from(selectedIds))
      setSelectedIds(new Set())
      toast.success('Productos eliminados con éxito')
    } catch (error) {
      toast.error('Error al eliminar productos')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSingle = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    
    setLoading(true)
    try {
      await deleteProduct(id)
      const next = new Set(selectedIds)
      next.delete(id)
      setSelectedIds(next)
      toast.success('Producto eliminado')
    } catch (error) {
      toast.error('Error al eliminar producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Bulk actions sticky bar */}
      {selectedIds.size > 0 && (
        <div className="sticky top-4 z-50 flex items-center justify-between bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="font-bold">
            {selectedIds.size} producto{selectedIds.size !== 1 && 's'} seleccionado{selectedIds.size !== 1 && 's'}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => setSelectedIds(new Set())} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={loading} className="gap-2">
              <Trash2 className="w-4 h-4" /> Eliminar Seleccionados
            </Button>
          </div>
        </div>
      )}

      {Object.entries(groupedProducts).map(([category, catProducts]) => {
        const allSelected = catProducts.every(p => selectedIds.has(p.id))
        const someSelected = catProducts.some(p => selectedIds.has(p.id))

        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-xl font-bold">{category} <span className="text-muted-foreground text-sm font-normal ml-2">({catProducts.length})</span></h2>
            </div>
            
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-12 text-center">
                      <Checkbox 
                        checked={allSelected} 
                        onCheckedChange={() => toggleCategory(catProducts)} 
                        aria-label="Seleccionar todos los de esta categoría"
                      />
                    </TableHead>
                    <TableHead className="w-[300px]">Producto</TableHead>
                    <TableHead>Tallas / Géneros</TableHead>
                    <TableHead className="text-center">Disponible</TableHead>
                    <TableHead className="text-center">Destacado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catProducts.map((product) => {
                    const imageUrl = product.images && product.images.length > 0 
                      ? product.images[0] 
                      : '/placeholder-sneaker.webp'

                    return (
                      <TableRow key={product.id} className={selectedIds.has(product.id) ? "bg-primary/5" : ""}>
                        <TableCell className="text-center align-middle">
                          <Checkbox 
                            checked={selectedIds.has(product.id)} 
                            onCheckedChange={() => toggleProduct(product.id)}
                            aria-label={`Seleccionar ${product.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-secondary border border-border/50 shrink-0">
                              <Image 
                                src={imageUrl} 
                                alt={product.name} 
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-sm leading-tight">{product.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                <span className="uppercase tracking-wider">{product.brand?.name || 'Sin Marca'}</span>
                                {product.base_sku && <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded">SKU: {product.base_sku}</span>}
                              </div>
                              <div className="text-sm font-semibold text-primary mt-1">
                                ${product.price.toLocaleString('es-CO')}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {product.sizes && product.sizes.length > 0 ? (
                              product.sizes.map((size: string) => (
                                <Badge key={size} variant="secondary" className="text-[10px] px-1.5 py-0">
                                  {size.replace('C-', 'Cab: ').replace('D-', 'Dam: ').replace('R-', 'Ropa: ')}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">Sin tallas</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <AvailabilitySwitch id={product.id} initial={product.is_available} />
                        </TableCell>
                        <TableCell className="text-center">
                          <FeaturedSwitch id={product.id} initial={product.is_featured} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/productos/${product.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                              Editar
                            </Link>
                            <Button variant="destructive" size="sm" disabled={loading} onClick={() => handleDeleteSingle(product.id)}>
                              Eliminar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
