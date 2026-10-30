import { connection } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export default async function AdminHome() {
  await requireAdmin()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0B1F4B]">Panel de administración</h1>
      <p className="mt-2 text-gray-600">Sesión iniciada correctamente.</p>
    </div>
  )
}