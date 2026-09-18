'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { HiMenu, HiX } from 'react-icons/hi'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

type NavbarProps = {
  profile?: {
    fullName?: string
    email?: string
    linkedin?: string
    whatsapp?: string
  } | null
}

export default function Navbar({ profile }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1))
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold font-[family-name:var(--font-display)] tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          >
            BRR<span className="text-[var(--accent)]">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] rounded-lg transition-all duration-150 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="btn btn-sm btn-ghost"
                title="Email"
                aria-label="Send email"
              >
                <MdEmail size={16} />
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-ghost"
                title="LinkedIn"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin size={15} />
              </a>
            )}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden btn btn-sm btn-ghost"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <nav
            className="absolute top-16 left-0 right-0 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] p-4 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] rounded-lg transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[var(--border-color)] flex gap-2">
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="btn btn-sm btn-ghost flex-1">
                  <MdEmail size={16} /> Email
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost flex-1">
                  <FaLinkedin size={15} /> LinkedIn
                </a>
              )}
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary flex-1">
                Resume
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
