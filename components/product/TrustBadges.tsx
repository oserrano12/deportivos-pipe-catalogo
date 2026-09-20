import { Truck, ShieldCheck, Lock, RefreshCw, Tags } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    {
      icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Envíos Seguros",
      subtitle: "Pago contra entrega",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Garantía",
      subtitle: "30 días de cobertura",
    },
    {
      icon: <Lock className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Pago Seguro",
      subtitle: "100% confiable",
    },
    {
      icon: <RefreshCw className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Cambios",
      subtitle: "Sin complicaciones",
    },
    {
      icon: <Tags className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Descuentos",
      subtitle: "Lleva + pares, paga menos",
    },
  ]

  return (
    <div className="w-full overflow-hidden border-2 border-border bg-secondary/20 shadow-[4px_4px_0_0_oklch(var(--color-border))]">
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide divide-x-2 divide-border">
        {badges.map((badge, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center justify-center p-4 min-w-[140px] flex-1 snap-center text-center space-y-2 hover:bg-secondary/40 transition-colors"
          >
            <div className="p-2 rounded-full bg-background border-2 border-border shadow-sm">
              {badge.icon}
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-tight leading-none mb-1">{badge.title}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">{badge.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
