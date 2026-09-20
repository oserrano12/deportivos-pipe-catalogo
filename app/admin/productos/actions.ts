'use strict'
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function saveProduct(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  
  const priceRaw = formData.get('price') as string
  const price = priceRaw ? parseInt(priceRaw, 10) : 0

  const category_id = formData.get('category_id') as string || null
  const brand_id = formData.get('brand_id') as string || null
  const is_available = formData.get('is_available') === 'on'
  const is_featured = formData.get('is_featured') === 'on'
  const base_sku = formData.get('base_sku') as string || null
  
  const sizesRaw = formData.get('sizes') as string
  const sizes = sizesRaw ? sizesRaw.split(',').map(s => s.trim()).filter(Boolean) : []

  const existingImages = JSON.parse(formData.get('existing_images') as string || '[]')

  // Handle image uploads
  const imageFiles = formData.getAll('images') as File[]
  const uploadedUrls: string[] = [...existingImages]

  for (const file of imageFiles) {
    if (file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath)
        
        uploadedUrls.push(publicUrl)
      } else {
        console.error('Storage error:', uploadError)
      }
    }
  }

  const payload = {
    name,
    slug,
    description,
    price,
    category_id,
    brand_id,
    is_available,
    is_featured,
    base_sku,
    sizes,
    images: uploadedUrls
  }

  if (id) {
    const { error } = await supabase.from('products').update(payload).eq('id', id)
    if (error) return { success: false, error: error.message }
  } else {
    const { error } = await supabase.from('products').insert(payload)
    if (error) return { success: false, error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}
