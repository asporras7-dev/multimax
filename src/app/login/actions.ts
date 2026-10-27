'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const destinoSeguro = /^\/admin(\/[\w\-/]*)?$/

export async function login(_: unknown, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) return { error: 'Datos inválidos' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)
  if (error) {
    console.log('LOGIN ERROR:', error.code, error.message, error.status) // TEMPORAL
    return { error: 'Correo o contraseña incorrectos' }
  }
  const next = String(formData.get('next') ?? '')
  redirect(destinoSeguro.test(next) ? next : '/admin')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}