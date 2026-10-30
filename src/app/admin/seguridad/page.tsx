import { connection } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { EnrollMfa } from './enroll-mfa'

export default async function Seguridad() {
  await requireAdmin({ allowEnrollment: true })
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold text-[#0B1F4B]">Verificación en dos pasos</h1>
      <p className="mt-2 mb-6 text-gray-600">
        Escanea el código con tu app autenticadora y confirma con el código de 6 dígitos.
      </p>
      <EnrollMfa />
    </div>
  )
}