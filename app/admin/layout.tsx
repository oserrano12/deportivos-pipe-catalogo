import { LogoutButton } from '@/components/admin/LogoutButton'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      {user && (
        <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
          <div className="container flex h-14 items-center justify-between px-4 max-w-5xl mx-auto">
            <span className="font-bold text-xl tracking-tight uppercase">Admin Panel</span>
            <LogoutButton />
          </div>
        </header>
      )}
      <main className="flex-1 container px-4 py-6 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  )
}
