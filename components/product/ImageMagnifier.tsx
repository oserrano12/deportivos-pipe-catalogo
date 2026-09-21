'use client'

import React, { useState, MouseEvent, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

interface ImageMagnifierProps {
  src: string
  alt: string
  priority?: boolean
  fetchPriority?: "high" | "auto" | "low"
}

export function ImageMagnifier({ src, alt, priority, fetchPriority }: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [[x, y], setXY] = useState([0, 0])
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [portalNode, setPortalNode] = useState<Element | null>(null)
  const [rightColLeft, setRightColLeft] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const zoomRatio = 2.5

  useEffect(() => {
    setPortalNode(document.body)
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return
    if (!containerRef.current) return

    const bounds = containerRef.current.getBoundingClientRect()
    setRect(bounds)
    
    const rightCol = document.getElementById('right-column-details')
    if (rightCol) {
      setRightColLeft(rightCol.getBoundingClientRect().left)
    } else {
      setRightColLeft(bounds.right + 40) // Fallback
    }
    
    // Lens is always a square based on container width
    const lSize = bounds.width / zoomRatio

    // Calculate mouse position relative to container
    let mx = e.clientX - bounds.left
    let my = e.clientY - bounds.top

    // Clamp the lens so it doesn't go outside the image
    if (mx < lSize / 2) mx = lSize / 2
    if (mx > bounds.width - lSize / 2) mx = bounds.width - lSize / 2
    if (my < lSize / 2) my = lSize / 2
    if (my > bounds.height - lSize / 2) my = bounds.height - lSize / 2

    setXY([mx, my])
  }

  const bounds = rect
  const lSize = bounds ? bounds.width / zoomRatio : 0
  const bgPosX = bounds ? -(x - lSize / 2) * zoomRatio : 0
  const bgPosY = bounds ? -(y - lSize / 2) * zoomRatio : 0

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square bg-secondary/10 overflow-hidden cursor-zoom-in group"
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
        className="w-full h-auto object-contain"
      />

      {/* Lens Overlay */}
      {showMagnifier && bounds && (
        <div 
          className="absolute pointer-events-none z-40 bg-black/10 border border-primary/50 hidden md:block backdrop-brightness-110"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: `${lSize}px`,
            height: `${lSize}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Side Box for Magnified View via Portal */}
      {showMagnifier && portalNode && bounds && createPortal(
        <div 
          className="fixed pointer-events-none z-[100] bg-white border border-border shadow-2xl rounded-2xl overflow-hidden hidden md:block"
          style={{
            left: `${rightColLeft}px`,
            top: `${bounds.top}px`,
            width: `${bounds.width}px`,
            height: `${bounds.width}px`, // Square matching the container's width
            backgroundImage: `url(${src})`,
            backgroundPosition: `${bgPosX}px ${bgPosY}px`,
            backgroundSize: `${bounds.width * zoomRatio}px ${bounds.height * zoomRatio}px`,
            backgroundRepeat: 'no-repeat',
          }}
        />,
        portalNode
      )}
    </div>
  )
}
