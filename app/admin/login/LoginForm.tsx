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
    <div className="flex-1 w-full flex items-center justify-center p-4 relative overflow-hidden bg-background py-12 md:py-0">
      {/* Sneakerhead abstract background element */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-sm relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <img src="/ISOTIPO.svg" alt="Deportivos Pipe" width={160} height={160} className="w-32 h-32 md:w-40 md:h-40 mx-auto" />
          <h1 className="text-4xl font-black tracking-tighter uppercase text-foreground">
            Deportivos <span className="text-primary">Pipe</span>
          </h1>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
            Portal de Administración
          </p>
        </div>
        
        <Card className="border-border/50 shadow-2xl bg-card/80 backdrop-blur-xl">
          <CardContent className="pt-6">
            <form action={formAction} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider font-bold">Email</Label>
                <Input id="email" name="email" type="email" required className="h-12 bg-background border-input focus-visible:ring-primary focus-visible:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase tracking-wider font-bold">Contraseña</Label>
                <Input id="password" name="password" type="password" required className="h-12 bg-background border-input focus-visible:ring-primary focus-visible:border-primary" />
              </div>
              
              {state?.error && (
                <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm font-bold p-3 rounded-md text-center">
                  {state.error}
                </div>
              )}
              
              <Button type="submit" disabled={pending} className="w-full h-12 text-base font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                {pending ? 'Autorizando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
