import { Truck, Lock, MapPin } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Pago Contra Entrega",
      desc: "Paga al recibir tu pedido"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Compra Segura",
      desc: "Tus datos 100% protegidos"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "A Toda Colombia",
      desc: "Llegamos a tu ciudad"
    }
  ]

  return (
    <div className="py-8 border-y-2 border-border mt-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex flex-row md:flex-col items-center gap-4 text-left md:text-center group">
            <div className="w-12 h-12 rounded-2xl bg-secondary/50 border-2 border-border flex items-center justify-center text-foreground group-hover:scale-110 group-hover:border-primary group-hover:text-primary transition-all shrink-0 shadow-sm">
              {badge.icon}
            </div>
            <div className="flex flex-col items-start md:items-center justify-center">
              <span className="text-xs font-black uppercase tracking-widest text-foreground leading-tight">{badge.title}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{badge.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
