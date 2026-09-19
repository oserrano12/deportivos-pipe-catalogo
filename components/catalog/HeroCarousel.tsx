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
                <Link href={`/producto/${product.slug}`} className="block relative h-[50vh] md:h-[70vh] w-full overflow-hidden group bg-neutral-950">
                  {/* Background Layer with Blur (Optimized: Less blur on mobile, less opacity to save GPU) */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 md:opacity-40 blur-sm md:blur-xl scale-110"
                    style={{ backgroundImage: `url(${imageUrl})`, willChange: 'transform' }}
                  />
                  
                  {/* Gradient Overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-10" />

                  {/* Main Image (Optimized: Lazy load off-screen, reduce drop-shadow on mobile) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={product.name}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-contain p-8 md:p-16 z-20 transition-transform duration-700 group-hover:scale-105 drop-shadow-xl"
                    style={{ willChange: 'transform' }}
                  />

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-30 flex flex-col items-center text-center">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-sm">
                      Destacado
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2 drop-shadow-md">
                      {product.name}
                    </h2>
                    <p className="text-neutral-300 font-medium md:text-lg">
                      Toca para ver detalles
                    </p>
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
