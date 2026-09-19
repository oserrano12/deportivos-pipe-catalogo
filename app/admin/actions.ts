'use strict'
'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function toggleAvailability(id: string, is_available: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase.from('products').update({ is_available }).eq('id', id)
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function toggleFeatured(id: string, is_featured: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase.from('products').update({ is_featured }).eq('id', id)
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase.from('products').delete().eq('id', id)
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function seedProducts() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get brands and categories to assign randomly
  const { data: brands } = await supabase.from('brands').select('id, name')
  const { data: categories } = await supabase.from('categories').select('id, name')

  if (!brands || brands.length === 0 || !categories || categories.length === 0) {
    throw new Error('Debes crear al menos una marca y una categoría primero')
  }

  const placeholderImages = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614c3a?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop'
  ]

  const models = ['Air Max', 'Runner Zoom', 'Classic Retro', 'Street Force', 'Elite Pro', 'Cloud Walk', 'Speed Drift', 'Urban Step', 'Jump High', 'Trail Blaze']

  for (let i = 0; i < 10; i++) {
    const randomBrand = brands[Math.floor(Math.random() * brands.length)]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomPrice = Math.floor(Math.random() * 200 + 100) * 1000 // 100k - 300k
    
    // Create random sizes
    const sizes = []
    if (Math.random() > 0.5) sizes.push('C-40', 'C-41', 'C-42')
    if (Math.random() > 0.5) sizes.push('D-36', 'D-37', 'D-38')
    if (sizes.length === 0) sizes.push('C-40') // Ensure at least one size

    await supabase.from('products').insert({
      name: `${randomBrand.name} ${models[i]}`,
      slug: `seed-product-${Date.now()}-${i}`,
      description: 'Zapatos de prueba generados automáticamente para visualizar el diseño del catálogo y el carrusel de inicio. Puedes eliminarlos cuando quieras.',
      price: randomPrice,
      brand_id: randomBrand.id,
      category_id: randomCategory.id,
      sizes: sizes,
      images: [placeholderImages[i]],
      is_available: true,
      is_featured: i < 4 // Make first 4 featured for the carousel!
    })
  }

  revalidatePath('/admin')
  revalidatePath('/')
}
