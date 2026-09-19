'use client'

export function BrandMarquee() {
  const brands = [
    "NIKE", "ADIDAS", "JORDAN", "PUMA", "NEW BALANCE", 
    "ASICS", "CONVERSE", "VANS", "BALENCIAGA", "GUCCI",
    "REEBOK", "SKECHERS", "FILA", "UNDER ARMOUR"
  ]

  // We duplicate the array to create the seamless infinite scroll effect
  const duplicatedBrands = [...brands, ...brands]

  return (
    <div className="w-full overflow-hidden bg-foreground py-4 border-y border-border/10 flex items-center">
      <div className="flex animate-marquee w-max">
        {duplicatedBrands.map((brand, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="text-xl md:text-2xl font-black italic tracking-tighter text-background opacity-70 whitespace-nowrap">
              {brand}
            </span>
            {/* The separator dot */}
            <span className="ml-16 w-1.5 h-1.5 rounded-full bg-background opacity-30"></span>
          </div>
        ))}
      </div>
    </div>
  )
}
