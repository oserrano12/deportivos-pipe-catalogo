import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/data/products'
import { ProductClientView } from '@/components/product/ProductClientView'
import { ProductCard } from '@/components/catalog/ProductCard'
import { Metadata, ResolvingMetadata } from 'next'

import { RelatedAndFavorites } from '@/components/product/RelatedAndFavorites'

export const revalidate = 60 // 1 minute ISR caching for extreme performance

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

  // Fetch all products to pass to the client component for client-side favorite mixing
  const allProducts = await getProducts()

  return (
    <>
      <ProductClientView product={product} />
      <RelatedAndFavorites 
        currentProductId={product.id} 
        categoryId={product.category_id} 
        allProducts={allProducts} 
      />
    </>
  )
}
