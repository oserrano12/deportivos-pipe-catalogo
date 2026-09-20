import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Provide a custom server-side client with the Service Role Key
// because we need to bypass RLS to update products from a webhook.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // MUST be the service role key, NOT anon key

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: NextRequest) {
  try {
    // 1. Validate Secret Token
    const authHeader = req.headers.get('x-webhook-secret')
    const expectedSecret = process.env.POS_WEBHOOK_SECRET

    if (!expectedSecret || authHeader !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse payload
    const body = await req.json()

    if (body.event !== 'pos.sale_completed' || !body.items || !Array.isArray(body.items)) {
      return NextResponse.json({ error: 'Invalid event or payload structure' }, { status: 400 })
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

        // Filter out the sold out size
        // Note: The catalog sizes might have prefixes like "C-42", "D-42" depending on gender,
        // or just "42". We will remove any size that ends with the talla (e.g. "-42" or matches "42" exactly).
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

  } catch (error: any) {
    console.error('POS Sync Error:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
  }
}
