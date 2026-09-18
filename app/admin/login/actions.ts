'use strict'
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Por favor, ingresa email y contraseña.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('Error logging in:', error)
    return { error: 'Credenciales inválidas.' }
  }

  revalidatePath('/admin', 'layout')
  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
