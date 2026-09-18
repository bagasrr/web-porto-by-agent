'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  HiHome,
  HiBriefcase,
  HiCode,
  HiCollection,
  HiUser,
  HiLogout,
  HiMenu,
  HiX,
} from 'react-icons/hi'

const NAV = [
  { href: '/admin', label: 'Overview', icon: HiHome, exact: true },
  { href: '/admin#profile', label: 'Profile', icon: HiUser, exact: false },
  { href: '/admin#experience', label: 'Experience', icon: HiBriefcase, exact: false },
  { href: '/admin#projects', label: 'Projects', icon: HiCode, exact: false },
  { href: '/admin#techstack', label: 'Tech Stack', icon: HiCollection, exact: false },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[var(--border-color)]">
          <Link
            href="/"
            className="text-xl font-bold font-[family-name:var(--font-display)] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          >
            BRR<span className="text-[var(--accent)]">.</span>
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-1">Content Manager</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="eyebrow px-3 mb-3">Menu</p>
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-all group"
              >
                <Icon size={17} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-[var(--border-color)] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-all"
          >
            <HiHome size={17} className="text-[var(--text-muted)]" />
            View Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--danger)] hover:bg-[var(--surface)] transition-all"
          >
            <HiLogout size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 md:px-6 bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border-color)]">
          <button
            onClick={() => setMobileOpen(true)}
            className="btn btn-sm btn-ghost md:hidden"
            aria-label="Open sidebar"
          >
            <HiMenu size={20} />
          </button>
          <h1 className="text-sm font-semibold text-[var(--text-secondary)] hidden md:block">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-2 ml-auto">
            <Link href="/" target="_blank" className="btn btn-sm btn-secondary">
              View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
