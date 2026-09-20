import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    // Provide a custom server-side client with the Service Role Key
    // inside the handler to avoid build-time errors if the env var is missing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // 1. Validate Secret Token
    const authHeader = req.headers.get('x-webhook-secret')
    const expectedSecret = process.env.POS_WEBHOOK_SECRET

    if (!expectedSecret || authHeader !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse payload
    const body = await req.json()

    // -------------------------------------------------------------
    // EVENT: product.upsert (Create or Update Product from POS)
    // -------------------------------------------------------------
    if (body.event === 'product.upsert') {
      const p = body.product
      if (!p || !p.base_sku) {
        return NextResponse.json({ error: 'Missing product payload or base_sku' }, { status: 400 })
      }

      // Lookup brand and category by name to get their UUIDs
      let brand_id = null
      let category_id = null

      if (p.marca) {
        const { data: brand } = await supabaseAdmin.from('brands').select('id').ilike('name', p.marca).maybeSingle()
        if (brand) brand_id = brand.id
      }
      if (p.categoria) {
        const { data: cat } = await supabaseAdmin.from('categories').select('id').ilike('name', p.categoria).maybeSingle()
        if (cat) category_id = cat.id
      }

      // Check if product already exists
      const { data: existing } = await supabaseAdmin
        .from('products')
        .select('id, images')
        .eq('base_sku', p.base_sku)
        .maybeSingle()

      if (existing) {
        // Update existing product
        const { error: updateError } = await supabaseAdmin.from('products').update({
          price: p.precio_venta,
          sizes: p.tallas,
          is_available: p.esta_disponible
        }).eq('id', existing.id)

        if (updateError) {
          console.error('Update Error:', updateError)
          return NextResponse.json({ error: 'Database update failed', details: updateError }, { status: 500 })
        }
        return NextResponse.json({ message: 'Product updated successfully' })
      } else {
        // Create new product
        // Generate a random slug
        const baseSlug = p.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const randomSuffix = Math.random().toString(36).substring(2, 6)
        const slug = `${baseSlug}-${randomSuffix}`

        const { error: insertError } = await supabaseAdmin.from('products').insert([{
          name: p.nombre,
          slug: slug,
          brand_id: brand_id,
          category_id: category_id,
          price: p.precio_venta,
          base_sku: p.base_sku,
          sizes: p.tallas,
          images: p.ruta_imagen ? [p.ruta_imagen] : [],
          is_available: p.esta_disponible,
          is_featured: false
        }])

        if (insertError) {
          console.error('Insert Error:', insertError)
          return NextResponse.json({ error: 'Database insert failed', details: insertError }, { status: 500 })
        }
        return NextResponse.json({ message: 'Product created successfully' })
      }
    }

    // -------------------------------------------------------------
    // EVENT: pos.sale_completed (Update sizes stock)
    // -------------------------------------------------------------
    if (body.event === 'pos.sale_completed') {
      if (!body.items || !Array.isArray(body.items)) {
        return NextResponse.json({ error: 'Invalid items payload' }, { status: 400 })
      }

      const items = body.items
      const processedItems = []
      const errors = []

      // 3. Process each item
      for (const item of items) {
        if (!item.base_sku || !item.talla || item.esta_agotado === undefined) {
          errors.push({ item, error: 'Missing required fields (base_sku, talla, esta_agotado)' })
          continue
        }

        // If the specific size sold out, we need to remove it from the sizes array
        if (item.esta_agotado === true) {
          // Fetch current product sizes
          const { data: product, error: fetchError } = await supabaseAdmin
            .from('products')
            .select('id, sizes, is_available')
            .eq('base_sku', item.base_sku)
            .single()

          if (fetchError || !product) {
            errors.push({ item, error: 'Product base_sku not found in catalog' })
            continue
          }

          const currentSizes = product.sizes || []
          
          // Remove the size. This handles exact match "42" or prefixed "C-42"
          const remainingSizes = currentSizes.filter((s: string) => {
            const sizeNumber = s.split('-').pop() // gets "42" from "C-42" or "42"
            return sizeNumber !== item.talla
          })

          // Check if anything changed to avoid unnecessary updates
          if (remainingSizes.length === currentSizes.length) {
            processedItems.push({ sku: item.sku, status: 'ignored (size not found in catalog)' })
            continue
          }

          // Update the database
          const { error: updateError } = await supabaseAdmin
            .from('products')
            .update({
              sizes: remainingSizes,
              is_available: remainingSizes.length > 0 // if no sizes left, mark as unavailable
            })
            .eq('id', product.id)

          if (updateError) {
            errors.push({ item, error: 'Failed to update product sizes' })
          } else {
            processedItems.push({ sku: item.sku, status: 'sold out', remaining_sizes: remainingSizes })
          }
        } else {
          processedItems.push({ sku: item.sku, status: 'ignored (still in stock)' })
        }
      }

      return NextResponse.json({
        message: 'Sync completed',
        processed: processedItems,
        errors: errors.length > 0 ? errors : undefined
      })
    }

    return NextResponse.json({ error: 'Unhandled event type' }, { status: 400 })

  } catch (error: any) {
    console.error('POS Sync Error:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
  }
}
