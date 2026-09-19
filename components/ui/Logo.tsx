import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
}

export function Logo({ className = "h-8" }: LogoProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Deportivos Pipe"
        width={300}
        height={80}
        priority
        className="object-contain w-auto h-full"
      />
    </div>
  )
}
