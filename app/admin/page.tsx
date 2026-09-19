import { getProducts, getCategories, getBrands } from '@/lib/data/products'
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
import { AdminFilters } from '@/components/admin/AdminFilters'
import { AdminStatsCards } from '@/components/admin/AdminStatsCards'
import { AdminCharts } from '@/components/admin/AdminCharts'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import Image from 'next/image'

export const revalidate = 0

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const resolvedParams = await searchParams
  const categoryId = typeof resolvedParams.categoria === 'string' ? resolvedParams.categoria : undefined
  const brandId = typeof resolvedParams.marca === 'string' ? resolvedParams.marca : undefined

  const [allProducts, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands()
  ])

  // Filter products based on search parameters
  let filteredProducts = allProducts
  if (categoryId) {
    filteredProducts = filteredProducts.filter(p => p.category_id === categoryId)
  }
  if (brandId) {
    filteredProducts = filteredProducts.filter(p => p.brand_id === brandId)
  }

  // Group filtered products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const catName = product.category?.name || 'Sin Categoría'
    if (!acc[catName]) acc[catName] = []
    acc[catName].push(product)
    return acc
  }, {} as Record<string, typeof filteredProducts>)

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Gestión de Catálogo</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/productos/nuevo" className={buttonVariants({ variant: "default" }) + " gap-2 font-bold ml-auto md:ml-2"}>
            <Plus className="w-4 h-4" /> Nuevo Producto
          </Link>
        </div>
      </div>

      <AdminStatsCards products={allProducts} />
      <AdminCharts products={allProducts} />

      <div className="pt-6 border-t flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Inventario Detallado</h2>
        <AdminFilters categories={categories} brands={brands} />
      </div>

      <div key={`${categoryId}-${brandId}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground shadow-sm">
            No hay productos que coincidan con los filtros.
          </div>
        ) : (
          Object.entries(groupedProducts).map(([category, catProducts]) => (
            <div key={category} className="space-y-3">
              <h2 className="text-xl font-bold border-b pb-2">{category} <span className="text-muted-foreground text-sm font-normal ml-2">({catProducts.length})</span></h2>
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
                    {catProducts.map((product) => {
                      const imageUrl = product.images && product.images.length > 0 
                        ? product.images[0] 
                        : '/placeholder-sneaker.webp'

                      return (
                        <TableRow key={product.id}>
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
                              <DeleteProductButton id={product.id} />
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
