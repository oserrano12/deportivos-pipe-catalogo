import { MetadataRoute } from 'next'
import { getProducts, getCategories, getBrands } from '@/lib/data/products'

export const revalidate = 3600 // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.deportivospipe.com'
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/favoritos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  try {
    // Fetch all available products
    const products = await getProducts()
    
    // Add product URLs
    const productRoutes = products
      .filter(p => p.is_available)
      .map(product => ({
        url: `${baseUrl}/producto/${product.slug}`,
        lastModified: product.created_at ? new Date(product.created_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }))

    return [...routes, ...productRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return routes
  }
}
