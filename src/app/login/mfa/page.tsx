import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MfaForm } from './mfa-form'

export const metadata = { robots: { index: false, follow: false } }
export const instant = false

export default async function MfaPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol, activo')
    .eq('id', user.id)
    .single()
  if (!perfil || perfil.rol !== 'admin' || !perfil.activo) redirect('/')

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (aal?.nextLevel !== 'aal2') redirect('/admin/seguridad') // aún sin 2FA
  if (aal?.currentLevel === 'aal2') redirect('/admin')        // ya verificado

  return <MfaForm />
}