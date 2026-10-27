'use client'

import { useActionState } from 'react'
import { login } from './actions'

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(login, null)

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next ?? ''} />

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[#1E4FD8] py-2 font-medium text-white disabled:opacity-60"
      >
        {pending ? 'Entrando…' : 'Iniciar sesión'}
      </button>
    </form>
  )
}