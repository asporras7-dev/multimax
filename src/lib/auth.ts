import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requireAdmin(opts: { allowEnrollment?: boolean } = {}) {
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
  const tieneFactor = aal?.nextLevel === 'aal2'
  const verificado = aal?.currentLevel === 'aal2'

  if (tieneFactor && !verificado) redirect('/login/mfa')                 // falta el código
  if (!tieneFactor && !opts.allowEnrollment) redirect('/admin/seguridad') // aún sin 2FA

  return { supabase, user, mfaVerificado: verificado }
}