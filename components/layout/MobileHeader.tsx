import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'

export function MobileHeader() {
  const instagramUser = process.env.NEXT_PUBLIC_INSTAGRAM_USER || 'deportivospipe24'
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight uppercase">Deportivos Pipe</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={`https://instagram.com/${instagramUser}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors rounded-md outline-none"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
