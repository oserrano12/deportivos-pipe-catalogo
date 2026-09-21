'use client'

import React, { useState, MouseEvent } from 'react'
import Image from 'next/image'

interface ImageMagnifierProps {
  src: string
  alt: string
  priority?: boolean
  fetchPriority?: "high" | "auto" | "low"
}

export function ImageMagnifier({ src, alt, priority, fetchPriority }: ImageMagnifierProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Only apply hover zoom on larger screens (desktop)
    if (window.innerWidth < 768) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    
    // calculate mouse position on the image
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    
    setPosition({ x, y })
    setCursorPosition({ x: e.clientX - left, y: e.clientY - top })
  }

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-crosshair group"
      onMouseEnter={(e) => {
        if (window.innerWidth >= 768) setShowMagnifier(true)
      }}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={1200}
        priority={priority}
        fetchPriority={fetchPriority}
        sizes="(max-width: 640px) 100vw, 50vw"
        className="w-full h-auto object-contain transition-opacity duration-200"
        style={{ opacity: showMagnifier ? 0 : 1 }}
      />

      {showMagnifier && (
        <div 
          className="absolute inset-0 pointer-events-none z-50 bg-white rounded-2xl"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: '250%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  )
}
