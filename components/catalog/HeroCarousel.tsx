'use client'

import * as React from "react"
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { ProductWithRelations } from "@/lib/data/products"
import Autoplay from "embla-carousel-autoplay"

import Image from 'next/image'

export function HeroCarousel({ featuredProducts }: { featuredProducts: ProductWithRelations[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  if (!featuredProducts || featuredProducts.length === 0) {
    return null
  }

  return (
    <div className="w-full relative bg-secondary/20 border-b group/carousel">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {featuredProducts.map((product, index) => {
            const imageUrl = product.images && product.images.length > 0 
              ? product.images[0] 
              : '/placeholder-sneaker.webp'

            return (
              <CarouselItem key={product.id}>
                <Link href={`/producto/${product.slug}`} className="flex flex-col md:flex-row w-full md:h-[60vh] overflow-hidden group bg-background border-b border-border/10">
                  
                  {/* Left: Text Section (Bottom on Mobile) */}
                  <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 py-12 md:p-16 lg:px-24 z-20 bg-background shrink-0 relative">
                    <span className="px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-full mb-5 shadow-sm inline-block">
                      Destacado
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-4 leading-[1.05]">
                      {product.name}
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm md:text-base line-clamp-2 max-w-md mb-8">
                      {product.description || "Descubre el máximo confort y estilo. Toca para ver los detalles completos de este producto."}
                    </p>
                    <div className="px-6 py-3.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl flex items-center gap-2 group-hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                      Ver Producto
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>

                  {/* Right: Image Section (Top on Mobile) */}
                  <div className="w-full md:w-1/2 h-[50vh] md:h-full order-1 md:order-2 relative bg-secondary/20 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full p-4 md:p-12 z-10 transition-transform duration-700 group-hover:scale-105">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        priority={index === 0}
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        
        {/* Navigation Buttons */}
        <div className="absolute z-30 bottom-4 right-4 md:bottom-8 md:right-8 flex gap-2">
          <CarouselPrevious className="static translate-y-0 opacity-100 scale-100 bg-background/80 backdrop-blur border-border hover:bg-background" />
          <CarouselNext className="static translate-y-0 opacity-100 scale-100 bg-background/80 backdrop-blur border-border hover:bg-background" />
        </div>
      </Carousel>
    </div>
  )
}
