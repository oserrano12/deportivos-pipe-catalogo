import { getProducts } from '@/lib/data/products'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { Plus } from 'lucide-react'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'
import { AvailabilitySwitch, FeaturedSwitch } from '@/components/admin/ProductSwitches'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const revalidate = 0

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const products = await getProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Catálogo</h1>
        <Link href="/admin/productos/nuevo" className={buttonVariants({ variant: "default" }) + " gap-2 font-bold"}>
          <Plus className="w-4 h-4" /> Nuevo Producto
        </Link>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Producto</TableHead>
              <TableHead>Tallas / Géneros</TableHead>
              <TableHead className="text-center">Disponible</TableHead>
              <TableHead className="text-center">Destacado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  No hay productos en tu catálogo aún.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => {
                const imageUrl = product.images && product.images.length > 0 
                  ? product.images[0] 
                  : '/placeholder-sneaker.webp'

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imageUrl} alt={product.name} className="w-14 h-14 rounded-lg object-cover bg-secondary border border-border/50" />
                        <div>
                          <div className="font-bold text-sm leading-tight">{product.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                            <span className="uppercase tracking-wider">{product.brand?.name || 'Sin Marca'}</span>
                            {product.category?.name && (
                              <>
                                <span>&bull;</span>
                                <span>{product.category.name}</span>
                              </>
                            )}
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
                          product.sizes.map(size => (
                            <Badge key={size} variant="secondary" className="text-[10px] px-1.5 py-0">
                              {size.replace('C-', 'Cab: ').replace('D-', 'Dam: ')}
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
                        <DeleteProductButton id={product.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
