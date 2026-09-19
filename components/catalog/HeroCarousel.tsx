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
                <Link href={`/producto/${product.slug}`} className="relative flex flex-col md:flex-row items-center justify-center w-full min-h-[calc(100vh-5rem)] md:min-h-[80vh] overflow-hidden group gap-6 md:gap-12 px-6 md:px-16 pt-6 md:pt-16 pb-28 md:pb-12 max-w-7xl mx-auto">
                  
                  {/* Left: Content Container */}
                  <div className="relative z-20 flex flex-col items-start text-left w-full md:w-1/2 shrink-0">
                    
                    {/* Main Title (Ultra Bold, Left Aligned) */}
                    <div className="flex flex-col space-y-0 md:space-y-2 mb-6">
                      <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                        NUEVA
                      </h1>
                      <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                        COLECCIÓN
                      </h1>
                      <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-outline leading-[0.9]">
                        ZAPATILLAS
                      </h1>
                    </div>
                    
                    <p className="text-foreground/80 font-medium text-sm md:text-lg max-w-md mb-8">
                      <strong className="text-foreground">{product.name}</strong> <br/> {product.description || "Descubre el máximo confort y estilo."}
                    </p>
                    
                    {/* Yellow Accent Button */}
                    <div className="px-8 py-3 bg-[#FFD700] text-black text-sm md:text-base font-black uppercase tracking-wider rounded-full hover:bg-yellow-400 transition-transform hover:scale-105 shadow-xl shadow-yellow-500/20">
                      Ver Detalles
                    </div>

                  </div>

                  {/* Right/Bottom: Sneaker Image Frame */}
                  <div className="relative z-10 w-full md:w-1/2 aspect-square max-w-[320px] sm:max-w-[400px] md:max-w-[500px] mt-4 md:mt-0 mx-auto md:mr-0">
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:-rotate-2">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        priority={index === 0}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
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
