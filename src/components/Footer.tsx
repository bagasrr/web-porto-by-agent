import Link from 'next/link'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import type { Profile } from '@/lib/data'

const FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

type FooterProps = {
  profile: Profile | null
}

export default function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear()
  const name = profile?.fullName || 'Bagas Ramadhan Rusnadi'

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--text)] hover:text-[var(--accent)] transition-colors">
              BRR<span className="text-[var(--accent)]">.</span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm mt-3 max-w-xs leading-relaxed">
              Building elegant, performant digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="eyebrow mb-4">Navigation</h3>
            <nav className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow mb-4">Connect</h3>
            <div className="space-y-2">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <MdEmail size={14} />
                  {profile.email}
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <FaLinkedin size={13} />
                  LinkedIn
                </a>
              )}
              {profile?.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  <FaWhatsapp size={13} />
                  WhatsApp
                </a>
              )}
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors inline-block"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--text-muted)]">
          <p>© {year} {name}. All rights reserved.</p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
