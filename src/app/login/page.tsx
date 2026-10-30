import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginForm } from './login-form'

export const metadata = { robots: { index: false, follow: false } }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/admin')

  const { next } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F6FB] p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-2xl font-semibold text-[#0B1F4B]">Panel de administración</h1>
        <p className="mb-6 text-sm text-gray-500">Acceso solo para administradores</p>
        <LoginForm next={next} />
      </div>
    </main>
  )
}