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
                <Link href={`/producto/${product.slug}`} className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-[75vh] md:min-h-[85vh] overflow-hidden group bg-background border-b border-border p-6 md:p-12 lg:p-24 gap-8">
                  
                  {/* MASSIVE BACKGROUND TEXT */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
                    <span className="text-[15rem] md:text-[25rem] font-black tracking-tighter text-foreground/10 dark:text-foreground/20 whitespace-nowrap -rotate-2 scale-110 md:scale-100 group-hover:scale-105 transition-transform duration-1000">
                      {product.brand?.name?.toUpperCase() || 'PIPE'}
                    </span>
                  </div>

                  {/* Left: Text Section */}
                  <div className="relative z-20 w-full md:w-1/3 flex flex-col items-start justify-center text-left">
                    <span className="inline-block px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                      Destacado
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-foreground mb-6 leading-[0.9]">
                      REDEFINE <br/> <span className="text-primary">STYLE.</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm md:text-base max-w-sm mb-8">
                      <strong className="text-foreground">{product.name}</strong> <br/>
                      {product.description || "Designed for maximum impact and bold identities."}
                    </p>
                    <div className="px-8 py-4 border-2 border-foreground bg-transparent hover:bg-foreground text-foreground hover:text-background text-sm font-black uppercase tracking-wider rounded-full transition-all flex items-center gap-3 group/btn">
                      Ver Producto
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>

                  {/* Center/Right: Product Image */}
                  <div className="relative z-10 w-full md:w-2/3 flex items-center justify-center mt-8 md:mt-0">
                    <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[400px] md:max-w-[550px] transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:rotate-2">
                      <div className="absolute inset-0 bg-primary/10 rounded-[2rem] md:rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform duration-700" />
                      <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border-2 border-border bg-background shadow-2xl">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          priority={index === 0}
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                      </div>
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
