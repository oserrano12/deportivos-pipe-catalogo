import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, AlertCircle, ShoppingBag } from "lucide-react"

export function AdminStatsCards({ products }: { products: any[] }) {
  const totalProducts = products.length
  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0)
  const outOfStock = products.filter(p => !p.is_available).length
  const featuredCount = products.filter(p => p.is_featured).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Modelos Totales</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground">En el catálogo digital</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalValue.toLocaleString('es-CO')}</div>
          <p className="text-xs text-muted-foreground">Suma de precios base</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Modelos Agotados</CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{outOfStock}</div>
          <p className="text-xs text-muted-foreground">Productos ocultos al público</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Destacados</CardTitle>
          <ShoppingBag className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{featuredCount}</div>
          <p className="text-xs text-muted-foreground">Mostrándose en el inicio</p>
        </CardContent>
      </Card>
    </div>
  )
}
