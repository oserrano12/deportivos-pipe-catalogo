'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { saveProduct } from '@/app/admin/productos/actions'

interface ProductFormProps {
  product?: any
  brands: any[]
  categories: any[]
}

export function ProductForm({ product, brands, categories }: ProductFormProps) {
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  
  const generateSlug = (val: string) => {
    setName(val)
    if (!product) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  return (
    <form action={saveProduct} className="space-y-6 max-w-2xl bg-card p-6 rounded-xl border">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="existing_images" value={JSON.stringify(product?.images || [])} />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Producto</Label>
          <Input id="name" name="name" value={name} onChange={(e) => generateSlug(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <textarea 
          id="description" 
          name="description" 
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue={product?.description || ''}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio (COP)</Label>
          <Input id="price" name="price" type="number" defaultValue={product?.price || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sizes">Tallas (separadas por coma)</Label>
          <Input id="sizes" name="sizes" placeholder="Ej: 38, 39, 40" defaultValue={product?.sizes?.join(', ') || ''} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand_id">Marca</Label>
          <select id="brand_id" name="brand_id" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" defaultValue={product?.brand_id || ''}>
            <option value="">Ninguna</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category_id">Categoría</Label>
          <select id="category_id" name="category_id" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" defaultValue={product?.category_id || ''}>
            <option value="">Ninguna</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Nuevas Imágenes</Label>
        <Input id="images" name="images" type="file" multiple accept="image/*" />
        {product?.images && product.images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {product.images.map((img: string, idx: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={idx} src={img} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_available" defaultChecked={product ? product.is_available : true} className="w-4 h-4" />
          <span className="text-sm font-medium">Disponible</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_featured" defaultChecked={product ? product.is_featured : false} className="w-4 h-4" />
          <span className="text-sm font-medium">Destacado</span>
        </label>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit">Guardar Producto</Button>
      </div>
    </form>
  )
}
