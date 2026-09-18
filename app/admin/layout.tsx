import { logout } from './login/actions'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      {user && (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
          <div className="container flex h-14 items-center justify-between px-4">
            <span className="font-bold text-xl">Admin Panel</span>
            <form action={logout}>
              <Button variant="ghost" size="sm">Cerrar Sesión</Button>
            </form>
          </div>
        </header>
      )}
      <main className="flex-1 container px-4 py-6">
        {children}
      </main>
    </div>
  )
}
