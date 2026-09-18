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
import { toggleAvailability, toggleFeatured } from './actions'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

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
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/admin/productos/nuevo" className={buttonVariants({ variant: "default" }) + " gap-2"}>
          <Plus className="w-4 h-4" /> Nuevo Producto
        </Link>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Destacado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No hay productos registrados
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.brand?.name}</div>
                  </TableCell>
                  <TableCell>${product.price.toLocaleString('es-CO')}</TableCell>
                  <TableCell>
                    <form action={toggleAvailability.bind(null, product.id, !product.is_available)}>
                      <button type="submit" className="outline-none">
                        <Badge variant={product.is_available ? "default" : "destructive"}>
                          {product.is_available ? 'Disponible' : 'Agotado'}
                        </Badge>
                      </button>
                    </form>
                  </TableCell>
                  <TableCell>
                    <form action={toggleFeatured.bind(null, product.id, !product.is_featured)}>
                      <button type="submit" className="outline-none">
                        <Badge variant={product.is_featured ? "default" : "outline"} className={product.is_featured ? "bg-primary text-primary-foreground" : ""}>
                          {product.is_featured ? 'Sí' : 'No'}
                        </Badge>
                      </button>
                    </form>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
