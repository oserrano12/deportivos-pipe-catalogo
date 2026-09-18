'use strict'
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function saveProduct(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const price = parseInt(formData.get('price') as string, 10)
  const category_id = formData.get('category_id') as string || null
  const brand_id = formData.get('brand_id') as string || null
  const is_available = formData.get('is_available') === 'on'
  const is_featured = formData.get('is_featured') === 'on'
  
  const sizesString = formData.get('sizes') as string
  const sizes = sizesString ? sizesString.split(',').map(s => s.trim()) : []

  // Images handling
  const existingImages = JSON.parse((formData.get('existing_images') as string) || '[]')
  
  const files = formData.getAll('images') as File[]
  const uploadedUrls: string[] = []

  for (const file of files) {
    if (file.size > 0 && file.name !== 'undefined') {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `sneakers/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath)
        
        uploadedUrls.push(publicUrl)
      } else {
        console.error("Upload error", uploadError)
      }
    }
  }

  const finalImages = [...existingImages, ...uploadedUrls]

  const payload = {
    name,
    slug,
    description,
    price,
    category_id,
    brand_id,
    is_available,
    is_featured,
    sizes,
    images: finalImages
  }

  if (id) {
    await supabase.from('products').update(payload).eq('id', id)
  } else {
    await supabase.from('products').insert(payload)
  }

  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}
