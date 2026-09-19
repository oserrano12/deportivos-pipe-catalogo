'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProductWithRelations } from '@/lib/data/products'
import { Database } from '@/types/database.types'
import { WOMEN_SIZES, MEN_SIZES } from '@/lib/sizing'
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
      const result = await saveProduct(formData)
      if (result?.success) {
        toast.success('Producto guardado correctamente')
        router.push('/admin')
        router.refresh()
      } else {
        toast.error(result?.error || 'Ocurrió un error al guardar')
        setLoading(false)
      }
    } catch (error) {
      toast.error('Error inesperado al guardar')
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
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">$</span>
          <Input 
            id="price_display" 
            type="text" 
            className="pl-8 font-bold"
            value={formatPrice(priceStr)} 
            onChange={handlePriceChange} 
            placeholder="Opcional"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Tallas de Dama (EUR)</Label>
        <div className="grid grid-cols-5 gap-2">
          {WOMEN_SIZES.map(size => {
            const isSelected = selectedSizes.includes(size.id)
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => toggleSize(size.id)}
                className={`h-10 rounded-md border text-sm font-bold transition-colors ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-muted text-muted-foreground'
                }`}
              >
                {size.eur}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base">Tallas de Caballero (EUR)</Label>
        <div className="grid grid-cols-5 gap-2">
          {MEN_SIZES.map(size => {
            const isSelected = selectedSizes.includes(size.id)
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => toggleSize(size.id)}
                className={`h-10 rounded-md border text-sm font-bold transition-colors ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-muted text-muted-foreground'
                }`}
              >
                {size.eur}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand_id">Marca</Label>
          <select id="brand_id" name="brand_id" className="flex h-10 w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" defaultValue={product?.brand_id || ''}>
            <option value="" className="bg-background text-foreground">Ninguna</option>
            {brands.map(b => (
              <option key={b.id} value={b.id} className="bg-background text-foreground">{b.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category_id">Categoría</Label>
          <select id="category_id" name="category_id" className="flex h-10 w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" defaultValue={product?.category_id || ''}>
            <option value="" className="bg-background text-foreground">Ninguna</option>
            {categories.map(c => (
              <option key={c.id} value={c.id} className="bg-background text-foreground">{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4 bg-secondary/20 p-4 rounded-xl border">
        <Label htmlFor="images" className="text-base font-bold">Imágenes del Producto</Label>
        
        <div className="flex items-center gap-4">
          <Input id="images" name="images" type="file" multiple accept="image/*" onChange={handleImageSelect} className="bg-background" />
        </div>
        
        {/* Gallery Preview Area */}
        <div className="space-y-4 pt-2">
          {/* Existing Images */}
          {product?.images && product.images.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Imágenes Actualmente Publicadas
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.images.map((img: string, idx: number) => (
                  <a href={img} target="_blank" rel="noopener noreferrer" key={`exist-${idx}`} className="relative group rounded-xl overflow-hidden border-2 border-border shadow-sm hover:border-primary transition-colors cursor-pointer block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="Current" className="w-28 h-28 object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-background/80 text-foreground text-xs font-bold px-2 py-1 rounded shadow backdrop-blur-sm transition-opacity">Ver</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* New Images Preview */}
          {previewImages.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Nuevas Imágenes por Subir
              </p>
              <div className="flex gap-3 flex-wrap">
                {previewImages.map((img, idx) => (
                  <a href={img} target="_blank" rel="noopener noreferrer" key={`new-${idx}`} className="relative group rounded-xl overflow-hidden border-2 border-primary shadow-md hover:border-primary/80 transition-colors cursor-pointer block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="Preview" className="w-28 h-28 object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded shadow transition-opacity">Ver</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
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
