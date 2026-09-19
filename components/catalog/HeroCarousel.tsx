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
    <div className="w-full relative group/carousel">
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
                <Link href={`/producto/${product.slug}`} className="relative flex flex-col items-center justify-start w-full min-h-[70vh] md:min-h-[80vh] overflow-hidden group">
                  
                  {/* Dynamic Brand Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B3E] via-[#0047AB] to-[#007FFF] opacity-90 z-0 transition-opacity duration-700 group-hover:opacity-100" />
                  
                  {/* Content Container */}
                  <div className="relative z-20 flex flex-col items-center text-center px-4 pt-24 md:pt-32 pb-12 w-full max-w-4xl mx-auto">
                    
                    {/* Pill Badge */}
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6 md:mb-8 shadow-sm">
                      Destacado
                    </span>
                    
                    {/* Main Title (Elegant, Large) */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-[1.05] drop-shadow-lg">
                      {product.name}
                    </h1>
                    
                    <p className="text-white/80 font-medium text-sm md:text-lg max-w-2xl mb-10 drop-shadow-md">
                      {product.description || "Descubre el máximo confort y estilo. Toca para ver los detalles completos de este producto."}
                    </p>
                    
                    {/* Pill Buttons */}
                    <div className="flex items-center gap-4">
                      <div className="px-8 py-4 bg-white text-[#0047AB] text-sm md:text-base font-black uppercase tracking-wider rounded-full hover:bg-gray-100 transition-transform hover:scale-105 shadow-xl">
                        Ver Producto
                      </div>
                    </div>

                  </div>

                  {/* Floating Sneaker Image */}
                  <div className="relative z-10 w-full max-w-2xl mt-auto md:-mt-12 h-[35vh] md:h-[50vh] flex items-center justify-center">
                    <div className="relative w-full h-full p-4 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:-translate-y-4">
                      {/* Sneaker shadow for realism */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/40 blur-2xl rounded-[100%]" />
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        priority={index === 0}
                        className="object-contain drop-shadow-2xl mix-blend-normal"
                        sizes="(max-width: 768px) 100vw, 80vw"
                      />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        
        {/* Navigation Buttons (Desktop Only or All Devices) */}
        <div className="hidden md:block">
          <CarouselPrevious className="absolute z-30 !left-6 h-14 w-14 shadow-xl border-border bg-background/80 backdrop-blur-md hover:bg-background hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 [&_svg]:size-6" />
          <CarouselNext className="absolute z-30 !right-6 h-14 w-14 shadow-xl border-border bg-background/80 backdrop-blur-md hover:bg-background hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 [&_svg]:size-6" />
        </div>
      </Carousel>
    </div>
  )
}
