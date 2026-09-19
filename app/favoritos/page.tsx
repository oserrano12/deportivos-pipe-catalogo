import { getProducts } from '@/lib/data/products'
import { FavoritesGrid } from '@/components/catalog/FavoritesGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mis Favoritos | Deportivos Pipe',
  description: 'Tus zapatillas y prendas guardadas para comprar después.',
}

export const revalidate = 60

export default async function FavoritosPage() {
  const allProducts = await getProducts()

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
          <span className="text-red-500">🤍</span> Mis Favoritos
        </h1>
        <p className="text-muted-foreground font-medium">
          Tus productos guardados se mantienen en tu dispositivo para cuando estés listo para comprar.
        </p>
      </div>

      <FavoritesGrid allProducts={allProducts} />
    </div>
  )
}
