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
                <Link href={`/producto/${product.slug}`} className="block relative h-[55vh] md:h-[70vh] w-full overflow-hidden group bg-muted">
                  {/* Background Layer with Blur */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm md:blur-xl scale-110"
                    style={{ backgroundImage: `url(${imageUrl})`, willChange: 'transform' }}
                  />

                  {/* Main Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={product.name}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-contain p-6 pb-40 md:p-16 md:pb-16 md:pr-[400px] z-20 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                    style={{ willChange: 'transform' }}
                  />

                  {/* Floating Box overlay */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-12 md:right-12 md:left-auto md:translate-x-0 w-[90%] md:w-[380px] bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-6 z-30 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-300 group-hover:-translate-y-2">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full mb-3 shadow-sm inline-block">
                      Destacado
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-foreground mb-2 leading-none">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground font-medium text-sm line-clamp-2">
                      {product.description || "Toca para ver detalles de este increíble producto."}
                    </p>
                    <div className="mt-4 text-sm font-bold text-primary flex items-center gap-2">
                      Ver Producto
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
