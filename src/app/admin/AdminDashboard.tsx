'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiX,
  HiCheck,
  HiUpload,
  HiExclamation,
  HiExternalLink,
  HiCalendar,
  HiBriefcase,
  HiCode,
} from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import type { Profile, WorkExperience, Project, TechStack } from '@/lib/data'

// ──────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────

function Toast({ type, text, onClose }: { type: string; text: string; onClose: () => void }) {
  if (!text) return null
  return (
    <div className={`flex items-center justify-between gap-3 toast ${type === 'success' ? 'toast-success' : 'toast-error'}`}>
      <div className="flex items-center gap-2">
        {type === 'success' ? <HiCheck size={15} /> : <HiExclamation size={15} />}
        <span>{text}</span>
      </div>
      <button type="button" onClick={onClose} className="btn btn-sm btn-ghost p-1">
        <HiX size={14} />
      </button>
    </div>
  )
}

function SectionHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--text)]">{title}</h2>
        {description && <p className="text-sm text-[var(--text-muted)] mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  )
}

function DeleteModal({
  label,
  onConfirm,
  onCancel,
}: {
  label: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Delete ${label}`}>
      <div className="card max-w-sm w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--danger)]/10 border border-[var(--danger)]/30 flex items-center justify-center shrink-0">
            <HiTrash size={18} className="text-[var(--danger)]" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--text)]">Delete {label}?</h3>
            <p className="text-xs text-[var(--text-muted)]">This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">Cancel</button>
          <button type="button" onClick={onConfirm} className="btn btn-danger flex-1">Delete</button>
        </div>
      </div>
    </div>
  )
}

function formatDate(date: string | Date | null): string {
  if (!date) return 'Present'
  try {
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(date as string))
  } catch {
    return String(date)
  }
}

// ──────────────────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────────────────

export default function AdminDashboard({
  initialProfile,
  initialExperiences,
  initialProjects,
  initialTechStacks,
}: {
  initialProfile: Profile | null
  initialExperiences: WorkExperience[]
  initialProjects: Project[]
  initialTechStacks?: TechStack[]
}) {
  const [profile, setProfile] = useState<Profile>(initialProfile || ({} as Profile))
  const [experiences, setExperiences] = useState<WorkExperience[]>(initialExperiences || [])
  const [projects, setProjects] = useState<Project[]>(initialProjects || [])
  const [techStacks, setTechStacks] = useState<TechStack[]>(initialTechStacks || [])

  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null)
  const [editingProj, setEditingProj] = useState<Project | null>(null)
  const [editingTech, setEditingTech] = useState<TechStack | null>(null)

  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState({ type: '', text: '' })
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [extractedCVData, setExtractedCVData] = useState<any | null>(null)

  const router = useRouter()

  const showToast = (type: string, text: string) => {
    setToast({ type, text })
    setTimeout(() => setToast({ type: '', text: '' }), 5000)
  }

  const formatDateForInput = (dateString: string | Date | null) => {
    if (!dateString) return ''
    try {
      return new Date(dateString as string).toISOString().split('T')[0]
    } catch {
      return ''
    }
  }

  // ── Profile ──────────────────────────────────────────────
  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (res.ok) {
        showToast('success', 'Profile updated successfully!')
        router.refresh()
      } else {
        showToast('error', 'Failed to update profile.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // ── CV Upload ─────────────────────────────────────────────
  const uploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      showToast('error', 'Please upload a PDF file.')
      return
    }
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const resData = await res.json()
        showToast('success', 'CV uploaded successfully!')
        if (resData.extractedData && Object.values(resData.extractedData).some(Boolean)) {
          setExtractedCVData(resData.extractedData)
        }
      } else {
        showToast('error', 'Failed to upload CV.')
      }
    } catch {
      showToast('error', 'An error occurred during upload.')
    } finally {
      setUploading(false)
    }
  }

  // ── Experiences ───────────────────────────────────────────
  const saveExperience = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingExp) return
    setSaving(true)
    const isNew = !editingExp.id
    try {
      const res = await fetch('/api/admin/experience', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingExp),
      })
      if (res.ok) {
        const { experience } = await res.json()
        if (isNew) {
          setExperiences(prev => [experience, ...prev].sort((a, b) =>
            new Date(b.startDate as string).getTime() - new Date(a.startDate as string).getTime()
          ))
        } else {
          setExperiences(prev => prev.map(e => e.id === experience.id ? experience : e).sort((a, b) =>
            new Date(b.startDate as string).getTime() - new Date(a.startDate as string).getTime()
          ))
        }
        setEditingExp(null)
        showToast('success', isNew ? 'Experience created!' : 'Experience updated!')
        router.refresh()
      } else {
        showToast('error', 'Failed to save experience.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // ── Projects ──────────────────────────────────────────────
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProj) return
    setSaving(true)
    const isNew = !editingProj.id
    try {
      const res = await fetch('/api/admin/project', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProj),
      })
      if (res.ok) {
        const { project } = await res.json()
        if (isNew) {
          setProjects(prev => [...prev, project].sort((a, b) => (a.order || 0) - (b.order || 0)))
        } else {
          setProjects(prev => prev.map(p => p.id === project.id ? project : p).sort((a, b) => (a.order || 0) - (b.order || 0)))
        }
        setEditingProj(null)
        showToast('success', isNew ? 'Project created!' : 'Project updated!')
        router.refresh()
      } else {
        showToast('error', 'Failed to save project.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // ── Tech Stack ────────────────────────────────────────────
  const saveTechStack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTech) return
    setSaving(true)
    const isNew = !editingTech.id
    try {
      const res = await fetch('/api/admin/techstack', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTech),
      })
      if (res.ok) {
        const { techStack } = await res.json()
        if (isNew) {
          setTechStacks(prev => [...prev, techStack].sort((a, b) => (a.order || 0) - (b.order || 0)))
        } else {
          setTechStacks(prev => prev.map(t => t.id === techStack.id ? techStack : t).sort((a, b) => (a.order || 0) - (b.order || 0)))
        }
        setEditingTech(null)
        showToast('success', 'Tech stack saved!')
        router.refresh()
      } else {
        showToast('error', 'Failed to save tech stack.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deletingId) return
    const [type, idStr] = deletingId.split('_')
    const id = parseInt(idStr)
    try {
      const res = await fetch(`/api/admin/${type}?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        if (type === 'experience') setExperiences(prev => prev.filter(i => i.id !== id))
        else if (type === 'project') setProjects(prev => prev.filter(i => i.id !== id))
        else if (type === 'techstack') setTechStacks(prev => prev.filter(i => i.id !== id))
        showToast('success', 'Deleted successfully.')
        router.refresh()
      } else {
        showToast('error', 'Failed to delete.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setDeletingId(null)
    }
  }

  const deleteLabel = deletingId
    ? deletingId.startsWith('experience')
      ? 'Experience'
      : deletingId.startsWith('project')
        ? 'Project'
        : 'Tech Stack'
    : ''

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast.text && (
        <Toast type={toast.type} text={toast.text} onClose={() => setToast({ type: '', text: '' })} />
      )}

      {/* ── PROFILE ── */}
      <section id="profile" className="card">
        <SectionHeader
          title="Profile"
          description="Your public portfolio information"
        />
        <form onSubmit={saveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="p-fullName">Full Name</label>
              <input id="p-fullName" type="text" className="input" name="fullName" value={profile.fullName || ''} onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))} required />
            </div>
            <div>
              <label className="label" htmlFor="p-title">Job Title</label>
              <input id="p-title" type="text" className="input" name="title" value={profile.title || ''} onChange={e => setProfile(p => ({ ...p, title: e.target.value }))} required />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="p-heroTitle">Hero Headline</label>
            <textarea id="p-heroTitle" className="input" rows={2} name="heroTitle" value={profile.heroTitle || ''} onChange={e => setProfile(p => ({ ...p, heroTitle: e.target.value }))} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="p-email">Email</label>
              <input id="p-email" type="email" className="input" name="email" value={profile.email || ''} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} required />
            </div>
            <div>
              <label className="label" htmlFor="p-phone">Phone</label>
              <input id="p-phone" type="text" className="input" name="phone" value={profile.phone || ''} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div>
              <label className="label" htmlFor="p-whatsapp">WhatsApp (e.g. 628...)</label>
              <input id="p-whatsapp" type="text" className="input" name="whatsapp" value={profile.whatsapp || ''} onChange={e => setProfile(p => ({ ...p, whatsapp: e.target.value }))} />
            </div>
            <div>
              <label className="label" htmlFor="p-linkedin">LinkedIn URL</label>
              <input id="p-linkedin" type="url" className="input" name="linkedin" value={profile.linkedin || ''} onChange={e => setProfile(p => ({ ...p, linkedin: e.target.value }))} />
            </div>
            <div>
              <label className="label" htmlFor="p-theme">Theme</label>
              <select id="p-theme" className="input" name="theme" value={profile.theme || 'dark'} onChange={e => setProfile(p => ({ ...p, theme: e.target.value }))}>
                <option value="dark">Dark (Burgundy)</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </section>

      {/* ── CV UPLOAD ── */}
      <section className="card">
        <SectionHeader title="CV / Resume" description="Upload your PDF to make it downloadable" />
        <div className="flex items-center gap-4 flex-wrap">
          <label className="btn btn-secondary cursor-pointer">
            <HiUpload size={16} />
            {uploading ? 'Uploading...' : 'Upload PDF'}
            <input
              type="file"
              accept="application/pdf"
              onChange={uploadCV}
              disabled={uploading}
              className="sr-only"
              aria-label="Upload CV PDF"
            />
          </label>
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-sm">
            View current CV ↗
          </a>
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section id="experience" className="card">
        <SectionHeader
          title="Work Experience"
          description={`${experiences.length} career milestones`}
          action={
            <button
              type="button"
              onClick={() =>
                setEditingExp({
                  id: 0,
                  company: '',
                  role: '',
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: null,
                  summary: '',
                  description: '',
                  techStack: [],
                  order: experiences.length + 1,
                })
              }
              className="btn btn-primary btn-sm"
            >
              <HiPlus size={15} /> Add Experience
            </button>
          }
        />

        {/* Experience Cards Grid */}
        {experiences.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]">
            <HiBriefcase size={36} className="mx-auto mb-3 opacity-40 text-[var(--accent)]" />
            <p className="font-semibold text-[var(--text)] mb-1">No work experiences yet</p>
            <p className="text-xs mb-4">Add your professional milestones to display on your portfolio.</p>
            <button
              type="button"
              onClick={() =>
                setEditingExp({
                  id: 0,
                  company: '',
                  role: '',
                  startDate: new Date().toISOString().split('T')[0],
                  endDate: null,
                  summary: '',
                  description: '',
                  techStack: [],
                  order: 1,
                })
              }
              className="btn btn-secondary btn-sm"
            >
              <HiPlus size={14} /> Add your first role
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiences.map(exp => (
              <div
                key={exp.id}
                className="card card-hover flex flex-col justify-between bg-[var(--surface-elevated)] border border-[var(--border-color)] p-5 rounded-2xl relative group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base text-[var(--text)] leading-snug truncate">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--accent)] mt-0.5 truncate">
                        {exp.company}
                      </p>
                    </div>
                    <span className="badge badge-primary text-xs shrink-0 whitespace-nowrap">
                      {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2 mt-2 leading-relaxed">
                    {exp.summary}
                  </p>

                  {exp.description && (
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mb-3 leading-relaxed opacity-80">
                      {exp.description}
                    </p>
                  )}

                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.techStack.slice(0, 5).map(tech => (
                        <span key={tech} className="badge badge-muted text-[10px] px-2 py-0.5">
                          {tech}
                        </span>
                      ))}
                      {exp.techStack.length > 5 && (
                        <span className="badge badge-muted text-[10px] px-2 py-0.5">
                          +{exp.techStack.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-[var(--text-muted)]">Order: #{exp.order || 0}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingExp(exp)}
                      className="btn btn-sm btn-secondary text-xs py-1.5 px-3"
                    >
                      <HiPencil size={13} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingId(`experience_${exp.id}`)}
                      className="btn btn-sm btn-danger text-xs py-1.5 px-3"
                    >
                      <HiTrash size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="card">
        <SectionHeader
          title="Projects"
          description={`${projects.length} portfolio items`}
          action={
            <button
              type="button"
              onClick={() =>
                setEditingProj({
                  id: 0,
                  title: '',
                  description: '',
                  techStack: [],
                  githubUrl: '',
                  demoUrl: '',
                  imageUrl: '',
                  order: projects.length + 1,
                })
              }
              className="btn btn-primary btn-sm"
            >
              <HiPlus size={15} /> Add Project
            </button>
          }
        />

        {/* Project Cards Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]">
            <HiCode size={36} className="mx-auto mb-3 opacity-40 text-[var(--accent)]" />
            <p className="font-semibold text-[var(--text)] mb-1">No projects yet</p>
            <p className="text-xs mb-4">Add your showcase applications to display on your portfolio.</p>
            <button
              type="button"
              onClick={() =>
                setEditingProj({
                  id: 0,
                  title: '',
                  description: '',
                  techStack: [],
                  githubUrl: '',
                  demoUrl: '',
                  imageUrl: '',
                  order: 1,
                })
              }
              className="btn btn-secondary btn-sm"
            >
              <HiPlus size={14} /> Add your first project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(proj => (
              <div
                key={proj.id}
                className="card card-hover flex flex-col justify-between bg-[var(--surface-elevated)] border border-[var(--border-color)] p-5 rounded-2xl relative group"
              >
                <div>
                  {/* Thumbnail */}
                  {proj.imageUrl ? (
                    <div className="h-32 w-full rounded-xl mb-3 overflow-hidden bg-[var(--surface)] border border-[var(--border-color)] relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-20 w-full rounded-xl mb-3 bg-gradient-to-br from-[var(--dark-burgundy)]/40 to-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center text-xs text-[var(--text-muted)] font-mono">
                      <span>{proj.title}</span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-base text-[var(--text)] leading-snug line-clamp-1">
                      {proj.title}
                    </h3>
                    <span className="badge badge-primary text-[10px] shrink-0">
                      #{proj.order || 0}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3 leading-relaxed">
                    {proj.description}
                  </p>

                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="badge badge-muted text-[10px] px-2 py-0.5">
                          {tech}
                        </span>
                      ))}
                      {proj.techStack.length > 4 && (
                        <span className="badge badge-muted text-[10px] px-2 py-0.5">
                          +{proj.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {(proj.githubUrl || proj.demoUrl) && (
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3 pt-1">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--accent)] flex items-center gap-1 transition-colors"
                        >
                          <FaGithub size={12} />
                          <span>Code</span>
                        </a>
                      )}
                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--accent)] flex items-center gap-1 transition-colors"
                        >
                          <HiExternalLink size={13} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-[var(--text-muted)]">Order: #{proj.order || 0}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingProj(proj)}
                      className="btn btn-sm btn-secondary text-xs py-1.5 px-3"
                    >
                      <HiPencil size={13} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingId(`project_${proj.id}`)}
                      className="btn btn-sm btn-danger text-xs py-1.5 px-3"
                    >
                      <HiTrash size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── TECH STACK ── */}
      <section id="techstack" className="card">
        <SectionHeader
          title="Tech Stack"
          description={`${techStacks.length} technologies`}
          action={
            !editingTech ? (
              <button
                type="button"
                onClick={() => setEditingTech({ id: 0, name: '', imageUrl: '', order: techStacks.length + 1 })}
                className="btn btn-primary btn-sm"
              >
                <HiPlus size={15} /> Add Tech
              </button>
            ) : null
          }
        />

        {/* Tech Form (Inline edit for quick icon adjustments) */}
        {editingTech && (
          <div className="mb-6 p-5 bg-[var(--surface-elevated)] border border-[var(--accent-border)] rounded-xl">
            <h3 className="text-sm font-bold text-[var(--text)] mb-4">
              {editingTech.id ? 'Edit Tech' : 'New Tech'}
            </h3>
            <form onSubmit={saveTechStack} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label" htmlFor="tech-name">Name</label>
                  <input id="tech-name" type="text" className="input" value={editingTech.name || ''} onChange={e => setEditingTech(t => ({ ...t!, name: e.target.value }))} required />
                </div>
                <div>
                  <label className="label" htmlFor="tech-img">Icon URL</label>
                  <input id="tech-img" type="text" className="input" value={editingTech.imageUrl || ''} onChange={e => setEditingTech(t => ({ ...t!, imageUrl: e.target.value }))} required />
                </div>
                <div>
                  <label className="label" htmlFor="tech-order">Sort Order</label>
                  <input id="tech-order" type="number" className="input" value={editingTech.order || 0} onChange={e => setEditingTech(t => ({ ...t!, order: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={() => setEditingTech(null)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Tech Stack grid */}
        {techStacks.length === 0 ? (
          <div className="text-center py-10 text-[var(--text-muted)]">
            <p>No tech stack entries yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {techStacks.map(tech => (
              <div key={tech.id} className="table-row rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tech.imageUrl} alt="" className="w-7 h-7 object-contain" />
                  <span className="text-sm font-medium text-[var(--text)]">{tech.name}</span>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button type="button" onClick={() => setEditingTech(tech)} className="btn btn-sm btn-secondary p-2"><HiPencil size={12} /></button>
                  <button type="button" onClick={() => setDeletingId(`techstack_${tech.id}`)} className="btn btn-sm btn-danger p-2"><HiTrash size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── EXPERIENCE EDIT/CREATE MODAL BOX ── */}
      {editingExp && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={editingExp.id ? 'Edit Experience' : 'New Experience'}
          onClick={() => setEditingExp(null)}
        >
          <div
            className="card max-w-2xl w-full max-h-[90vh] flex flex-col bg-[var(--bg-secondary)] border border-[var(--accent-border)] shadow-2xl rounded-2xl p-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
                  {editingExp.id ? 'Edit Work Experience' : 'Add New Work Experience'}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {editingExp.id ? 'Update role details, dates, and technologies.' : 'Fill in the information to add a career milestone.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                className="btn btn-sm btn-ghost p-1.5 text-[var(--text-muted)] hover:text-[var(--text)]"
                aria-label="Close modal"
              >
                <HiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={saveExperience} className="space-y-4 overflow-y-auto py-4 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="modal-exp-company">Company *</label>
                  <input
                    id="modal-exp-company"
                    type="text"
                    className="input"
                    placeholder="e.g. Google, Tech Startup"
                    value={editingExp.company || ''}
                    onChange={e => setEditingExp(ex => ({ ...ex!, company: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="modal-exp-role">Role / Job Title *</label>
                  <input
                    id="modal-exp-role"
                    type="text"
                    className="input"
                    placeholder="e.g. Senior Software Engineer"
                    value={editingExp.role || ''}
                    onChange={e => setEditingExp(ex => ({ ...ex!, role: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="modal-exp-start">Start Date *</label>
                  <input
                    id="modal-exp-start"
                    type="date"
                    className="input"
                    value={formatDateForInput(editingExp.startDate)}
                    onChange={e => setEditingExp(ex => ({ ...ex!, startDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="modal-exp-end">End Date (blank = Present)</label>
                  <input
                    id="modal-exp-end"
                    type="date"
                    className="input"
                    value={formatDateForInput(editingExp.endDate)}
                    onChange={e => setEditingExp(ex => ({ ...ex!, endDate: e.target.value || null }))}
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="modal-exp-summary">Short Summary *</label>
                <input
                  id="modal-exp-summary"
                  type="text"
                  className="input"
                  placeholder="One-sentence highlight of your achievements"
                  value={editingExp.summary || ''}
                  onChange={e => setEditingExp(ex => ({ ...ex!, summary: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="modal-exp-desc">Full Description *</label>
                <textarea
                  id="modal-exp-desc"
                  className="input"
                  rows={4}
                  placeholder="Detailed breakdown of responsibilities, impact, and projects..."
                  value={editingExp.description || ''}
                  onChange={e => setEditingExp(ex => ({ ...ex!, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="modal-exp-tech">Tech Stack (comma separated) *</label>
                  <input
                    id="modal-exp-tech"
                    type="text"
                    className="input"
                    placeholder="React, Next.js, TypeScript, PostgreSQL..."
                    value={Array.isArray(editingExp.techStack) ? editingExp.techStack.join(', ') : (editingExp.techStack || '')}
                    onChange={e =>
                      setEditingExp(ex => ({
                        ...ex!,
                        techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="label" htmlFor="modal-exp-order">Sort Order</label>
                  <input
                    id="modal-exp-order"
                    type="number"
                    className="input"
                    value={editingExp.order || 0}
                    onChange={e => setEditingExp(ex => ({ ...ex!, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving ? 'Saving...' : editingExp.id ? 'Save Changes' : 'Create Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── PROJECT EDIT/CREATE MODAL BOX ── */}
      {editingProj && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={editingProj.id ? 'Edit Project' : 'New Project'}
          onClick={() => setEditingProj(null)}
        >
          <div
            className="card max-w-2xl w-full max-h-[90vh] flex flex-col bg-[var(--bg-secondary)] border border-[var(--accent-border)] shadow-2xl rounded-2xl p-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
                  {editingProj.id ? 'Edit Project' : 'Add New Project'}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {editingProj.id ? 'Update project information, links, and technologies.' : 'Fill in the information to feature a new project.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingProj(null)}
                className="btn btn-sm btn-ghost p-1.5 text-[var(--text-muted)] hover:text-[var(--text)]"
                aria-label="Close modal"
              >
                <HiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={saveProject} className="space-y-4 overflow-y-auto py-4 pr-1">
              <div>
                <label className="label" htmlFor="modal-proj-title">Project Title *</label>
                <input
                  id="modal-proj-title"
                  type="text"
                  className="input"
                  placeholder="e.g. AI-Powered Dashboard"
                  value={editingProj.title || ''}
                  onChange={e => setEditingProj(p => ({ ...p!, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="modal-proj-desc">Description *</label>
                <textarea
                  id="modal-proj-desc"
                  className="input"
                  rows={3}
                  placeholder="What does this project do and what problem does it solve?"
                  value={editingProj.description || ''}
                  onChange={e => setEditingProj(p => ({ ...p!, description: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="modal-proj-tech">Tech Stack (comma separated) *</label>
                <input
                  id="modal-proj-tech"
                  type="text"
                  className="input"
                  placeholder="Next.js, Tailwind CSS, PostgreSQL, Prisma..."
                  value={Array.isArray(editingProj.techStack) ? editingProj.techStack.join(', ') : (editingProj.techStack || '')}
                  onChange={e =>
                    setEditingProj(p => ({
                      ...p!,
                      techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                    }))
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="modal-proj-github">GitHub URL</label>
                  <input
                    id="modal-proj-github"
                    type="url"
                    className="input"
                    placeholder="https://github.com/username/repo"
                    value={editingProj.githubUrl || ''}
                    onChange={e => setEditingProj(p => ({ ...p!, githubUrl: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="modal-proj-demo">Demo URL</label>
                  <input
                    id="modal-proj-demo"
                    type="url"
                    className="input"
                    placeholder="https://my-app.vercel.app"
                    value={editingProj.demoUrl || ''}
                    onChange={e => setEditingProj(p => ({ ...p!, demoUrl: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="modal-proj-image">Image URL (optional)</label>
                  <input
                    id="modal-proj-image"
                    type="text"
                    className="input"
                    placeholder="/assets/project-preview.png or https://..."
                    value={editingProj.imageUrl || ''}
                    onChange={e => setEditingProj(p => ({ ...p!, imageUrl: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="modal-proj-order">Sort Order</label>
                  <input
                    id="modal-proj-order"
                    type="number"
                    className="input"
                    value={editingProj.order || 0}
                    onChange={e => setEditingProj(p => ({ ...p!, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setEditingProj(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving ? 'Saving...' : editingProj.id ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deletingId && (
        <DeleteModal
          label={deleteLabel}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}

      {/* ── CV EXTRACTED DATA MODAL ── */}
      {extractedCVData && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="CV Data Extracted">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[var(--bg-secondary)] border border-[var(--accent-border)] shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[var(--text)]">CV Data Extracted!</h3>
              <button type="button" onClick={() => setExtractedCVData(null)} className="btn btn-sm btn-ghost p-1"><HiX size={16} /></button>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6">We found the following data in your CV. Would you like to apply it?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
              <div className="p-4 bg-[var(--surface-elevated)] rounded-xl space-y-2 border border-[var(--border-color)]">
                <p className="eyebrow mb-2">Profile Data</p>
                {extractedCVData.guessedName && <div><span className="text-[var(--text-muted)]">Name:</span> <span className="text-[var(--text)] font-medium">{extractedCVData.guessedName}</span></div>}
                {extractedCVData.title && <div><span className="text-[var(--text-muted)]">Title:</span> <span className="text-[var(--text)] font-medium">{extractedCVData.title}</span></div>}
                {extractedCVData.email && <div><span className="text-[var(--text-muted)]">Email:</span> <span className="text-[var(--text)] font-medium">{extractedCVData.email}</span></div>}
                {extractedCVData.phone && <div><span className="text-[var(--text-muted)]">Phone:</span> <span className="text-[var(--text)] font-medium">{extractedCVData.phone}</span></div>}
              </div>
              {extractedCVData.experiences?.length > 0 && (
                <div className="p-4 bg-[var(--surface-elevated)] rounded-xl overflow-y-auto max-h-48 border border-[var(--border-color)]">
                  <p className="eyebrow mb-2">Experience ({extractedCVData.experiences.length})</p>
                  {extractedCVData.experiences.map((exp: any, i: number) => (
                    <div key={i} className="mb-2 pb-2 border-b border-[var(--border-color)] last:border-0 text-sm">
                      <div className="font-semibold text-[var(--text)]">{exp.role} @ {exp.company}</div>
                      <div className="text-xs text-[var(--text-muted)]">{exp.startDate} — {exp.endDate || 'Present'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={async () => {
                  setProfile(prev => ({
                    ...prev,
                    ...(extractedCVData.guessedName ? { fullName: extractedCVData.guessedName } : {}),
                    ...(extractedCVData.title ? { title: extractedCVData.title } : {}),
                    ...(extractedCVData.email ? { email: extractedCVData.email } : {}),
                    ...(extractedCVData.phone ? { phone: extractedCVData.phone, whatsapp: extractedCVData.phone } : {}),
                    ...(extractedCVData.linkedin ? { linkedin: extractedCVData.linkedin } : {}),
                    ...(extractedCVData.heroTitle ? { heroTitle: extractedCVData.heroTitle } : {}),
                  }))
                  if (extractedCVData.experiences?.length) {
                    for (const exp of extractedCVData.experiences) {
                      try {
                        const res = await fetch('/api/admin/experience', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(exp) })
                        if (res.ok) { const d = await res.json(); setExperiences(prev => [...prev, d.experience]) }
                      } catch {}
                    }
                  }
                  if (extractedCVData.projects?.length) {
                    for (const proj of extractedCVData.projects) {
                      try {
                        const res = await fetch('/api/admin/project', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...proj, techStack: proj.techStack?.join(', ') || '' }) })
                        if (res.ok) { const d = await res.json(); setProjects(prev => [...prev, d.project]) }
                      } catch {}
                    }
                  }
                  setExtractedCVData(null)
                  showToast('success', 'Data applied! Click Save Profile to save changes.')
                  router.refresh()
                }}
                className="btn btn-primary flex-1"
              >
                Apply Data
              </button>
              <button type="button" onClick={() => setExtractedCVData(null)} className="btn btn-secondary flex-1">Ignore</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
