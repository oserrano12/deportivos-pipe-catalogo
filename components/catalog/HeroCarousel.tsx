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
                <Link href={`/producto/${product.slug}`} className="relative flex flex-col md:flex-row items-center justify-center md:justify-between w-full min-h-[calc(100vh-5rem)] md:min-h-[85vh] overflow-hidden group bg-background border-b border-border py-8 px-5 md:p-12 lg:p-24 gap-12 md:gap-8">
                  
                  {/* MASSIVE BACKGROUND TEXT */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
                    <span className="text-[15rem] md:text-[25rem] font-black italic tracking-tighter text-foreground/[0.04] dark:text-foreground/[0.15] whitespace-nowrap -rotate-6 scale-125 md:scale-110 group-hover:scale-105 transition-transform duration-1000">
                      {product.brand?.name?.toUpperCase() || 'KINETIC'}
                    </span>
                  </div>

                  {/* KINETIC LIGHT STREAK */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-48 bg-primary/40 dark:bg-primary/30 blur-[80px] md:blur-[120px] -rotate-12 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  {/* Left: Text Section */}
                  <div className="relative z-20 w-full md:w-1/2 flex flex-col items-start justify-center text-left">
                    <span className="inline-block px-4 py-1.5 bg-foreground text-background text-[10px] font-black italic uppercase tracking-widest rounded-none mb-6 shadow-[4px_4px_0_0_#007FFF]">
                      Destacado
                    </span>
                    <h1 className="text-[3.25rem] sm:text-6xl md:text-6xl lg:text-8xl font-black italic uppercase tracking-tighter text-foreground mb-4 leading-[0.85] flex flex-col">
                      <span className="translate-x-0 group-hover:translate-x-4 transition-transform duration-500">MAXIMIZE</span> 
                      <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-foreground)' }}>YOUR</span>
                      <span className="text-primary -translate-x-2 group-hover:translate-x-2 transition-transform duration-700">POTENTIAL.</span>
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm md:text-base max-w-sm mb-8 mt-4 border-l-2 border-primary pl-4">
                      <strong className="text-foreground">{product.name}</strong> <br/>
                      {product.description || "Diseñadas para el impacto máximo. No te quedes atrás."}
                    </p>
                    <div className="px-10 py-5 bg-foreground text-background hover:bg-primary hover:text-white text-sm font-black italic uppercase tracking-widest rounded-none transition-all flex items-center gap-4 group/btn shadow-[8px_8px_0_0_#007FFF] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1">
                      Comprar Ahora
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
