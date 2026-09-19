import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const instagramUser = process.env.NEXT_PUBLIC_INSTAGRAM_USER || 'deportivospipe24'
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573170552425'
  
  const whatsappMessage = encodeURIComponent('¡Hola! Vengo de la página web y quiero hacer una consulta.')
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`

  return (
    <footer className="border-t bg-muted/30 pt-12 pb-24 md:pb-12 mt-auto">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tight">Deportivos Pipe</h3>
            <p className="text-sm text-muted-foreground font-medium max-w-xs">
              Tu catálogo digital de confianza para calzado deportivo y streetwear. Encuentra tu estilo con nosotros.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:mx-auto">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Enlaces</h4>
            <nav className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors w-fit">Inicio</Link>
              <Link href="/#catalogo" className="hover:text-primary transition-colors w-fit">Ver Catálogo</Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4 md:ml-auto">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Contáctanos</h4>
            <div className="flex gap-4">
              <a 
                href={`https://instagram.com/${instagramUser}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 pl-0.5">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
          <p>© {currentYear} Deportivos Pipe. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1.5">
            <span>Diseñado por</span>
            <a 
              href="https://github.com/oserrano12" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-primary transition-colors"
            >
              oserrano12
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
