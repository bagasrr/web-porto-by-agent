'use client'

import { useState } from 'react'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { HiArrowRight } from 'react-icons/hi'
import type { Profile } from '@/lib/data'

type ContactSectionProps = {
  profile: Profile | null
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Since no backend email service is configured, open mailto as fallback
    const mailto = `mailto:${profile?.email || ''}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.location.href = mailto
    setStatus('ok')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="section">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: CTA info */}
          <div>
            <p className="eyebrow mb-4">Get In Touch</p>
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-[var(--text)] leading-tight mb-6">
              Have a project{' '}
              <span className="text-gradient">in mind?</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              Let&apos;s build something meaningful together. Whether it&apos;s a new product,
              improving an existing system, or just a conversation — I&apos;m happy to connect.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--accent-border)] group-hover:text-[var(--accent)] transition-all">
                    <MdEmail size={17} />
                  </div>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors text-sm">
                    {profile.email}
                  </span>
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--accent-border)] group-hover:text-[var(--accent)] transition-all">
                    <FaLinkedin size={16} />
                  </div>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors text-sm">
                    LinkedIn
                  </span>
                </a>
              )}
              {profile?.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--accent-border)] group-hover:text-[var(--accent)] transition-all">
                    <FaWhatsapp size={16} />
                  </div>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text)] transition-colors text-sm">
                    WhatsApp
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="card">
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--text)] mb-6">
              Send a Message
            </h3>

            {status === 'ok' && (
              <div className="toast toast-success mb-4">
                Message sent! (Opening your email client...)
              </div>
            )}
            {status === 'error' && (
              <div className="toast toast-error mb-4">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="label">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="label">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="label">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="input"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="label">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="input resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary w-full group"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
