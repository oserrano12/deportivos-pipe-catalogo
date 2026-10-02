import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] relative overflow-hidden bg-background px-4 py-20">
      {/* MASSIVE BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
        <span className="text-[12rem] md:text-[30rem] font-black italic tracking-tighter text-foreground/[0.03] dark:text-foreground/[0.1] whitespace-nowrap -rotate-6">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl gap-6 mt-12">
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter drop-shadow-sm">
          Página no <br className="md:hidden" /> encontrada
        </h1>
        <p className="text-muted-foreground font-medium md:text-lg">
          Parece que esta ruta no existe, el producto se agotó o el enlace está roto.
        </p>
        <Link 
          href="/"
          className="mt-8 bg-primary text-primary-foreground font-black uppercase italic tracking-widest px-8 py-4 shadow-[6px_6px_0_0_oklch(var(--color-foreground))] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
