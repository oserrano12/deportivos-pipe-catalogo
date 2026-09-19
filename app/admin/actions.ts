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

  // 1. Delete previous seeded products
  await supabase.from('products').delete().like('slug', 'seed-%')

  // 2. Update real products to have a default description if they don't have one
  await supabase.from('products').update({
    description: 'Experimenta la mejor calidad y confort con nuestro calzado premium. Diseñados para brindar un soporte excepcional y un estilo único en cada paso.'
  }).is('description', null).not('slug', 'like', 'seed-%')

  // 3. Insert new beautiful seed products
  const seedData = [
    {
      name: 'Adidas Ultraboost Pro',
      image: '/seed/media_1789780251021.jpg',
      description: 'Zapatillas de running diseñadas con tecnología de retorno de energía para impulsarte en cada zancada. Super ligeras y transpirables.'
    },
    {
      name: 'Fila Disruptor Gym',
      image: '/seed/media_1789780251026.jpg',
      description: 'El estilo chunky clásico combinado con suelas antideslizantes, ideales para entrenamiento y lucir increíble en el gimnasio.'
    },
    {
      name: 'Jordan 4 Retro Flight',
      image: '/seed/media_1789780251037.jpg',
      description: 'Un ícono de las canchas adaptado a las calles. Diseño legendario con amortiguación Air visible en el talón para máxima comodidad.'
    },
    {
      name: 'Nike Air Max Elite',
      image: '/seed/media_1789780251043.jpg',
      description: 'Silueta aerodinámica con cámara de aire completa. Soporte inigualable para salir a correr o recorrer la ciudad sin cansarte.'
    },
    {
      name: 'Nike Zoom Pegasus',
      image: '/seed/media_1789780251072.jpg',
      description: 'La zapatilla en la que todos confían. Entresuela reactiva y malla exterior para máxima frescura en el asfalto o la pista.'
    }
  ]

  for (let i = 0; i < seedData.length; i++) {
    const randomBrand = brands[Math.floor(Math.random() * brands.length)]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomPrice = Math.floor(Math.random() * 200 + 150) * 1000 // 150k - 350k
    
    await supabase.from('products').insert({
      name: seedData[i].name,
      slug: `seed-v2-${Date.now()}-${i}`,
      description: seedData[i].description,
      price: randomPrice,
      brand_id: randomBrand.id,
      category_id: randomCategory.id,
      sizes: ['C-40', 'C-41', 'C-42', 'D-36', 'D-37'],
      images: [seedData[i].image],
      is_available: true,
      is_featured: true
    })
  }

  revalidatePath('/admin')
  revalidatePath('/')
}
  
export async function seedTaxonomies() {  
  const supabase = await createClient()  
  const { data: { user } } = await supabase.auth.getUser()  
  if (!user) throw new Error('Unauthorized')  

  const brands = [
    { name: 'Nike', slug: 'nike' }, { name: 'Adidas', slug: 'adidas' }, 
    { name: 'Puma', slug: 'puma' }, { name: 'Reebok', slug: 'reebok' }, 
    { name: 'New Balance', slug: 'new-balance' }, { name: 'Jordan', slug: 'jordan' }, 
    { name: 'Converse', slug: 'converse' }, { name: 'Vans', slug: 'vans' }, 
    { name: 'Fila', slug: 'fila' }, { name: 'Under Armour', slug: 'under-armour' }, 
    { name: 'Asics', slug: 'asics' }, { name: 'Skechers', slug: 'skechers' }, 
    { name: 'Balenciaga', slug: 'balenciaga' }, { name: 'Gucci', slug: 'gucci' }
  ]  
  const categories = [
    { name: 'Zapatillas Running', slug: 'running' }, { name: 'Zapatillas Lifestyle', slug: 'lifestyle' }, 
    { name: 'Basketball', slug: 'basketball' }, { name: 'Skateboarding', slug: 'skateboarding' }, 
    { name: 'Deportes', slug: 'deportes' }, { name: 'Ropa', slug: 'ropa' }, { name: 'Accesorios', slug: 'accesorios' }
  ]  

  const { data: existingBrands } = await supabase.from('brands').select('slug')  
  const existingBrandSlugs = new Set(existingBrands?.map(b => b.slug))  
  for (const b of brands) { 
    if (!existingBrandSlugs.has(b.slug)) { 
      await supabase.from('brands').insert(b) 
    } 
  }  

  const { data: existingCats } = await supabase.from('categories').select('slug')  
  const existingCatSlugs = new Set(existingCats?.map(c => c.slug))  
  for (const c of categories) { 
    if (!existingCatSlugs.has(c.slug)) { 
      await supabase.from('categories').insert(c) 
    } 
  }  

  revalidatePath('/admin')  
}
