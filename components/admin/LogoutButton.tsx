'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    localStorage.clear()
    window.location.href = '/admin/login'
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} disabled={loading} className="gap-2 text-muted-foreground hover:text-foreground outline-none">
      <LogOut className="w-4 h-4" />
      {loading ? 'Cerrando...' : 'Cerrar Sesión'}
    </Button>
  )
}
