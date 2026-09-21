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
  const [[lensW, lensH], setLensSize] = useState([0, 0])
  const [rect, setRect] = useState<DOMRect | null>(null)
  const [portalNode, setPortalNode] = useState<Element | null>(null)
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
    
    // Calculate mouse position relative to container
    let mx = e.clientX - bounds.left
    let my = e.clientY - bounds.top

    const lW = bounds.width / zoomRatio
    const lH = bounds.height / zoomRatio

    setLensSize([lW, lH])

    // Clamp the lens so it doesn't go outside the image
    if (mx < lW / 2) mx = lW / 2
    if (mx > bounds.width - lW / 2) mx = bounds.width - lW / 2
    if (my < lH / 2) my = lH / 2
    if (my > bounds.height - lH / 2) my = bounds.height - lH / 2

    setXY([mx, my])
  }

  // Calculate percentages for background position
  const containerW = rect?.width || 0
  const containerH = rect?.height || 0
  
  // To get background percentage, we map the clamped coords to 0-100%
  const bgX = containerW - lensW > 0 ? ((x - lensW / 2) / (containerW - lensW)) * 100 : 0
  const bgY = containerH - lensH > 0 ? ((y - lensH / 2) / (containerH - lensH)) * 100 : 0

  return (
    <div 
      ref={containerRef}
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
        className="w-full h-auto object-contain"
      />

      {/* Lens Overlay */}
      {showMagnifier && (
        <div 
          className="absolute pointer-events-none z-40 bg-black/10 border border-primary/50 hidden md:block backdrop-brightness-110"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: `${lensW}px`,
            height: `${lensH}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Side Box for Magnified View via Portal */}
      {showMagnifier && portalNode && rect && createPortal(
        <div 
          className="fixed pointer-events-none z-[100] bg-white border border-border shadow-2xl rounded-2xl overflow-hidden hidden md:block"
          style={{
            left: `${rect.right + 20}px`,
            top: `${rect.top}px`,
            width: `calc(100vw - ${rect.right + 40}px)`,
            maxWidth: `${rect.width * 1.5}px`,
            height: `${rect.height}px`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${bgX}% ${bgY}%`,
            backgroundSize: `${zoomRatio * 100}%`,
            backgroundRepeat: 'no-repeat',
          }}
        />,
        portalNode
      )}
    </div>
  )
}
