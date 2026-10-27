'use client'

import { logout } from '@/app/login/actions'

export function LogoutButton() {
  async function onClick() {
    await logout()
    window.location.assign('/login')
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-white/30 px-3 py-1 hover:bg-white/10"
    >
      Cerrar sesión
    </button>
  )
}