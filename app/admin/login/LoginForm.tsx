'use client'

import { useActionState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { login } from './actions'

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, { error: '' })

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Acceso exclusivo para administradores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@deportivospipe.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {state?.error && (
              <p className="text-sm font-medium text-destructive text-center bg-destructive/10 p-2 rounded-md">
                {state.error}
              </p>
            )}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? 'Iniciando sesión...' : 'Ingresar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
