'use client'

import * as React from "react"
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel"
import { ProductWithRelations } from "@/lib/data/products"
import Autoplay from "embla-carousel-autoplay"

import Image from 'next/image'

export function HeroCarousel({ featuredProducts }: { featuredProducts: ProductWithRelations[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  if (!featuredProducts || featuredProducts.length === 0) {
    return null
  }

  return (
    <div className="w-full relative bg-secondary/20 border-b">
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
                <Link href={`/producto/${product.slug}`} className="block relative h-[60vh] md:h-[75vh] w-full overflow-hidden group bg-muted">
                  
                  {/* Main Full-Screen Image */}
                  <div className="absolute inset-0 z-10 transition-transform duration-1000 group-hover:scale-105" style={{ willChange: 'transform' }}>
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      priority={index === 0}
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>

                  {/* Subtle Gradient Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20 opacity-80" />

                  {/* Floating Box overlay */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-12 md:right-12 md:left-auto md:translate-x-0 w-[90%] md:w-[420px] bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-6 md:p-8 z-30 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/20">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-sm inline-block">
                      Destacado
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground mb-3 leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground font-medium text-sm md:text-base line-clamp-2">
                      {product.description || "Toca para ver detalles de este increíble producto."}
                    </p>
                    <div className="mt-6 text-sm font-bold text-primary flex items-center gap-2 group/btn">
                      Ver Producto
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
