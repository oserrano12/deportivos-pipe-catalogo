import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/data/products'
import { ProductClientView } from '@/components/product/ProductClientView'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Metadata, ResolvingMetadata } from 'next'

export const revalidate = 0

type Params = Promise<{ slug: string }>

export async function generateMetadata(
  { params }: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)
  
  if (!product) {
    return { title: 'Producto no encontrado' }
  }

  const images = product.images && product.images.length > 0 ? [product.images[0]] : []
  const formattedPrice = product.price > 0 ? `$${product.price.toLocaleString('es-CO')}` : 'Consultar precio'
  const ogDescription = `💰 Precio: ${formattedPrice} | ${product.description?.substring(0, 100)}...`

  return {
    title: `${product.name} | Deportivos Pipe`,
    description: ogDescription,
    openGraph: {
      title: `${product.name} | Deportivos Pipe`,
      description: ogDescription,
      images: images,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Deportivos Pipe`,
      description: ogDescription,
      images: images,
    }
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  // Fetch related products (same category, available, excluding current)
  const allProducts = await getProducts()
  const relatedProducts = allProducts
    .filter(p => p.category_id === product.category_id && p.id !== product.id && p.is_available)
    .slice(0, 4)

  return (
    <>
      <ProductClientView product={product} />
      
      {relatedProducts.length > 0 && (
        <div className="container max-w-6xl mx-auto px-4 pb-32">
          <div className="border-t pt-12 space-y-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              También te podría interesar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((related, index) => (
                <ProductCard key={related.id} product={related} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
