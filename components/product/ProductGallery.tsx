'use client'

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"

import Image from 'next/image'

export function ProductGallery({ images }: { images: string[] | null }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const validImages = images && images.length > 0 ? images : ['/placeholder-sneaker.webp']

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative -mx-4 sm:mx-0 space-y-4">
      {/* Main Image Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {validImages.map((src, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[4/3] sm:aspect-square relative bg-secondary/30 md:rounded-2xl overflow-hidden border border-border/50">
                <Image
                  src={src}
                  alt={`Product Image ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {validImages.length > 1 && (
          <>
            <CarouselPrevious className="hidden md:flex absolute left-4 shadow-md bg-background/80 hover:bg-background border-0" />
            <CarouselNext className="hidden md:flex absolute right-4 shadow-md bg-background/80 hover:bg-background border-0" />
          </>
        )}
      </Carousel>
      
      {/* Thumbnails Navigation */}
      {validImages.length > 1 && (
        <div className="flex justify-center md:justify-start gap-3 overflow-x-auto px-4 sm:px-0 scrollbar-hide py-1">
          {validImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                idx === current 
                  ? "border-primary opacity-100 scale-105" 
                  : "border-border opacity-60 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
