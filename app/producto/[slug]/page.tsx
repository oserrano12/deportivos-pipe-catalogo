import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/data/products'
import { ProductClientView } from '@/components/product/ProductClientView'
import { Metadata } from 'next'

export const revalidate = 0

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)
  
  if (!product) {
    return { title: 'Producto no encontrado' }
  }

  return {
    title: `${product.name} | Deportivos Pipe`,
    description: product.description || `Compra ${product.name} en Deportivos Pipe`,
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  return <ProductClientView product={product} />
}
