import type { ReactNode } from 'react'
import Link from 'next/link'
import { connection } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { LogoutButton } from '@/app/admin/logout-button'


export const metadata = { robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { user } = await requireAdmin({ allowEnrollment: true })
  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <header className="flex items-center justify-between bg-[#0B1F4B] px-6 py-3 text-white">
        <Link href="/admin" className="font-semibold">
          Multimax · Admin
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="opacity-80">{user.email}</span>
          <LogoutButton />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}