'use client'

import Image from 'next/image'

export function BrandMarquee() {
  const brands = [
    { name: "NIKE", icon: "https://cdn.simpleicons.org/nike/ffffff" },
    { name: "ADIDAS", icon: "https://cdn.simpleicons.org/adidas/ffffff" },
    { name: "JORDAN", icon: "https://cdn.simpleicons.org/jordan/ffffff" },
    { name: "PUMA", icon: "https://cdn.simpleicons.org/puma/ffffff" },
    { name: "NEW BALANCE", icon: "https://cdn.simpleicons.org/newbalance/ffffff" },
    { name: "REEBOK", icon: "https://cdn.simpleicons.org/reebok/ffffff" },
    { name: "FILA", icon: "https://cdn.simpleicons.org/fila/ffffff" },
    { name: "ON", icon: null },
    { name: "CONVERSE", icon: null },
    { name: "VANS", icon: null },
  ]

  // We duplicate the array to create the seamless infinite scroll effect
  const duplicatedBrands = [...brands, ...brands, ...brands]

  return (
    <div className="w-full overflow-hidden bg-foreground py-6 border-y border-border/10 flex items-center">
      <div className="flex animate-marquee w-max">
        {duplicatedBrands.map((brand, i) => (
          <div key={i} className="flex items-center mx-10">
            {brand.icon ? (
              // Use unoptimized img tag for external SVG CDNs to bypass next/image restrictions
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={brand.icon} 
                alt={brand.name} 
                className="h-8 md:h-10 object-contain opacity-70 dark:invert transition-all"
              />
            ) : (
              <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-background opacity-70 whitespace-nowrap">
                {brand.name}
              </span>
            )}
            
            {/* The separator dot */}
            <span className="ml-20 w-2 h-2 rounded-full bg-background opacity-20"></span>
          </div>
        ))}
      </div>
    </div>
  )
}
