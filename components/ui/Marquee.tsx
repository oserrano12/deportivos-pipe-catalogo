'use client'

export function Marquee() {
  const text = "🔥 PAGO CONTRA ENTREGA ✦ 👟 CALIDAD PREMIUM ✦ 🚀 ENVÍOS A TODA COLOMBIA ✦ 📦 IMPORTACIÓN 1:1 ✦ "
  
  return (
    <div className="w-full bg-foreground text-background py-3 overflow-hidden flex whitespace-nowrap relative border-y-2 border-foreground z-10 shadow-lg">
      <div className="animate-marquee inline-flex items-center min-w-[200%]">
        {/* We repeat the text enough times to span 200% width, so it seamlessly shifts -50% */}
        <span className="text-sm md:text-base font-black italic tracking-widest px-4">{text}</span>
        <span className="text-sm md:text-base font-black italic tracking-widest px-4">{text}</span>
        <span className="text-sm md:text-base font-black italic tracking-widest px-4">{text}</span>
        <span className="text-sm md:text-base font-black italic tracking-widest px-4">{text}</span>
        <span className="text-sm md:text-base font-black italic tracking-widest px-4">{text}</span>
        <span className="text-sm md:text-base font-black italic tracking-widest px-4">{text}</span>
      </div>
    </div>
  )
}
