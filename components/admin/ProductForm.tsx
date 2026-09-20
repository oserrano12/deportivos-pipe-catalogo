'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Combobox } from '@/components/ui/combobox'
import { ProductWithRelations } from '@/lib/data/products'
import { Database } from '@/types/database.types'
import { saveProduct } from '@/app/admin/productos/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const WOMEN_SIZES = [
  { id: 'D-35', eur: '35' },
  { id: 'D-36', eur: '36' },
  { id: 'D-37', eur: '37' },
  { id: 'D-38', eur: '38' },
  { id: 'D-39', eur: '39' },
  { id: 'D-40', eur: '40' },
]

const MEN_SIZES = [
  { id: 'C-37', eur: '37' },
  { id: 'C-38', eur: '38' },
  { id: 'C-39', eur: '39' },
  { id: 'C-40', eur: '40' },
  { id: 'C-41', eur: '41' },
  { id: 'C-42', eur: '42' },
  { id: 'C-43', eur: '43' },
]

const CLOTHING_SIZES = [
  { id: 'R-XS', eur: 'XS' },
  { id: 'R-S', eur: 'S' },
  { id: 'R-M', eur: 'M' },
  { id: 'R-L', eur: 'L' },
  { id: 'R-XL', eur: 'XL' },
  { id: 'R-XXL', eur: 'XXL' },
]

export function ProductForm({ product, categories, brands }: { product?: any, categories: any[], brands: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [selectedSizes, setSelectedSizes] = useState<string[]>(product?.sizes || [])
  const [priceStr, setPriceStr] = useState<string>(product?.price?.toString() || '')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(product?.category_id || '')
  const isClothing = categories.find(c => c.id === selectedCategory)?.slug === 'ropa'
  const [compressedFiles, setCompressedFiles] = useState<File[]>([])

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

  const convertToWebP = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas failed'));
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('toBlob failed'));
            const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            resolve(new File([blob], newName, { type: 'image/webp' }));
          }, 'image/webp', 0.85); // 85% quality sweetspot
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      const urls = filesArray.map(file => URL.createObjectURL(file))
      setPreviewImages(urls)
      
      toast.info('Comprimiendo imágenes...')
      try {
        const converted = await Promise.all(filesArray.map(f => convertToWebP(f)))
        setCompressedFiles(converted)
        toast.success('Imágenes optimizadas a WebP')
      } catch (error) {
        toast.error('Error al comprimir imágenes')
        setCompressedFiles(filesArray) // fallback to originals
      }
    } else {
      setPreviewImages([])
      setCompressedFiles([])
    }
  }

  const handleRemoveExistingImage = (idxToRemove: number) => {
    setExistingImages(prev => prev.filter((_, idx) => idx !== idxToRemove))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    // Override the raw files from the input with our compressed ones
    formData.delete('images')
    compressedFiles.forEach(file => {
      formData.append('images', file)
    })
    
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
      <input type="hidden" name="existing_images" value={JSON.stringify(existingImages)} />
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

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="base_sku">SKU Base (Código de Referencia) *Opcional*</Label>
          <Input id="base_sku" name="base_sku" defaultValue={product?.base_sku || ''} placeholder="Ej: SNE-M-BLA-AZU-000" />
          <p className="text-[10px] text-muted-foreground">Si tu sistema POS usa códigos, colócalo aquí para conectarlos.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price_display">Precio (COP) <span className="text-muted-foreground font-normal text-xs">(0 para ocultar precio)</span></Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
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
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="brand_id">Marca</Label>
          <Combobox 
            name="brand_id" 
            options={brands} 
            value={product?.brand_id || ''} 
            onChange={() => {}} 
            placeholder="Buscar o seleccionar marca..." 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category_id">Categoría</Label>
          <Combobox 
            name="category_id" 
            options={categories} 
            value={selectedCategory} 
            onChange={(val) => {
              setSelectedCategory(val);
              setSelectedSizes([]); // Reset sizes when category changes
            }} 
            placeholder="Buscar o seleccionar categoría..." 
          />
        </div>
      </div>

      {isClothing ? (
        <div className="space-y-4">
          <Label className="text-base">Tallas (Ropa)</Label>
          <div className="grid grid-cols-6 gap-2">
            {CLOTHING_SIZES.map(size => {
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
      ) : (
        <>
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
        </>
      )}

      <div className="space-y-4 bg-secondary/20 p-4 rounded-xl border">
        <Label htmlFor="images" className="text-base font-bold">Imágenes del Producto</Label>
        
        <div className="flex items-center gap-4">
          <Input id="images" name="images" type="file" multiple accept="image/*" onChange={handleImageSelect} className="bg-background" />
        </div>
        
        {/* Gallery Preview Area */}
        <div className="space-y-4 pt-2">
          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Imágenes Actualmente Publicadas
              </p>
              <div className="flex gap-3 flex-wrap">
                {existingImages.map((img: string, idx: number) => (
                  <div key={`exist-${idx}`} className="relative group rounded-xl overflow-hidden border-2 border-border shadow-sm hover:border-primary transition-colors block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="Current" className="w-28 h-28 object-cover transition-transform" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none"></div>

                    {/* Delete Button */}
                    <button 
                      type="button" 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveExistingImage(idx); }}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg cursor-pointer pointer-events-auto"
                      aria-label="Eliminar imagen"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
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
