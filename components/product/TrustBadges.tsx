import { Truck, ShieldCheck, Lock, RefreshCw, Tags } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    {
      icon: <Truck className="w-4 h-4" />,
      title: "Envíos contra entrega",
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      title: "Garantía de 30 días",
    },
    {
      icon: <Lock className="w-4 h-4" />,
      title: "Pago 100% seguro",
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      title: "Cambios sin problema",
    },
    {
      icon: <Tags className="w-4 h-4" />,
      title: "Lleva + pares, paga menos",
    },
  ]

  return (
    <div className="py-5 border-y border-border/50 mt-4 mb-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
            <div className="text-primary/80">{badge.icon}</div>
            <span className="text-[11px] font-bold uppercase tracking-widest leading-none">{badge.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
