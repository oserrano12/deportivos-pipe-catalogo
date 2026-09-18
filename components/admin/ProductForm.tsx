'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { saveProduct } from '@/app/admin/productos/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ProductFormProps {
  product?: any
  brands: any[]
  categories: any[]
}

const COLOMBIA_SIZES = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45']

export function ProductForm({ product, brands, categories }: ProductFormProps) {
  const router = useRouter()
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [priceStr, setPriceStr] = useState(product?.price?.toString() || '')
  const [selectedSizes, setSelectedSizes] = useState<string[]>(product?.sizes || [])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const generateSlug = (val: string) => {
    setName(val)
    if (!product) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    setPriceStr(rawValue)
  }

  const formatPrice = (val: string) => {
    if (!val) return ''
    return parseInt(val, 10).toLocaleString('es-CO')
  }

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const urls = filesArray.map(file => URL.createObjectURL(file))
      setPreviewImages(urls)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await saveProduct(formData)
      toast.success('Producto guardado correctamente')
      router.push('/admin')
      router.refresh()
    } catch (error) {
      toast.error('Ocurrió un error al guardar')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 rounded-xl border shadow-sm">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="existing_images" value={JSON.stringify(product?.images || [])} />
      <input type="hidden" name="sizes" value={selectedSizes.join(',')} />
      <input type="hidden" name="price" value={priceStr} />

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

      <div className="space-y-2">
        <Label htmlFor="price_display">Precio (COP)</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
          <Input 
            id="price_display" 
            type="text" 
            className="pl-7 font-bold"
            value={formatPrice(priceStr)} 
            onChange={handlePriceChange} 
            required 
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Tallas Disponibles (EUR/COL)</Label>
        <div className="grid grid-cols-5 md:grid-cols-8 gap-2">
          {COLOMBIA_SIZES.map(size => {
            const isSelected = selectedSizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`h-10 rounded-md border text-sm font-bold transition-colors ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-muted text-muted-foreground'
                }`}
              >
                {size}
              </button>
            )
          })}
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
        <Input id="images" name="images" type="file" multiple accept="image/*" onChange={handleImageSelect} />
        
        {/* Previews of newly selected images */}
        {previewImages.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-xs text-muted-foreground">Archivos por subir:</p>
            <div className="flex gap-2 flex-wrap">
              {previewImages.map((img, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={idx} src={img} alt="Preview" className="w-16 h-16 object-cover rounded-md border border-primary/50" />
              ))}
            </div>
          </div>
        )}

        {/* Existing Images */}
        {product?.images && product.images.length > 0 && previewImages.length === 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-xs text-muted-foreground">Imágenes actuales:</p>
            <div className="flex gap-2 flex-wrap">
              {product.images.map((img: string, idx: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={idx} src={img} alt="Current" className="w-16 h-16 object-cover rounded-md border opacity-80" />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_available" defaultChecked={product ? product.is_available : true} className="w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
          <span className="text-sm font-medium">Disponible (En Stock)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_featured" defaultChecked={product ? product.is_featured : false} className="w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
          <span className="text-sm font-medium">Destacado (Home)</span>
        </label>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={loading} className="px-8 font-bold">
          {loading ? 'Guardando...' : 'Guardar Producto'}
        </Button>
      </div>
    </form>
  )
}
