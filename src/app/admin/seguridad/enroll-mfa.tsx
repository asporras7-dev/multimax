'use client'

import { use, useState } from 'react'
import { io } from 'next/cache'
import { createClient } from '@/lib/supabase/client'

export function EnrollMfa() {
  use(io())
  const [factorId, setFactorId] = useState('')
  const [qr, setQr] = useState('')
  const [secret, setSecret] = useState('')
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')

  async function iniciar() {
    setMsg('')
    const supabase = createClient()
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: `App ${new Date().toISOString()}`,
    })
    if (error) return setMsg('No se pudo iniciar la activación')
    setFactorId(data.id)
    setQr(data.totp.qr_code)
    setSecret(data.totp.secret)
  }

  async function confirmar(e: React.FormEvent) {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code })
    if (error) return setMsg('Código incorrecto')
    window.location.href = '/admin'
  }

  if (!factorId) {
    return (
      <div className="space-y-3">
        <button
          onClick={iniciar}
          className="rounded-lg bg-[#1E4FD8] px-4 py-2 font-medium text-white"
        >
          Activar verificación en dos pasos
        </button>
        {msg && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={confirmar} className="space-y-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt="Código QR para la app autenticadora" className="h-48 w-48" />
      <p className="text-sm text-gray-600">
        ¿No puedes escanearlo? Clave manual: <code className="break-all">{secret}</code>
      </p>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        inputMode="numeric"
        maxLength={6}
        placeholder="Código de 6 dígitos"
        className="w-full rounded-lg border px-3 py-2"
        required
      />
      {msg && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      <button
        type="submit"
        className="w-full rounded-lg bg-[#1E4FD8] py-2 font-medium text-white"
      >
        Confirmar
      </button>
    </form>
  )
}