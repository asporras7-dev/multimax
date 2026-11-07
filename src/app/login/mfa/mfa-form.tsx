'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function MfaForm() {
  const [factorIds, setFactorIds] = useState<string[]>([])
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
  const supabase = createClient()
    supabase.auth.mfa.listFactors().then(({ data }) => {
      const ids = data?.totp?.map((f) => f.id) ?? []  
    if (ids.length) setFactorIds(ids)
      else window.location.assign('/admin/seguridad')
    })
  }, [])

  async function verificar(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const supabase = createClient()
    const intento = code
    setCode('')

    for (const id of factorIds) {
      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId: id,
        code: intento,
      })
      if (!error) {
        window.location.assign('/admin')
        return
      }
    }
    setError('Código incorrecto')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F6FB] p-4">
      <form
        onSubmit={verificar}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-xl font-semibold text-[#0B1F4B]">Verificación en dos pasos</h1>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="Código de 6 dígitos"
          className="w-full rounded-lg border px-3 py-2"
          required
        />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={factorIds.length === 0}
          className="w-full rounded-lg bg-[#1E4FD8] py-2 font-medium text-white disabled:opacity-60"
        >
          Verificar
        </button>
      </form>
    </main>
  )
}