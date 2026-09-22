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

import { ImageMagnifier } from './ImageMagnifier'
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
    <div className="relative space-y-4">
      {/* Main Image Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {validImages.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-square md:aspect-auto flex items-center justify-center">
                <ImageMagnifier 
                  src={src}
                  alt={`Product Image ${index + 1}`}
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
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
        <div className="flex justify-center gap-3 overflow-x-auto py-2 px-4 sm:px-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {validImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                idx === current 
                  ? "border-primary opacity-100 scale-110 shadow-md" 
                  : "border-border opacity-60 hover:opacity-100 hover:scale-105"
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
